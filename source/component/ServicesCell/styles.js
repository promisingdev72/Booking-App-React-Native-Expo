import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    containerView: {
        flexDirection: 'row',
        backgroundColor: '#141414',
        marginTop: 5
    },
    serviceContainer: {
        flex: 1.0,
        flexDirection: 'column',
        marginHorizontal: 10,
    },
    serviceTitle: {
        fontFamily: FONT.poppins_semibold,
        color: COLOR.gold,
        fontSize: 16,
        marginHorizontal: 10,
        marginTop: 10
    },
    serviceText: {
        fontFamily: FONT.poppins_regular,
        color: '#a0a0a0',
        fontSize: 14,
        marginHorizontal: 10,
        marginBottom: 10
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