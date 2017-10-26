import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager, StatusBar,TouchableHighlight,Modal } from 'react-native'
import { color, Button, Button2, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView, ListItem, ListItem2, DialogSelected } from '../../widget'
import { Heading1, Heading2, Paragraph, HeadingBig } from '../../widget/Text'
import { screen, system, tool } from '../../common'

import data from '../../data'

const itemHeight = screen.height / 16

export default class SelectBankCardScene extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: '银行卡选择',
      headerStyle: { backgroundColor: 'white' },

  });

  constructor(props: Object) {
      super(props);

      this.state = {
          info: {},
          modalVisible: false,
          bankCardName: data.bankCardLists[0].cardName,
          bankLastFourNo: data.bankCardLists[0].lastFourNo
      }

      { (this: any)._bankCard = this._bankCard.bind(this) }

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _bankCard(cardName,lastFourNo){

    return(
      <TouchableOpacity onPress={() => {this.setModalVisible(true)}}>
        <ListItem2 itemName={`${cardName}(${lastFourNo})`} itemValue='' ioniconsName='ios-arrow-forward-outline' />
      </TouchableOpacity>
    )
  }

  _selectBankCardList(){
    return data.bankCardLists.map((item, i) => {
      return (
        <View key={i} style={{alignItems: "center",}}>
          <Button2 style={{color: "#aaa"}}
                        title= {`${item.cardName}(${item.lastFourNo})`}
                        containerStyle={styles.bankCardStyle}
                        ioniconsName='ios-arrow-forward-outline'
                        onPress={ ()=>{this.setModalVisible(false);this.setState({bankCardName: item.cardName,bankLastFourNo:item.lastFourNo})} } key={i}>{this._bankCard(item.cardName,item.lastFourNo)} } >
          </Button2>
          <Separator />
        </View>
      )
    })
  }

  _insertBankCard(name){
    return(
      <ListItem2 itemName={name} itemValue=' ' ioniconsName='ios-add-circle-outline' />
    )
  }

  render() {
        return (
          <View style={styles.container}>
            <ListItem itemName='订单编号' itemValue='UP000000001' />
            <Separator />
            <ListItem itemName='金额' itemValue='180' />
            <Separator />
            <ListItem itemName='银行卡支付' itemValue='' />
            <Separator />
            {this._bankCard(this.state.bankCardName,this.state.bankLastFourNo)}

            <Modal
              animationType={"fade"}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {}}
              >
             <View style={styles.mainModalViewStyle}>
                <View style={styles.topModalStyle}>
                  <Text>选择银行卡</Text>
                </View>
                <Separator />
                {this._selectBankCardList()}
                <View style={styles.topModalStyle}>
                  <Button2 style={{color: "#aaa"}}
                                title='添加银行卡'
                                containerStyle={styles.bankCardStyle}
                                ioniconsName='ios-arrow-forward-outline'
                                onPress={ ()=>{} } >
                  </Button2>
                </View>
             </View>
            </Modal>


            <View style={styles.tagContainer}>
              <Button
                  title='确定支付'
                  style={{ color: 'white', fontSize: 18 }}
                  containerStyle={styles.buyButton}
                  onPress={ ()=>this.props.navigation.navigate('PayOrderScene', { info: this.props.navigation.state.params.info }) }
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
  mainModalViewStyle: {
    flex:1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

  },
  topModalStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.whiteBackground,
    width: screen.width-40,
    height: itemHeight,
  },
  bankCardStyle: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.whiteBackground,
    width: screen.width-40,
    height: itemHeight,

  }

});
