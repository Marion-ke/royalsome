import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { errorHandler } from "../Utils/error.js";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.PASSWORD,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("nodemailer activated");
  }
});

const sendOrder = async ({ client }, res) => {
  try {
    const mailOptions = {
      to: process.env.AUTH_MAIL,
      from: client.email,
      subject: `New message!`,
      html: `<h1>${client.orderTitle}</h1>
      <h3>Email: ${client.email}</h3>
      <h3>Phone number: ${client.number}</h3>
      <h2>Hello my name is ${client.firstname} ${client.secondname} and the following is my order:</h2>
      <p>insurance cover: ${client.insurance}</p>
      <p>${client.description}</p>
      `,
    };
    transporter.sendMail(mailOptions).then(console.log("email sent"));
  } catch (err) {
    console.log(err.message);
  }
};

const sendEmail = async (req, res, next) => {
  const client = req.body;
  if (
    !client.email ||
    !client.number ||
    !client.insurance ||
    !client.orderTitle ||
    !client.firstname ||
    !client.secondname
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    await sendOrder(client);
  } catch (error) {
    console.log(error.message);
  }
};
