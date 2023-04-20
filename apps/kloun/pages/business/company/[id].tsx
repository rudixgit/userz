/* eslint-disable no-underscore-dangle */
// import { useRouter } from 'next/router';
import type {GetServerSideProps} from "next";
import Main from "@/components/Layouts/Main";
import Meta from "@/components/Layouts/Meta";
import Rudsense from "@/components/Rudsense";
import db from "@/data/client";

const Index = ({
  title,
  zip,
  location,
}: {
  title: string;
  zip: number;
  location: string;
}): JSX.Element => {
  return (
    <Main
      hideFooter
      adsense
      meta={
        <Meta
          title={title.toLowerCase()}
          description={`${title} ${location} ${zip} България`}
        />
      }
    >
      <div className="my-10 flex w-full flex-col">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                Име
              </th>
              <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                Локация
              </th>

              <th className="border-b p-4 pl-8 pt-0 pb-3 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200">
                П.Код
              </th>
            </tr>
          </thead>
          <tbody className="dark:bg-slate-500">
            <tr>
              <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {title}
              </td>
              <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {location}
              </td>

              <td className="border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {zip}
              </td>
            </tr>
          </tbody>
        </table>
        <Rudsense />
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const id = query.id as string;
  const data = await db.get(id);
  return {
    props: data,
  };
};
export default Index;
