import React from "react";
import styles from './LoginPage.module.css'

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <div className="flex justify-between w-full items-center px-[25%]">
                <div className="flex flex-col justify-evenly">
                    <h1 className="text-[#FFFFFF] text-[140px] font-bold mb-[-7%]">HAPPDINE</h1>
                    <h3 className="text-white text-[60px] font-semibold mt-0">
                        ADMIN
                    </h3>
                </div>
                <div className={styles.containerB}>
                    <button
                        className="text-[18px] text-white bg-[#2E3033] py-[15px] px-[30px] -mr-[80px]"
                    >BOSCH LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;