import React, { PureComponent, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { screen, system, tool } from '../common'
import Ionicons from 'react-native-vector-icons/Ionicons'

const itemHeight = screen.height / 16

export default class Button2 extends PureComponent {

    static propTypes = {
        onPress: PropTypes.func,
        disabled: PropTypes.bool,
        style: Text.propTypes.style,
        containerStyle: View.propTypes.style,
        title: PropTypes.string,
        activeOpacity: PropTypes.number
    }

    static defaultProps = {
        onPress:() => {},
        disabled: false,
        activeOpacity: 0.8
    }

    render() {
        let { onPress, disabled, style, containerStyle, title, activeOpacity, ioniconsName } = this.props
        return (
            <TouchableOpacity
                style={containerStyle}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={activeOpacity}
            >
                <Text style={style}>
                    {title}
                </Text>
                <Ionicons style={{marginLeft: 10}} name={ioniconsName} size={itemHeight/2} color="#bbb" />
            </TouchableOpacity>
        );
    }
}
// define your styles
const styles = StyleSheet.create({

});
