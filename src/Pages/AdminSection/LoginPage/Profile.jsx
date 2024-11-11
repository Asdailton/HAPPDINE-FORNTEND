import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (!token) {
      navigate('/'); // Redireciona para o login se o token não estiver presente
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
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userInfo ? (
        <ul>
          {userInfo.user_attributes && (
            <>
              {userInfo.user_attributes.name && (
                <li style={{ marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Name:</span> {userInfo.user_attributes.name}
                </li>
              )}
              {userInfo.user_attributes.email && (
                <li>
                  <span style={{ fontWeight: 'bold' }}>Email:</span> {userInfo.user_attributes.email}
                </li>
              )}
            </>
          )}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
