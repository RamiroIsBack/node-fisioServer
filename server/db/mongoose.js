var mongoose = require("mongoose");

//to start mongo db locally type this in the terminal:
//ramiro@c3po:~/mongo/bin$ ./mongod --dbpath ~/mongo-data
module.exports.connectWithDBThroughMongoose = () => {
  mongoose.Promise = global.Promise;
  mongoose.set("useFindAndModify", false); //this method is gonna be deprecated
  return mongoose
    .connect(
      process.env.MONGODB_URI ||
        "mongodb://ramiro:password3@ds249503.mlab.com:49503/fisio-b-db" ||
        "mongodb://localhost:27017/Fisiob",
      { useNewUrlParser: true }
    )
    .then(() => {
      return "ok";
    })
    .catch(e => {
      return e;
    });
};
