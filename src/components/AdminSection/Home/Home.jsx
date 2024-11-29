import React from "react";
import { Link } from 'react-router-dom';
import feedbacks from '../../../image/HomeAdmin/Feedbacks.svg';
import notificacao from '../../../image/HomeAdmin/Notificacao.svg';
import cardapio from '../../../image/HomeAdmin/Cardapio.svg';
import dashboard from '../../../image/HomeAdmin/Dashboard.svg';
import styles from './HoverButton.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    console.log(token)
    if (!token) {
      navigate('/admin/login'); // Redireciona para o login se o token não estiver presente
    }

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5173/userinfo');
        const userData = response.data;

        setUserInfo(userData);
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        setError("Erro ao buscar informações do usuário.");
      }
    };

    fetchUserInfo();
  }, [navigate]);
  return (
    <>
    <div className="flex items-center justify-center pt-[6%] gap-6">
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
          <p className="text-[34px] font-bold">Seção ADMIN</p>
        <hr className="border-t border-gray-300 dark:border-gray-600" style={{ width: '10%' }} />
    </div>
    <div className=" w-[100%] h-[70vh] lg:h-[70vh] items-center 2xl:h-[50vh] flex flex-col justify-center">
      <div className="lg:w-[80%] gap-4 h-[80%] lg:h-[60%] 2xl:h-[70%] items-center 2xl:w-[80%] flex flex-wrap justify-center lg:gap-2">

        <Link to="/admin/feedbacks" className={styles.first}>
          <div className="w-[70%] text-sm lg:w-[60%] justify-center items-center gap-4 text-center flex text-white">
            <img src={feedbacks} className="2xl:w-[12%] w-[14%] lg:w-[18%]" alt="" />
            <p className="text-[20px] font-bold">Feedbacks</p>
          </div>
        </Link>

        <Link to="/admin/notificacoes" className={styles.second}>
          <div className="flex justify-center text-sm items-center text-white gap-4 w-[80%]">
            <img src={notificacao} className="2xl:w-[9%] w-[12%] lg:w-[14%]" alt="" />
            <p className="text-[20px] font-bold">Notificações</p>
          </div>
        </Link>

        <Link to="/admin/cardapio" className={styles.third}>
          <div className="lg:w-[80%] 2xl:w-[50%] text-sm text-white justify-center items-center gap-4 text-center flex">
            <img className="2xl:w-[13%] w-[12%] lg:w-[14%]" src={cardapio} alt="" />
            <p className="text-[20px] font-bold">Cardápio</p>
          </div>
        </Link>

        <Link to="/admin/dashboard" className={styles.fourth}>
          <div className="flex text-white gap-4 text-sm justify-center items-center lg:w-[80%] 2xl:w-[80%]">
            <img src={dashboard} className="2xl:w-[10%] w-[14%] lg:w-[14%]" alt="" />
            <p className="text-[20px] font-bold">Dashboard</p>
          </div>
        </Link>

      </div>
    </div>
    </>
  );
};

export default Home;
