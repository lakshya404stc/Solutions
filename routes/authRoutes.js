const express = require("express")
const authControlers = require("../controlers/authControler")
const authMiddlewares = require("../middlewares/authMiddlewares")
const routes = express.Router()
const formidable_express = require("express-formidable")

routes.post("/register",authControlers.registerControler)

routes.post("/login",authControlers.loginControler)

routes.post("/forget-password",authControlers.forgotPasswordControler)

routes.get("/user-auth",authMiddlewares.verifyToken, (req,res)=>{
    res.status(200).send({ok:true})
})

routes.get("/admin-auth",authMiddlewares.verifyToken, authMiddlewares.isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

routes.get("/getusers",authControlers.getallusers)


routes.get("/getuserphoto/:id",formidable_express(),authControlers.getuserphoto)

routes.delete('/deleteuser/:Id', authControlers.deleteuser);

routes.post("/saveuserphoto/:id",formidable_express(),authControlers.setuserphoto)


module.exports = routes