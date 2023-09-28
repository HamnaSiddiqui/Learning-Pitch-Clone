import {StyleSheet, View, Text, TouchableOpacity, Image, Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../redux/actions/authActions';
import {Data} from '../components/DashboardData';
import { CustomHeader } from '../navigation/Navigation';

function MenuScreen({navigation}) {
  const dispatch = useDispatch();

  async function logoutHandler() {
    try {
      await dispatch(logoutUser());
      navigation.navigate('loginScreen');
    } catch (e) {
      console.log('error', e);
    }
  }

  return (
    <>
    <CustomHeader showBackButton={false} />
    <View>
      {Data.map(item => {
        return (
          <Pressable style={({pressed})=> [styles.dataContainer, pressed && styles.pressed]} key={item.name}>
            <Image
              source={item.image}
              style={{width: 25, height: 22, marginRight: 20}}
            />
            <Text key={item.name} style={styles.dataText}>
              {item.name}
            </Text>
          </Pressable>
        );
      })}
      <TouchableOpacity onPress={logoutHandler} style={{flexDirection: 'row'}} style={{marginTop: "60%", marginLeft: 10, flexDirection: 'row', maxWidth: "40%"}}>
        <Image
          source={require('../../assets/icons/logout.png')}
          style={{width: 29, height: 29, marginRight: 10}}
        />
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingVertical: 19,
    paddingLeft: 10,
  },
  dataText: {
    color: 'black',
    fontSize: 16,
  },
  logout: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  pressed: {
    backgroundColor: 'lightgray'
  }
});
