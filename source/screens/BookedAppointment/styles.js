import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLOR.screenBackground
    },
    navigationView: {
        marginTop: Platform.OS == 'ios' ? 20 : 8,
        height: Platform.OS == 'ios' ? 44 : 56,
        flexDirection: 'row',
    },
    backButton: {
        height: Platform.OS == 'ios' ? 44 : 56,
        width: Platform.OS == 'ios' ? 44 : 56,
        justifyContent: 'center',
    },
    backIcon: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        tintColor: '#fff'
    },
    imageView: {
        marginTop: 50,
        marginBottom: 10,
        alignSelf: 'center',
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: COLOR.gold
    },
    title: {
        marginTop: 10,
        alignSelf: 'center',
        color: '#e5e5e5',
        fontFamily: FONT.poppins_semibold,
        fontSize: 20,
    },
    subTitle: {
        alignSelf: 'center',
        color: '#e5e5e5',
        fontFamily: FONT.poppins_semibold,
        fontSize: 14,
    },
    summayTitle: {
        marginHorizontal: 20,
        color: '#e5e5e5',
        fontFamily: FONT.poppins_semibold,
        fontSize: 16,
    },
    summaryBox: {
        margin: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLOR.gold,
        padding: 12,
        paddingHorizontal: 20
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryRowTitle: {
        width: 105,
        color: '#e5e5e5',
        fontFamily: FONT.poppins_semibold,
        fontSize: 14,
    },
    summaryRowValue: {
        flex: 1.0,
        color: '#e5e5e5',
        fontFamily: FONT.poppins_semibold,
        fontSize: 15,
        textAlign: 'left',
        marginStart: 16
    },
    devider: {
        height: 1,
        marginVertical: 20,
        backgroundColor: '#c5c5c5'
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
   
})

export default styles