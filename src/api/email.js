import "dotenv/config";
import nodemailer from "nodemailer";

export const EnviarEmail = async (email, subject, conteudo) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: conteudo,
    };

    const request = await transporter.sendMail(emailOptions);

    return request;
  } catch (error) {
    console.log(error);
  }
};
