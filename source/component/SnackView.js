import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

import { Snackbar } from 'react-native-paper'

import { COLOR } from '../colors'
import { FONT } from '../fonts'

class LLSnackView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            message: ''
        }
    }

    showSnack = (msg) => {
        this.setState({
            visible: true,
            message: msg
        })
        setTimeout(() => {
            this.setState({
                visible: false
            })
        }, 2000)
    }

    render() {
        return (
            <Snackbar
                visible={this.state.visible}
                style={{ backgroundColor: COLOR.screenBackground }}>
                <Text style={style.snackTextStyle}>{this.state.message}</Text>
            </Snackbar>
        )
    }
}

const style = StyleSheet.create({
    snackTextStyle: {
        color: COLOR.gold,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: FONT.poppins_regular
    },
})
export default LLSnackView;