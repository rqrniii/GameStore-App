// router
import { Link } from "react-router-dom"

export const Game = ({game}) => {

  return (
    <div className="game">
      <Link to={`/game/${game.id}`}><img src={game.thumbnail} alt="" />
      <div className="game-title">
         {game.title}
      </div>
      </Link>
    </div>          
    
  )
}