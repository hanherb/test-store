const express = require('express');
const router = express.Router();
const html = require('html');
const customer = require('../controllers/customer');

const basepath = '/test-store';

router.get(basepath + '/health-check', function(req, res) {
    res.status(200).send({"status": 200, "message": "working!"});
});

//=============== Endpoints ================

router.get(basepath + '/', function(req, res) {
    res.redirect("http://localhost:3000/table.html")
});

router.get(basepath + '/customer/get', function(req, res) {
    customer.GetCustomers(req, res)
});

router.get(basepath + '/customer/pivot', function(req, res) {
    customer.PivotCustomers(req, res)
});

module.exports = router;