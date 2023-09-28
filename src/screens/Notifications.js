import {View, Text} from 'react-native';
import { CustomHeader } from '../navigation/Navigation';

function NotificationsScreen() {
    return (
        <>
        <CustomHeader showBackButton={false} />
        <View><Text>MEnu</Text></View>
        </>
    )
}

export default NotificationsScreen;