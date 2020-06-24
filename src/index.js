const stdout = console.log;
const stderr = console.error;

const prefixes = {
  0: "FATAL",
  1: "ERROR",
  2: "WARN",
  3: "INFO",
  4: "DEBUG",
  5: "TRACE",
};

function format(level, message) {
  return `${new Date().toISOString()} [${prefixes[level]}] ${message}`;
}

function log(level, message) {
  if (filter(level)) {
    console.log(format(level, message));
  }
}

function error(level, message) {
  if (filter(level)) {
    console.error(format(level, message));
  }
}

function filter(messageLevel) {
  return messageLevel <= level;
}

exports.trace = function (message) {
  log(exports.levels.TRACE, message);
};

exports.debug = function (message) {
  log(exports.levels.DEBUG, message);
};

exports.info = function (message) {
  log(exports.levels.INFO, message);
};

exports.warn = function (message) {
  log(exports.levels.WARN, message);
};

exports.error = function (message) {
  error(exports.levels.ERROR, message);
};

exports.fatal = function (message) {
  error(exports.levels.FATAL, message);
  process.exit(1);
};

exports.levels = {
  FATAL: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
  TRACE: 5,
};

exports.setLevel = function (newLevel) {
  if (newLevel < 0 || Object.keys(exports.levels).length < newLevel) {
    error(exports.levels.ERROR, `Log level ${newLevel} is not valid`);
  } else {
    level = newLevel;
    log(exports.levels.INFO, "Updated log level");
  }
};

exports.getLevel = function () {
  return level;
};

let level = exports.levels.INFO;
