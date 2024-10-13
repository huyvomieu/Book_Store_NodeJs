const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: "autufb13@gmail.com",
            pass: "cuad xlyz uqnu zrsa",
        },
    });

    const mailOptions = {
        from: "autufb13@gmail.com",
        to: options.to,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;