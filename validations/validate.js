import { validationResult } from "express-validator";


//validation middleware
export const validate = function (validations) {
    return async (req, res, next) => {
        console.log('validator');
        await Promise.all(validations.map(validation => validation.run(req)));

        //parse request to extract validation errors
         const errors = validationResult(req);
          
          if (errors.isEmpty()) {
            return next();
          }
      
         if (!errors.isEmpty()) {
           return res.status(400).json({
             message: "validation errors",
             errors: errors.array(),
           });
         }
    }
}