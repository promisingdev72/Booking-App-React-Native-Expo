import React, { Component } from 'react';
import { Text, View, SafeAreaView, FlatList, Image, ImageBackground, } from 'react-native';
import styles from './styles'

import { COLOR } from '../../colors'
import { IMAGE } from '../../images'

export default class TreadingCell extends Component {
    render() {
        return (
            <View style={styles.containerView}>
                {this.renderImage()}
                {/* <Text style={styles.descTitle} numberOfLines={2}>Hair Style Fastival</Text> */}
            </View>
        )
    }

    renderImage() {
        const { item } = this.props
        return (
            <ImageBackground
                source={{ uri: item.pic }}
                style={{
                    height: 100, // <-- you can adjust visible area
                    width: 100,  // <-- same here
                    overflow: 'hidden',
                    borderRadius:50,
                    marginBottom:16
                }}
                imageStyle={{
                    width:100,
                    resizeMode: "cover",
                    height: 190, // <-- you can adjust this height to play with zoom
                }}
            >
            </ImageBackground>

            // <Image style={styles.imageView}
            //     resizeMode={'contain'}
            //     resizeMethod={'auto'}
            //     source={{ uri: item.pic }} />
        )
    }
}
