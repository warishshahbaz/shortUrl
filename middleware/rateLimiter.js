const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
    points: 5, // 5 requests
    duration: 60, // per minute
});

const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).json({ message: 'Too many requests, please try again later.' });
        });
};

module.exports = rateLimiterMiddleware;
