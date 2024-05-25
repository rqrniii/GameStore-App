
import { useState, useEffect } from "react"
import axios from "axios"

// router
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export const GamePage = () => {

    const { gameId } = useParams();

    const [ game, setGame ] = useState([]);
	
	useEffect(() => {
		const handleGameList = () => {
			const options = {
				method: 'GET',
				url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
                params: {id: gameId},
				headers: {
					'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_KEY}`,
					'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
				}
			};
			axios.request(options).then(function(response){
				setGame(response.data);
			}).catch(function (error) {
				console.error(error);
			})
		}
		handleGameList();
	}, [ gameId ])

  return (
	<div className="container">
	<header className="App-header">
                    <div className="logo-container">
                        <img src={require('C:/Users/r.alqarni/game-app/src/joystick.png')} alt="Game Store Logo" className="logo" />
                        <h2>Game Store</h2>
                    </div>
                </header>
    <div className="game-page">
		<div className="game-img">
		<img src={game.thumbnail} alt="" />
		<div className="btn-box">
			<div className="play-btn">
				<Link to={game.freetogame_profile_url}>
					<button>Play Now</button>
				</Link>
			</div>
			<div className="wish">
				<img src={require('C:/Users/r.alqarni/game-app/src/heart.png')} alt="Add to Wishlist" />
			</div>
		</div>

		</div>
		
		<div class="game-info">
			<div class="game-text">
			<h1>{game.title}</h1>
			<h3>Game developer : {game.developer}</h3>
			<p>{game.description}</p>
			</div>
		
		<p>platform : {game.platform}</p>
		<p>release date: {game.release_date}</p>
		</div>

    </div>
	</div>
  )
}
