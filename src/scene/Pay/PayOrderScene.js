import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager, StatusBar,TouchableHighlight,Modal } from 'react-native'
import { color, Button, Button2, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView, ListItem, ListItem2, ValidateListItem,DialogSelected } from '../../widget'
import { Heading1, Heading2, Paragraph, HeadingBig } from '../../widget/Text'
import { screen, system, tool } from '../../common'


export default class PayOrderScene extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: '订单确认',
      headerStyle: { backgroundColor: 'white' },

  });

  constructor(props: Object) {
      super(props);

      this.state = {
          info: {},
      }
  }

  //2 秒后随机模拟获取验证码成功或失败的情况
  _requestAPI(shouldStartCounting){
    console.log(shouldStartCounting);
    setTimeout(()=>{
      const requestSucc = Math.random() + 0.5 > 1
      shouldStartCounting && shouldStartCounting(requestSucc)
    }, 2000);

  }

  render() {
        return (
          <View style={styles.container}>
            <ListItem itemName='订单编号' itemValue='UP000000001' />
            <Separator />
            <ListItem itemName='金额' itemValue='180' />
            <Separator />
            <ListItem itemName='银行卡支付' itemValue='62888888888888888' />
            <Separator />
            <ListItem itemName='手机号码' itemValue='18717775329' />
            <Separator />
            <ValidateListItem itemName='验证码' func={this._requestAPI()} />

            <View style={styles.tagContainer}>
              <Button
                  title='确定支付'
                  style={{ color: 'white', fontSize: 18 }}
                  containerStyle={styles.buyButton}
                  onPress={ ()=>{} }
              />
            </View>

          </View>
      )
  }

}


const styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      flexWrap: 'wrap',
      borderTopWidth: screen.onePixel,
      borderLeftWidth: screen.onePixel,
      borderColor: color.border
  },
  buyButton: {
      backgroundColor: '#fc9e28',
      width: screen.width-20,
      height: 36,
      borderRadius: 7,
  },
  tagContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
  },

});
