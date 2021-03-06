'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var {array} = require('nuclide-commons');

var IosSimulator = require('./IosSimulator');
var NuclideDropdown = require('nuclide-ui-dropdown');
var React = require('react-for-atom');

var {PropTypes} = React;

async function loadSimulators(): Promise<any> {
  var devices = await IosSimulator.getDevices();

  return devices.map(device => ({
    label: device.name,
    value: device.udid,
  }));
}

var SimulatorDropdown = React.createClass({

  propTypes: {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  },

  getDefaultProps(): {[key: string]: mixed} {
    return {
      className: '',
      title: 'Choose a device',
    };
  },

  getInitialState(): any {
    return {
      menuItems: [],
      selectedIndex: 0,
    };
  },

  componentDidMount() {
    loadSimulators().then(this.receiveMenuItems);
  },

  receiveMenuItems(menuItems: Array<{label: string, value: string}>) {
    var index = array.findIndex(menuItems, item => item.label === 'iPhone 5s');
    var selectedIndex = index === -1 ? 0 : index;
    this.setState({menuItems, selectedIndex});
  },

  render(): ReactElement {
    return (
      <NuclideDropdown
        className={this.props.className}
        selectedIndex={this.state.selectedIndex}
        menuItems={this.state.menuItems}
        onSelectedChange={this._handleSelection}
        ref="dropdown"
        size="sm"
        title={this.props.title}
      />
    );
  },

  _handleSelection(newIndex: number) {
    this.setState({selectedIndex: newIndex});
  },

  getSelectedSimulator(): ?string {
    var selectedItem = this.state.menuItems[this.state.selectedIndex];
    return selectedItem && selectedItem.value;
  },
});

module.exports = SimulatorDropdown;
