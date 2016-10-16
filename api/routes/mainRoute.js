var mysql = require("mysql"),
    bcrypt = require("bcrypt-nodejs"),
    Sequelize = require('sequelize');

module.exports = function(router, connection) {
    /*
     Model for ORM
     */
    //var users = require('../../models/users')(connection, Sequelize);


    /**
     * @api {post} /signin User Connection
     * @apiName Signin
     * @apiGroup User
     *
     * @apiParam {String} login Users login.
     * @apiParam {String} password Users password.
     *
     * @apiSuccess {Number} id User id.
     * @apiSuccess {String} login  Login of the User.
     * @apiSuccess {String} email  Email of the User.
     * @apiSuccess {String} password  Password Hash of the User.
     */
    router.route("/signin")
        .post(function(req, res) {
            var login = req.body.login,
                password = req.body.password;

            if(!login || !password ) {
                res.status(401).send({
                    "success": false,
                    "error": "Login and Password are required"
                });
            } else {
                users.findOne({
                    where: {
                        login: login
                    }
                }).then(function (user) {

                    if (user != null) {

                        if(!bcrypt.compareSync(password, user.get('password'))) {
                            res.status(401).send({
                                "success": false,
                                "error": "Unauthorized : Password is incorrect"
                            });
                        } else {
                            res.status(200).send({
                                "success": true,
                                "data": user
                            })
                        }
                    } else {
                        res.status(401).send({
                            "success": false,
                            "error": "Unauthorized : User not found"
                        });
                    }


                });
            }

        });
};