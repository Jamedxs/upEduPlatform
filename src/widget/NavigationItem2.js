import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

// create a component
export default class NavigationItem2 extends PureComponent {
    render() {
        let icon = this.props.icon &&
            <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon} />

        let icon2 = this.props.icon &&
            <Image style={[styles.icon, this.props.iconStyle]} source={this.props.icon2} />

        let title = this.props.title &&
            <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
        let title2 = this.props.title &&
            <Text style={[styles.title, this.props.titleStyle]}>{this.props.title2}</Text>
        return (
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                {icon}
                {title}
            </TouchableOpacity>
            <TouchableOpacity style={styles.container} onPress={this.props.onPress2}>
                {icon2}
                {title2}
            </TouchableOpacity>
          </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 27,
        height: 27,
        margin: 8,
    },
    title: {
        fontSize: 15,
        color: '#333333',
        margin: 8,
    }
});
