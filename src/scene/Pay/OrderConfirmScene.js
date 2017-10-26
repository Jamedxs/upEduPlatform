
import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListView, Image, InteractionManager, StatusBar,TouchableHighlight } from 'react-native'
import { color, Button, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView, ListItem, DialogSelected } from '../../widget'
import { Heading1, Heading2, Paragraph, HeadingBig } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import api, { recommendUrlWithId, groupPurchaseDetailWithId } from '../../api'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import ClassItemCell from './ClassItemCell'
import GroupPurchaseCell from '../GroupPurchase/GroupPurchaseCell'

export default class OrderConfirmScene extends PureComponent {
  listView: ListView

  // state: {
  //     info: Object,
  //     dataSource: ListView.DataSource
  // }

  static navigationOptions = ({ navigation }) => ({
      headerTitle: '订单确认',
      headerStyle: { backgroundColor: 'white' },

  });

  constructor(props: Object) {
      super(props);

      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

      this.state = {
          info: {},
          arrayData: [],
          listViewData: Array(20).fill('').map((_,i)=>`item #${i}`),
      }

      { (this: any).onCellSelected = this.onCellSelected.bind(this) }
      { (this: any)._goSelectedStudent = this._goSelectedStudent.bind(this) }
      { (this: any)._studentList = this._studentList.bind(this) }
      { (this: any)._deleteStudent = this._deleteStudent.bind(this) }

      //{ (this: any).callbackSelected = this.callbackSelected.bind(this) }
  }

  //render之前执行
  componentWillMount(){
    let studentDataList = this.props.navigation.state.params.chosenStudentList;
    if(studentDataList != null){
      for (let i = 0; i < studentDataList.length; i++) {
        this.state.arrayData.push(studentDataList[i].name);
      }
    }
  }

  //render之后执行
  componentDidMount() {
      //console.log(this.props.navigation.state.params.chosenStudentList);
      //this.state.studentList = this.props.navigation.state.params.chosenStudentList;

  }

  requestData() {

  }

  renderHeader() {
      let info = this.props.navigation.state.params.info

      return (
          <ClassItemCell
          info={info}
          onPress={(this.onCellSelected)}/>

      )
  }

  onCellSelected(info: Object) {
      StatusBar.setBarStyle('default', false)
      this.props.navigation.navigate('GroupPurchase', { info: info })
  }

  //跳转到选择学生页面
  _goSelectedStudent(info: Object){
    //SelectStudentScene
    this.props.navigation.navigate('SelectStudentScene',{ info: this.props.navigation.state.params.info })
  }
  // // 回调
  // callbackSelected(i){
  //   switch (i){
  //     case 0: // 拍照
  //       this.takePhoto();
  //       break;
  //     case 1: // 图库
  //       this.pickMultiple();
  //       break;
  //   }
  // }

  _studentList(){
    let views = [];
    let studentDataList = this.props.navigation.state.params.chosenStudentList;

    if(studentDataList == null){
      views.push(
        <View key={0}>
        </View>
      )
    }else{

      views.push(
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.arrayData)}
          renderRow={ data => (
            <View>
              <View style={styles.rowFront}>
                <Text>{data}</Text>
              </View>
              <Separator />
            </View>
          )}
          renderHiddenRow={ (data, secId, rowId, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
                <Text style={styles.backTextWhite}>删除</Text>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-75} disableRightSwipe={true}
        />
      )
    }
    return views;
  }

  _deleteStudent(id){

  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.arrayData];
		newData.splice(rowId, 1);
		this.setState({arrayData: newData});
	}

  render() {
        return (
          <View style={styles.container}>
            <View style={styles.itemViewContainer}>
              <GroupPurchaseCell
                  info={this.props.navigation.state.params.info}
                  onPress={() => this.props.navigation.navigate('GroupPurchase', { info: this.props.navigation.state.params.info })}
              />
            </View>


            <Separator />
            <ListItem itemName='订单编号' itemValue='UP000000001' />
            <Separator />
            <ListItem itemName='订单编号' itemValue='UP000000001' />
            <SpacingView />

            {this._studentList()}


            <TouchableOpacity onPress={() => {this._goSelectedStudent()}}>
              <View style={{alignItems: 'center',backgroundColor:color.whiteBackground} }>

                  <View style={styles.tagContainer}>
                      <Image style={{ width: 20, height: 20 }} source={require('../../img/Class/新增.png')} />
                      <Paragraph style={{ color: color.theme }}>  选择学生</Paragraph>
                  </View>
              </View>
            </TouchableOpacity>
            <Separator />
            <View style={styles.tagContainer}>
                <Button
                    title='提交订单'
                    style={{ color: 'white', fontSize: 18 }}
                    containerStyle={styles.buyButton}
                    onPress={ ()=>this.props.navigation.navigate('SelectBankCardScene', { info: this.props.navigation.state.params.info }) }
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
  itemViewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: screen.width ,
      height: screen.width / 4,
      backgroundColor: 'white',
      borderBottomWidth: screen.onePixel,
      borderRightWidth: screen.onePixel,
      borderColor: color.border
  },
  icon: {
      width: screen.width / 5,
      height: screen.width / 5,
  },
  standalone: {
    backgroundColor: color.background,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: color.whiteBackground,
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: color.delete,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: color.background
	},
  tagContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
  },
  buyButton: {
      backgroundColor: '#fc9e28',
      width: screen.width-20,
      height: 36,
      borderRadius: 7,
  },
  rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
  backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
  backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
  rowFront: {
		alignItems: 'center',
		backgroundColor: color.whiteBackground,
		justifyContent: 'center',
		height: 50,
	},
});
