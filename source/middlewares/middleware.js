exports.middlewareGlobal = (req, res, next) => {
    res.locals.local = 'value';
    next();
};

exports.checkCsrfError =  (err, req, res, next) => {
    if (err){
        return res.render('error');
    }

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};