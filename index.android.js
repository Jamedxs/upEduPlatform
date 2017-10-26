/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RootScene from './src/RootScene';

export default class upykPlus extends PureComponent {
  render() {
    return (
        <RootScene />
    );
  }
}



AppRegistry.registerComponent('upykPlus', () => upykPlus);
