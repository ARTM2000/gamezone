const dbUser = process.env.DB_USER || "artm";
const dbPassword = process.env.DB_PASSWORD || "aEDHGgaYFAIYlvci";
const dbName = process.env.DB_NAME || "chatsInit";

module.exports = {
  db: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-k82f8.mongodb.net/${dbName}?retryWrites=true&w=majority`,
};