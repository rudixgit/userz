import { shuffle } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

const AnimIndexProducts: React.FC = () => {
  const imgclass = 'w-12';
  const images = useMemo(
    () => [
      'https://eziktok.monext.pages.dev/products/1.png',
      'https://eziktok.monext.pages.dev/products/2.png',
      'https://eziktok.monext.pages.dev/products/3.png',
      'https://eziktok.monext.pages.dev/products/4.png',
      'https://eziktok.monext.pages.dev/products/5.png',
      'https://eziktok.monext.pages.dev/products/6.png',
      'https://eziktok.monext.pages.dev/products/7.png',
      'https://eziktok.monext.pages.dev/products/8.png',
      'https://eziktok.monext.pages.dev/products/9.png',
      'https://eziktok.monext.pages.dev/products/10.png',
      'https://eziktok.monext.pages.dev/products/11.png',
      'https://eziktok.monext.pages.dev/products/12.png',
      'https://eziktok.monext.pages.dev/products/13.png',
      'https://eziktok.monext.pages.dev/products/14.png',
      'https://eziktok.monext.pages.dev/products/15.png',
      'https://eziktok.monext.pages.dev/products/16.png',
      'https://eziktok.monext.pages.dev/products/17.png',
      'https://eziktok.monext.pages.dev/products/18.png',
      'https://eziktok.monext.pages.dev/products/19.png',
      'https://eziktok.monext.pages.dev/products/20.png',
      'https://eziktok.monext.pages.dev/products/21.png',
    ],
    [],
  );
  const [image1, setImage1] = useState<string>(images[0]);
  const [image2, setImage2] = useState<string>(images[1]);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = shuffle(images);
      setOpacity(1);
      setTimeout(() => setOpacity(0), 1300);
      setImage1(random[0]);
      setImage2(random[1]);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    images.map((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
      return img;
    });
  }, []);

  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='w-32 sm:w-36 md:w-44'>
        <img src='/team.png' alt='' width='600' height='406' />
      </div>
      <div
        className='flex z-20 justify-center items-center -mt-32 sm:-mt-36 md:-mt-44'
        style={{
          animation: 'rotateindex 12s linear infinite',
        }}
      >
        <div
          style={{
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <img
            className={imgclass}
            src={image1}
            style={{
              opacity,
              transition: 'opacity 3s ease-in-out',
            }}
            alt=''
          />
        </div>
        <div className='w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44' />
        <div
          style={{
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <img
            className={imgclass}
            src={image2}
            style={{
              opacity,
              transition: 'opacity 3s ease-in-out',
            }}
            alt=''
          />
        </div>
      </div>
      <div
        style={{
          transform: 'scale(0.5)',
          animation: 'zoom-in 0.5s linear forwards',
        }}
      >
        <div className='heading font-black text-5xl md:text-6xl lg:text-8xl flex m-0 p-0 bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 text-transparent bg-clip-text dark:from-gray-700 dark:to-gray-900 background-animate z-30'>
          ezikTok
        </div>
      </div>
    </div>
  );
};
export default AnimIndexProducts;
