'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

/**
 * This designed for logging on both Nuclide client and Nuclide server. It is based on [log4js]
 * (https://www.npmjs.com/package/log4js) with the ability to lazy initialize and update config
 * after initialized.
 * To make sure we only have one instance of log4js logger initialized globally, we save the logger
 * to `global` object.
 */
import addPrepareStackTraceHook from './stacktrace';

const LOGGER_CATEGORY = 'nuclide';
const LOGGER_LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
const LOG4JS_INSTANCE_KEY = '_nuclide_log4js_logger';

var lazyLogger;

/**
 * Create the log4js logger. Note we could call this function more than once to update the config.
 * params `config` and `options` are configurations used by log4js, refer
 * https://www.npmjs.com/package/log4js#configuration for more information.
 */
function configLog4jsLogger(config: any, options: any): void {
  var log4js = require('log4js');
  log4js.configure(config, options);
  return log4js.getLogger(LOGGER_CATEGORY);
}

export function updateConfig(config: any, options: any): void {
  require('nuclide-commons').singleton.reset(
        LOG4JS_INSTANCE_KEY,
        () => configLog4jsLogger(config, options));
}

// Create a lazy logger, who won't initialize log4js logger until `lazyLogger.$level(...)` is called.
// In this way other package could depends on this upon activate without worrying initialization of
// logger taking too much time.
function createLazyLogger(): any {
  lazyLogger = {};
  var defaultConfigPromise;

  LOGGER_LEVELS.forEach((level) => {
    lazyLogger[level] = async (...args: Array<any>) => {
      if (!defaultConfigPromise) {
        defaultConfigPromise = require('./config').getDefaultConfig();
      }
      var defaultConfig = await defaultConfigPromise;
      var logger = require('nuclide-commons').singleton.get(
        LOG4JS_INSTANCE_KEY,
        () => configLog4jsLogger(defaultConfig),
      );
      logger[level].apply(logger, args);
    };
  });

  return lazyLogger;
}

export function getLogger() {
  addPrepareStackTraceHook();
  return lazyLogger ? lazyLogger : createLazyLogger();
}
