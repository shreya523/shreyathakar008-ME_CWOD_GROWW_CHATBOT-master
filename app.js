const express = require("express");
const app = express();
const router = require("./Backend/routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { populateData } = require("./Backend/sample_data/populate_data");
const cors = require('cors');
require('events').EventEmitter.defaultMaxListeners = 15;

dotenv.config({ path: "./config.env" });
console.log(process.env.REACT_APP_FRONTEND_URL);
const corsOptions ={
  // origin: 'http://localhost:3000', 
  origin: process.env.REACT_APP_FRONTEND_URL,
  credentials:true,            //access-control-allow-credentials:true
}
app.use(cors(corsOptions));

app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DATABASE, {
  })
  .then(() => {
    console.log("Connected to Database");
  });

mongoose.connection.once("open", async () => {
  console.log("Populating DATA in DB");
  populateData(); //this function call to be used only when db clean up or refilling of data required.
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'))
}

//new added 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
