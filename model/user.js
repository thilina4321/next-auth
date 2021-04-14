import mongoose from 'mongoose'

const Schema = mongoose.Schema

const user = new Schema({
    email:{type:String},
    password:{type:String, 
        required: [true, 'Please specify the species of your pet.'],
    }
})



export default mongoose.models.user || mongoose.model('user', user)