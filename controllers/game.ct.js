const User = require("../models/user.model");

const GAMES = [
    {
        name: "Dooz - TicTacToa",
        imageUrl: "",
        id: "1"
    },
];

exports.getGames = () => GAMES;

exports.getGameRooms = async (userId) => {
    const errors = []
    let user;
    try {
        user = await User.findOne({ _id: userId });
    } catch (err) {
        errors.push({status: 404, msg: "This user does not exist", err });
        return errors;
    }
    if (!user) {
        errors.push({ status: 404, msg: "This user does not exist"});
        return errors;
    } else {
        return user.gameRooms;
    }
}

exports.createGameRoom = async (gameIndex, userId, otherPlayers) => {
    /* here should work on 
        1.generating game room base on its models that define by `gameIndex`
        2.adding created room to all users belong to it
    */

    //for demo before development starts
    return {
        gameId: "some game room id",
        gameIndex: "1"
    }
}