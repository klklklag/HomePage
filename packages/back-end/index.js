"use strict";
const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
app.get('/', (req, res) => {
    res.send("HELLO WORLD!");
});
app.listen(port, (error) => {
    if (error) {
        console.log(`Error: ${error.message}`);
    }
    else {
        console.log(`Listening on port ${port}`);
    }
});
