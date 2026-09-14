const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mainRouter = require("./routes/index");

if (!process.env.JWT_SECRET) {
	throw new Error("JWT_SECRET must be configured");
}


const app = express();





app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);






app.listen(3000);
