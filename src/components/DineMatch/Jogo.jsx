import React, { useState, useEffect } from 'react';
import axios from 'axios';
import estilos from './Jogo.module.css';
import elementos from '../../image/DineMatch/elementos.png';
import iconeRC from '../../image/DineMatch/iconRC.png';
import iconeMC from '../../image/DineMatch/iconMDC.png';
import iconeG from '../../image/DineMatch/iconGBE.png';
import iconeDBV from '../../image/DineMatch/iconDBCAV.png';
import iconeQuestion from '../../image/DineMatch/question.png'


export function Jogo() {
    const [cardapios, setCardapios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [currentPairIndex, setCurrentPairIndex] = useState(0);
    const [votes, setVotes] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [pairs, setPairs] = useState([]);

    // Buscar os cardápios do dia 
    useEffect(() => {
        async function fetchCardapios() {
            // Requisição dos 4 cardápios 
            try {
                const responses = await Promise.all([
                    axios.get('http://localhost:8081/debemcomavida/cardapios'),
                    axios.get('http://localhost:8081/modadacasa/cardapios'),
                    axios.get('http://localhost:8081/receitadochefe/cardapios'),
                    axios.get('http://localhost:8081/grillebemestar/cardapios')
                ]);

                // Data do dia para filtrar cardápios do dia atual
                const today = new Date().toISOString().split('T')[0];
                // Extrai os dados da resposta da API
                const cardapiosDoDia = responses.map(response => response.data.find(cardapio => cardapio.data === today)); 
                console.log('Resposta: ', responses)

                // Organização dos 4 opções de cardápio 
                const formatoCardapio = {
                    'De Bem com a Vida': cardapiosDoDia.find(c => c.restauranteModel.nome === 'De Bem com a Vida'),
                    'Moda da Casa': cardapiosDoDia.find(c => c.restauranteModel.nome === 'Moda da Casa'),
                    'Receita do Chefe': cardapiosDoDia.find(c => c.restauranteModel.nome === 'Receita do Chefe'),
                    'Grill e Bem Estar': cardapiosDoDia.find(c => c.restauranteModel.nome === 'Grill e Bem-Estar')
                };
    
                setCardapios(formatoCardapio);
                // Votos iniciados com 0
                setVotes(Object.keys(formatoCardapio).reduce((acc, cardapio) => ({ ...acc, [cardapio]: 0 }), {}));
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar cardápios:", error); 
                setError(error);
                setLoading(false);
            }
        }
        fetchCardapios();
    }, []);
    
    // Função para gerar pares aleatórios de opções de prato princial, guarnição e sobremesa
    const getCategoryPairs = () => {
    
        const cardapioNomes = Object.keys(cardapios);
        const pairs = [];
        const seenOptions = new Set();
        
        // Criação dos pares das categorias
        for (const categoria of ['prato_principal', 'guarnicao', 'sobremesa']) {
            // Percorre a lista de cardápios
            for (let i = 0; i < cardapioNomes.length; i++) {
                for (let j = i + 1; j < cardapioNomes.length; j++) {
                    const firstCardapio = cardapioNomes[i];
                    const secondCardapio = cardapioNomes[j];
                    
                    // Opções das categorias separadas por ', '
                    const firstOptions = cardapios[firstCardapio]?.[categoria]?.split(', ').filter(Boolean) || [];
                    const secondOptions = cardapios[secondCardapio]?.[categoria]?.split(', ').filter(Boolean) || [];

    
                    // Verifica se a categoria está vazia, se sim pular
                    if (firstOptions.length === 0 || secondOptions.length === 0) continue;
                    
                    // Seleciona uma opção aleatória de cada cardápio para formar par
                    const firstOption = firstOptions[Math.floor(Math.random() * firstOptions.length)];
                    const secondOption = secondOptions[Math.floor(Math.random() * secondOptions.length)];
                    
                    // Verifica se as 2 opções aleatórias são iguais para não ter repetição
                    if (firstOption === secondOption) {
                        // Verifica se a opção repetida já foi usada em um par
                        if (!seenOptions.has(firstOption)) {
                            // Gera um novo conjunto de opções sem a duplicata
                            const opcoesSemDuplicatas = new Set([...firstOptions, ...secondOptions].filter(op => op !== firstOption));
                            // Escolhe uma nova opção para substituir a duplicata
                            const newOption = Array.from(opcoesSemDuplicatas)[Math.floor(Math.random() * opcoesSemDuplicatas.size)];
                            
                            // Adiciona o par ao array de pares com a nova opção gerada
                            pairs.push({
                                cardapios: [firstCardapio, secondCardapio],
                                option: firstOption, // Opção repetida
                                newOption // Nova opção selecionada
                            });
                            // Marca a opção como já usada em um par
                            seenOptions.add(firstOption);
                            
                        }
                    } else {
                        // Se as opções não forem iguais, adiciona o par ao array de pares
                        pairs.push({
                            firstCardapio,
                            secondCardapio,
                            firstOption,
                            secondOption
                        });
                    }
                }
            }
        }
        return pairs;
    };
    
    useEffect(() => {
        if (cardapios) {
            const generatedPairs = getCategoryPairs(); // chama a função
            setPairs(generatedPairs); // acesso aos pares
            setCurrentPairIndex(0); // começar pelo primeiro par
        }
    }, [cardapios]);

    useEffect(() => {
        if (currentPairIndex >= pairs.length && Object.values(votes).some(vote => vote > 0)) {
            setShowResults(true); // Se todos os pares foram votados e possui votos, exibe os resultados
        }
    }, [currentPairIndex, pairs, votes]);

    // Função para atualizar os votos e avançar par
    const handleVote = (opcaoSelecionada) => {
        const cardapiosParaVotar = Object.keys(cardapios).filter(cardapio => {
            const options = Object.values(cardapios[cardapio]).flat().filter(Boolean).join(', ').split(', ');
            return options.includes(opcaoSelecionada);
        });
    
        setVotes(votosAnteriores => {
            const updatedVotes = { ...votosAnteriores };
            cardapiosParaVotar.forEach(cardapio => {
                updatedVotes[cardapio] = (updatedVotes[cardapio] || 0) + 1;
            });

            console.log('Votos atualizados:', updatedVotes);

            return updatedVotes;
        });
    
        setCurrentPairIndex(prevIndex => prevIndex + 1);
    };
    
     // Resetar os votos e os pares ao jogar novemente
    const handleRestart = () => {
        setCurrentPairIndex(0);
        setVotes(Object.keys(cardapios).reduce((acc, cardapio) => ({ ...acc, [cardapio]: 0 }), {}));
        console.log('Votos inicializados:', votes);
        setPairs(getCategoryPairs());
        setShowResults(false);
    };

    // Exibir mensagens 
    if (loading) {
        return <div className={estilos.app}>Carregando...</div>;
    }

    if (error) {
        return <div className={estilos.app}>Cardápio do dia não disponível.</div>;
    }

    // Cores de cada cardápio para exibição do resultado
    if (showResults) {
        const sortedCardapios = Object.keys(votes).sort((a, b) => votes[b] - votes[a]);
        const topCardapio = sortedCardapios[0];
        const topCardapioVotes = votes[topCardapio];

        // Verificar se há empate
        const cardapiosEmpatados = sortedCardapios.filter(cardapio => votes[cardapio] === topCardapioVotes);

        const getButtonColor = () => {
            switch (topCardapio) {
                case 'Moda da Casa':
                    return 'linear-gradient(180deg, rgba(0, 123, 192, 1) 0%, rgba(0, 123, 192, 0.81) 100%)';
                case 'De Bem com a Vida':
                    return 'linear-gradient(180deg, rgba(0, 136, 74, 1) 0%, rgba(0, 163, 88, 0.81) 100%)';
                case 'Grill e Bem Estar':
                    return 'linear-gradient(180deg, rgba(158, 40, 150, 1) 0%, rgba(158, 40, 150, 0.81) 100%)';
                case 'Receita do Chefe':
                    return 'linear-gradient(180deg, rgba(18, 129, 143, 1) 0%, rgba(18, 129, 143, 0.81) 100%)';
                default:
                    return '#F3756C'; // Cor caso não tenha resultado
            }
        };

        // Ícones de cada cardápio para exibição do resultado
        const getButtonIcon = () => {
            switch (topCardapio) {
                case 'Moda da Casa':
                    return iconeMC;
                case 'De Bem com a Vida':
                    return iconeDBV;
                case 'Grill e Bem Estar':
                    return iconeG;
                case 'Receita do Chefe':
                    return iconeRC;
                default:
                    return iconeQuestion; // caso não tenha resultado
            }
        };

        return (
            <div className={estilos.container}>
                <div>
                    <img src={elementos} className={estilos.elementos}></img>
                    <img src={elementos} className={`${estilos.elementos} ${estilos.duplicado}`}></img>
                </div>
                <div className={estilos.app}>
                    <p className={estilos.p}>O cardápio de hoje que mais combina com você é:</p>
                    <div className={estilos.options}>
                        <button className={estilos.box} style={{ background: getButtonColor() }}>
                            <div className={estilos.result}>
                                <img src={getButtonIcon()} className={estilos.imgBox}></img>
                                <p className={estilos.text_result}>
                                    {topCardapio}
                                    <br></br>
                                    <span style={{ fontSize: '22px', fontWeight: 'normal', marginTop: '5px'}}>
                                        {topCardapioVotes} votos
                                    </span>
                                </p>
                            </div>
                        </button>
                    </div>
                     {/* Exibe a mensagem se houver empate */}
                    {cardapiosEmpatados.length > 1 && (
                        <p className={estilos.p}>
                            Suas opções preferidas também podem estar nos cardápios: {cardapiosEmpatados.join(', ')}
                        </p>
                    )}
                    <p className={estilos.p}>Espero ter ajudado!</p>
                    <button className={estilos.restart} onClick={handleRestart}><p>Jogar Novamente</p></button>
                </div>
                <div>
                    <img src={elementos} className={estilos.elementos}></img>
                    <img src={elementos} className={`${estilos.elementos} ${estilos.duplicado}`}></img>
                </div>
            </div>
        );
    }

    const currentPair = pairs[currentPairIndex];

    if (!currentPair && !showResults) {
        return <div className={estilos.app}>Carregando...</div>;
    }

    return (
        <div className={estilos.container}>
            <div>
                <img src={elementos} className={estilos.elementos}></img>
                <img src={elementos} className={`${estilos.elementos} ${estilos.duplicado}`}></img>
            </div>
            <div className={estilos.app}>
                <p className={estilos.p}>Qual você prefere? Escolha um favorito e descubra qual cardápio do dia mais combina com você!</p>
                <div className={estilos.options}>
                    {currentPair.option ? (
                        <>
                            <button className={estilos.botao1} onClick={() => handleVote(currentPair.option)}>{currentPair.option}</button>
                            
                            <button className={estilos.botao2} onClick={() => handleVote(currentPair.newOption)}>{currentPair.newOption}</button>
                        </>
                    ) : (
                        <>
                            <button className={estilos.botao1} onClick={() => handleVote(currentPair.firstOption)}>{currentPair.firstOption}</button>
                            
                            <button className={estilos.botao2} onClick={() => handleVote(currentPair.secondOption)}>{currentPair.secondOption}</button>
                        </>
                    )}
                </div>
            </div>
            <div>
                <img src={elementos} className={estilos.elementos}></img>
                <img src={elementos} className={`${estilos.elementos} ${estilos.duplicado}`}></img>
            </div>
        </div>
    );
}
