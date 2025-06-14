import rateLimit from 'express-rate-limit';

export const createRateLimiter = () => {
  return rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '900000'),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS ?? '50'), 
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later. 🚩',
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};