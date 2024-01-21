import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const jwtMiddleware = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        console.log('there is no token');
        return next();
    }

    try {
        console.log('there is token');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = {
            _id: decoded._id,
            userPhoneNumber: decoded.userPhoneNumber,
        };
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
            const randomId = uuidv4();
            const token = jwt.sign(
                {
                    _id: randomId,
                    userPhoneNumber: decoded.userPhoneNumber,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '7d',
                },
            );
            res.cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                httpOnly: true,
            });
        }
        return next();
    } catch (e) {
        console.log('jwt error');
        return next();
    }
};

export default jwtMiddleware;
