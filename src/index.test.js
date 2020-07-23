const log = require("./index");
const assert = require("assert");

const { stdout, stderr } = require("test-console");
let tests = [];

log.setLevel(log.levels.TRACE);

tests.push(function traceTest() {
  // grab fake stdout
  let inspect = stdout.inspect();

  // run function being tested
  log.trace("foo");

  // restore stdout
  inspect.restore();

  const regex = /^(.*)(\[TRACE\] foo\n$)/;

  // assert result
  return regex.test(inspect.output[0]);
});

tests.push(function debugTest() {
  // grab fake stdout
  let inspect = stdout.inspect();

  // run function being tested
  log.debug("foo");

  // restore stdout
  inspect.restore();

  const regex = /^(.*)(\[DEBUG\] foo\n$)/;

  // assert result
  return regex.test(inspect.output[0]);
});

tests.push(function infoTest() {
  // grab fake stdout
  let inspect = stdout.inspect();

  // run function being tested
  log.info("foo");

  // restore stdout
  inspect.restore();

  const regex = /^(.*)(\[INFO\] foo\n$)/;

  // assert result
  return regex.test(inspect.output[0]);
});

tests.push(function warnTest() {
  // grab fake stdout
  let inspect = stdout.inspect();

  // run function being tested
  log.warn("foo");

  // restore stdout
  inspect.restore();

  const regex = /^(.*)(\[WARN\] foo\n$)/;

  // assert result
  return regex.test(inspect.output[0]);
});

tests.push(function errorTest() {
  // grab fake stderr
  let inspect = stderr.inspect();

  // run function being tested
  log.error("foo");

  // restore stderr
  inspect.restore();

  const regex = /^(.*)(\[ERROR\] foo\n$)/;

  // assert result
  return regex.test(inspect.output[0]);
});

tests.push(function fatalTest() {
  let exited = false;

  process.exit = function () {
    exited = true;
  };

  // grab fake stderr
  let inspect = stderr.inspect();

  // run function being tested
  log.fatal("foo");

  // restore stderr
  inspect.restore();

  const regex = /^(.*)(\[FATAL\] foo\n$)/;

  // assert result
  return regex.test(inspect.output[0]) && exited;
});

tests.push(function belowMinimumLevelTest() {
  // grab fake stderr
  let inspect = stderr.inspect();

  let level = log.getLevel();

  log.setLevel(-1);

  return level == log.getLevel();
});

tests.push(function aboveMaximumLevelTest() {
  // grab fake stderr
  let inspect = stderr.inspect();

  let level = log.getLevel();

  log.setLevel(100);

  return level == log.getLevel();
});

tests.push(function levelTest() {
  // grab fake stderr
  let inspect = stdout.inspect();

  log.setLevel(log.levels.INFO);

  log.debug("foo");

  // restore stderr
  inspect.restore();

  // assert result
  if (inspect.output.length != 0) {
    return false;
  }

  log.setLevel(log.levels.DEBUG);
  inspect = stdout.inspect();

  log.debug("foo");

  inspect.restore();

  const regex = /^(.*)(\[DEBUG\] foo\n$)/;

  // assert result
  return regex.test(inspect.output[0]);
});

tests.forEach((test) => {
  console.log(`${test() ? "PASS" : "FAIL"}: ${test.name}`);
});
