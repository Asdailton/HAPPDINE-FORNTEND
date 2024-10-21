import React from "react";
import Navbar from "../../components/AdminSection/Navbar/Navbar";
import Home from "../../components/AdminSection/Home/Home";
import Footer from "../../components/Footer/footer";
const HomeAdminPage = () => {
    return(
        <div>
            <Navbar/>
            <Home/>
            <Footer/>
        </div>
    )
}

export default  HomeAdminPage