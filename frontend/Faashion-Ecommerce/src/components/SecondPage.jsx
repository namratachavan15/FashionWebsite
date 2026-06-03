import React from 'react'
import ShopPage from './ShopPage'
import ShopPageHeader from './ShoppageStart'
import Collection from './Collection'
import Collection2 from './Collection2'
import Collection3 from './Collection3'
import LoadMoreSection from './LoadMoreSection'
import SocialBar from './SocialBar'
import Footer from './Footer'
import Footer2 from './Footer2'

function SecondPage() {
  return (
    <div>
        <ShopPage/>
    <ShopPageHeader/>
    <Collection/>
    <Collection2/>
    <Collection3/>
    <LoadMoreSection/>
    <SocialBar/>
    <Footer/>
    <Footer2/>
      
    </div>
  )
}

export default SecondPage
