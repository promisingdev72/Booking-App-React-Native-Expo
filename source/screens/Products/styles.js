import { StyleSheet, Dimensions, Platform,StatusBar } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLOR.screenBackground
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
    navigationView: {
        marginTop: Platform.OS == 'ios' ? 0 : 8,
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
})

export default styles