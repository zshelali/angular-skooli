const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" }); //path makes it so that node server.js works from anywhere

const { connectToMongoDB } = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

connectToMongoDB()
  .then(() => {
    app.use("/api/modules", require("./routes/module.route"));
    app.use("/api/secret", require("./routes/protected.route"));
    app.use("/api/auth", require("./routes/auth.route"));
    app.use("/api/users", require("./routes/user.route"));
    app.use("/api/ues", require("./routes/ue.route"));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}.🗡️`);
    });
  })
  .catch(err => {
    console.error(`Failed to connect to MongoDB😢 (You probably have a problem with your .env): ${err}`);
  });
