import { ulid } from "ulidx";
import useLocalStorage from "@/components/hooks/storage";
import Layout from "@/components/Main";

import { verifytoken } from "@/components/utils/awsConfig";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormInput, { onSubmit } from "@/components/forms/inputs/AllForms";

import Err from "@/components/forms/Err";

import { OptionalField } from "../ad/[adid]";
import { AdsDataSchema, AdsDataSubcat, Field } from "..";
import loadFetchFile from "@/components/helpers/loadFetchFile";

function CreatefreeAd({ data }: { data: AdsDataSubcat }) {
  const [submitted, setSubmitted] = useState(false);
  const [errorx, setError] = useState<{
    message: string;
    name?: string;
  } | null>(null);
  const [user] = useLocalStorage<{ username: string; sub: string } | null>(
    "user",
    null
  );
  const router = useRouter();
  useEffect(() => {
    !user?.username &&
      setError({
        name: "UnauthorizedException",
        message: "Не сте оторизиран, моля влезте с акаунта си",
      });
  }, [user]);

  const allfields = [
    {
      name: "title",
      placeholder: "Заглавие",
      type: "text",
      required: true,
    },
    {
      name: "description",
      placeholder: "Описание",
      type: data?.hidedescription ? "hidden" : "textarea",
    },

    {
      name: "upload",
      placeholder: "Картинки",
      type: "upload",
    },

    data?.fields,
    {
      name: "price",
      placeholder: "Цена",
      type: data?.hideprice ? "hidden" : "text",
      after: "лв.",
      required: data?.hideprice ? undefined : true,
    },
    {
      name: "phone",
      placeholder: "Телефон",
    },
  ]
    .flat()
    .filter(Boolean);

  //setSubmitted(true);
  //window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <Layout>
      {errorx && <Err err={errorx} />}
      <div className='fullgridcontaineritem'>
        <h1 className='text-5xl leadingtext'>{data.name}</h1>
      </div>
      <form
        onSubmit={(e) =>
          onSubmit(e).then(async (submitteddata) => {
            console.log(submitteddata);
            setSubmitted(true);

            try {
              await verifytoken(user?.sub || "");
              const input = {
                id: ulid(),
                sortID: process.env.NODE_ENV === "development" ? "ad1" : "ads", // remove this
                title: submitteddata.title?.value,
                price: submitteddata.price.value
                  ? Number(submitteddata.price.value)
                  : 0,
                condition: submitteddata.condition?.value || "USED",
                data: JSON.stringify(submitteddata),
                images:
                  submitteddata.images?.map((i: OptionalField) => i.value) ||
                  [],
                parrent: data.parrent,
                cat: data.slug,
                type: data.slug,
                query: JSON.stringify(submitteddata).replace(
                  /[{}[\]:",]/g,
                  " "
                ),
                description: submitteddata.description?.value,
              };
              console.log(input);
              // insert
              router.push(`/ads/ad/`);
            } catch (e: any) {
              console.log(e);
              setError(e.message ? e : e.errors[0]);
            }
            //

            window.scrollTo({ top: 0, behavior: "smooth" });
          })
        }
      >
        {allfields.map((x) => (
          <div key={x.name} className='my-6'>
            <FormInput inputschema={x} submitted={submitted} />
          </div>
        ))}
        <div className='flex justify-end '>
          <button
            type='submit'
            className='btn'
            disabled={errorx ? true : false}
          >
            Добави
          </button>
        </div>
      </form>
    </Layout>
  );
}

export const getServerSideProps = async ({
  query,
}: {
  query: { createid: string[] };
}) => {
  const adsData = (await loadFetchFile("adsData")) as {
    name: string;
    slug: string;
    items: { name: string; slug: string; fields: Field[] }[];
  }[];

  const data = adsData.find(
    (x) => x.slug === query.createid?.[0]
  ) as AdsDataSchema;
  const subcat = data.items.find((x: any) => x.slug === query.createid?.[1]);

  return { props: { data: subcat } };
};
export const runtime = "experimental-edge";

export default CreatefreeAd;
