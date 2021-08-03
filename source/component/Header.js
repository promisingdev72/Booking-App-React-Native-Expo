import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';

import { COLOR } from '../colors'
import { IMAGE } from '../images'
import { FONT } from '../fonts'


function LLHeader(props) {

    /**
     *  type : dash, default
     */
    const { type = "default", clickOnLeft, title = "", onClickLocation } = props;

    const content = () => {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => { clickOnLeft() }}
                    style={styles.styles_icon_container}>
                    <Image
                        source={type == 'default' ? IMAGE.back : IMAGE.menu}
                        style={[styles.style_icons]}
                        resizeMode={'center'} />
                </TouchableOpacity>

                <Text style={styles.title}>{title}</Text>


            </View>
        )
    }
    return content();
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        backgroundColor: COLOR.gold,
    },
    styles_icon_container: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    style_icons: {
        width: 25,
        height: 25,
        tintColor: 'white',
    },
    style_logo: {
        alignSelf: 'center',
        height: 35,
        flex: 1.0,
        tintColor: 'white',
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontFamily: FONT.poppins_medium,
        alignSelf: 'center'
    }
})
export default LLHeader;