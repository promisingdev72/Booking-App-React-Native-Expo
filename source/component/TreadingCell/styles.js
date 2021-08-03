import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    containerView: {
        flex: 1.0,
        borderRadius: 7,
        overflow: 'hidden',
        justifyContent: 'center',
        marginLeft: 10
    },
    imageView: {
        height: 100,
        width:'100%',
        aspectRatio: 1 / 1,
        borderRadius: 60,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignSelf: 'center',
        marginBottom: 16
    },
    descTitle: {
        fontFamily: FONT.poppins_medium,
        color: '#141414',
        fontSize: 14,
        alignSelf: 'center',
        width: 100,
        textAlign: 'center'
    }
})

export default styles