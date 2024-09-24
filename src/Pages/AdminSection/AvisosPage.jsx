import React from "react";
import Navbar from "../../components/AdminSection/Navbar/Navbar";
import HomeAvisos from "../../components/AdminSection/Avisos/HomeAvisos";
import Footer from "../../components/Footer/footer";


const AvisosPage = () =>{
    return(
        <div>
            <Navbar/>
            <HomeAvisos/>
            <Footer/>
        </div>
    )
}

export default AvisosPage
