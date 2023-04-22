import type {GetServerSideProps} from "next";
import type {News} from "@/pages/news/";

import db from '@/data/client';

const NewsItem = ({
  newsbg_by_pk: {parsed},
}: {
  newsbg_by_pk: News;
  slug: string;
}): JSX.Element => (
  <>
    <article className="pt-8 flex w-full flex-col">
      <div className="container mx-auto">
        <div className="flex">
          <article className="leading-relaxed" id="article">
            {parsed?.html.map(({type, content}, i: number) =>
              type === "p" ? (
                <p key={i}>{content}</p>
              ) : (
                <img src={content} key={i} className="w-1 h-1" />
              )
            )}
          </article>
        </div>
      </div>
    </article>
    <div id="emp">император</div>
  </>
);

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {newsid} = query;
  const data = await db.get(newsid as string);
  const content = data?.content
    ? JSON.parse(data?.content).html.map((x: string) => ({
        type: "p",
        content: x,
      }))
    : (data?.html as {type: string; content: string}[]);

  const props = {
    newsbg_by_pk: {
      ...data,
      parsed: {
        html: content,
      },
    },
  };
  return {
    props,
  };
};

export default NewsItem;
//export const runtime = "experimental-edge";d
