import { chunk, shuffle } from "lodash";

import FacebookShare from "@/components/FacebookShare";
import { FormatJoke } from "@/components/JokeText";
import JokeThumbnail from "@/components/JokeThumbnail";
import Main from "@/components/Layouts/Main";
import Meta from "@/components/Layouts/Meta";
import Nav from "@/components/Nav";
import Rudsense from "@/components/Rudsense";
import db from "@/data/client";
import { Cat, catsdata } from "@/utils/formatter";

import { Doc } from "../../data/structure";

const SingleJoke = (props: {
  joke: Doc;
  items: [Doc[], Doc[], Doc[]];
  cats: [Cat[], Cat[], Cat[]];
}): JSX.Element => {
  return (
    <Main
      hideFooter
      adsense
      meta={
        <Meta
          title={props.joke?.joke || ""}
          description={props.joke?.joke || ""}
          image={`https://kloun.lol/api/joke/og/?idx=${props.joke?.id}`}
          removeProfanity
        />
      }
    >
      <div className="my-10 flex w-full flex-col text-center">
        <article className="mx-auto mb-6 px-10 text-xl leading-relaxed xs:px-2 sm:px-4 lg:w-2/3">
          <FormatJoke joke={props.joke?.joke} />
        </article>
        <div className=" flex justify-end items-center">
          <FacebookShare id={`https://kloun.lol/joke/${props.joke?.id}`} />
        </div>
      </div>

      <div className="-m-2 flex flex-wrap">
        <article className="joke">
          <Rudsense />
        </article>
        {props.items[0].map((item): JSX.Element => {
          return (
            <JokeThumbnail
              item={item}
              key={item.id}
              showcats={true}
              short={true}
            />
          );
        })}
      </div>

      <Nav cats={props.cats[1]} prefix="cat" />
      <div className="-m-2 flex flex-wrap">
        <article className="joke">
          <Rudsense />
        </article>
        {props.items[1].map((item): JSX.Element => {
          return (
            <JokeThumbnail
              item={item}
              key={item.id}
              showcats={true}
              short={true}
            />
          );
        })}
      </div>
      <Nav cats={props.cats[2]} prefix="cat" />
      <div className="-m-2 flex flex-wrap">
        <article className="joke">
          <Rudsense />
        </article>
        {props.items[2].map((item): JSX.Element => {
          return (
            <JokeThumbnail
              item={item}
              key={item.id}
              showcats={true}
              short={true}
            />
          );
        })}
      </div>
    </Main>
  );
};

export const getServerSideProps = async ({
  query,
}: {
  query: {jokeid: string};
}) => {
  const cats = chunk(shuffle(catsdata), 7);
  const {jokeid} = query;

  const joke = await db.get(jokeid as string);
  if (joke.error) { 
    return {
      notFound: true,
    }
   }

  const jokes = await db.view("joke/random", {
    key: Math.floor(Math.random() * 1938).toString(),
    update: "lazy",
    reduce: false,
  });

  const items = chunk(jokes.rows, Math.round(jokes.rows.length / 3));

  return {
    props: {
      joke: joke.title ? {...joke, joke: joke.title} : {},
      items: items,
      cats,
    },
  };
};

export const runtime = "experimental-edge";
export default SingleJoke;
