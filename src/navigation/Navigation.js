import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {Image, View, TouchableOpacity, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Dashboard from '../screens/Dashboard';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/Menu';
import ProgressScreen from '../screens/Progress';
import NotificationsScreen from '../screens/Notifications';
import Chapters from '../screens/Chapters';
import Topics from '../screens/Topics';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();
const {height, width} = Dimensions.get('window');


export function CustomHeader({ showBackButton}) {
  const navigation = useNavigation();
  const route = useRoute()

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingVertical: 5,
      }}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{width: width*0.07, position: 'absolute', left: 30}}>
            <Image
              source={require('../../assets/icons/ic_back.png')}
              style={{ width: width*0.07, height: height*0.035 }}
            />
          </TouchableOpacity>
        )}
      <Image
        source={require('../../assets/images/logoheader.png')}
        style={{width: width*0.25, height: height*0.06}}
      />
    </View>
  );
}

function NestedstacksScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='dashboardStack' component={Dashboard} options={{headerShown: false}}/>
      <Stack.Screen name='chapters' component={Chapters} options={{headerShown: false}}/>
      <Stack.Screen name='Topics' component={Topics}  options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

function TabsSection() {
  return (
    <BottomTabs.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="dashboard">
      <BottomTabs.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/user.png')}
              style={{width: 20, height: 25}}
            />
          ),
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <BottomTabs.Screen
        name="dashboard"
        component={NestedstacksScreens}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/dashboardIcon.png')}
              style={{width: 25, height: 25}}
            />
          ),
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <BottomTabs.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/progressIcon.png')}
              style={{width: 25, height: 25}}
            />
          ),
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <BottomTabs.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../assets/icons/bell.png')}
              style={{width: 25, height: 25}}
            />
          ),
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        }}
      />
    </BottomTabs.Navigator>
  );
}

function Navigation() {
  const token = useSelector(state => state?.appReducer?.token);
  console.log('token: ', token);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? 'BottomTabs' : 'loginScreen'}>
        <Stack.Screen
          name="BottomTabs"
          component={TabsSection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
