const whitelist = [
    'https://iwindy.vercel.app/, https://iwindy-server.vercel.app/',
];

module.exports = function () {
    return (req, res, next) => {
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Origin', req.header('origin'));
        // another common pattern
        // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET,OPTIONS,PATCH,DELETE,POST,PUT'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'x-authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
        );

        next();
    };
};
