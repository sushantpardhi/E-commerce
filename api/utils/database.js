const { default: mongoose } = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI).then((data) => {
    console.log(`Connected to database ${data.connection.host}`);
  });
};

module.exports = connectDB;
