import React, { useEffect } from "react"; // Adiciona o hook useEffect
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import Navbar from "../../components/AdminSection/Navbar/Navbar";
import Home from "../../components/AdminSection/Home/Home";
import Footer from "../../components/Footer/footer";

const HomeAdminPage = () => {
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate('/admin/login'); // Redireciona para o login se o token não estiver presente
    } else {
      navigate('/admin/home');
    }
  }, [navigate]); // Adiciona o hook de dependência para garantir que o efeito seja executado uma vez

  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default HomeAdminPage;
