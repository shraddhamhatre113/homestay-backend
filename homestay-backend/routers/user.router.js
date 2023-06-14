import express from 'express'
import {signin, signup, subscribe} from '../controllers/users.controller.js'

const userRouter = express.Router();

userRouter.route('/signup').post(signup)

userRouter.route('/signin').post(signin)

userRouter.route('/subscribe').post(subscribe)
   


export default userRouter;