import React, { PureComponent, PropTypes } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,FlatList } from 'react-native'
import { color, Button, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView } from '../../widget'
import { Heading1, Heading2, Paragraph, HeadingBig } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import StudentCell from './StudentCell'

import data from '../../data'

const itemHeight = screen.height / 16


export default class SelectStudentScene extends PureComponent {


  static navigationOptions = ({ navigation }) => ({
      headerTitle: '选择学生',
      headerStyle: { backgroundColor: 'white' },
      headerRight: (
          <NavigationItem
              title='确定'
              onPress={() => navigation.state.params.navigatePress() }
          />
      ),
  });

  constructor(props: Object) {
    super(props)
    this.state = {
        studentDataList: [],
        refreshing: false,
        chosenStudentList: [],
    }

    { (this: any).requestData = this.requestData.bind(this) }
    { (this: any).renderCell = this.renderCell.bind(this) }
    { (this: any).keyExtractor = this.keyExtractor.bind(this) }
    { (this: any).confirmButton = this.confirmButton.bind(this) }

  }


  componentDidMount() {
      this.requestData()
      this.props.navigation.setParams({navigatePress:this.confirmButton})
  }

  requestData() {
      let dataList = data.studentData.map(
        (stu) => {
            return {
                id: stu.studentId,
                name: stu.studentName,
                sex: stu.sex,
                age: stu.age,
                cardNo: stu.cardNo,
                checked: stu.checked,
            }
        }
      )

      this.setState({
          studentDataList: dataList,
          refreshing: false,
      })

  }

  renderCell(info: Object) {

      return (
          <StudentCell
              info={info.item}
              onPress={ ()=>{} }
          />


      )
  }

  keyExtractor(item: Object, index: number) {
      return item.id
  }

  //确认按钮function
  confirmButton(){
    let len = this.state.studentDataList.length;
    for (let i = 0; i < len; i++) {
      let list = this.state.studentDataList[i];
      //console.log(list.checked);
      if(list.checked == true){
        this.state.chosenStudentList.push(list);
      }
    }
    //console.log(this.state.chosenStudentList)
    this.props.navigation.navigate('OrderConfirmScene', { chosenStudentList: this.state.chosenStudentList,info: this.props.navigation.state.params.info })
  }




  render() {

      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => {this._goSelectedStudent()}}>
            <View style={{alignItems: 'center',backgroundColor:color.whiteBackground}}>

                <View style={styles.tagContainer}>
                    <Image style={{ width: 20, height: 20 }} source={require('../../img/Class/新增.png')} />
                    <Paragraph style={{ color: color.theme }}>  添加学生</Paragraph>
                </View>


            </View>
          </TouchableOpacity>
          <SpacingView />

          <FlatList
              data={this.state.studentDataList}
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
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      borderTopWidth: screen.onePixel,
      borderLeftWidth: screen.onePixel,
      borderColor: color.border
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
})
