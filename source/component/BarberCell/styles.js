import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    containerView: {
        flexDirection: 'row',
        marginTop: 8,
        marginHorizontal: 10
    },
    profileShadowView: {
        flex: 1.0,
        borderRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        shadowColor: '#333',
        elevation: 2,
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10
    },
    profileImage: {
        height: 40,
        width: 40,
        backgroundColor: '#efefef',
        borderRadius: 20,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    profileDescView: {
        flex: 1.0,
        marginRight: 10,
        flexDirection: 'column',
        alignSelf: 'center',
    },
    profileTitle: {
        fontFamily: FONT.poppins_semibold,
        color: '#141414',
        fontSize: 14,
    },
    profileDesc: {
        fontFamily: FONT.poppins_regular,
        color: '#333333',
        fontSize: 12,
    },
    checkContainer: {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginRight: 20,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center'
    },
    checkIcon: {
        height: 10,
        width: 10,
        alignSelf: 'center',
    }
})

export default styles