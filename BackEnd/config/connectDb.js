const mongoose = require("mongoose");

const connDb = async () => {
  try {
    //const URL = "mongodb+srv://m_aadi02:Hatmulla12@mydatabase.wtzv7.mongodb.net/?retryWrites=true&w=majority&appName=MyDataBase";
    const URL = process.env.ConnectionString;
    await mongoose.connect(URL);
    console.log("Database Connected");
  } catch (error) {
    console.error("Database is Not Connecting " + error);
  }
};

module.exports = connDb;
