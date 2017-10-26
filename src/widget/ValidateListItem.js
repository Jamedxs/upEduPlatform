import React, { PureComponent, PropTypes } from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native'
import { screen, system, tool } from '../common'
import ValidateButton from './ValidateButton'

const itemHeight = screen.height / 16

export default class ValidateListItem extends PureComponent {
  render() {
      let { itemName, itemValue , func } = this.props
      return (
        <View style={styles.listItem}>
          <View style={[styles.validateListInfo, {borderTopWidth:1}]}>
              <View style={styles.validateListInfoLeft}>
                <Text>{itemName}</Text>
              </View>
              <View style={styles.validateListInfoCenter}>
                <TextInput style={styles.input} placeholder="请输验证码" maxLength={6}
                 keyboardType="numeric"
                onChangeText={(txt)=>{this.setState({data:txt});this._index=txt;}}
                />
              </View>
              <View style={styles.validateListInfoRight}>
              <ValidateButton timerTitle={'获取验证码'}
                  enable={true}
                  onClick={
                    (shouldStartCountting)=>{
        		          {func}(shouldStartCountting)
	           }
           } />
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
  validateListInfo: {
    height: itemHeight,
    flex: 1,
    alignItems: "center",
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#f5f5f5"
  },
  validateListInfoLeft: {
    width: screen.width/3
  },
  validateListInfoCenter: {
    justifyContent: "center",
    width: screen.width/3
  },
  validateListInfoRight: {
    justifyContent: "flex-end",

  },
  input:{
    height:itemHeight,
    marginLeft: 5,
    paddingLeft:5,
    borderColor: '#ccc',
  },
})
