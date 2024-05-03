const mongoose = require('mongoose');
const url = 'mongodb+srv://dbfood:mansi@cluster0.m06bpyu.mongodb.net/Go-food?retryWrites=true&w=majority&appName=Cluster0'

const main = async () => {
  
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
    
};

module.exports = main;
