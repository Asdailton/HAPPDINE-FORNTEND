import React from "react";
import { Link } from 'react-router-dom';
import feedbacks from '../../../image/HomeAdmin/Feedbacks.svg';
import notificacao from '../../../image/HomeAdmin/Notificacao.svg';
import cardapio from '../../../image/HomeAdmin/Cardapio.svg';
import dashboard from '../../../image/HomeAdmin/Dashboard.svg';
import styles from './HoverButton.module.css';

const Home = () => {
  return (
    <div className="w-[100%] h-[70vh] lg:h-[80vh] items-center 2xl:h-[57vh] flex justify-center">
      <div className="lg:w-[80%] gap-4 h-[80%] lg:h-[60%] 2xl:h-[70%] items-center 2xl:w-[80%] flex flex-wrap justify-center lg:gap-2">

        <Link to="/admin/feedbacks" className={styles.first}>
          <div className="w-[70%] text-sm lg:w-[60%] justify-center items-center gap-4 text-center flex text-white">
            <img src={feedbacks} className="2xl:w-[12%] w-[14%] lg:w-[18%]" alt="" />
            <p className="text-[20px] text-bold">Feedbacks</p>
          </div>
        </Link>

        <Link to="/admin/notificacoes" className={styles.second}>
          <div className="flex justify-center text-sm items-center text-white gap-4 w-[80%]">
            <img src={notificacao} className="2xl:w-[9%] w-[12%] lg:w-[14%]" alt="" />
            <p className="text-[20px] text-bold">Notificações</p>
          </div>
        </Link>

        <Link to="/admin/cardapio" className={styles.third}>
          <div className="lg:w-[80%] 2xl:w-[50%] text-sm text-white justify-center items-center gap-4 text-center flex">
            <img className="2xl:w-[13%] w-[12%] lg:w-[14%]" src={cardapio} alt="" />
            <p className="text-[20px] text-bold">Cardápio</p>
          </div>
        </Link>

        <Link to="/admin/dashboard" className={styles.fourth}>
          <div className="flex text-white gap-4 text-sm justify-center items-center lg:w-[80%] 2xl:w-[80%]">
            <img src={dashboard} className="2xl:w-[10%] w-[14%] lg:w-[14%]" alt="" />
            <p className="text-[20px] text-bold">Dashboard</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Home;
