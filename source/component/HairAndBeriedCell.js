import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, Modal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLOR } from '../colors';

import { FONT } from '../fonts';
import { IMAGE } from '../images'

function HairAndBeriedCell(props) {

    const { item, index, selected, onPress } = props;

    const [modalInfoVisible, setModalInfoVisible] = useState(false)

    const renderModalBarberInfo = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalInfoVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View>

                </View>
            </Modal>
        )
    }

    const content = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.container}
                onPress={() => {
                    onPress && onPress(index)
                }}>
                <Image style={styles.style_barber_pic} source={item.pic} />
                <View style={styles.style_barber_pic_layer}>
                    {(selected == index) &&
                        <View style={styles.style_selected_icon} />
                    }
                    <Text style={styles.style_barber_name}>{item.name}</Text>
                </View>
                {renderModalBarberInfo()}
            </TouchableOpacity>
        )
    }

    return content();
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 2.1,
        height: Dimensions.get('window').width / 2,
        marginStart: 6,
        marginVertical: 4,
        overflow: 'hidden',
    },
    style_barber_pic: {
        borderRadius: 8,
        width: '100%',
        height: '100%',
    },
    style_barber_pic_layer: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        position: 'absolute',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    style_barber_name: {
        color: 'white',
        fontFamily: FONT.poppins_medium,
        fontSize: 24,
        position: 'absolute',
        bottom: 2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        alignSelf: 'center',
        width: '99%',
        textAlign: 'center',
        paddingBottom: 16,
        paddingTop: 16,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32
    },
    style_modal_info_container: {
        backgroundColor: 'white',
    },
    style_selected_icon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLOR.gold,
        position: 'absolute',
        right: 8,
        top: 8
    }
})
export default BarberCell;