import React, { PureComponent, PropTypes } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native'
import { color, Button, NavigationItem, RefreshListView, RefreshState, Separator, SpacingView } from '../../widget'
import { Heading1, Heading2, Paragraph, HeadingBig } from '../../widget/Text'
import { screen, system, tool } from '../../common'
import CheckBox from 'react-native-check-box'


const itemHeight = screen.height / 16

export default class StudentCell extends PureComponent {

  // static propTypes = {
  //     itemName: PropTypes.string,
  //     itemValue: PropTypes.string,
  //     // style: Text.propTypes.style,
  //     // containerStyle: View.propTypes.style,
  // }

  //let { itemName, itemValue } = this.props

  onClick(data) {
        data.checked = !data.checked;
        let msg=data.checked? 'you checked ':'you unchecked '
        //this.toast.show(msg+data.name);
    }

  render() {
      let { info } = this.props
      return (
        <View style={styles.listItem}>
          <View style={[styles.listInfo]}>
              <View style={{flex: 1}}>
                <CheckBox
                   style={{flex: 1, padding: 10}}
                   rightTextStyle={{justifyContent: 'center'}}
                   onClick={()=>this.onClick(info)}
                   isChecked={info.checked}
                   rightText={info.name}
                />
              </View>
              <View style={styles.listInfoRight}>
                <Text style={{color: "#aaa"}}>{info.cardNo}</Text>
              </View>
          </View>
        </View>

      );
  }

}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: screen.onePixel,
      borderColor: color.border,
      backgroundColor: 'white',
  },
  listItem: {
    height: itemHeight,
    paddingLeft: 16,
    borderBottomWidth: screen.onePixel,
    borderColor: color.border,
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
