import React from 'react'
import Footer from './footer';
import Header from './header';

interface LayoutProps {
    children: React.ReactNode;
}

function Layout(props: LayoutProps): React.ReactNode {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Header/>
          {props.children}
      <Footer/>
    </div>
  )
}

export default Layout