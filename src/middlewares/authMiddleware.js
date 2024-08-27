const prisma = require('../config/database');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];  // Remover o prefixo "Bearer "

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const user = await prisma.users.findFirst({
            where: {
                token: token,
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = authenticateToken;

module.exports = authenticateToken;
