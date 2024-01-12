export class errorHandler extends Error{
    constructor(message, Stats, Success){
        super(message)
        this.Stats = Stats
        this.Success = Success
    }
}
export const errs = (err, req, res, next) => {
    err.Success = err.Success || false
    err.message = err.message || "not valid"
    err.Stats = err.Stats || 404
    res.status(err.Stats).json({
        success : err.Success,
        message : err.message,
        "error to" : err.Name 
    })
}