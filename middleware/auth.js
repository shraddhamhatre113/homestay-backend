import jwt from "jsonwebtoken";
import { verifyToken } from  "../util/jwt.js";
import User  from "../models/user.model.js";
import createError from  "http-errors";

//middleware function to protect routes by verifying tokens
const protect = function () {
  console.log('protect middleware');
  return async (req, res, next) => {
    console.log(req.cookies.access_token);
    let token;
    try {
      //get the token from Authorization header
      const authHeader = req.headers["authorization"];
      token =
        authHeader &&
        authHeader.startsWith("Bearer") &&
        authHeader.split(" ")[1];

      //get token from the cookie
      token = req.cookies.access_token;

      if (!token) {
        throw createError(401, "Token Not Found!");
      }

      /* ----------------------- verify the token ----------------------- */
      const decoded = await verifyToken(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      next(error);
    }
  };
};

// role-based access control
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'user']
    try {
      // check if the user role is in the roles array
      if (!roles.includes(req.user.role)) {
        throw createError(
          403,
          `User role ${req.user.role} is not allowed to access this route`
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};


export default protect;