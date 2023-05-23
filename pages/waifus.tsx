import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { getNewWaifuImageUrl } from '../modules/waifus/libs/api';
import Link from 'next/link';

type WaifusProps = {
  waifuImageUrl: string;
};

const Waifus: NextPage<WaifusProps> = ({ waifuImageUrl }) => {
  const [waifuImageUrlHistory, setWaifuImageUrlHistory] = useState<string[]>([
    waifuImageUrl,
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(waifuImageUrlHistory.length - 1);
  }, [waifuImageUrlHistory]);

  const newWaifuImage = () => {
    getNewWaifuImageUrl().then(url => {
      setWaifuImageUrlHistory(prevValue => [...prevValue, url]);
    });
  };

  const nextWaifuImage = () => {
    if (currentImageIndex + 1 === waifuImageUrlHistory.length) {
      return newWaifuImage();
    }
    setCurrentImageIndex(prev =>
      prev + 1 < waifuImageUrlHistory.length ? prev + 1 : prev,
    );
  };

  const prevWaifuImage = () => {
    setCurrentImageIndex(prev => (prev ? prev - 1 : prev));
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex gap-1'>
        <button
          type='button'
          className='min-w-[6rem] text-primary-light text-lg bg-background border-background border-2 rounded-2xl m-0 p-4 hover:border-background-lightextreme active:bg-background-light'
          onClick={prevWaifuImage}
        >
          Prev
        </button>
        <button
          type='button'
          className='min-w-[6rem] text-primary-light text-lg bg-background border-background border-2 rounded-2xl m-0 p-4 hover:border-background-lightextreme active:bg-background-light'
          onClick={newWaifuImage}
        >
          New
        </button>
        <button
          type='button'
          className='min-w-[6rem] text-primary-light text-lg bg-background border-background border-2 rounded-2xl m-0 p-4 hover:border-background-lightextreme active:bg-background-light'
          onClick={nextWaifuImage}
        >
          Next
        </button>
      </div>

      <div className='flex-1 flex items-center justify-center relative h-full w-full'>
        {waifuImageUrlHistory.length > 0 && currentImageIndex >= 0 ? (
          <Image
            src={waifuImageUrlHistory[currentImageIndex]}
            alt='waifu image'
            layout='fill'
            objectFit='contain'
          ></Image>
        ) : null}
      </div>

      <div className='text-center'>
        <h2 className='text-primary'>Used API</h2>
        <Link href='https://waifu.pics/docs' className='text-primary-light'>
          waifu.pics
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const waifuImageUrl = await getNewWaifuImageUrl();

  return {
    props: { waifuImageUrl },
  };
};

export default Waifus;
