var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());

/* GET contracts listing. */
router
    .get('/',function(req, res) {
    	console.log("GET contracts listing");
        res.sendStatus(200);
    })

module.exports = router;

