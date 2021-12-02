const bindBet = (games, bet) =>{
    let rate = 0;
    let game = {};
    let bets = {}
    for (let i = 0; i < games.length; i++) {
        const element = games[i]
        if (element._id === bet.game) {
            game = element;
            for(let j = 0; j < game.bets.length; j++){
                if(game.bets[j]._id === bet.bet){
                    bets = game.bets[j]
                    for(let l = 0; l < bets.question.length; l++){
                        if(bets.question[l]._id === bet.result){
                            rate = bets.question[l]
                        }
                    }
                }
            }
        }
    }
    return rate.rate
}
export default bindBet