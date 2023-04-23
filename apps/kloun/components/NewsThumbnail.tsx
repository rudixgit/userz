import Link from 'next/link';

import bgStrings from '@/components/bg';
import { slugify } from '@/utils/formatter';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
const formatter = buildFormatter(bgStrings);
const NewsThumbnail = ({
  id,
  title,
  image,
  uid,
  date
}: {
  id: string;
  title: string;
  image?: string;
  uid: string;
  date?: string;
}) => (
  <article className="relative flex w-full grow cursor-pointer p-2 md:w-1/2 lg:w-1/3">
    <Link
      href={`/news/i/${slugify(title)}/${uid}/`}
      passHref
      className="newswrap"
    >
      <div className="flex  w-full items-center">
        <div className="absolute h-36 w-1/3  bg-gradient-to-b from-gray-900 to-transparent pl-2 text-xs">
          {date && (

            <TimeAgo
              date={new Date(date).toISOString()}
              formatter={formatter}
            />

          )}  </div>
        <div className="flex items-center justify-center">
          {image && (
            <img
              alt={title}
              src={`/api/news/${id}.png`}
              className="h-36 w-1/3 object-cover"
              loading="lazy"
            />
          )}
          <h3 className="px-2 font-bold text-slate-300 dark:text-gray-800">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  </article>
);

export default NewsThumbnail;
