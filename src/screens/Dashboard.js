import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {colors} from '../../assets';
import {performApiRequest} from '../redux/actions/appActions';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import { CustomHeader } from '../navigation/Navigation';

const {width, height} = Dimensions.get('window');

const Dashboard = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const token = useSelector(state => state?.appReducer?.token);

  const req = async () => {
    if (token) {
      try {
        const courses = await performApiRequest(token);
        setUserData(courses);
        console.log('User:', courses);
      } catch (e) {
        console.log('Error:', e);
      }
    }
  };

  useEffect(() => {
    req();
  }, []);

  return (
    <>
    <CustomHeader showBackButton={false} />
    <View>
      <Text style={{color: 'black'}}>.</Text>
      <View style={{flexDirection: 'row', marginHorizontal: 5}}>
        <FlatList
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("chapters", {name: item})}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/CFAP.png')}
                  style={styles.image}
                />
              </View>
              <Text style={styles.text}>{item}</Text>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.status}></View>
                <Text style={styles.statusPercent}>0% completed</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGrey,
    marginRight: 5,
    borderRadius: 5,
    width: width * 0.48,
    height: height * 0.3,
  },
  imageContainer: {
    position: 'relative',
    // backgroundColor: 'red',
    width: '100',
    aspectRatio: 1.45,
    overflow: 'hidden',
    borderTopRightRadius: 5,
  },
  image: {
    position: 'absolute',
    top: -20,
    right: -7,
    width: width * 0.37,
    height: height * 0.175,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 10,
    width: width * 0.4,
    height: height * 0.07,
  },
  status: {
    backgroundColor: 'white',
    width: '90%',
    height: '11%',
    borderRadius: 10,
  },
  statusPercent: {
    fontSize: width * 0.029,
    marginTop: 7,
    marginLeft: '40%',
  },
});
