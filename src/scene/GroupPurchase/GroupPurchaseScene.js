

//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager } from 'react-native'
import { color, Button, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView } from '../../widget'
import { Heading1, Heading2, Paragraph, HeadingBig } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import api, { recommendUrlWithId, groupPurchaseDetailWithId } from '../../api'
import GroupPurchaseCell from './GroupPurchaseCell'
import NavigationItem2 from '../../widget/NavigationItem2'



// create a component
class GroupPurchaseScene extends PureComponent {

    listView: ListView

    state: {
        info: Object,
        dataSource: ListView.DataSource
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '课程详情',
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

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.state = {
            info: {},
            dataSource: ds.cloneWithRows([]),
        }
    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {
            this.listView.startHeaderRefreshing();
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <RefreshListView
                    ref={(e) => this.listView = e}
                    dataSource={this.state.dataSource}
                    renderHeader={() => this.renderHeader()}
                    renderRow={(rowData) =>
                        <GroupPurchaseCell
                            info={rowData}
                            onPress={() => this.props.navigation.navigate('GroupPurchase', { info: rowData })}
                        />
                    }
                    onHeaderRefresh={() => this.requestData()}
                />

            </View>
        )
    }

    renderHeader() {
        let info = this.props.navigation.state.params.info

        return (
            <View>
                <View>
                    <Image style={styles.banner} source={{ uri: info.imageUrl.replace('w.h', '480.0') }} />
                    <View style={styles.classNameContainer}>
                        <Heading1>{info.title}</Heading1>
                        <Paragraph style={{ padding: 5 }}>{info.subtitle}</Paragraph>
                    </View>
                    <Separator />
                    <View style={styles.topContainer}>
                        <Heading1 style={{ color: color.theme }}>￥</Heading1>
                        <HeadingBig style={{ marginBottom: -8 }}>{info.price}</HeadingBig>
                        <Paragraph style={{ marginLeft: 10 }}>门市价：￥{(info.price * 1.1).toFixed(0)}</Paragraph>
                        <View style={{ flex: 1 }} />
                        <Button
                            title='立即抢购'
                            style={{ color: 'white', fontSize: 18 }}
                            containerStyle={styles.buyButton}
                            onPress={ ()=>this.props.navigation.navigate('OrderConfirmScene', { info: info }) }
                        />
                    </View>
                </View>
                <Separator />

                <View>
                    <View style={styles.tagContainer}>
                        <Image style={{ width: 20, height: 20 }} source={require('../../img/Home/icon_deal_anytime_refund.png')} />
                        <Paragraph style={{ color: '#89B24F' }}>  随时退</Paragraph>
                        <View style={{ flex: 1 }} />
                        <Paragraph>已售{1234}</Paragraph>
                    </View>

                </View>

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
                            <Heading2>河西少年宫</Heading2>
                            <Paragraph>河西区解放南路347号</Paragraph>
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
                    <Paragraph style={{fontSize: 14}}>课程信息</Paragraph>
                </View>
                <View>
                    <View style={styles.tagContainer}>
                      <Paragraph>{info.details}</Paragraph>
                    </View>
                </View>
                <SpacingView />
                <View style={styles.tipHeader}>
                    <Paragraph style={{fontSize: 14}}>购买须知</Paragraph>
                </View>
                <Separator />
                <View>
                    <View style={styles.buyNoticeContainer}>
                      <Heading2 style={{color: '#fc9e28'}}>开课时间</Heading2>
                      <Heading2 style={{paddingTop: 5,paddingLeft: 10}}>2017-10-23至2017-11-23</Heading2>
                    </View>
                    <View style={styles.buyNoticeContainer}>
                      <Heading2 style={{color: '#fc9e28'}}>上课教师</Heading2>
                      <Heading2 style={{paddingTop: 5,paddingLeft: 10}}>刘强东</Heading2>
                    </View>
                    <View style={styles.buyNoticeContainer}>
                      <Heading2 style={{color: '#fc9e28'}}>温馨提示</Heading2>
                      <Heading2 style={{paddingTop: 5,paddingLeft: 10}}>请开课前两天到教学点领取听课证</Heading2>
                    </View>
                </View>

            </View>
        )
    }

    requestData() {
        this.requestDetail()
        this.requestRecommend()
    }

    requestDetail() {
        //原详情接口已经被美团关掉，这里暂时从上一级列表中获取详情数据
    }

    async requestRecommend() {
        try {
            let info = this.props.navigation.state.params.info
            let response = await fetch(recommendUrlWithId(info.id))
            let json = await response.json()

            console.log(JSON.stringify(json));

            let dataList = json.data.deals.map((info) => {
                return {
                    id: info.id,
                    imageUrl: info.imgurl,
                    title: info.brandname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            })

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataList)
            })
            setTimeout(() => {
                this.listView.endRefreshing(RefreshState.NoMoreData)
            }, 500);
        } catch (error) {
            this.listView.endRefreshing(RefreshState.Failure)
        }
    }
}

// define your styles
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

//make this component available to the app
export default GroupPurchaseScene;
