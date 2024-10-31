import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/footer'
import Cardapio from '../../components/Cardapio/Cardapio'

const cardapio = () => {
  return (
    <div className='dark:bg-[#2E3033]"'>
      <Navbar />
      <Cardapio/>
      <Footer />
    </div>
  )
}

export default cardapio
