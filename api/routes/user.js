const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./userAuth");


router.post("/signup", async(req, res) => 
{
    try
    {
        const {username, email, password, role } = req.body;

        if(username.length < 4)
        {
            return res.status(400).json({message: "Username length sould be grater than 3"})
        }

        const existingUsername = await User.findOne({username: username});

        if(existingUsername)
        {
            return res.status(400).json({message: "Username already taken"});
        }

        const existingEmail = await User.findOne({email: email});

        if(existingEmail)
        {
            return res.status(400).json({message: "Email already exists"});
        }

        if(password.length < 6)
        {
            return res.status(400).json({message: "Password length must be at least 6"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username: username,
            email : email,
            password: hashPassword,
            role: role,
        });
        // return res.status(200).json(newUser);
        
        await newUser.save();
        return res.status(200).json({message: "Created"});
    }
    catch(error)
    {
        res.status(500).json({message: "Internal Server Error!"})
    }
})


router.post("/signin", async(req, res) => {
    try
    {
        const {username, password} = req.body;

        const existingUser = await User.findOne({username});
        if(!existingUser) 
        {
            res.status(400).json({message: "Invalid Credentials"});
        }

        await bcrypt.compare(password, existingUser.password, (err, data)=>{
            if(data)
            {
                const authClaims = [ 
                    {name: existingUser.username},
                    {role: existingUser.role}
                ]
                const token = jwt.sign({authClaims}, "bookWorld", {expiresIn:"30d"});
                res.status(200).json({id: existingUser._id, role: existingUser.role, token});
            }
            else
            {
                res.status(400).json({message: "Invalid Credentials"});
            }
        })
    }
    catch(error)
    {
        res.status(500).json({message: "Internal server error"})
    }
})


router.get("/user", authenticationToken, async(req, res) => {
    try
    {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");
        return res.status(200).json(data);
    }
    catch(error)
    {
        res.status(500).json({message: "Internal server error"});
    }
})

module.exports = router;

