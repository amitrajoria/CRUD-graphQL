const {Schema, model} = require("mongoose");

const userSchema = Schema({
    first_name : {type : String, required : true},
    last_name : {type : String, required : true},
    email : {type : String, required : true},
    is_verified : {type : Boolean, default : false},
    image_url : {type : String, required : true},
    description : {type : String, required : true},
}, {
    versionKey : false,
    timestamps : true
})

const UserModel = model("user", userSchema);

module.exports = {
    UserModel
}