const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const { readdirSync } = require("fs");
const connectDB = require("./configs/db");

const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

const port = 3000;

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.use("/", (req, res) => {
    return res.send({
        status : true,
        message : `server is runding in port ${port}`
    });
});

connectDB();

app.listen(port, () => console.log(`server is runding in port ${port}`));