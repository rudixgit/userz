

/// 

function(doc) {
  if (doc.tweets) {
    // Create a dictionary to store the frequency of each word
    const freqDict = {};

    doc.tweets.forEach(function (tweet) {
      const arr = tweet.text.split(' ')
        .map(function (word) {
          return word.toLowerCase().replace(/[^a-z]/g, '');
        })
        .filter(function (word) {
          return word.length > 3 && word.length < 11 && !/^http/.test(word) && !/^@/.test(word) && !/^#/.test(word) &&
            !/[^\u0000-\uFFFF]/.test(word);
        });

      // Increment the frequency count for each word
      arr.forEach(function (word) {
        freqDict[word] = (freqDict[word] || 0) + 1;
      });
    });

    const totalTweets = doc.tweets.length;

    doc.tweets.forEach(function (tweet) {
      const arr = tweet.text.split(' ')
        .map(function (word) {
          return word.toLowerCase().replace(/[^a-z]/g, '');
        })
        .filter(function (word) {
          return word.length > 3 && word.length < 11;
        });

      arr.forEach(function (word, i) {
        const prevWord = i > 0 ? arr[i - 1] : null;
        const nextWord = i < arr.length - 1 ? arr[i + 1] : null;

        // Calculate the TF-IDF score of the current word
        const tf = freqDict[word] / arr.length;
        const idf = Math.log(totalTweets / Object.keys(freqDict).length);
        const tfidf = tf * idf;

        emit(word, [prevWord, nextWord, tfidf]);
      });
    });
  }
}