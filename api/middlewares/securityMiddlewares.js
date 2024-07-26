const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const securityMiddlewares = (app) => {
  // Security middlewares
  app.use(cors({ 
    origin: "http://localhost:3000", // Frontend Origin
    credentials: true 
  }));
  app.use(cookieParser());
  app.use(express.json());
  app.use("/uploads", express.static(__dirname + "/uploads"));

  // Use Helmet to set various HTTP headers for security
  // app.use(helmet());

  // Rate limiting middleware
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
  });
  app.use(limiter);

  // Prevent HTTP Parameter Pollution
  app.use(hpp());

  // Data sanitization against NoSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());
};

module.exports = securityMiddlewares;