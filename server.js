import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import DataBase from "./config/connectDatabase.js";
import User from "./models/userModel.js";
import Followers from "./models/followersModel.js";
import Post from "./models/postModel.js";
import Like from "./models/likesModel.js";
import Comment from "./models/commentModel.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);

User.hasMany(Followers);
Followers.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);

Like.belongsTo(Post);
Post.hasMany(Like);
Like.belongsTo(User);

Comment.belongsTo(Post);
Post.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(User);

const runServer = async () => {
  const db = await DataBase.sync();
  const server = app.listen(process.env.PORT || 3000);
  console.log(
    `server ${server._connectionKey} is connected to database ${db.config.database} from ${db.config.host}`
  );
};

runServer();
