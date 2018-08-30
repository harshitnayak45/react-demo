const Register = require('../model/user-info.vo');
const Password = require('../model/user-pass.vo');
const bcrypt = require('bcrypt-nodejs');
const query = require('../pg-connect'); 

/* *******************************User Registration************************************* */
/* exports.addUpdateUser = (req, res, next) => {
    const reqObj = _setReqData(req);
    if (req.body._id) {
        Register.findByIdAndUpdate(req.body._id, reqObj, { new: true })
            .then(data => {
                res.status(201).json({
                    message: 'Data Updated successfully',
                    success: true
                });
            }).catch(err => {
                console.log(err);
            });
    }
    else {
        Register.findOne({ email: req.body.email })
            .then(data => {
                if (data) {
                    res.status(201).json({
                        message: "User already registerd try with another email",
                        success: false
                    });
                } else {
                    console.log('init ');
                    pg.Client.query('INSERT INTO inventory (fName, lName) VALUES ("vinay", "Patidar")', (err, res) => {
                        if (result) {
                            console.log(res);
                            res.status(201).json({
                                res: result
                            });
                        }
                        if (err) {
                            console.log(err);
                            res.status(201).json({
                                res: err
                            });
                        }
                    });
                    const user = new Register(reqObj);
                    user.save()
                        .then(data => {
                            const reqPass = _setPass(req, user);
                            _savePass(reqPass, res);
                        }).catch(err => {
                            console.log(err);
                        });
                }
            }).catch(err => {
                res.status(400).json({
                    message: err,
                });
            })
    }
} */

/* ****************************Get all registered user**************************** */
/* exports.getAllregisterUser = (req, res, next) => {
    Register.find({}, (err, users) => {
        res.status(200).json({
            message: 'all registerd users',
            success: true,
            body: users
        });
    });
}
 */
/* ****************************delete all registered user**************************** */
exports.deleteAllregisterUser = (req, res, next) => {
    Register.remove({}, (err, users) => {
        Password.remove({}, (err, pass) => {
            res.status(200).json({
                message: 'deleted all successfully',
                success: true,
            });
        });
    });
}

/* ****************************Add User PostGrase**************************** */
exports.addUser = (req, res, next) => {
    _checkForAlreadyRegistered(req.body.email)
        .then(data => {
            if (!data) {
                console.log('xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxx registration init');
                const sql = 'INSERT INTO users (fName, lName, email, cell, role, address, address2, city, state, zip, username,created) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id';
                const data = _setReqData(req);
                query(sql, data)
                    .then(result => {
                        console.log(result);
                        _savePass(req, res);
                    }).catch(err => {
                        console.log(err);
                    });
            } else {
                res.status(201).json({
                    message: 'User already registered',
                    success: false
                });
            }
        }).catch(err => {
            console.log(err);
        });

}

/* ****************************Get All User PostGrase**************************** */
exports.getAllUser = (req, res, next) => {
    console.log('xxxxxxxxxxxxx xxxxxxxxxxx get all init');
    const sql = 'SELECT * FROM salesforce.account';     
    query(sql)
        .then(data => {
            console.log(data);
            res.status(200).json({
                message: 'all registerd users',
                success: true,
                body: data.rows
            });

        }).catch(err => {
            console.log(err);
        });
}



/* ****************************Private functions**************************** */
function _setReqData(req) {
    const reqObj = [
        req.body.fName,
        req.body.lName,
        req.body.email,
        req.body.cell,
        req.body.role,
        req.body.address,
        req.body.address2,
        req.body.city,
        req.body.state,
        req.body.zip,
        req.body.username,
        new Date()
    ]
    return reqObj;
}

function _setPass(req) {
    let hash = bcrypt.hashSync(req.body.pass);
    const reqObj = [
        hash,
        req.body.email,
    ];
    return reqObj;
}

function _savePass(req, res) {
    const sql = 'INSERT INTO access (pass, email) VALUES ($1, $2)';
    const passData = _setPass(req);

    query(sql, passData)
        .then(data => {
            res.status(201).json({
                message: 'Data added successfully',
                success: true
            });

        }).catch(err => {
            console.log(err);
        });
}

function _checkForAlreadyRegistered(email) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * from access WHERE email = " + "'" + email + "'";
        console.log(sql);
        query(sql)
            .then(data => {
                console.log('xxx xxxx xxxxx data is ' + data.rowCount);
                if (data.rowCount != 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });

}
