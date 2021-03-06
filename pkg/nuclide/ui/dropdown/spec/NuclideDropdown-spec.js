'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var NuclideDropdown = require('../lib/NuclideDropdown');
var React = require('react-for-atom');

var {TestUtils} = React.addons;
var {
  Simulate,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} = TestUtils;

describe('NuclideDropdown', () => {

  it('honors the selectedIndex param', () => {
    var props = {
      menuItems: [
        {label: 'foo', value: 'vfoo'},
        {label: 'bar', value: 'vbar'},
      ],
      selectedIndex: 1,
      onSelectedChange: () => {},
    };
    var component = renderIntoDocument(
      <NuclideDropdown {...props} />
    );

    var select = scryRenderedDOMComponentsWithTag(component, 'select');
    expect(React.findDOMNode(select[0]).selectedIndex).toBe(1);
    expect(select[0].getDOMNode().value).toBe('vbar');
  });

  it('calls the callback with the new index when a different menu item is selected', () => {
    var changedIndex;
    var onChange = (index) => {
      changedIndex = index;
    };
    var props = {
      menuItems: [
        {label: 'foo', value: 'vfoo'},
        {label: 'bar', value: 'vbar'},
      ],
      selectedIndex: 0,
      onSelectedChange: onChange,
    };
    var component = renderIntoDocument(
      <NuclideDropdown {...props} />
    );

    var select = scryRenderedDOMComponentsWithTag(component, 'select');
    select[0].getDOMNode().selectedIndex = 1;
    Simulate.change(React.findDOMNode(select[0]));
    expect(changedIndex).toBe(1);
  });
});
