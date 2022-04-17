const express = require('express')
const path = express.Router()

const { auth } = require('../../middleware/auth')
const { uploadFile } = require('../../middleware/uploud')

// Controller Auth
  const {
   login,
   register,
   checkAuth
  } = require("../controllers/auth")

// Controller User
  const {
    getUser,
    deleteUser,
    updateUser
   } = require("../controllers/user")

// Controller Template 
  const {
    getTemplates,
    getTemplate,
    addTemplate
   } = require("../controllers/template")

// Controller Link 
const {
  getLinks,
  getLinkID,
  getLinkTitle,
  addLink,
  deleteLink,
  updateLink,
  updateVisit
 } = require("../controllers/link")

 const {
  addSosmed
 } = require("../controllers/sosmed")





// Route Auth
path.post("/register", register)
path.post("/login", login)
path.get("/check-auth", auth, checkAuth)

// Route User
path.get("/user", auth , getUser)
path.patch("/userUpdate", auth ,updateUser)
path.delete("/delete-user", auth, deleteUser)

// Route Template
path.get("/templates", auth , getTemplates)
path.get("/template/:id", auth , getTemplate)
path.post("/add-template", uploadFile("image") , addTemplate)

// Route Link
path.post("/add-link", uploadFile("image"), auth , addLink)
path.get("/links", auth , getLinks)
path.get("/linkTitle/:title", auth , getLinkTitle)
path.get("/linkID/:id", auth , getLinkID)
path.patch("/update-link/:id", uploadFile("image") ,auth, updateLink)
path.delete("/delete-link/:id", auth, deleteLink)

path.patch("/update-visit/:id", updateVisit)

// Route sosmed
path.post("/add-sosmed", uploadFile("icon") , auth , addSosmed)
module.exports = path
