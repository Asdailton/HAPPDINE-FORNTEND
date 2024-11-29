import React from "react";
import styles from './LoginPage.module.css';
import axios from "axios";
const LoginPage = () => {

    const fetchUserInfo = async () => {
        try {
          const response = await axios.get('http://localhost:5173/userinfo');
          const userData = response.data;
          localStorage.setItem('access_token', userData.access_token)
          console.log(userData);
  
         
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
          setError("Erro ao buscar informações do usuário.");
        }
      };
  

    // Função de login para iniciar o SSO
    const handleLogin = () => {
        window.location.href = 'http://localhost:5173/oauth2/authorization/azure'; // Redireciona para o SSO
        fetchUserInfo()
    };



    return (
        <div className={`${styles.container} min-h-screen flex items-center justify-center`}>
            <div className="flex flex-col lg:flex-row justify-between w-full items-center px-4 lg:px-[15%] 2xl:px-[20%]">
                <div className="flex flex-col justify-evenly items-center lg:items-start mb-8 lg:mb-0">
                    <h1 className="text-white text-[40px] sm:text-[60px] lg:text-[100px] 2xl:text-[140px] font-bold mb-[-5%] lg:mb-[-3%]">
                        HAPPDINE
                    </h1>
                    <h3 className="text-white text-[20px] sm:text-[30px] lg:text-[50px] 2xl:text-[60px] font-semibold mt-0">
                        ADMIN
                    </h3>
                </div>
                <div className={`${styles.containerB} w-full lg:w-auto flex justify-center`}>
                    <button onClick={handleLogin}
                        className="text-[14px] sm:text-[16px] lg:text-[18px] font-sans 2xl:text-[20px] text-white bg-[#2E3033] py-2 sm:py-3 lg:py-4 2xl:py-5 px-4 sm:px-6 lg:px-8 2xl:px-10"
                    >
                        BOSCH LOGIN
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
