import React from 'react'
import Header from './Header'
import Footer from './Footer'

const MainLayout = ({Children}) => {
    return (
    <div>
     <Header/>
     {Children}
     <Footer/>
     </div>
    );
}

export default MainLayout