import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles'

import { COLOR } from '../../colors'
import { IMAGE } from '../../images'

export default class ServicesCell extends Component {

    render() {
        const { item, index, show_only = false } = this.props
        return (
            <TouchableOpacity style={[styles.containerView]}
                onPress={() => {
                    if (!show_only) {
                        this.props.onPress(index)
                    }
                }}>
                <View style={styles.serviceContainer}>
                    <Text style={styles.serviceTitle}>{item.name}</Text>
                    <Text style={styles.serviceText}>{item.priceTxt}</Text>
                </View>
                {
                    !show_only && this.renderImage()
                }

            </TouchableOpacity>
        )
    }

    renderImage() {
        const { index, selected } = this.props
        var is_selected = selected.includes(index)
        return (
            <View style={styles.checkContainer}>
                {is_selected ?
                    <Image style={styles.checkIcon}
                        source={IMAGE.check} />
                    :
                    <View style={styles.checkIcon} />
                }
            </View>
        )
    }
}
