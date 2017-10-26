import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList } from 'react-native'

import { Heading1, Heading2, Paragraph } from '../../widget/Text'
import { color, Button, NavigationItem, SearchBar, SpacingView } from '../../widget'

import { screen, system } from '../../common'
import api from '../../api'

import data from '../../data'

import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'

export default class ClassListScene extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: (
          <TouchableOpacity style={styles.searchBar}>
              <Image source={require('../../img/Home/search_icon.png')} style={styles.searchIcon} />
              <Paragraph>输入课程名称</Paragraph>
          </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: color.theme },
  })

  state: {
      discounts: Array<Object>,
      dataList: Array<Object>,
      refreshing: boolean,
  }

  constructor(props: Object) {
      super(props)

      this.state = {
          discounts: [],
          dataList: [],
          refreshing: false,
      }

      { (this: any).requestData = this.requestData.bind(this) }
      { (this: any).renderCell = this.renderCell.bind(this) }
      { (this: any).onCellSelected = this.onCellSelected.bind(this) }
      { (this: any).keyExtractor = this.keyExtractor.bind(this) }


  }

  componentDidMount() {
      this.requestData()
  }

  requestData() {
      this.setState({ refreshing: true })

      this.requestRecommend()
  }

  async requestRecommend() {
      try {
          let response = await fetch(api.recommend)
          let json = await response.json()

          // let dataList = json.data.map(
          //     (info) => {
          //         return {
          //             id: info.id,
          //             imageUrl: info.squareimgurl,
          //             title: info.mname,
          //             subtitle: `[${info.range}]${info.title}`,
          //             price: info.price
          //         }
          //     }
          // )
          //console.log(data.recommendData);
          let dataList = data.recommendData.map(
              (info) => {
                  return {
                      id: info.classNumber,
                      imageUrl: info.imageUrl,
                      title: info.name,
                      subtitle: info.subtitle,
                      price: info.price,
                      details: info.details
                  }
              }
          )

          this.setState({
              dataList: dataList,
              refreshing: false,
          })
      } catch (error) {
          this.setState({ refreshing: false })
      }
  }

  renderCell(info: Object) {
      return (
          <GroupPurchaseCell
              info={info.item}
              onPress={this.onCellSelected}
          />
      )
  }

  onCellSelected(info: Object) {
      console.log(this.props.navigation);
      StatusBar.setBarStyle('default', false)
      this.props.navigation.navigate('GroupPurchase', { info: info })
  }

  keyExtractor(item: Object, index: number) {
      return item.id
  }

  render() {
      return (
          <View style={styles.container}>
              <FlatList
                  data={this.state.dataList}
                  keyExtractor={this.keyExtractor}
                  onRefresh={this.requestData}
                  refreshing={this.state.refreshing}
                  renderItem={this.renderCell}
              />
          </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background
    },
    recommendHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    searchBar: {
        width: screen.width * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    searchIcon: {
        width: 20,
        height: 20,
        margin: 5,
    }
});
