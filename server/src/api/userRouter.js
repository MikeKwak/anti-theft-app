import twilio from 'twilio';
import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post('/userPhoneNumber', (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        res.sendStatus(400);    //bad request
        return;
    }

    try {
        const randomId = uuidv4();
        const token = jwt.sign(
            {
                _id: randomId,
                userPhoneNumber: phoneNumber,
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
    
        console.log('phone number saved');
        res.send('user phone number saved');
    } catch (e) {
        res.status(500).send(e);    //internal server error
    }
});

router.post('/userPasscode', (req, res) => {
    const { passcode } = req.body;
    const { phoneNumber } = res.locals.user;

    //register passcode for phoneNumber

    res.send('passcode set up');
});

router.post('/alert', async (req, res) => {
    try {
        const { userPhoneNumber } = res.locals.user;
        console.log(res.locals.user)

        const client = new twilio(
            process.env.TWILIO_SID,
            process.env.TWILIO_AUTH_TOKEN,
        );

        const message = await client.messages.create({
            body: 'Hi Mike',
            from: '+14087695573', // Your Twilio number
            to: userPhoneNumber, // Recipient's phone number
        }).then(message => console.log(message));
        res.send(`SMS sent to user`);
    } catch (e) {
        console.error(e);
        res.status(500).send('Fail to send SMS');
    }
});

export default router;
