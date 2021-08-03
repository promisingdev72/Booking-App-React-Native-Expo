import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { withTheme } from 'react-native-paper';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
      },
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    text1: {
        color:COLOR.white,
        fontSize: 40,
        fontWeight:"bold",
        textAlign: 'center',
        marginTop: '30%',
    },
    text2: {
        color:COLOR.white,
        fontSize: 20,
        textAlign: 'center',
        marginTop: '50%',
    },
    text3: {
        color:COLOR.white,
        fontSize: 20,
        textAlign: 'center',
    },
    container: {
        flex: 1.0,
        backgroundColor: COLOR.screenBackground
    },
    navigationView: {
        marginTop: Platform.OS == 'ios' ? 0 : 8,
        height: Platform.OS == 'ios' ? 44 : 56,
        flexDirection: 'row',
        alignItems: 'center'
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
        alignItems: 'center',
    },
    navigationMenu: {
        height: 25,
        width: 25,
        resizeMode: 'center',
        tintColor: COLOR.gold,
    },
    topTabContainer: {
        height: 50,
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 10
    },
    tabSelected: {
        flex: 1.0,
        borderBottomWidth: 2,
        borderBottomColor: COLOR.gold,
        justifyContent: 'center'
    },
    tabDeselected: {
        flex: 1.0,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        justifyContent: 'center'
    },
    tabSelectedTxt: {
        alignSelf: 'center',
        fontFamily: FONT.poppins_medium,
        color: COLOR.gold,
    },
    tabTxt: {
        alignSelf: 'center',
        fontFamily: FONT.poppins_medium,
        color: '#fff'
    },
    emptyView: {
        alignSelf: 'center',
        fontFamily: FONT.poppins_medium,
        color: '#fff',
        paddingTop: 200
    }
})

export default styles