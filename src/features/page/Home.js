import React from 'react'
import ProductList from '../Products/components/ProductList'
import NavBar from '../navBar/NavBar'

const Home = () => {
  return (
    <NavBar>
        <div>
        <ProductList></ProductList>
        </div>
   
    </NavBar>
  )
}

export default Home