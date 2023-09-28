import {View, Text} from 'react-native';
import { CustomHeader } from '../navigation/Navigation';

function ProgressScreen() {
    return (
        <>
        <CustomHeader showBackButton={false} />
        <View><Text>MEnu</Text></View>
        </>
    )
}

export default ProgressScreen;