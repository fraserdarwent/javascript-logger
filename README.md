# logger

A simple Javascript level based logging library

## Usage

### Import

```javascript
const log = require("@fraserdarwent/javascript-logger");
```

### Usage

#### Set Level

```javascript
log.setLevel(log.levels.TRACE);
```

#### Log

```javascript
log.trace("foo");
log.debug("foo");
log.info("foo");
log.warn("foo");
log.error("foo");
log.fatal("foo");
```

#### Example Output

```
2020-02-03T16:49:05.462Z [TRACE] foo
2020-02-03T16:49:05.469Z [DEBUG] foo
2020-02-03T16:49:05.469Z [INFO] foo
2020-02-03T16:49:05.469Z [WARN] foo
2020-02-03T16:49:05.469Z [ERROR] foo
2020-02-03T16:49:05.471Z [FATAL] foo
```

## Available levels

- `TRACE`: Logs to stdout
- `DEBUG`: Logs to stdout
- `INFO`: Logs to stdout **(default value)**
- `WARN`: Logs to stdout
- `ERROR`: Logs to stderr
- `FATAL`: Logs to stderr then exits process
