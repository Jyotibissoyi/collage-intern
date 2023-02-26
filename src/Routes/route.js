const express = require('express');
const router = express.Router();
const collegeController = require('../Controller/CollegeController.js');
const internController = require('../Controller/InternController.js');


router.post('/functionup/interns', internController.createIntern);

router.post('/functionup/colleges', collegeController.createCollege);

router.get('/functionup/collegeDetails', collegeController.getCollegeDetails);


module.exports = router