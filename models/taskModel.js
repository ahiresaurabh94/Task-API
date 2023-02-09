const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const taskSchema = new Schema({
    id:{type:Number ,unique: true },
    title: {type: String},
    is_completed: {type: Boolean},
})

const taskModel = mongoose.model("tasks" , taskSchema);

module.exports = taskModel