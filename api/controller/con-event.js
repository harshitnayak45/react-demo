const query = require('../pg-connect');

/* ****************************Add Event PostGrase**************************** */
exports.addEvent = (req, res, next) => {
    // console.log("xxxxxxxxxxx xxxxxxx id 1 " + req.userData.id);
    console.log("xxxxxxxxxxx xxxxxxx id 1 " + req.body.usrid);

    if (req.userData.id == req.body.usrid) {
        const sql = 'INSERT INTO events (usrid, name, age, description, created) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        const reqData = _setReqData(req.body);
        query(sql, reqData)
            .then(data => {
                res.status(201).json({
                    message: "Event add successfully",
                    success: true,
                    body: req.body
                });
            }).catch(err => {
                console.log("xxxxxxxxxxxxxx xxxxxxxxxxx error is " + err);
            });

    } else {
        res.status(401).json({
            message: "Unauthorised",
            success: false,
            // body: req.body
        });
    }

}

/* ****************************Get Event By Id**************************** */
exports.getEventById = (req, res, next) => {
    if (req.userData.id == req.params.id) {
        const sql = "SELECT * FROM events WHERE usrid = " + "'" + req.userData.id + "'";
        query(sql)
            .then(data => {
                res.status(201).json({
                    message: "Events",
                    success: true,
                    body: data.rows
                });
            }).catch(err => {
                console.log("xxxxx xxxxxxxxxxxxxxxxx " + err);
            });

    } else {
        res.status(401).json({
            message: "Unauthorised",
            success: false,
        });
    }
}


/* ****************************Private functions**************************** */
function _setReqData(body) {
    const eventData = [
        body.usrid,
        body.name,
        body.age,
        body.description,
        new Date()
    ];
    return eventData;
}

