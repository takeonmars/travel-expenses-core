const expressJwt = require('express-jwt');
const JWT1 = require('jsonwebtoken');
const config = require('../config.json');
const User = require('../models/User');

//module.exports = jwt;

//let user = null;
//let token = null;

/*exports.user = function () {
    console.log("---- _helpers/jwt.js user(): <" + user + ">");
    return user; 
}

exports.token = function () {
    console.log("---- _helpers/jwt.js token(): <" + token + ">");
    return token; 
}*/


exports.jwt = async function (req, res, next) {
    try {

        //let date_ob = new Date();
        //console.log("------- got request on " + date_ob.toISOString() );

        const secret = config.secret;
        //console.log("------- jwt.js SECRETE 3: "+ secret );
        expressJwt({ secret: secret });
        let token = req.headers.authorization.split(' ')[1];

        //console.log('------- authorization header ------');
        //console.log(req.headers.authorization);
        //console.log('-------token-------');
        //const payload = JWT1.verify(token, secret, {algorithms:["RS256","SHA256"], ignoreExpiration:true} );
        const payload = JWT1.decode(token, { algorithms: ["RS256", "SHA256", "HS256"] });

        //let token = req.user;  // das hat nicht funktioniert! GN 09.08.20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        //console.log("XXXXXXXXXXXXXXX JWT token XXXXXXXXXXXXXXX:" + JSON.stringify(payload));
        //console.log('-------user-------');
        // DB key for external ID
        userKey = payload.preferred_username;
        //console.log('-------look for user as defined by tokens claim "preferred_username" -------');
        //console.log("-------userKey=<"+userKey+">");
        let user = null;
        await User.findOne({ where: { userIdExternal: userKey } }).
            then((userDb) => {
                console.log("Find returns " + userDb);
                user = userDb;
            })
            .catch((err) => {
                console.log("Error findUser " + JSON.stringify(err));
            });
        if (!user) {
            console.log("-----user <" + userKey + "> not found. Creating new");
            await User.create({
                userIdExternal: userKey,
                username: payload.preferred_username,
                password: "empty", //bcrypt.hashSync("lucy", 10),   //password.hashCode(),
                firstname: payload.given_name,
                lastname: payload.family_name,
                isAdmin: false
            }).then(function () {
                console.log('-----Successi. User created in DB');
                //--GN--res.status(200).json({"success": "true"});
            }).catch(function (error) {
                console.log('----Error user is not created');
                res.status(500).send(error);
                return;
            });

        }

        await User.findOne({
            where: {
                userIdExternal: userKey
            }
        }).then((userDb) => {
            console.log("------ jwt set user as found in DB ----");
            console.log(JSON.stringify(userDb));
            user = userDb.toJSON();
        }).catch((err) => {
            console.log("error find User:" + JSON.stringify(err));
            res.send(500, "JWT error " + JSON.stringify(err));
            return;
        });

        console.log("------ jwt set user ----");
        console.log(JSON.stringify(user));

        req[config.auth_payload_req_access_key] = { user, token };
        next();
    } //try
    catch (err) {
        console.log("JWT " + JSON.stringify(err));
        res.send(500, "JWT error " + JSON.stringify(err));
        return;
    };

}



