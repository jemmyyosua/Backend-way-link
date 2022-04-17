const {user} = require('../../models')
const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.register = async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().max(16).required(),
  })

  const { error } = schema.validate(req.body)

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    })

  try {
    const salt = await bcrypt.genSalt(15)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const data = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
    }
    const newUser = await user.create(data)
    
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY);
    
    res.status(200).send({
      status: "success",
      data: {
        fullName: newUser.fullName,
        email: newUser.email,
        token
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })
  }
}


exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(16).required(),
  })

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body)

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    })

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      }
    })

    // compare password between entered from client and from database
    const isValid = await bcrypt.compare(req.body.password, userExist.password)

    // check if not valid then return response with status 400 (bad request)
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "credential is invalid",
        userExist,
      })
    }

    // generate token
    // const TOKEN_KEY = "karina2021"
    const token = jwt.sign({ id: userExist.id },  process.env.TOKEN_KEY)

    res.status(200).send({
      status: "success",
      data: {
      fullName : userExist.fullName,
      email : userExist.email,
      token
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    })
  }
}


exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }
  
    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          name: dataUser.name,
          email: dataUser.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
}

