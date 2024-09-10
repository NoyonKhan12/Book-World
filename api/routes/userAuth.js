const jwt= require("jsonwebtoken");


const authenticationToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null)
    {
        return res.status(401).json({message: "Authentication token required"});
    }

    jwt.verify(token, "bookWorld", (err, user) => {
        if(err)
        {
            return res.status(403).json({message: "Token is expired"});
        }
        req.user = user;
        next();
    } );
};

module.exports = { authenticationToken };
