import React from "react";
import Navbar from "../../components/AdminSection/Navbar/Navbar";
import Footer from "../../components/Footer/footer"
import Feedbacks from "../../components/AdminSection/Feedback/Feedback";


const FeedBackPage = () =>{
    return(
        <div>
           <Navbar/>
           <Feedbacks/>
           <Footer/>
        </div>
    )
}

export default FeedBackPage;