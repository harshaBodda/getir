
var handlers = {
    "errorLogger" : function errorLogger(error, req, res, next) { 
        // for logging errors
        console.error(error) 
        next(error) 
    },
    "errorResponder" : function errorResponder(error, req, res, next) { 
        // responding to client
        if (error.type == 'redirect')
            res.redirect('/error')
        else if (error.type == 'time-out') 
            res.status(408).send(error)
        else if (error instanceof SyntaxError)
            res.status(400).send(error)
        else
            next(error) // forwarding exceptional case to fail-safe middleware
    },
    "failSafeHandler" : function failSafeHandler(error, req, res, next) { // generic handler
        res.status(500).send(error)
    }
}

module.exports = handlers;