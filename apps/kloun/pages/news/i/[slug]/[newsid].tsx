import type { GetServerSideProps } from "next";
import { uniqBy } from 'lodash';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import bgStrings from '@/components/bg';
import Main from '@/components/Layouts/Main';
import Meta from '@/components/Layouts/Meta';
import NewsThumbnail from '@/components/NewsThumbnail';
import Rudsense from '@/components/Rudsense';
import db from '@/data/client';

import type { News } from "@/pages/news/";
const formatter = buildFormatter(bgStrings);

const NewsItem = ({
  news,
  newsbg_by_pk: { title, image, parsed, date },
}: {
  news: News[];
  newsbg_by_pk: News;
  slug: string;
}): JSX.Element => {
  return (
    <Main
      adsense
      hideFooter
      meta={
        <Meta
          title={title}
          description={parsed?.html[0].content || title}
          image={image}
          imgtype="image/jpeg"
        />
      }
    >
      <article className="pt-8 flex w-full flex-col">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center justify-center">
            {image && (
              <div className="mr-4 pt-2">
                <amp-img
                  alt={title}
                  layout="responsive"
                  class="rounded-lg object-cover"
                  src={image}
                  width="500"
                  height="300"
                />
              </div>
            )}
            <h1 className="font-bold sm:text-2xl md:text-4xl">{title}</h1>
          </div>
          <div>
            {date && (
              <time dateTime={date}>
                <TimeAgo
                  date={new Date(date).toISOString()}
                  formatter={formatter}
                />
              </time>
            )}
          </div>
          <Rudsense />
          <div className="flex">
            <article className="leading-relaxed" id="article">
              {parsed?.html.map(({ type, content }, i: number) =>
                type === "p" ? (
                  <p key={i}>{content}</p>
                ) : (
                  <img src={content} key={i} />
                )
              )}
            </article>
          </div>
        </div>
      </article>
      <div className="flex flex-wrap">
        {news.map(({ id, title, image, date }) => (
          <NewsThumbnail uid={id} title={title} date={date} image={image} key={id} />
        ))}
      </div>
    </Main>
  );
};
function countAlphanumeric(str: string) {
  const regex = /[a-zA-Z0-9а-яА-Я]/g;
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}
// function checkNumeric(str: string): boolean {
//   const chars: string[] = str.split('');
//   console.log('chars', chars);
//   const nums: string[] = chars.filter((char: string) => !isNaN(parseInt(char)) && char !== ' ');
//   console.log('nums', nums);
//   return nums.length > chars.length / 2;
// }

function getLastP(arr: { type: string; content: string }[]) {
  const emptylines = arr.filter((x) => countAlphanumeric(x.content) !== 0);
  const lastPElemIndex = emptylines.reduce((acc, curr, index) => {
    if (curr.type === "p") {
      acc = index;
    }
    return acc;
  }, 0);
  const filteredArr = arr.slice(0, lastPElemIndex + 1);
  const removeNoImages = filteredArr.filter((x) => x.type === "p" || (x.type === "img" && x.content.includes('http')));
  const arrx = uniqBy(removeNoImages, function (e) {
    return e.content;
  });
  return arrx;
}

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
  const { newsid, slug } = query as { newsid: string; slug?: string };
  const data = await db.get(newsid);
  const content = data?.content
    ? JSON.parse(data?.content).html.map((x: string) => ({
      type: "p",
      content: x,
    }))
    : (data?.html as { type: string; content: string }[]);


  const news = await db.view("newsbg/news", {
    reduce: false,
    limit: 10,
    update: "lazy",
    start_key: data.nid,
    descending: true,
    skip: 1,
  });

  const props = {
    newsbg_by_pk: {
      ...data,
      parsed: {
        html: getLastP(content),
      },
    },
    news: news.rows,
    slug,
  };
  return {
    props,
  };
};
export default NewsItem;

