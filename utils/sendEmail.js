const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.PASSWORD

    }
});
const sendOtp = async (mail, otp) => {
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: mail,
        subject: "OTP Verification",
        text: `Your OTP is : ${otp}`
    };
    try {
        await transport.sendMail(mailOptions);
        
        console.log('OTP has been sent successfully');
    } catch (error) {
        console.log(error);

    }
};

module.exports ={ sendOtp}