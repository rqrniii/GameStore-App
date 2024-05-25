import React, { useState, useEffect } from "react";
import axios from "axios";

// components
import { Game } from "../components/Game";

export const HomePage = () => {
    const [games, setGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);

    useEffect(() => {
        const handleGameList = () => {
            const options = {
                method: 'GET',
                url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
                headers: {
                    'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_KEY}`,
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            axios.request(options).then(function(response){
                setGames(response.data);
                setFilteredGames(response.data);
            }).catch(function (error) {
                console.error(error);
            })
        }
        handleGameList();
    }, [])

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = games.filter(game => game.title.toLowerCase().includes(query));
        setFilteredGames(filtered);
    }

    return (
            <div className="container">
                <header className="App-header">
                    <div className="logo-container">
                        <img src={require('../assets/images/joystick.png')} alt="Game Store Logo" className="logo" />
                        <h2>Game Store</h2>
                    </div>
                    <form className="search-bar">
                        <input
                            type="text"
                            placeholder="    Search by game name"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </form>
                </header>
                
                {filteredGames.length === 0 ? (
                    <p>No games found</p>
                ) : (
                    filteredGames.map((game, index) => (
                        <Game
                            key={index}
                            game={game}
                        />
                    ))
                )}
            </div>
    );
}
