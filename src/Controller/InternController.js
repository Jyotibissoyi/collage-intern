const internModel = require('../Models/InternModel.js');
const collegeModel = require('../Models/CollegeModel.js');

const { checkName, checkEmail, mobileNum, validValue } = require('../Validator/valid.js');


//>----------------------------CREATE-INTERN-API----------------------------<

const createIntern = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    try {
        const { name, email, mobile, collegeName } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please Enter Details In Bodyπππ" });
        }

        if (!validValue(name)) {
            return res.status(400).send({ status: false, message: 'Please Enter Nameπππ' });
        }
        if (!checkName(name)) {
            return res.status(400).send({ status: false, message: 'Please Enter A Valid Nameπππ!' });
        }
        if (!validValue(email)) {
            return res.status(400).send({ status: false, message: 'Please Enter Emailπππ' });
        }
        if (!checkEmail(email)) {
            return res.status(400).send({ status: false, message: 'Please Enter A valid Emailπππ!' });
        }
        if (!validValue(mobile)) {
            return res.status(400).send({ status: false, message: 'Please Enter Mobile Numberπππ' });
        }
        if (!mobileNum(mobile)) {
            return res.status(400).send({ status: false, message: 'Please Enter A valid Mobile Numberπππ!' });
        }
        if (!validValue(collegeName)) {
            return res.status(400).send({ status: false, message: 'Please Enter College Nameπππ' });
        }
        if (!checkName(collegeName)) {
            return res.status(400).send({ status: false, message: 'Please Enter A Valid College Nameπππ' });
        }

        const EmailExist = await internModel.findOne({ email: email })
        if (EmailExist) {
            return res.status(400).send({ status: false, message: 'Email Already Existπ€¦ββοΈπ€¦!' })
        }

        const mobExist = await internModel.findOne({ mobile: mobile })
        if (mobExist) {
            return res.status(400).send({ status: false, message: 'Mobile Already Existπ€¦ββοΈπ€¦ !' })
        }

        const findCollege = await collegeModel.findOne({ name: req.body.collegeName })

        if (findCollege) {
            
            req.body.collegeId = findCollege._id
            
            const createIntern = await internModel.create(req.body)

            const getIntern = await internModel.findOne(createIntern).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })

            return res.status(201).send({ status: true, data: getIntern });

        } else {
            return res.status(400).send({ status: false, msg: 'Wrong College Nameπππ' });
        }
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



module.exports.createIntern = createIntern


