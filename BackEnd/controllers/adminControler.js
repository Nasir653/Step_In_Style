const cloudinary = require("cloudinary").v2
const Products = require("../models/products");


const CreateProducts = async (req, res) => {

    try {

        const { title, details, price, category } = req.body;

        


        

        const upload = await cloudinary.uploader.upload(req.file.path, {
            folder: "pp",
        });




        const creates = await Products({
            title: title,
            details: details,
            price: price,
            category : category,
            imageUrl: upload.secure_url

        });

        console.log(creates);


        if (!creates) {
            return res.status(400).json({ message: "SomeThing went wrong ! Try After Sometime" });

        }

        creates.save();

        return res
          .status(200)
          .json({ message: "Product Created  Succesfully", payload: creates });

 
    } catch (error) {

        res.json({ message: 'Server Error' });
        console.log("server Error");

    }


}

const getNewCollection = async (req, res) => {


    try {

        const getData = await Products.find();

        if (getData) {
            res.status(200).json({getData })
        }
 





    } catch (error) {
        console.log(error);


    }




}



     module.exports = { CreateProducts, getNewCollection }