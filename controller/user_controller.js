const bcrypt = require("bcrypt");
const model = require("../models");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
require("dotenv").config();

const Home = (req, res) => {
  res.status(200).json({ message: "Home page" });
};
const Register = async (req, res) => {
  const data = req.body;
  console.log(data);

  // validating
  // if(!data.firstName || !data.lastName || !data.E_mail || !data.phone || data.password){
  // return  res.status(400).json({message : "All fields are required"})

  // }
  try {
    let result = await model.User.findOne({ where: { phone: data.phone } });

    if (result) {
      res.status(400).json({ message: "Phone number already taken" });
    } else {
      const hassedpassword = bcrypt.hashSync(data.password, 6);
      data.password = hassedpassword;
      console.log(hassedpassword);

      const addUser = await model.User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        E_mail: data.E_mail,
        phone: data.phone,
        password: data.password,
      });

      console.log(addUser);
      // res.status(201).render("home")
      const token = jwt.sign({ phone: data.phone }, process.env.JWT_TOKEN, {
        expiresIn: "2d",
      });

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      });
      // res.status(200).json({message:"Successffully registered!!!"})
      res.status(200).render("home");
      // res.json({ message: "User registered Successfully",token:token, data: data });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};

// configuring nodemailer

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.OTP_MAIL,
    pass: process.env.OTP_PASSWORD,
  },
});
const Login = async (req, res) => {
  const data = req.body;
  console.log(data);

  // Validation
  // if (!data.E_mail || !data.password) {
  //   return res.status(400).json({ message: "All fields are required!" });
  // }
  // if (!data.E_mail) {
  //   return res.status(400).json({ message: "Email field is required" });
  // }
  // if (!data.password) {
  //   return res.status(400).json({ message: "Password field is required" });
  // }

  try {
    console.log("loggggin")
    const result = await model.User.findOne({ where: { E_mail: data.E_mail } });

    if (result) {
      const isMatched = bcrypt.compareSync(data.password, result.password);
      if (isMatched) {
        // Generating OTP
        const otp = otpGenerator.generate(6, {
          upperCase: false,
          specialChars: false,
        });
        result.otp = otp;
        result.otpExpiry = Date.now() + 300000; // valid for 3 minutes
        await result.save();

        // Sending OTP
        const mailOption = {
          from: process.env.OTP_MAIL,
          to: result.E_mail,
          subject: "Your OTP Code",
          text: `Your OTP code is ${otp}`,
        };

        transporter.sendMail(mailOption, (error, info) => {
          if (error) {
            return res.status(500).send("Error sending OTP");
          }
          console.log(error);

          // Token generation and cookie setting
          const token = jwt.sign(
            { id: result.id, E_mail: result.E_mail },
            process.env.JWT_TOKEN,
            { expiresIn: "2d" }
          );
          console.log(token);

          res.cookie("jwt", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 600000),
          });

          return res.status(200).render("home");
        });
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// const VerifyOtp

const User = async (req, res) => {
  try {
    const result = await model.User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({ message: "Users Fetched!!!", data: result });
  } catch (err) {
    res.json({ message: "Internal Server Error" });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await model.User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] },
    });
    res
      .status(200)
      .json({ message: "User Fetched Successfully!!!", data: result });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(err);
  }
};
const userUpdate = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.id;
    const getUser = await model.User.findOne({ where: { id: userId } });
    if (getUser) {
      const result = await model.User.update(data, { where: { id: userId } });
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(400).json({ message: "Invalid Crendentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const userDelete = async (req, res) => {
  try {
    const userId = req.params.id;
    const getUser = await model.User.findOne({ where: { id: userId } });
    if (getUser) {
      const result = model.User.destroy({ where: { id: userId } });
      res
        .status(200)
        .json({ message: "User deleted Successfully", data: result });
    } else {
      res.status(401).json({ message: "Invalid Crendentials" });
    }
  } catch (err) {
    res.status(501).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  Home: Home,
  Register: Register,
  Login: Login,
  User: User,
  getUserById: getUserById,
  userUpdate: userUpdate,
  userDelete: userDelete,
};

// moltor error aauda banner ko name check hanne
