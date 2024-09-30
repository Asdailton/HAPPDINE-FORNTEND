import React from "react";
import styles from './LoginPage.module.css'
 
const LoginPage = () => {
    return(
        <div className={styles.conteiner}>
            <div className="flex justify-between w-full items-center px-[25%]">
                <div className="flex flex-col justify-evenly">
                <h1 className="text-[#FFFFFF] text-[140px] font-bold mb-[-7%]">HAPPDINE</h1>
                <h3 className="text-white text-[60px] font-semibold mt-0">
                    ADMIN
                </h3>
                </div>
                <div>
                    <button
                    className="text-[20px] text-white bg-[#2E3033] p-[15px]"
                    >BOSCH Login</button>
                </div>
            </div>
        </div>
    )
}
 
export default LoginPage;