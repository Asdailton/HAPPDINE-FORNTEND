import React from "react";
import Navbar from "../../components/AdminSection/Navbar/Navbar";
import CardapioHome from "../../components/AdminSection/Cardapio/Cardapio";
import Footer from "../../components/Footer/footer";
const CardapioPage = () => {
const today = new Date();

// Para obter a data no formato 'YYYY-MM-DD'
const formattedDate = today.toISOString().split('T')[0];

// Para obter o dia da semana (0 = Domingo, 1 = Segunda, etc.)
const dayOfWeek = today.getDay(); // Retorna um número entre 0 e 6

// Opcional: Para converter o número do dia da semana em uma string
const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const dayName = days[dayOfWeek];

console.log(`Data: ${formattedDate}`); // Ex: "2023-09-23"
console.log(`Dia da semana: ${dayName}`); // Ex: "Sábado"

    return(
        <div>
            <Navbar/>
            <CardapioHome/>
            <Footer/>
        </div>
      
    )
}

export default CardapioPage;