const nodemailer = require('nodemailer');

const sendMail = (subject, message, attachment, to) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'shopaholicsystem@gmail.com',
            pass: 'FYPC15426672'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: '"SHOPAHOLIC" <shopaholicsystem@gmail.com',
        to: to,
        subject: subject,
        text: message,
        attachments: attachment
    }

    transporter.sendMail(HelperOptions, (error, info) => {
        if(error) console.log(error)

        console.log("The message was sent!" + info)
    })
}

module.exports = sendMail


