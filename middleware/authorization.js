const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decodedToken) {
            console.log(decodedToken);

            if (!err && decodedToken && decodedToken._doc.role === 'admin') {
                req.userId = decodedToken._doc._id;
                req.userRole = decodedToken._doc.role;
                next()
            } else {
                return res.status(401).json({ message: 'unauthorized admin' });
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};


const userAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decodedToken) {
            console.log(decodedToken);

            if (!err && decodedToken && decodedToken._doc.role === 'user') {
                req.userId = decodedToken._doc._id;
                req.userRole = decodedToken._doc.role;
                next()
            } else {
                return res.status(401).json({ message: 'unauthorized user' });
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};


const artisanAuth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function (err, decodedToken) {
            console.log(decodedToken);

            if (!err && decodedToken && decodedToken._doc.role === 'artisan') {
                req.userId = decodedToken._doc._id;
                req.userRole = decodedToken._doc.role;
                next()
            } else {
                return res.status(401).json({ message: 'unauthorized user' });
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};

module.exports = { adminAuth, userAuth, artisanAuth }