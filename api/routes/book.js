const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./userAuth");

router.post("/books", authenticationToken, async(req, res) => 
    {
        try
        {
            const {id} = req.headers;
            const user = await User.findById(id);
            
            if(user.role !== "admin")
            {
                return res.status(400).json({message:"You do not have access"}); 
            }

            const book = new Book({
               url: req.body.url,
               title: req.body.title,
               author: req.body.author,
               price: req.body.price,
               desc: req.body.desc,
               language: req.body.language,
               category: req.body.category,

            });
            // return res.status(200).json(book);
            
            await book.save();
            return res.status(200).json({message: "Created"});
        }
        catch(error)
        {
            res.status(500).json({message: "Internal Server Error!"})
        }
    })
    
module.exports = router;
