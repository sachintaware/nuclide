'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var {
  CompositeDisposable,
  Disposable,
} = require('atom');

class Activation {
  _disposables: CompositeDisposable;
  _store: ?Object;

  constructor(state: ?Object) {
    this._disposables = new CompositeDisposable();
  }

  activate() {
    this._disposables.add(
      atom.commands.add('atom-workspace', {
        'nuclide-fuzzy-filename-provider:toggle-provider': () => {
          if (this._store) {
            this._store.toggleProvider(require('./FuzzyFileNameProvider'));
          }
        },
      })
    );
  }

  setStore(store): void {
    this._store = store;
  }

  dispose() {
    this._store = null;
    this._disposables.dispose();
  }
}

var activation: ?Activation = null;
module.exports = {

  registerProvider() {
    return require('./FuzzyFileNameProvider');
  },

  registerStore(store: Object): atom$Disposable {
    if (activation === null) {
      this.activate();
    }
    activation.setStore(store);
    return new Disposable(() => this.setStore(null));
  },

  activate(state: ?Object) {
    if (!activation) {
      activation = new Activation(state);
      activation.activate();
    }
  },

  deactivate() {
    if (activation) {
      activation.dispose();
      activation = null;
    }
  },
};
