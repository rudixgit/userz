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
      href={`/news/i/${slugify(title)}/${uid}`}
      passHref
      className="newswrap"
    >
      <div className="flex items-center">

        <div className="flex items-center justify-center relative">

          {image && (
            <img
              alt={title}
              src={`/api/news/${id}.png`}
              loading="lazy"
            />
          )}
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="" width={120} height={180} style={{ width: 120, height: 180 }} className="bg-gradient-to-t from-gray-900 to-transparent pl-2 text-xs h-full   absolute left-0" />
          <div className="absolute flex items-end left-0 text-xs p-2" style={{ width: 120, height: 180 }}>
            {date && (
              <TimeAgo
                date={new Date(date).toISOString()}
                formatter={formatter}
              />
            )}</div>
          <h3 className="px-2 font-bold text-slate-300 dark:text-gray-800">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  </article>
);

export default NewsThumbnail;
