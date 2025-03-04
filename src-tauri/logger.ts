// src-tauri/logger.ts

let logger: any;

if (typeof window === "undefined") {
  // Only import 'winston' if we're on the Tauri (backend) side (Node.js environment)
  const winston = require("winston");

  // Set up winston logger with custom settings
  logger = winston.createLogger({
    level: "info", // Default level
    format: winston.format.combine(
      winston.format.timestamp(), // Include timestamp in logs
      winston.format.json()        // Format logs as JSON
    ),
    transports: [
      new winston.transports.Console({ format: winston.format.simple() }),  // Log to console
      new winston.transports.File({ filename: "app.log" })                  // Save logs to a file
    ]
  });
}

export default logger;
