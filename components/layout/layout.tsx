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
      <MainNavigation />
      <main className={styles.main}>{props.children}</main>
      <MainFooter />
    </>
  );
};

export default Layout;
