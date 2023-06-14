import bcrypt from 'bcrypt'
import { Schema, model} from 'mongoose'


const userSchema = new Schema({
   
    firstName: {
        type: String,
        required: [true, 'First name is required.']
      
    },
    lastName:{
        type: String,
        required: [true, 'Last name is required.']

    },
    email:{
        type: String,
        required: [true, "`Email` field is required."],
        unique: [true, 'This email is already used'],
    },
    password:{
        type: String,
        required: [true, "`Password` field is required."],
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        message: "Password pattern doesn't match with the given value!"

    },
    registration_date:{
        type: Date,
        default: Date.now,
        required: false
    },
    role:{
        type: String,
        enum:["guest", "host"],
        default: "guest"
    }
})

//Email schema
const emailSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true
    }
  });


userSchema.pre('save', async function(next){
    try {
        if(!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.authenticate = async function(plainTextPass){
    return await bcrypt.compare(plainTextPass, this.password)
}

export const User = model("User", userSchema)
export const Email = model("Email", emailSchema)