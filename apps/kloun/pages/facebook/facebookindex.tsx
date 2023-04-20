import type {GetServerSideProps} from "next";
import {useState} from "react";

import FBLogin from "@/components/FacebookLogin";
import FacebookShare from "@/components/FacebookShare";
import {getCookie, useFacebookRandom} from "@/components/hooks/facebookhook";
import Main from "@/components/Layouts/Main";
import Meta from "@/components/Layouts/Meta";
import LoadingResult, {ResultWrapper} from "@/components/LoadingResult";
import Nav from "@/components/Nav";
import Rudsense from "@/components/Rudsense";

export type FbApp = {
  count: number;
  slug: string;
  cat: string;
  description?: string;
  button?: string;
  isLoginOptional?: boolean;
  isLoginRequired?: boolean;
  items: number;
  //schema: RJSFSchema;
  hidden?: boolean;
};

const Facebook = ({
  cats,
  result,
  appid,
  shareid,
  app,
  env,
  code,
}: {
  cats: FbApp[];
  app?: FbApp;
  result?: {
    appid: string;
    id: string;
    title: string;
    description: string;
    image: string;
  };
  code?: string;
  // This function takes a string and returns a string
  // The string is the appid of the current user
  // This is used to determine which data to display to the user

  appid?: string;
  shareid?: string;
  env: "prod" | "dev";
}) => {
  //setUrlparams
  const [urlparams] = useState<{
    params: string;
    refreshid: string;
  }>({params: "", refreshid: "default"});
  const [curresult] = useFacebookRandom(app);
  //const [curresult, setResult] = useFacebookRandom(app);
  // 	const formDatax = (formd: any) => {
  // 		const values = mapValues(formd, (val) => ({ ["default"]: val }));
  // 		const properties = merge(form?.properties, values);
  // 		const queryString = Object.keys(formd)
  // 			.filter((key) => formd[key].toString().length >= 1)
  // 			.map((key) => key + "=" + formd[key])
  // 			.join("&");
  //
  // 		//setForm({ ...form, properties });
  // 		setResult(formd);
  //
  // 		setUrlparams({
  // 			refreshid: nanoid(3),
  // 			params: queryString ? "?" + queryString : "",
  // 		});
  // 	};

  function onBeforeLoad(): Promise<string> {
    return new Promise((resolve) => {
      const id = getCookie("result");
      resolve(`https://kloun.lol/fb/${app?.slug}/${curresult}_${id}`);
    });
  }

  return (
    <Main
      meta={
        <Meta
          title={result?.title || app?.cat || "Фейсбук приложения"}
          description={
            result?.description || app?.description || "Фейсбук приложения"
          }
          image={
            shareid
              ? `https://kloun.lol/img/${appid}/${shareid}.png`
              : "https://kloun.lol/images/og.jpg"
          }
          noIndex={shareid}
        />
      }
    >
      <div className="flex justify-center items-center">
        {curresult && (
          <ResultWrapper>
            <div className="relative flex bg">
              <img
                alt=""
                className="w-full h-full"
                src="https://kloun.pages.dev/images/placeholderfb.png"
              />

              <div className="flex absolute top-0 w-full">
                <div className="w-full">
                  <img
                    src={`/fbapps/${app?.slug}/back.png`}
                    alt=""
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full absolute top-0">
                <img
                  src={`/api/facebook/${app?.slug}/svg/${curresult}/res/${curresult}/${urlparams.params}`}
                  alt=""
                  className="w-full"
                />
              </div>
            </div>
          </ResultWrapper>
        )}
        {!curresult && app && <LoadingResult name={app?.cat} />}
      </div>
      <div className="pt-1">
        <FBLogin app={app} env={env} code={code} />
      </div>

      <div className="container mx-auto">
        {app && (
          <div>
            <div className="flex justify-center items-center my-3">
              <FacebookShare
                onbeforeSubmit={onBeforeLoad}
                disabled={curresult ? false : true}
                text={app?.button}
                id={""}
              />
            </div>
            <p>{app?.description}</p>
          </div>
        )}

        <Rudsense />

        <Nav cats={cats} prefix="fb" />
        <div className="my-10 flex w-full flex-col">
          <div className="flex flex-wrap" />
        </div>
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apps = [
    {
      cat: "Новогодишна Баница 2023",
      slug: "banica2023",
      count: 2023,
      covertheme: "/images/2023.jpg",
      items: 40,
      schema: {
        title: "Персонализирай",
        type: "object",
        properties: {
          firstname: {type: "string", title: "Напиши името си", default: ""},
        },
      },
      description:
        "Баницата с удачни амулети е традиция в България, която се спазва на Рождество. Тя се прави от тесто, което се разправя в тава и се пълни с различни вкусности, като сирене, яйца, чесън и лук. В тавата се скриват удачни амулети, като златно монети, златни колела или някакви други символи на спечелване. Те се разпределят случайно по тавата, а хората се надяват да хвърлят кости и да спечелят амулета, който ще им принесе удача през новата година.",
    },
    {
      cat: "На колко години изглеждаш",
      slug: "godini",
      button: "Провери на колко изглеждаш",
      isLoginRequired: true,
    },
    {
      cat: "Провери значението на името си",
      slug: "assbg_BG",
    },
    {
      cat: "Добър или лош си днес",
      slug: "goodbad",
      isLoginRequired: false,
      items: 138,
      schema: {
        title: "Персонализирай",
        type: "object",
        properties: {
          firstname: {type: "string", title: "Напиши името си", default: ""},
        },
      },
      hidden: false,
    },
    {
      cat: "На коя известна личност приличаш",
      slug: "celeb",
      hidden: true,
    },
    {
      cat: "Изтегли си късметче",
      slug: "iztegli",
      hidden: true,
    },
    {
      cat: "Индиянското ти име",
      slug: "indianskoime",
      hidden: true,
    },
    {
      cat: "Виж коя известна личност ти подхожда",
      slug: "podhojda",
      hidden: true,
    },
    {cat: "Какво е японското ти име", slug: "iaponskoime", hidden: true},
    {
      cat: "Провери какъв си бил в предишен живот",
      slug: "predishenjivot",
      hidden: true,
    },
  ];

  const {appid, id} = context.query;
  const app = apps.find((app) => app.slug === appid);
  return {
    props: {
      env: process.env.USER === "rudix" ? "dev" : "prod",
      cats: apps.filter((cat) => cat.slug !== appid && !cat.hidden),
      appid: appid || null,
      shareid: id || null,
      app: app || null,
      code: context.query.code || null,
    },
  };
};
//
export const runtime = "experimental-edge";
export default Facebook;
