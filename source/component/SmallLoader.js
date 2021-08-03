import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { COLOR } from '../colors'
import { FONT } from '../fonts'

function LLSmallLoader(props) {

    const { loading } = props;

    const content = () => {
        if (loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator color={COLOR.gold} />
                </View>
            )
        } else {
            return (<View />)
        }
    }
    return content();
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    }
})
export default LLSmallLoader;