# Renege

Simple Node.js library to turn a typical callback function into a native ES6 Promise.

## Installation

```bash
npm install renege
```

## Prerequisites

Be sure to run node with the `--harmony` flag specified

```
node --harmony /path/to/your/app
```

## Usage

This module exposes two methods:

### renege.create

This method accepts a range of arguments for a method that has a callback following the typical `callback(err, resultX, resultY, etc)` method signature. To call use this function, supply the `function`, `arg1`, `arg2`, etc. as arguments.

```javascript
var readPackageJsonFile = renege.create(fs.readFile, './package.json', { encoding : 'utf8' });

readPackageJsonFile.then(function (contents) {
  console.log(contents);
});
```

### renege.promisify

This method accepts a single argument that is a function with a callback. This method is useful when creating a promise where you want to have flexibility in terms of what arguments you supply when calling it.

```javascript
var readFile = renege.promisify(fs.readFile);
```

Example:

```javascript
var
  co = require('co'),
  fs = require('fs'),
  https = require('https'),
  koa = require('koa'),
  renege = require('../promise.js');


module.exports = (function () {
  'use strict';

  var
    app = koa(),
    readFile = renege.promisify(fs.readFile),
    server;

  co(function *() {
    var options = {
      cert : yield readFile('/path/to/server.crt', { encoding : 'utf8'}),
      key : yield readFile('/path/to/server.key', { encoding : 'utf8' })
    };

    server = https.createServer(options, app.callback());
  }).catch(function (err) {
    console.error(err);
  }).then(function () {
    server.listen(process.env.NODE_PORT || 8080);
    console.log('secure server started...');
  });

  return app;
}());
```
