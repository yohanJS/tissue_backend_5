var express = require('express');
var routerIssues = require('../routes/issues');
var app = express();
var port = 3000;

app.use(routerIssues);


app.listen(port, (err) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`Listening on port ${port}.....`);
});