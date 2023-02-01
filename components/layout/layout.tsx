import React from 'react';
import MainFooter from './mainFooter';
import MainNavigation from './mainNavigation';

import styles from './layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <>
      <div className={styles.layoutContainer}>
        <MainNavigation />
        <main>{props.children}</main>
      </div>
      <MainFooter />
    </>
  );
};

export default Layout;
