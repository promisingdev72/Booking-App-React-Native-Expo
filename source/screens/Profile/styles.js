import { StyleSheet, Dimensions, Platform,StatusBar } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLOR.screenBackground
    },
    navigationView: {
        marginTop: Platform.OS == 'ios' ? 0 :  8,
        height: Platform.OS == 'ios' ? 44 : 56,
        flexDirection: 'row',
    },
    navigationTitle: {
        fontFamily: FONT.poppins_medium,
        color: COLOR.gold,
        fontSize: 20,
        marginHorizontal: 8,
        alignSelf: 'center'
    },
    navigationMenuContainer: {
        height: Platform.OS == 'ios' ? 44 : 56,
        width: Platform.OS == 'ios' ? 44 : 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navigationMenu: {
        height: 25,
        width: 25,
        resizeMode: 'center',
        tintColor: COLOR.gold,
    },
    imageView: {
        marginTop: 50,
        marginBottom: 10,
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: '#ffffff'
    },
    editIcon: {
        marginTop: -30,
        marginLeft: 70,
        height: 20,
        width: 20,
        alignSelf: 'center',
        tintColor: COLOR.gold
    },
    username: {
        alignSelf: 'center',
        color: '#ffffff',
        fontFamily: FONT.poppins_semibold,
        fontSize: 15,
        marginBottom: 10,
    },
    inputBox: {
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: '#141414',
        borderRadius: 7,
        height: 44,
        padding: 8
    },
    inputField: {
        flex: 1.0,
        color: '#ffffff',
        fontFamily: FONT.poppins_semibold,
        fontSize: 15,
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
    },
    label: {
        color: COLOR.gold,
        marginStart: 24,
        fontFamily: FONT.poppins_semibold,
        marginBottom: -8,
        marginTop: 16
    },
    updateButton: {
        backgroundColor: COLOR.gold,
        width: '90%',
        alignSelf: 'center',
        height: 48,
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 24
    },
    updateButtonText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: FONT.poppins_medium
    }
})

export default styles