import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    containerView: {
        flexDirection: 'row',
    },
    imageView: {
        height: 100,
        width: 100,
        borderRadius: 7,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    dateContainer: {
        flex: 1.0,
        flexDirection: 'column',
        justifyContent: 'center',
        marginVertical: 5
    },
    dateTitle: {
        fontFamily: FONT.poppins_semibold,
        color: '#141414',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 10
    },
    dayText: {
        fontFamily: FONT.poppins_regular,
        color: '#333333',
        fontSize: 12,
        alignSelf: 'center',
        marginBottom: 10
    },
    profileContainer: {
        flex: 1.0,
        padding: 5,
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

})

export default styles