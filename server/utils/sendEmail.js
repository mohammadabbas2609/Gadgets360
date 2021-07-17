import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config({});

const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.GOOGLE_REDIRECT_URI;
const refresh_token = process.env.GOOGLE_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);
oAuth2Client.setCredentials({ refresh_token });

const sendEmail = async function (options) {
  const acess_token = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohammadabbas2609@gmail.com",
      type: "OAuth2",
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken: refresh_token,
      accessToken: acess_token,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "Gadgets360 <noreply@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.body,
  };

  await transport.sendMail(mailOptions);
};

export default sendEmail;
