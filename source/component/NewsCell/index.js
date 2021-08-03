import React, { Component } from 'react';
import { Text, View, SafeAreaView, FlatList, Image } from 'react-native';
import styles from './styles'

import { COLOR } from '../../colors'
import { IMAGE } from '../../images'

export default class NewsCell extends Component {
    render() {
        return (
            <View style={styles.shadowView}>
                <View style={styles.containerView}>
                    {this.renderImage()}
                    <View style={styles.descContainer}>
                        <Text style={styles.descTitle} numberOfLines={2}>Hair Style Fastival</Text>
                        <Text style={styles.descText} numberOfLines={2}>Hair Style Fastival - check all latest news about hair style festival in 2021</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderImage() {
        return (
            <Image style={styles.imageView} />
        )
    }
}
