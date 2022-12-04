module.exports = function () {
    return (req, res, next) => {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader(
            'Access-Control-Allow-Origin',
            'https://iwindy.vercel.app/'
        );
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET,OPTIONS,PATCH,DELETE,POST,PUT'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );

        next();
    };
};
