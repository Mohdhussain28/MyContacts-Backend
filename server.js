const express = require("express");
const errorHandler = require("./middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
const dotenv = require("dotenv").config

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/contacts", require("./routes/contactRoutes.js"))
app.use("/contacts", require("./routes/userRoutes.js"))
app.use(errorHandler)



app.listen(port, () => {
    console.log(`server running on port ${port}`);
})