import React, { PureComponent, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { screen, system, tool } from '../common'

const itemHeight = screen.height / 16

export default class ListItem extends PureComponent {

  static propTypes = {
      itemName: PropTypes.string,
      itemValue: PropTypes.string,
      // style: Text.propTypes.style,
      // containerStyle: View.propTypes.style,
  }

  render() {
      let { itemName, itemValue } = this.props
      return (
        <View style={styles.listItem}>
          <View style={[styles.listInfo]}>
            <View style={{flex: 1}}><Text>{itemName}</Text></View>
              <View style={styles.listInfoRight}>
                <Text style={{color: "#aaa"}}>{itemValue}</Text>
              </View>
            </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  listItem: {
    height: itemHeight,
    paddingLeft: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  listInfo: {
    height: itemHeight,
    flex: 1,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: "#f5f5f5"
  },
  listInfoRight: {
    flexDirection: "row",
    alignItems: "center"
  },
})
