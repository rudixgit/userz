const { parentPort } = require("worker_threads");
const AWS = require("aws-sdk");
const async = require("async");
//const axios = require("axios");
const fetch = require("node-fetch");

const nano = require("nano")("http://arpecop:maximus@0.0.0.0:5984");
const db = nano.use("q");
const db1 = nano.use("db");

// Set the region where the queue is located
const creds = {
  region: "eu-west-1",
  accessKeyId: "1",
  secretAccessKey: "1",
};
AWS.config.update(creds);

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const dynamo = new AWS.DynamoDB.DocumentClient(creds);
const lambda = new AWS.Lambda();

const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const minifyTweets = async (id) => {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15",
    };

    const datafetch = await fetch(
      `https://syndication.twitter.com/srv/timeline-profile/screen-name/${id}`,
      { headers }
    );
    const html = await datafetch.text();

    if (html.length > 5000) {
      const obj = JSON.parse(
        html
          .replace(' id="__NEXT_DATA__" type="application/json"', "")
          .split("<script>")[1]
          .split("</script>")[0]
      );

      const tweets = obj.props.pageProps.timeline.entries.map((t) => {
        const originalPoster = t.content.tweet.retweeted_status
          ? {
            screenName: t.content.tweet.retweeted_status.user.screen_name,
            name: t.content.tweet.retweeted_status.user.name,
            profileImageUrl:
              t.content.tweet.retweeted_status.user.profile_image_url_https,
          }
          : null;
        return {
          id: t.entry_id,
          text: t.content.tweet.retweeted_status
            ? t.content.tweet.retweeted_status.full_text
            : t.content.tweet.full_text,
          createdAt: new Date(t.content.tweet.created_at)
            .toISOString()
            .split("T")[0],

          originalPoster,
        };
      });
      return Promise.resolve({
        description:
          obj.props.pageProps.timeline.entries[0]?.content.tweet.user
            .description || "",
        screenName:
          obj.props.pageProps.timeline.entries[0]?.content.tweet.user
            .screen_name || "",
        name:
          obj.props.pageProps.timeline.entries[0]?.content.tweet.user.name ||
          "",
        profileImageUrl:
          obj.props.pageProps.timeline.entries[0].content.tweet.user
            .profile_image_url_https,
        tweets,
      });
    } else {
      return Promise.resolve({ tweets: null });
    }
  };

  const queueUrl =
    "https://sqs.eu-west-1.amazonaws.com/445820032868/twitter.fifo";

  // async function sendMessage(message) {
  //   const params = {
  //     MessageBody: message,
  //     MessageDeduplicationId: message,
  //     MessageGroupId: "Group1",
  //     QueueUrl: queueUrl, // Replace this with the URL of your SQS queue
  //   };
  //   sqs.sendMessage(params, function (err, data) {
  //     return Promise.resolve(null);
  //   });
  // }

  function receiveMessages(callback) {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
    };
    sqs.receiveMessage(params, function(err, data) {
      async.forEachOf(
        data.Messages,
        (message, key, cb) => {
          sqs.deleteMessage(
            {
              QueueUrl: queueUrl,
              ReceiptHandle: message.ReceiptHandle,
            },
            function(err, data) {
              cb();
            }
          );
        },
        (err) => {
          callback(data.Messages);
        }
      );
    });
  }
  const getProfile = async (id) => {
    return new Promise((resolve) => {
      minifyTweets(id).then((data) => {
        if (data.tweets) {
          const row = data;

          if (row.tweets) {
            const mentioned = row.tweets
              .filter((i) => i.originalPoster)
              .map((i) => i.originalPoster.screenName);

            resolve({
              Mentioned: [...new Set(mentioned)],
              PutRequest: {
                Item: {
                  _id: `${row.screenName.charAt(0) === "_"
                    ? "-" + row.screenName.substring(1)
                    : row.screenName
                    }_tw`,
                  letter: row.screenName.charAt(0).toLowerCase(),
                  cat: "Twuser2",
                  type: "Twuser2",
                  ...row,
                },
              },
            });
          }
        } else {
          resolve(null);
        }
      });
    });
  };
  let counter = 0;
  let items = [];
  async function test() {
    receiveMessages(async function(qdata, err) {
      if (qdata) {
        async.forEachOf(
          qdata,
          (message, key, cb) => {
            //console.log(message.Body, (counter += 1));
            getProfile(message.Body).then((get) => {
              if (get) {
                if (get.Mentioned[0]) {
                  get.Mentioned.forEach((user) => {
                    //sendMessage(user);
                    try {
                      db.insert({ _id: user }, function(e) { });
                    } catch (e) { }
                  });
                }

                items.push({ PutRequest: get.PutRequest });
                cb({ PutRequest: get.PutRequest });
              } else {
                cb(null);
              }
            });
          },
          (collected) => {
            if (items.length >= 100) {
              const itemList = items.map((it) => it.PutRequest.Item);
              const cont = (counter += 200);
              db1.bulk({ docs: itemList }, function(e) {
                console.log(e, cont);
                if (cont >= 10000) {
                  process.exit(1);
                }
                test();
              });

              items = [];
            } else {
              test();
            }
          }
        );
      } else {
        test();
      }
    });
  }

  test();
}
///////
