import Link from "next/link";
import {useRouter} from "next/router";

import Main from "@/components/Layouts/Main";
import Meta from "@/components/Layouts/Meta";
import Nav from "@/components/Nav";
import NewsThumbnail from "@/components/NewsThumbnail";
import Program from "@/components/Program";
import Rudsense from "@/components/Rudsense";
import db from "@/data/client";
import {Cat, slugify} from "@/utils/formatter";

import {News} from "./news";

const MoreButton = ({
  text,
  type,
}: {
  text: string;
  type: string;
}): JSX.Element => {
  return (
    <Link
      href={{pathname: "/", query: {type}}}
      passHref={true}
      className="btn dark:btn-ghost border-2"
    >
      {text}
    </Link>
  );
};

const Index = ({cats, news}: {cats: Cat[]; news: News[]}) => {
  const router = useRouter();
  const {
    query: {type},
  } = router;

  return (
    <Main
      meta={
        <Meta
          title="Вицове и забавни котки и мемета"
          description="Вицове и забавни котки и мемета"
        />
      }
    >
      {type === "Jokes" && <Nav cats={cats} prefix="cat" />}
      {type === "Program" && (
        <Program className="container flex flex-wrap items-center justify-center sm:mx-auto" />
      )}
      {!type && (
        <>
          <h1 className="text-5xl font-light">Актуално</h1>
          <div className="flex flex-wrap">
            {news.map(({id, title, image}) => (
              <NewsThumbnail uid={id} title={title} image={image} key={id} />
            ))}
          </div>
          <Link
            href={{pathname: "/news/"}}
            passHref={true}
            className="btn dark:btn-ghost border-2"
          >
            Още новини
          </Link>
          <h1 className="text-5xl font-light">Вицове</h1>
          <Nav cats={cats} limit={9} prefix="cat" />
          <div className="flex flex-wrap justify-end mb-2">
            <MoreButton text="всички категории" type="Jokes" />
          </div>
          <Rudsense type="thumbs" />
          <h1 className="text-5xl font-light">Забавно в картинки</h1>
          <Program
            limit={12}
            className="snap-x flex overflow-auto py-2 snap-proximity programmindex"
          />
          <div className="flex flex-wrap justify-end my-2">
            <MoreButton text="Oще Memeта" type="Program" />
          </div>

          <Rudsense type="thumbs" />
        </>
      )}
    </Main>
  );
};
export const getServerSideProps = async () => {
  const catsx = await db.view("joke/cat", {
    reduce: true,
    update: "lazy",
    group: true,
  });
  const news = await db.view("newsbg/news", {
    reduce: false,
    limit: 30,
    update: "lazy",
    descending: true,
  });

  const cats = catsx.rows
    .filter((x: {value: number}) => x.value > 1)
    .map((x: {key: string; value: number}) => ({
      cat: x.key.replace("JOK", ""),
      slug: slugify(x.key.replace("JOK", "")),
      count: x.value,
    }))
    .sort((a: {count: number}, b: {count: number}) => b.count - a.count);
  return {
    props: {
      cats,
      news: news.rows,
    },
  };
};

//export const config = { amp: true }
export default Index;
