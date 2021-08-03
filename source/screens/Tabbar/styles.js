import { StyleSheet } from 'react-native';
import { COLOR } from '../../colors'

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabround: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: COLOR.black,
        justifyContent: 'center',
        top: -10
    },
    tabroundImage: {
        tintColor: '#CBA23A',
        height: 28,
        width: 28,
        alignSelf: 'center',
    },
    imageTint: {
        height: 28,
        width: 28,
        alignSelf: 'center',
        tintColor: COLOR.gold
    },
    image: {
        height: 28,
        width: 28,
        alignSelf: 'center',
        tintColor: '#d4d4d4'
    }
})

export default styles;