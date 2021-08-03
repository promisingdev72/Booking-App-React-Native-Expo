import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'center',
    },
    logo: {
        width: '90%',
        height: 200,
        alignSelf: 'center'
    },
    button: {
        marginHorizontal: 20,
        backgroundColor: COLOR.gold,
        borderRadius: 7,
        justifyContent: 'center',
        height: 44,
        marginVertical: 20
    },
    buttonTxt: {
        color: '#fff',
        alignSelf: 'center',
        fontFamily: FONT.poppins_medium
    }
})

export default styles