import {User, Email} from '../models/user.model.js'
import createError from 'http-errors'
import {createToken} from '../util/jwt.js'

let cookieOptions = {
    
    secure:true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 3_600_000 * 24
}

/* -------------------------------------------------------------------------- */
/*                                   SIGNUP                                   */
/* -------------------------------------------------------------------------- */

export const signup = async(req, res, next) =>{
    const { firstName, lastName, email, password, registration_date} = req.body
    let { role } = req.body
    try {

        if(!role){
            role = 'host'
        }
        const newUser = await User.create({
          
            firstName,
            lastName,
            email,
            password,
            registration_date,
            role
            
        })

        const token = await createToken({
            userid: newUser._id, userrole: newUser.role
        }, process.env.JWT_SECRET)

        if(process.NODE_ENV === "development"){
            cookieOptions.secure = true;
        }
        res.cookie("token", token, cookieOptions)

        newUser.password = undefined;

        res.status(201).json({
            message: "Signup successfully!",
            newUser
        })
        
    } catch (error) {
        next(error)
    }
}
/* -------------------------------------------------------------------------- */
/*                                   SIGNIN                                   */
/* -------------------------------------------------------------------------- */
export const signin = async (req, res, next) => {
    console.log('signin controller')
    try {
     const {email, password} = req.body;

        const user = await User.findOne({email});

        
        

            if(!user || !(await user.authenticate(password))){
                throw  createError(401, "Wrong email or password!")
            }

            const token = await createToken({
                userid: user._id, userrole: user.role
            }, process.env.JWT_SECRET)
    
            if(process.NODE_ENV === "development"){
                cookieOptions.secure = true;
            }
            res.cookie("access_token", token, cookieOptions)

            

          user.password = undefined;

        res.status(200).json({
            message: "You logged in successfully!",
            user
        });
    } catch (error) {
        next(error)
        
    }
}

/* -------------------------------------------------------------------------- */
/*                                  SUBSCRIBE                                 */
/* -------------------------------------------------------------------------- */

export const subscribe = async (req, res, next) => {
    try {
      const { email } = req.body;

      // Check if email is already subscribed
      const existingEmail = await Email.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already subscribed. Please use a different email.' });
      }

      // Create a new email subscription
      const newEmail = new Email({ email });
      await newEmail.save();

      res.status(200).json({ message: 'Email list subscription successful!' });
    } catch (error) {
      next(error);
    }
  }
