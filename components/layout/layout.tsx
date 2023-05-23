import React from 'react';
import MainFooter from './mainFooter';
import MainNavigation from './mainNavigation';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <MainNavigation />
        <main className='flex-1 flex flex-col p-8 main-container'>
          {props.children}
        </main>
      </div>
      <MainFooter />
    </>
  );
};

export default Layout;
