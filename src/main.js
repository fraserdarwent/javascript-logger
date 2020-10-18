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

const levels = {
  FATAL: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
  TRACE: 5,
};

let level = levels.INFO;

function format(level, message) {
  return `${new Date().toISOString()} [${prefixes[level]}] ${message}`;
}

function stdOut(level, message) {
  if (filter(level)) {
    console.log(format(level, message));
  }
}

function stdErr(level, message) {
  if (filter(level)) {
    console.error(format(level, message));
  }
}

function filter(messageLevel) {
  return messageLevel <= level;
}

function trace(message) {
  stdOut(levels.TRACE, message);
}

function debug(message) {
  stdOut(levels.DEBUG, message);
}

function info(message) {
  stdOut(levels.INFO, message);
}
function warn(message) {
  stdOut(levels.WARN, message);
}

function error(message) {
  stdErr(levels.ERROR, message);
}

function fatal(message) {
  stdErr(levels.FATAL, message);
  process.exit(1);
}

function setLevel(newLevel) {
  if (newLevel < 0 || Object.keys(levels).length < newLevel) {
    error(`Log level ${newLevel} is not valid`);
  } else {
    level = newLevel;
  }
}

function getLevel() {
  return level;
}

module.exports = {
  levels: levels,
  setLevel: setLevel,
  getLevel: getLevel,
  debug: debug,
  info: info,
  warn: warn,
  error: error,
  fatal: fatal,
  trace: trace,
};
