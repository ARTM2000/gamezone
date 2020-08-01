const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const gameController = require("../controllers/game.ct");

const gameRoom = new GraphQLObjectType({
  name: "gameRoom",
  fields: () => ({
    game: { type: GraphQLString },
    roomId: { type: GraphQLString },
  }),
});

const game = new GraphQLObjectType({
  name: "game",
  fields: () => ({
    name: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    id: { type: GraphQLString },
  }),
});

const createdGame = new GraphQLObjectType({
  name: "createdGame",
  fields: () => ({
    gameId: { type: GraphQLString },
    gameIndex: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getGameRooms: {
      type: new GraphQLList(gameRoom),
      args: { userId: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: (parent, args, req) => {
        const { userId } = args;
        return gameController.getGameRooms(userId);
      },
    },
    getGames: {
      type: new GraphQLList(game),
      resolve: (parent, args, req) => {
        return gameController.getGames();
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    genGame: {
      type: createdGame,
      args: {
        gameIndex: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        otherPlayers: {
          type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
        },
      },
      resolve: (parent, args, req) => {
        const { gameIndex, userId, otherPlayers } = args;
        return gameController.createGameRoom(gameIndex, userId, otherPlayers);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
