import React from 'react'

interface MainPageProps {
    children: React.ReactNode;
}

function MainPage(props: MainPageProps) {
  return (
    <div className='
    w-full h-full
    bg-gray-200
    flex flex-col items-center
    py-4
    '>
        {props.children}
    </div>
  )
}

export default MainPage