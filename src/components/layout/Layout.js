
import React from 'react'
import Header from '../header/Header'

const Layout = ({children}) => {
  return (
    <div>
       <div>
        <Header />
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Layout
