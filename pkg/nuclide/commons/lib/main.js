'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

module.exports = {

  asyncFind(items: Array, test: any, thisArg: any): Promise {
    return require('./promises').asyncFind(items, test, thisArg);
  },

  getConfigValueAsync(key: string): () => Promise {
    return require('./config').getConfigValueAsync(key);
  },

  asyncExecute(command: string, args: Array<string>, options: any): Promise {
    return require('./process').asyncExecute(command, args, options);
  },

  checkOutput(command: string, args: Array<string>, options: ?Object): Promise {
    return require('./process').checkOutput(command, args, options);
  },

  createExecEnvironment(originalEnv: Object, commonBinaryPaths: Array<string>): Promise<Object> {
    return require('./process').createExecEnvironment(originalEnv, commonBinaryPaths);
  },

  denodeify(f: (...args: Array<any>) => any): (...args: Array<any>) => Promise<any> {
    return require('./promises').denodeify(f);
  },

  safeSpawn(command: string, args: Array<string>, options?: Object = {}): Promise<child_process$ChildProcess> {
    return require('./process').safeSpawn(command, args, options);
  },

  readFile(filePath: string, options?: any): Promise {
    return require('./filesystem').readFile(filePath, options);
  },

  findNearestFile(fileName: string, pathToDirectory: string): Promise<?string> {
    return require('./filesystem').findNearestFile(fileName, pathToDirectory);
  },

  get array() {
    return require('./array');
  },

  get object() {
    return require('./object');
  },

  get fsPromise() {
    return require('./filesystem');
  },

  get httpPromise() {
    return require('./http');
  },

  get strings() {
    return require('./strings');
  },

  get paths() {
    return require('./paths');
  },

  get PromisePool() {
    return require('./PromiseExecutors').PromisePool;
  },

  get PromiseQueue() {
    return require('./PromiseExecutors').PromiseQueue;
  },

  get extend() {
    return require('./extend');
  },

  get debounce() {
    return require('./debounce');
  },

  get vcs() {
    return require('./vcs');
  },

  get url() {
    return require('./url');
  },

  get dnsUtils() {
    return require('./dns_utils');
  },

  get env() {
    return require('./environment');
  },

  get promises() {
    return require('./promises');
  },

  get error() {
    return require('./error');
  },

  get event() {
    return require('./event');
  },

  get session() {
    return require('./session');
  },

  get singleton() {
    return require('./singleton');
  },

  get COMMON_BINARY_PATHS() {
    return require('./process').COMMON_BINARY_PATHS;
  },
};
