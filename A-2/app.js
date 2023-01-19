const express = require('express');
const app = express()
const register = require('../Assignment-2/Routes/Register');
const login = require('../Assignment-2/Routes/login')
const clone = require('../Assignment-2/Routes/clone')
const conn = require("../Assignment-2/model/connection")
conn()
const jwt = require('jsonwebtoken')



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded())
const secret = "PURU"

//middleware for jwt token check out
app.use('/app/user/post/', (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({
                    status: "failed",
                    message: err.message
                })
            }
            else {
                console.log(decoded)
                req.userID = decoded.data
                next()
            }
        })
    }

})
app.use("/app", register);
app.use("/app", login)
app.use('/app/user', clone);


app.get("/app/user", (req, res) => {
    console.log(req.body)
    res.send("ok")
})

app.listen(3000)