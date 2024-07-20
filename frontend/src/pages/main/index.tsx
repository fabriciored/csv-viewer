import React from 'react'

interface MainPageProps {
    children: React.ReactNode;
}

function MainPage(props: MainPageProps) {
  return (
    <div>
        {props.children}
    </div>
  )
}

export default MainPage