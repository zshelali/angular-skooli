const express = require("express");
const cors = require("cors");
const path = require('path');
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
        app.use('/api/forums', require('./routes/forum.route'));
        app.use('/api/devoirs', require('./routes/devoir.route'));
        app.use('/api/dashboard', require('./routes/dashboard.route'));
        app.use('/api/ue', require('./routes/ue.route'));
        app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}.🗡️`);
        });
    })
    .catch(err => {
        console.error(`Failed to connect to MongoDB😢 : ${err}`);
    });
