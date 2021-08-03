var express = require('express');
var router = express.Router();
var issue_manager = require('../node_modules/issue-manager/issue');
var bodyParser =  require('body-parser');
var mongodb =  require('mongodb');
var mongoURL = 'mongodb+srv://yohan:iCaS3KQ3YsGOnKY5@cluster0.dr1el.mongodb.net/student?retryWrites=true&w=majority';
var db;
var ObjectId = require('mongodb').ObjectId;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

mongodb.connect(mongoURL, { useUnifiedTopology: true }, (err, database) => {
    if(err) {
        console.log('Something went wrong');
    }
    db = database.db();
    console.log('Connected to mongo...');
})
//retrieves all issues
router.get('/issues', (req, res) => {
    var issues;
    console.log('Incoming ' + req.method + ' request.....');
    db.collection('crud').find({}).toArray(function(err, result) {
        if(err) {
            console.log(err);
        };
        issues = JSON.stringify(result);
        res.send(issues);
        res.end();
    })
});
//adds an issue
router.put('/issues/issues.json', (req, res) => {
    console.log('Incoming ' + req.method + ' request......');
    db.collection('crud').insertOne(req.body, (err, result) => {
        if(err) {
            console.log(err);
        }
    });
    res.send('\nNew issue created and saved to the database.');
    res.end();
});
//updates an issue
router.post('/issues/:issue_id', (req, res) => {
    console.log('Incoming ' + req.method + ' request......');
    var issue_id = ObjectId(req.params.issue_id);
    db.collection('crud').updateOne({_id: issue_id}, {$set: req.body}, {upsert: true});
    res.send('\nIssue updated in the database.')
    res.end();
});
//deletes an issue
router.delete('/issues/:issue_id', (req, res) => {
    console.log('Incoming ' + req.method + ' request......');
    var del_issue_id  = ObjectId(req.params.issue_id);
    db.collection('crud').deleteOne({_id: del_issue_id});
    res.send('\nIssue deleted from database.')
    res.end();
});

module.exports = router;