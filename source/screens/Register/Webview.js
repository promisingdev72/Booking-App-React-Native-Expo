import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Platform, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview'
import { IMAGE } from '../../images'

function Webview({ route, navigation }) {

    useEffect(() => {
        console.log(route)
    }, [])

    const onPressBack = () => {
        navigation.goBack()
    }

    const content = () => {
        let url = `http://cristianlivolsi.co.uk/privacy_policy.php`
        return (
            <View style={styles.container}>
                <View style={styles.navigationView}>
                    <SafeAreaView />
                    <TouchableOpacity style={styles.backButton}
                        onPress={() => {
                            onPressBack()
                        }}>
                        <Image style={styles.backIcon}
                            source={IMAGE.back} />
                    </TouchableOpacity>
                </View>
                <WebView
                    style={{ overflow: 'scroll' }}
                    source={{ uri: url }}
                    originWhitelist={["*"]}
                    mixedContentMode={'always'}
                    useWebKit={Platform.OS == 'ios'}
                    onError={() => { alert('Error Occured'); Actions.pop() }}
                    onLoadEnd={() => { }}
                    thirdPartyCookiesEnabled={true}
                    scrollEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    allowUniversalAccessFromFileURLs={true}
                    javaScriptEnabled={true}
                />
            </View>
        )
    }
    return content();
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        paddingTop: 10,
        backgroundColor: '#000'
    },
    navigationView: {
        marginTop: Platform.OS == 'ios' ? 20 : 8,
        height: Platform.OS == 'ios' ? 44 : 56,
        flexDirection: 'row',
    },
    backButton: {
        height: Platform.OS == 'ios' ? 44 : 56,
        width: Platform.OS == 'ios' ? 44 : 56,
        justifyContent: 'center'
    },
    backIcon: {
        height: 20,
        width: 20,
        alignSelf: 'center'
    },
})

export default Webview;