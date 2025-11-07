import React from 'react'
import Hero from '../Components/Hero/Hero'

import Newsletter from '../Components/Newsletter/Newsletter'
import Popular from '../Components/Popular/Popular'
import Newcollections from '../Components/Newcollections/Newcollections'
import Offers from '../Components/Offers/Offers'


import Footer from '../Components/Footer/Footer'
// import Search from '../Components/Search/Search'



const Shop = () => {
  return (
    <div>
      <Hero/>
     
      <Newsletter/>
      <Popular/>
     <Newcollections/>

     <Offers/>
      
     
     <Footer/>
     {/* <Search/> */}
    </div>
  )
}

export default Shop
