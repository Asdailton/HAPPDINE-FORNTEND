import { React, useEffect, useState } from 'react';
import axios from 'axios';

const Graphs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const restaurantResponse = await axios.get('http://localhost:8080/api/restaurante');
            const restaurants = restaurantResponse.data;

            if (!Array.isArray(restaurants) || restaurants.length === 0) {
                throw new Error("No restaurant data found");
            }

            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];

            const requests = restaurants.map(restaurante =>
                axios.get(`http://localhost:8080/api/votos/filter?restauranteId=${restaurante.id}&registro=${formattedDate}`)
                    .catch(error => {
                        if (error.response && error.response.status === 404) {
                            return { data: [] };
                        }
                        throw error;
                    })
            );

            const responses = await Promise.all(requests);
            const counts = responses.map(response => response.data.length);

            const barsData = restaurants.map((restaurante, index) => ({
                name: restaurante.nome,
                votes: counts[index],
                image: restaurante.imagem,
                color: restaurante.cor
            }));

            setData(barsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching chart data", error);
            setError("Error loading chart data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            fetchData();
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <div className="p-5 text-center bg-transparent">Loading...</div>;
    }

    if (error) {
        return <div className="p-5 text-center bg-transparent">{error}</div>;
    }

    const maxVotes = Math.max(...data.map(item => item.votes), 1);

    return (
        <div className="p-5 bg-transparent  flex flex-col items-start justify-center min-h-[60vh] flex-1">
     
            <div className="w-[300px] md:w-[450px] lg:[500px]xl:[530px] 2xl:w-[600px] p-2">
                {data.map((item, index) => (
                    <div key={index} className="mb-4 flex flex-col items-start">
                        <div className="font-medium text-[14px] text-white mb-1 text-left">{item.name}</div>
                        <div className="flex w-full">
                            <div className="w-full  h-[30px] bg-[#E0E2E5] relative overflow-hidden mb-1 ">
                                <div
                                    style={{
                                        width: `${(item.votes / maxVotes) * 100}%`,
                                        height: '100%',
                                        backgroundColor: item.color || 'rgba(75, 192, 192, 0.6)', // Cor de fundo da barra
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#333',
                                        fontWeight: 'bold',
                                        fontSize: '14px'
                                    }}
                                >
                                </div>
                            </div>
                            <p className='text-[#B2B9C0] text-[16px] ml-[10px]'> {item.votes} </p>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Graphs;
