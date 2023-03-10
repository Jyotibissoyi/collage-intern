const collegeModel = require('../Models/CollegeModel.js');
const internModel = require('../Models/InternModel.js');

const { checkName, checkUrl, validValue, strLower } = require('../Validator/valid.js');


//>-----------------------------CREATE-COLLEGE API--------------------------------<

const createCollege = async (req, res) => {

    try {
        const { name, fullName, logoLink } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please Enter details In Body๐๐๐" });
        }

        if (!validValue(name)) {
            return res.status(400).send({ status: false, message: 'Please Enter College Name๐๐๐' });
        }
        if (!checkName(name)) {
            return res.status(400).send({ status: false, message: 'Please Enter A Valid College Name๐๐๐!' });
        }
        if (!validValue(fullName)) {
            return res.status(400).send({ status: false, message: 'Please Enter College FullName๐๐๐' });
        }
        if (!checkName(fullName)) {
            return res.status(400).send({ status: false, message: 'Please Enter A Valid College FullName๐๐๐!' });
        }
        if (!validValue(logoLink)) {
            return res.status(400).send({ status: false, message: 'Please Enter College Logolink๐๐๐' });
        }
        // if (!checkUrl(logoLink)) {
        //     return res.status(400).send({ status: false, message: 'Please Enter A Valid Logolink๐๐๐!' });
        // }
        // //if (!strLower(name) || !strLower(fullName)) {
        // return res.status(400).send({ status: false, message: 'Please Enter In LowerCase Only๐๐๐' });
        // //}

        const nameExist = await collegeModel.findOne({ $or: [{ name: name }, { fullName: fullName }] })

        if (nameExist) {
            return res.status(400).send({ status: false, message: 'College Name Already Exist๐คฆโโ๏ธ๐คฆ!' });
        }

        const LogoExist = await collegeModel.findOne({ logoLink: logoLink })

        if (LogoExist) {
            return res.status(400).send({ status: false, message: 'Logo URL Already Exist๐คฆโโ๏ธ๐คฆ!' });
        }

        const college = await collegeModel.create(req.body)

        const getCollege = await collegeModel.findOne(college).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })

        return res.status(201).send({ status: true, data: getCollege });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


//>--------------------------GET-COLLEGE-DETAILS-API-----------------------------<

const getCollegeDetails = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {

        const { collegeName } = req.query

        if (!validValue(collegeName)) {
            return res.status(400).send({ status: false, message: 'Please Enter CollegeName๐๐๐' });
        }

        // if (!strLower(collegeName)) {
        //     return res.status(400).send({ status: false, message: 'Please Enter CollegeName In LowerCase Only๐๐๐' });
        // }

        const getCollege = await collegeModel.findOne(collegeName)
            .select({ _id: 1, name: 1, fullName: 1, logoLink: 1 })

        if (!getCollege) {
            return res.status(400).send({ status: false, message: 'CollegeName Does Not Exist๐๐๐' });
        }

        const getInterns = await internModel.find({ collegeId: getCollege._id })
            .select({ name: 1, email: 1, mobile: 1, _id: 1 })

        const details = {
            name: getCollege.name,
            fullName: getCollege.fullName,
            logoLink: getCollege.logoLink,
            interns: getInterns
       }
        if (getInterns.length == 0) {
            return res.status(200).send({ getCollege: getCollege, interns: [{ msg: "intern details not found ๐๐๐" }] })
        }
        else return res.status(200).send({ status: true, data: details });
       
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createCollege, getCollegeDetails }

