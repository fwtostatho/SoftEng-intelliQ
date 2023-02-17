const mongoose = require("mongoose");
const app = require('./app');
const fs = require("fs");
const port = process.env.SERVER_PORT || 9103;

app.listen(port, () => {
    console.log( `Server running on port ${port}`) ;
});
