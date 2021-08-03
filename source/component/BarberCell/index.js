import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles'

import { COLOR } from '../../colors'
import { IMAGE } from '../../images'

export default class BarberCell extends Component {
    render() {
        const { index, item } = this.props
        return (
            <TouchableOpacity style={[styles.containerView]}
                onPress={() => {
                    this.props.onPress(index)
                }}>
                <View style={styles.profileShadowView}>
                    {this.renderImage()}
                    <View style={styles.profileDescView}>
                        <Text style={styles.profileTitle}>Jhon Nick</Text>
                    </View>
                    {this.renderCheckBox()}
                </View>
            </TouchableOpacity>
        )
    }

    renderImage() {
        return (
            <Image style={styles.profileImage} />
        )
    }

    renderCheckBox() {
        const { index, selected } = this.props
        return (
            <View style={styles.checkContainer}>
                {index == selected ?
                    <Image style={styles.checkIcon}
                        source={IMAGE.check} />
                    :
                    <View style={styles.checkIcon} />
                }
            </View>
        )
    }
}
