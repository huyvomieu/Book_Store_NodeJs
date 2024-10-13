
const Otp = require('../../models/Otp.model')
const User = require('../../models/User.model')

const generateMiddleware = require('../../../helpers/generate')
const sendEmail = require("../../../utils/sendEmails")
class OtpController {

    // [POST] /otp/sendOTP
    async sendOTP(req, res, err) {
        try {
            const email = req.body.email;
            const emailExist = await User.findOne({ email: email, deleted: false })
            if (!emailExist) {
                req.flash('danger', "Email không tồn tại trong hệ thống!")
                res.redirect('back')
                return;
            }
            const otp = generateMiddleware.generateOTP(6); // Generate a 6-digit OTP
            const newOTP = new Otp({ email, otp, expireAt: Date.now() });
            await newOTP.save();

            // Send OTP via email
            await sendEmail({
                to: email,
                subject: 'Đặt lại mật khẩu ',
                message: `<p>Mã OTP để khôi phục lại mật khẩu là: <strong>${otp}</strong>. Mã sẽ hết hạn sau 3 phút</p>`,
            });
            res.redirect(`/user/verifyPassword/?email=${email}`)
        } catch (error) {
            console.error('Error sending OTP:', error);
            res.status(500).json({ success: false, error: 'Internal server error' });
        }
    }

    // [POST] /otp/verifyOTP
    async verifyOTP(req, res, err) {
        const email = req.body.email;
        const otp = req.body.otp;
        const verify = await Otp.findOne(req.body)
        if (verify) {
            const user = await User.findOne({ email: email })
            res.cookie("tokenUser", user.tokenUser);
            res.redirect('/user/resetPassword')
        }
        else {
            req.flash('danger', "OTP không hợp lệ!")
            res.redirect('back')
        }

    }
}

module.exports = new OtpController()
