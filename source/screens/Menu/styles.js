import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLOR.screenBackground,
        overflow: 'hidden'
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
    userProPicContainer: {
        height: 150,
        backgroundColor: COLOR.gold,
        paddingTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 25,
        marginBottom: 16
    },
    userProPic: {
        width: 75,
        height: 75,
        margin: 16,
        borderRadius: 38,
        borderWidth: 1,
        borderColor: 'white',
        elevation: 2
    },
    userProPicPlaceHolder: {
        width: 75,
        height: 75,
        borderRadius: 40,
        margin: 16,
        tintColor: 'white',
    },
    userName: {
        color: '#fff',
        fontSize: 16,
        fontFamily: FONT.poppins_semibold
    },
    my_account: {
        color: '#fff',
        fontSize: 14,
        marginTop: -4,
        fontFamily: FONT.poppins_light
    },
    next: {
        tintColor: "#fff",
        width: 25,
        height: 25,
        resizeMode: 'center',
        marginEnd: 16,
        transform: [{ rotate: '180deg' }]
    },
    menuItemBg: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
    },
    menuSideBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16
    },
    sidebarMenuImage: {
        height: 25,
        width: 25,
        alignItems: 'flex-start',
        tintColor: COLOR.gold,
    },
    menuText: {
        fontSize: 16,
        color: COLOR.gold,
        marginLeft: 16,
        fontFamily: FONT.poppins_regular
    },
    sideBarLogo: {
        resizeMode: 'center',
        alignSelf: 'center',
        width: '100%',
        height: 80,
        overflow: 'hidden',
        tintColor: COLOR.gold,
    }
})

export default styles