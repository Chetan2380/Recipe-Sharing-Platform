import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import AllRoutes from "./routes/index.js"
import session from 'express-session';
const app = express();
app.use(cookieParser());
app.use(morgan("combined"));
app.use(
  cors({
    credentials: true,
    origin: ["https://recipe-sharing-platform-sand.vercel.app"],
  })
);
dotenv.config();
app.use(express.json());

app.use(session({
  secret: 'MYSECRETKEY',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, sameSite: 'None' }
}));

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}

module.exports = allowCors(handler)


app.get("/", function (req, res) {
  res.send("working.");
});

app.use("/api/v1", AllRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected."));

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Server is running on port ${process.env.PORT_NUMBER}.`);
});