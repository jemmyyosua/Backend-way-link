const { link } = require("../../models")
const uniqid = require('uniqid')

exports.addLink = async (req,res) =>{
    try {
        const uniq = uniqid()
        const data = {
            idUser: req.user.id,
            image : req.file.filename,
            title : req.body.title,
            description : req.body.description,
            uniqid : uniq,
            visit : 0,
            facebook : req.body.facebook,
            instagram : req.body.instagram,
            twitter : req.body.twitter,
            youtube : req.body.youtube,
        }

        const hasil = await link.create(data)

        res.send(
            {
                status : "success",
                hasil
            }
        )
    } catch (error) {
        console.log(error);
        res.status({
          status: "failed",
          message: "Server Error",
        })
    }

}

exports.getLinks = async(req, res) => {
    try {
        const idUser = req.user.id
        let data = await link.findAll({
            where :{
                idUser
            },
        }) 

        data = JSON.parse(JSON.stringify(data))

        data = data.map((item) => {
           return  {...item, image: process.env.PATH_FILE + item.image}
        })

        res.send({
            status : "success",
            data
        })

    } catch (error) {
        console.log(error);
        res.status({
          status: "failed",
          message: "Server Error",
        })
    }
}

exports.getLinkID = async(req, res) => {
    try {
        const {id} = req.params
        let data = await link.findOne({
            where :{
                id
            },
        }) 

        data = JSON.parse(JSON.stringify(data))
         data = {
            ...data,
            image : process.env.PATH_FILE + data.image
        }
        
        res.send({
            status : "success",
            data
        })

    } catch (error) {
        console.log(error);
        res.status({
          status: "failed",
          message: "Server Error",
        })
    }
}

exports.getLinkTitle = async(req, res) => {
    try {
        const {title} = req.params
        let data = await link.findOne({
            where :{
                title
            },
        }) 

        data = JSON.parse(JSON.stringify(data))
         data = {
            ...data,
            image : process.env.PATH_FILE + data.image
        }
        
        res.send({
            status : "success",
            data
        })

    } catch (error) {
        console.log(error);
        res.status({
          status: "failed",
          message: "Server Error",
        })
    }
}

exports.updateVisit = async (req, res) => {
    try {
      const { id } = req.params 
      let f = await link.findOne({
          where:{
              id
          }
      })

      let count = f.visit
      const updateVisitor = {
          visit : count + 1
      }

      await link.update(updateVisitor, {
          where:{
              id
          }
      });
  
      res.send({
        status: "success",
        message: "Update Visitor",
        id,
        visit : f.visit
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  }

exports.updateLink = async (req, res) => {
    try {
       const {id} = req.params

       const data = {
        title: req?.body?.title,
        description: req?.body.description,
        facebook: req?.body?.facebook,
        image: req?.file?.filename,
        facebook: req?.body?.facebook,
        twitter: req?.body?.twitter,
        instagram: req?.body?.instagram,
        youtube: req?.body?.youtube,
       }
      
       const hasil = await link.update(data ,{
            where: {
              id
            },
          })

        res.send({
            status: "success",
            message: `Update User ${id}`,
            hasil
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}

  
  exports.deleteLink = async (req, res) => {
      try {
          const { id } = req.params
  
          await link.destroy({
              where: {
                id,
              },
            })
  
          res.send({
              status: "Your link deleted"
          })
      } catch (error) {
          console.log(error)
          res.send({
              status: "failed to delete user",
              message: "Server Error",
          })
      }
  }
  