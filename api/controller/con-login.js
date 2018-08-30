const Register = require('../model/user-info.vo');
const Password = require('../model/user-pass.vo');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const query = require('../pg-connect');

/* ****************************Login User and Authenticate**************************** */
exports.authenticate = (req, res, next) => {
    console.log('login init');
    const sql = "SELECT * FROM access WHERE email = " + "'" + req.body.email + "'";
    query(sql)
        .then(data => {
            console.log('xxxxxxxx xxxxxxxxx ' + data.rowCount + 'xxxx ' + sql);
            if (data.rowCount != 0) {
                // console.log('xxxxxxxxx ', data);
                let isPassMatch = bcrypt.compareSync(req.body.pass, data.rows[0].pass);
                if (isPassMatch) {
                    _getToken(data)
                        .then(token => {
                            res.status(201).json({
                                message: "Login successful",
                                success: true,
                                body: token
                            });
                        }).catch(err => {
                            console.log(err);
                        });

                } else {
                    res.status(400).json({
                        message: "Wrong username or password",
                        success: false
                    });
                }

            } else {
                console.log('exit');
                res.status(400).json({
                    message: "Wrong username or password",
                    success: false
                });
            }
        }).catch(err => {

        });
    /* Register.findOne({ email: req.body.email })
        .then(data => {
            if (data) {
                Password.findOne({ usrId: data._id })
                    .then(passData => {
                        let isPassMatch = bcrypt.compareSync(req.body.pass, passData.pass);
                        if (isPassMatch) {
                            const token = _getToken(data);
                            res.status(201).json({
                                message: "Login successful",
                                success: true,
                                body: token
                            });
                        } else {
                            res.status(400).json({
                                message: "Wrong username or password",
                                success: false
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    });

            } else {
                res.status(400).json({
                    message: "Wrong username or password",
                    success: false
                });
            }

        }).catch(err => {
            console.log('xxxxxxxx xxxxxxxx xxxxxx error is ' + err);
        }) */
}

/* ****************************Private functions**************************** */
function _getToken(data) {
    const sql = "SELECT * FROM users WHERE email= " + "'" + data.rows[0].email + "'";
    return new Promise((resolve, reject) => {
        query(sql)
            .then(data => {
                console.log(data);
                const tokenData = _setDataForToken(data.rows[0]);
                const secret = "JWT_TOKEN_SECRET";
                const token = jwt.sign(tokenData, secret,
                    {
                        expiresIn: "1h"
                    });
                resolve(token);

            }).catch(err => {
                reject(err);
            });
    });
}
function _setDataForToken(data) {
    const tokenData = {
        id: data.id,
        fName: data.fName,
        lName: data.lName,
        email: data.email,
        cell: data.cell,
        role: data.role,
        address: data.address,
        city: data.city,
        state: data.state,
        zip: data.zip,
        username: data.username,
    }
    return tokenData;
}
/**
 * Make promises in node (Not called anywhere) 
 */
function _getPass(usrId) {
    return new Promise((resolve, reject) => {
        Password.findOne({ usrId: usrId })
            .then(data => {
                console.log('pass', data);
                resolve(data);
            }).catch(err => {
                reject(err);
            });
    });

}



