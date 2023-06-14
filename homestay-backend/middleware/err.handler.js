export const noRoute = async(req, res, next) => {
    const err = new Error("Route not defined.")
    err.status = 404;
    next(err)
}

export const genErrHand = async(err, req, res, next) => {
    if(err){
        res.status(err.status || 500).json({
            message: err.message
        })
    }
    next();
}