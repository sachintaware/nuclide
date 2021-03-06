'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var {Disposable} = require('atom');

var {createAdapters} = require('../lib/LinterAdapterFactory');

var grammar = 'testgrammar';

describe('createAdapters', () => {
  class FakeDiagnosticsProviderBase {
    onMessageUpdate(callback) {
      return new Disposable(() => {});
    }
    onMessageInvalidation() {
      return new Disposable(() => {});
    }
  }

  function createAdaptersWithMock(linterProviders) {
    return createAdapters(linterProviders, (FakeDiagnosticsProviderBase: any));
  }

  var fakeLinter: any;

  beforeEach(() => {
    var fakeEditor = {
      getPath() { return 'foo'; },
      getGrammar() { return { scopeName: grammar }; },
    };
    spyOn(atom.workspace, 'getActiveTextEditor').andReturn(fakeEditor);
    fakeLinter = {
      grammarScopes: [grammar],
      scope: 'file',
      lintOnFly: true,
      lint: () => Promise.resolve([]),
    };
  });

  afterEach(() => {
    jasmine.unspy(atom.workspace, 'getActiveTextEditor');
  });

  it('should return a linter adapter', () => {
    expect(createAdaptersWithMock(fakeLinter).size).toBe(1);
  });

  it('should not return an adapter if it is disabled for Nuclide', () => {
    fakeLinter.disabledForNuclide = true;
    expect(createAdaptersWithMock(fakeLinter).size).toBe(0);
  });

  it('should return multiple adapters if it is passed an array', () => {
    expect(createAdaptersWithMock([fakeLinter, fakeLinter]).size).toBe(2);
  });
});
