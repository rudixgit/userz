import AdItem from "@/components/ads/AdItem";
import loadFetchFile from "@/components/helpers/loadFetchFile";

import { createSlug } from "@/components/helpers/slug";
import Layout from "@/components/Main";
import { AdsDataSchema, AdsDataSubcat, SideBarContainer } from "@/pages/ads";

import { NextApiRequest } from "next";
import Link from "next/link";

const CatId = ({
  keywords,
  maincat,
  data,
  items,
}: {
  keywords: string[];
  ut: Date;
  maincat: { name: string; slug: string };
  data: AdsDataSubcat;
  items: any;
}) => {
  return (
    <Layout disableContainer={true}>
      <SideBarContainer>
        <div className='flex flex-wrap justify-center items-center'>
          {keywords.map((x) => (
            <Link
              passHref
              className='text-xs bg-slate-800 mx-0.5 text-white rounded-xl px-2 m-1'
              href={`/ads/search/${createSlug(
                `${data.name}-${maincat.name}`
              )}_${data.slug}_${createSlug(x)}`}
              key={x}
            >
              {x}
            </Link>
          ))}
        </div>
      </SideBarContainer>

      <div className='w-full'>
        <h2 className='text-3xl text-lime-200 dark:text-zinc-600'>
          {maincat.name}
        </h2>
        <h1 className='text-5xl -mt-2'>{data.name}</h1>
        <p>{data.description}</p>
        <div className='flex justify-end'>
          <Link
            href={`/ads/create/${maincat.slug}/${data.slug}`}
            className='btn'
          >
            Пусни обява тук
          </Link>
        </div>
      </div>
      {items?.map((item: any) => (
        <AdItem key={item.id} {...item} />
      ))}
    </Layout>
  );
};

export const getServerSideProps = async (req: NextApiRequest) => {
  const adsData = await loadFetchFile("adsData");
  const data = adsData.find(
    (x) => x.slug === req.query.catid?.[0]
  ) as AdsDataSchema;
  const subcat = data.items.find((x) => x.slug === req.query.catid?.[1]);
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const keywords = subcat?.fields
    .filter(
      (field) =>
        (field.name === "type" && field.options) ||
        (field.name === "brand" && field.options)
    )
    .flatMap((x) => x.options)
    .filter((x) => !x?.includes("Друг"));

  //insert();
  return {
    props: {
      keywords,
      data: subcat,
      items: [] as any,
      maincat: { name: data.name, slug: data.slug },
    },
  };
};

export const runtime = "experimental-edge";

export default CatId;
