import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());

dotenv.config();

const whiteList = [process.env.CLIENT_URL];

const corsConfig = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Cors error"));
    }
  },
};

app.use(cors(corsConfig));

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
