var express = require('express');
var request = require('request');
var https = require('https');
var router = express.Router();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var URI = "https://efacil--tst1.custhelp.com/services/rest/connect/v1.3/contacts/";
var credentials = {
    user: "moatez.abdallah",
    password: "M0At3s@#Projetas"
};

router.get('/name/:name', function(req, res, next) {
    request({
        url: URI ,
        strictSSL: false,
        auth: credentials
    }, function (err, r, body) {
        if (err) {
            console.dir(err);
            return
        }
        var response = [];
        for(var i = 0; i < JSON.parse(body).items.length; i++){
            if(JSON.parse(body).items[i].lookupName.indexOf(req.params.name) !== -1){
                response.push({ "name" : JSON.parse(body).items[i].lookupName, "id" : JSON.parse(body).items[i].id});
            }
        }
        res.send(response);
    })
});

router.get('/id/:id', function(req, res, next) {
    request({
        url: URI + req.params.id ,
        strictSSL: false,
        auth: credentials
    }, function (err, r, body) {
        if (err) {
            console.dir(err);
            return
        }
        res.send(body);
    })
});

module.exports = router;
