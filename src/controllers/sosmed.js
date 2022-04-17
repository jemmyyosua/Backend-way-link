const { sosmed } = require("../../models")

exports.addSosmed = async (req, res) => {
    const data = {
        titleLink : req.body.titleLink,
        url : req.body.url,
        icon : req.file.filename,
        idLink : req.body.idLink,
    }
    console.log(data);
    try { 
        const addLinks = await sosmed.create(data)

        const dataLinks = await sosmed.findOne({
            where: {
                id: addLinks.id
            }, attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        res.status(201).send({
            status: "Success",
            message: "Success create link",
            dataLinks,
        })

    } catch (error) {
        res.status(400).send({
            status: "Failed",
            message: 'Sever error',
            error
        });
        console.log(error);
    }

}
