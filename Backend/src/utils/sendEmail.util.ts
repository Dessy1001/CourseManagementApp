import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, text: string): Promise<void> => {
  try {

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'peyton.quitzon@ethereal.email',
        pass: 'YpFv7CmnHaKvpnmJqm'
      },
    });

    await transporter.sendMail({
      from: 'codeacademy@ethereal.email',
      to: 'peyton.quitzon@ethereal.email',
      subject: subject,
      text: text,
    });

    console.log('email sent sucessfully');
  } catch (error) {
    console.log(error, "email not sent");
  }
};