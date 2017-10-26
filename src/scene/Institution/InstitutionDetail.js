
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager,FlatList } from 'react-native'
import { color, Button, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView } from '../../widget'
import { Heading1, Heading2, Paragraph, HeadingBig } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import api, { recommendUrlWithId, groupPurchaseDetailWithId } from '../../api'
import NavigationItem2 from '../../widget/NavigationItem2'

import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'

import data from '../../data'

export default class InstitutionDetail extends PureComponent {
  //listView: ListView

  state: {
      info: Object,
      //dataSource: ListView.DataSource,
      dataList: Array<Object>,
      refreshing: boolean,
  }

  static navigationOptions = ({ navigation }) => ({
      headerTitle: '机构详情',
      headerStyle: { backgroundColor: 'white' },
      headerRight: (
          <NavigationItem2
              icon={require('../../img/Class/收藏2.png')}
              onPress={() => {

              }}
              icon2={require('../../img/Class/分享.png')}
              onPress2={() => {

              }}
          />
      ),
  });

  constructor(props: Object) {
      super(props);

      //let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

      this.state = {
          info: {},
          //dataSource: ds.cloneWithRows([]),
          dataList: [],
          refreshing: false,
      }

      { (this: any).requestData = this.requestData.bind(this) }
      { (this: any).renderCell = this.renderCell.bind(this) }
      { (this: any).onCellSelected = this.onCellSelected.bind(this) }
      { (this: any).keyExtractor = this.keyExtractor.bind(this) }
      { (this: any).renderHeader = this.renderHeader.bind(this) }

  }
  componentDidMount() {
      this.requestData()
  }

  requestData() {
      this.setState({ refreshing: true })
      //this.requestDetail()
      this.requestRecommend()
  }

  requestDetail() {
      //原详情接口已经被美团关掉，这里暂时从上一级列表中获取详情数据
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
          console.log(dataList);

          this.setState({
              dataList: dataList,
              refreshing: false,
          })

      } catch (error) {
          this.setState({ refreshing: false })
          console.log("error");
      }
  }

  renderHeader() {
      let info = this.props.navigation.state.params.info

      return (
          <View>
              <View>
                  <Image style={styles.banner} source={{ uri: info.imageUrl.replace('w.h', '480.0') }} />
                  <View style={styles.classNameContainer}>
                      <Heading1>{info.name}</Heading1>
                      <Paragraph style={{ padding: 5 }}>{info.description}</Paragraph>
                  </View>
                  <Separator />

              </View>
              <Separator />



              <SpacingView />

              <View style={styles.tipHeader}>
                  <Paragraph style={{fontSize: 14}}>商家信息</Paragraph>
              </View>
              <Separator />
              <View>
                  <View style={styles.tagContainer}>
                    <TouchableOpacity style={styles.columnContainer} onPress={this.props.onPress}>
                      <View style = {{ flexDirection:'row',alignItems: 'center'}}>
                        <View>
                          <Image style={{ width: 20, height: 20 }} source={require('../../img/Class/位置.png')} />

                        </View>
                        <Heading2>  </Heading2>
                        <View>
                          <Heading2>{info.name}</Heading2>
                          <Paragraph>{info.location}</Paragraph>
                        </View>
                      </View>

                    </TouchableOpacity>
                    <Heading2>  </Heading2>
                    <TouchableOpacity  onPress={this.props.onPress}>
                      <Image style={{ width: 40, height: 40 }} source={require('../../img/Class/电话.png')} />
                    </TouchableOpacity>
                  </View>
              </View>
              <SpacingView />
              <View style={styles.tipHeader}>
                  <Paragraph style={{fontSize: 14}}>课程列表</Paragraph>
              </View>
          </View>
      )
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
                  ListHeaderComponent={this.renderHeader}
                  renderItem={this.renderCell}
              />

          </View>
      )
  }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    banner: {
        width: screen.width,
        height: screen.width * 0.5
    },
    classNameContainer: {
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    topContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    buyButton: {
        backgroundColor: '#fc9e28',
        width: 94,
        height: 36,
        borderRadius: 7,
    },
    tagContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    tipHeader: {
        height: 35,
        justifyContent: 'center',
        borderWidth: screen.onePixel,
        borderColor: color.border,
        paddingVertical: 8,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    columnContainer: {
      flex:1,
      flexDirection: 'column',
      padding: 5,
      borderRightWidth: screen.onePixel * 3,
      borderColor: color.border
    },
    buyNoticeContainer: {
        paddingTop: 10,
        paddingLeft: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});
