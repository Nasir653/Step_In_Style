const jwt = require("jsonwebtoken");


const verifyUSer = async (req, res) => {

    try {



        const { token } = req.params;
        console.log(token);


        const secretKey = "secretKeyForLogin"

        jwt.verify(token, secretKey, (reject, resolve) => {


            if (reject) {
                return res.json({ message: "UnAuthorized Person" })

            }

            else {
                res.status(200).json({ message: "User Verified" });
            }


        });



    } catch (error) {

        console.log("server Error");
        res.status(500).json({ message: "server side Error" })

    }


}

module.exports = verifyUSer;