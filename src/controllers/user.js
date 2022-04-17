const { user } = require("../../models")
const Joi = require("joi")

exports.getUser = async (req, res) => {
    try {
      const id = req.user.id;
  
      let data = await user.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      })

      data = JSON.parse(JSON.stringify(data))
  
      res.send({
        status: "success",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status({
        status: "failed",
        message: "Server Error",
      });
    }
  }

  exports.updateUser = async (req, res) => {
    try {

        const id = req.user.id
        const data = req.body
        const hasil = await user.update(data ,{
            where: {
              id
            },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          })

          console.log(data)
          console.log(id)

        res.send({
            status: "success",
            id,
            email : req.body.email
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}

  
  exports.deleteUser = async (req, res) => {
      try {
          const id = req.user.id
  
          await user.destroy({
              where: {
                id,
              },
            })
  
          res.send({
              status: "Your account deleted"
          })
      } catch (error) {
          console.log(error)
          res.send({
              status: "failed to delete user",
              message: "Server Error",
          })
      }
  }
  