const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next(); 
    }
    res.redirect('/');
};

const AuthGuardMiddleware = {
    isAuthenticated,
};

export default AuthGuardMiddleware;