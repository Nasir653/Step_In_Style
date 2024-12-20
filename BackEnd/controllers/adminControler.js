const cloudinary = require("cloudinary").v2;
const Products = require("../models/products");

const CreateProducts = async (req, res) => {
  try {
    const { title, details, price, category, type } = req.body;

    console.log(type);

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "pp",
    });

    const creates = await Products({
      title: capitalize(title),
      details: capitalize(details),
      price: price,
      category: capitalize(category),
      imageUrl: upload.secure_url,
      type: capitalize(type),
    });

    if (!creates) {
      return res
        .status(400)
        .json({ message: "SomeThing went wrong ! Try After Sometime" });
    }

    creates.save();

    return res
      .status(200)
      .json({ message: "Product Created  Succesfully", payload: creates });
  } catch (error) {
    res.json({ message: "Server Error" });
    console.log(error);
  }
};

const getNewCollection = async (req, res) => {
  try {
    const getData = await Products.find();

    if (getData) {
      res.status(200).json({ getData });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CreateProducts, getNewCollection };
