import React from "react";
import Navbar from "../../components/AdminSection/Navbar/Navbar";
import CardapioHome from "../../components/AdminSection/Cardapio/Cardapio";
import Footer from "../../components/Footer/footer";
const CardapioPage = () => {
    return(
        <div>
            <Navbar/>
            <CardapioHome/>
            <Footer/>
        </div>
      
    )
}

export default CardapioPage;