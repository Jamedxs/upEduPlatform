
//import liraries
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, StatusBar, FlatList } from 'react-native'

import { Heading1, Heading2, Paragraph } from '../../widget/Text'
import { color, Button, NavigationItem, SearchBar, SpacingView } from '../../widget'

import { screen, system } from '../../common'
import api from '../../api'

import data from '../../data'

import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'

// create a component
class HomeScene extends PureComponent {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../img/Home/search_icon.png')} style={styles.searchIcon} />
                <Paragraph>输入课程名称或机构名称</Paragraph>
            </TouchableOpacity>
        ),
        headerRight: (
            <NavigationItem
                icon={require('../../img/Home/icon_navigationItem_message_white@2x.png')}
                onPress={() => {

                }}
            />
        ),
        headerLeft: (
            <NavigationItem
                title='天津'
                titleStyle={{ color: 'white' }}
                onPress={() => {

                }}
            />
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
        { (this: any).renderHeader = this.renderHeader.bind(this) }
        { (this: any).onGridSelected = this.onGridSelected.bind(this) }
        { (this: any).onMenuSelected = this.onMenuSelected.bind(this) }
    }

    componentDidMount() {
        this.requestData()
    }

    requestData() {
        this.setState({ refreshing: true })

        this.requestDiscount()
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

    async requestDiscount() {
        try {
            let response = await fetch(api.discount)
            let json = await response.json()
            //this.setState({ discounts: json.data })
            this.setState({ discounts: data.discountData })
        } catch (error) {
            alert(error)
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
        StatusBar.setBarStyle('default', false)
        this.props.navigation.navigate('GroupPurchase', { info: info })
    }

    keyExtractor(item: Object, index: number) {
        return item.id
    }

    renderHeader() {
        return (
            <View>
                <HomeMenuView menuInfos={api.menuInfo} onMenuSelected={this.onMenuSelected} />

                <SpacingView />

                <HomeGridView infos={this.state.discounts} onGridSelected={(this.onGridSelected)} />

                <SpacingView />

                <View style={styles.recommendHeader}>
                    <Heading2>猜你喜欢</Heading2>
                </View>
            </View>
        )
    }

    onGridSelected(index: number) {
        let discount = this.state.discounts[index]

        if (discount.type == 1) {
            StatusBar.setBarStyle('default', false)

            let location = discount.tplurl.indexOf('http')
            let url = discount.tplurl.slice(location)
            this.props.navigation.navigate('Web', { url: url })
        }
    }

    onMenuSelected(index: number) {
        //0-机构  1-教师  2-课程
        switch (index) {
          case 0: this.props.navigation.navigate('InstitutionScene');
            break;
          case 1: this.props.navigation.navigate('TeacherListScene');
            break;
          case 2:this.props.navigation.navigate('ClassListScene');
            break;
          default:

        }
        //alert(index)
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
        );
    }
}

// define your styles
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

//make this component available to the app
export default HomeScene;
