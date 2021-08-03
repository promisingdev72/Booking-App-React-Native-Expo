import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { COLOR } from '../../colors'
import { FONT } from '../../fonts'

const styles = StyleSheet.create({
    shadowView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginHorizontal: 15,
        borderRadius: 7,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        shadowColor: '#333',
        elevation: 2,
        marginBottom: 10
    },
    containerView: {
        flex: 1.0,
        flexDirection: 'row',
        borderRadius: 7,
        overflow: 'hidden',
        height: 100,
    },
    imageView: {
        height: 100,
        width: 100,
        borderRadius: 7,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    descContainer: {
        flex: 1.0,
        flexDirection: 'column',
        padding: 10,
    },
    descTitle: {
        fontFamily: FONT.poppins_medium,
        color: '#141414',
        fontSize: 14,
    },
    descText: {
        fontFamily: FONT.poppins_regular,
        color: '#333333',
        fontSize: 14,
    }
})

export default styles