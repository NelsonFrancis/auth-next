import nodemailer from 'nodemailer';
import UserModel from '@/models/user.model.js';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({email, emailType, userId}: any) =>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === "VERIFY"){
            await UserModel.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000} )
        }else if(emailType === "RESET"){
            await UserModel.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now()})
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "6a599981317148",
                pass: "212029d5f6174c"
            }
        });

        const mailOptions = {
            from: 'nel@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}