const { template } = require('../../models')

exports.getTemplate = async (req, res) => {
    try {
    const { id } = req.params
  
      let data = await template.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      })

      data = JSON.parse(JSON.stringify(data));

      data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
      }
  
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

exports.getTemplates = async (req, res) => {
    try {
  
      let data = await template.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      })

      data = JSON.parse(JSON.stringify(data))

      data = data.map((item) => {
        return { ...item, image: process.env.PATH_FILE + item.image };
      })
  
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

  exports.addTemplate = async (req, res) => {
    try {
      const a = {
          title : req.body.title,
          image : req.file.filename
      }
      const data = await template.create(a)
  
      res.send({
        status: "success",
        data,
        image: process.env.PATH_FILE + data.image,
      });
    } catch (error) {
      console.log(error);
      res.status({
        status: "failed",
        message: "Server Error",
      });
    }
  }