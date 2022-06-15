const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose
    .connect('mongodb+srv://lucasl1234:lucasl1234@cluster0.4351y.mongodb.net/mgmt_db?retryWrites=true&w=majority', 
    {useNewUrlParser: true});
    mongoose
    .connection
    .once('open', function(){
    console.log('Conection has been made!');
        }).on('error', function(error){
     console.log('Error is: ', error);
      });


      
//    mongooses.connect(process.env.MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB

//const password = process.argv[2]