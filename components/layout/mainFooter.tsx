import React from 'react';

import styles from './mainFooter.module.scss';

const MainFooter = () => {
  return (
    <footer className={styles.footer}>
      <a
        href='https://schattenbrot.com'
        target='_blank'
        rel='noopener noreferrer'
      >
        Powered by Schattenbrot
      </a>
    </footer>
  );
};

export default MainFooter;
