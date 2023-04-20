import Head from "next/head";
import Link from "next/link";
/* eslint-disable @next/next/no-script-component-in-head */
import {useState} from "react";

import MenuNavBar from "../MenuNavBar";

export default function Header() {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <header>
      <Head>
        <script async={""} src="https://cdn.ampproject.org/v0.js" />
      </Head>
      <div className="flex w-full items-center justify-center sm:justify-start md:justify-center">
        <svg
          viewBox="0 0 1440 190"
          xmlns="http://w3.org/2000/svg"
          className="w-full block   fill-gray-800 dark:fill-blue-500 absolute top-0 z-0"
        >
          <path d="M0 128h48c48 0 144 0 240-16s192-48 288-42.7c96 5.7 192 47.7 288 48 96-.3 192-42.3 288-42.6 96 .3 192 42.3 240 64l48 21.3V0H0z" />
        </svg>
        <div className="w-24 sm:w-24 md:w-fit relative z-10">
          <Link href="https://kloun.lol/">
            <amp-img
              layout="fixed"
              src="https://kloun.pages.dev/images/logodark.png"
              alt=""
              class="dark:sepia"
              width="140"
              height="181"
            />
            <img
              src="https://kloun.pages.dev/images/logodark.png"
              width="140"
              height="181"
              alt=""
              className="absolute dark:grayscale blur-lg duration-500 dark:blur-none top-0"
            />
          </Link>
        </div>
        <MenuNavBar
          className="hidden sm:flex justify-end w-full items-center space-x-4 pr-2 -mt-12 z-10"
          hrefPass={true}
        />
      </div>

      <div className="z-40 top-0 fixed">
        <label
          className={`cursor-pointer visible xs:visible sm:invisible  backdrop-blur-sm bg-black/30 dark:bg-white/30 ${
            menu && "flex w-screen h-screen"
          }`}
        >
          <input
            type="checkbox"
            className="hidden"
            checked={menu}
            onChange={() => null}
            onClick={() => setMenu(!menu)}
          />
          <svg
            xmlns="http://w3.org/2000/svg"
            className="h-8 w-8 m-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <div className={menu ? "absolute" : "hidden"}>
          <MenuNavBar
            className="mt-3 w-52 p-2 shadow  bg flex flex-col fixed top-8 left-2 rounded-md border-2 border-white dark:border-black gap-4"
            hrefPass={false}
          />
        </div>
      </div>
    </header>
  );
}
