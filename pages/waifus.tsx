import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import styles from '../styles/Waifus.module.scss';
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
    <div className={styles.container}>
      <div className={styles.imageControls}>
        <button
          type='button'
          className={styles.button}
          onClick={prevWaifuImage}
        >
          Prev
        </button>
        <button type='button' className={styles.button} onClick={newWaifuImage}>
          New
        </button>
        <button
          type='button'
          className={styles.button}
          onClick={nextWaifuImage}
        >
          Next
        </button>
      </div>

      <div className={styles.imageContainer}>
        {waifuImageUrlHistory.length > 0 && currentImageIndex >= 0 ? (
          <Image
            src={waifuImageUrlHistory[currentImageIndex]}
            alt='waifu image'
            layout='fill'
            objectFit='contain'
          ></Image>
        ) : null}
      </div>

      <div className={styles.apiInfo}>
        <h2>Used API</h2>
        <Link href='https://waifu.pics/docs'>waifu.pics</Link>
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
