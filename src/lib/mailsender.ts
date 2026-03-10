// @/lib/mailsender.ts

import nodemailer from "nodemailer";

interface MailOptions {
  email: string;
  title: string;
  body: string;
}

export const mailSender = async ({ email, title, body }: MailOptions) => {
  try {
   let transporter = nodemailer.createTransport({
     host: process.env.MAIL_HOST,
     port: 587,
     secure: false,
     auth: {
       user: process.env.MAIL_USER,
       pass: process.env.MAIL_PASS,
     },
     tls: {
       rejectUnauthorized: false, 
     },
   });


    let info = await transporter.sendMail({
      from: `"EMS" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log("Error while sending email:", error);
    return error;
  }
};
