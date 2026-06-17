const  mongoose =require('mongoose');

module.exports = () =>{

    mongoose.connect('mongodb://localhost:27017/movie-api');
    mongoose.connection.on('open',() =>{

        console.log('MongoDb: Connected');
    })
    mongoose.connection.on('error',(err) =>{

        console.log('MongoDb: error',err);
    })



};
