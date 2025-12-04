const winston = require('winston');
const path = require('path');

// Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}] → ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname, '/../../app.log') }),
  ],
});

// Get caller info
function getCallerInfo() {
  const stack = new Error().stack.split('\n');

  for (let i = 2; i < stack.length; i++) {
    const line = stack[i];

    if (!line.includes(path.basename(__filename))) {
      const match =
        line.match(/\((.*):(\d+):(\d+)\)/) ||
        line.match(/at (.*):(\d+):(\d+)/);
      if (match) {
        return { file: path.basename(match[1]), line: match[2] };
      }
    }
  }
  return { file: 'unknown', line: '0' };
}

// Universal log function
function log(level, data) {
  if (typeof data === 'object') {
    try {
      data = JSON.stringify(data, null, 2);
    } catch {
      data = String(data);
    }
  }

  const caller = getCallerInfo();
  const messageWithCaller = `(${caller.file}:${caller.line}) → ${data}`;
  logger.log(level, messageWithCaller);
}

// Shortcuts
log.info = (data) => log('info', data);
log.error = (data) => log('error', data);
log.warn = (data) => log('warn', data);
log.debug = (data) => log('debug', data);

module.exports = log;
