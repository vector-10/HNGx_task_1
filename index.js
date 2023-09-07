require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PORT = 2000 || process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}`));
