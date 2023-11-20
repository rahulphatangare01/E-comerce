const nodeMailer = require('nodemailer');

const sendEmail = async (options) =>{
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP.SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            password: process.env.SMTP_PASSWORD
        }
    })

    const mailOPtions = {
        from:'',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendEmail(mailOPtions);
};


module.exports = sendEmail