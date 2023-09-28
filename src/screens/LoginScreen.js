import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {loginUser} from '../redux/actions/authActions';

const {width, height} = Dimensions.get('window');

function LoginScreen({navigation}) {
  const logoWidth = width * 0.35;
  const logoHeight = height * 0.35;

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Error, setError] = useState(undefined);
  const [passwordVisible, setPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function userInputHandler(enteredText) {
    setUsername(enteredText);
  }

  function passInputHandler(enteredText) {
    setPassword(enteredText);
  }

  async function handleLogin() {
    if (username === '' || password === '') {
      setError(true);
    } else {
      try {
        const res = await dispatch(loginUser(username, password));
        setError(undefined);
        navigation.navigate('dashboardStack');
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.logo}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{width: logoWidth, height: logoHeight, resizeMode: 'contain'}}
        />
      </View>
      <Text style={styles.text}>Login</Text>
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/email.png')}
          style={{width: 22, height: 20}}
        />
        <TextInput
          placeholder={'Email Address'}
          style={styles.element}
          placeholderTextColor={'gray'}
          onChangeText={userInputHandler}
          value={username}
          cursorColor={'black'}
        />
      </View>
      <View style={styles.container}>
        <Image
          source={require('../../assets/icons/lock.png')}
          style={{width: 17, height: 20}}
        />
        <TextInput
          placeholder={'Password'}
          style={styles.element}
          placeholderTextColor={'gray'}
          onChangeText={passInputHandler}
          value={password}
          cursorColor={'black'}
          secureTextEntry={!passwordVisible}
        />
        {passwordVisible ? (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={require('../../assets/icons/eyehide.png')}
              style={{width: 26, height: 18, marginLeft: 10}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={require('../../assets/icons/eye.png')}
              style={{width: 26, height: 18, marginLeft: 10}}
            />
          </TouchableOpacity>
        )}
      </View>
      {Error && <Text style={styles.error}>{Error}</Text>}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Or login with Social Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../../assets/icons/google.png')}
            style={{width: 25, height: 25}}
          />
          <Text style={styles.googleText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
(' ');

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: '80%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 22,
    marginBottom: 20,
    marginTop: 15,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    width: '79%',
    // elevation: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  forgotContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '75%',
  },
  forgotText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  buttonContainer: {
    marginTop: 25,
    width: '73%',
  },
  signInButton: {
    borderRadius: 8,
    backgroundColor: '#EA4524',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  socialButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  socialText: {
    fontSize: 13,
    color: 'gray',
  },
  googleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 15,
    borderColor: '#EA4524',
  },
  googleIcon: {
    paddingRight: 10,
  },
  googleText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#EA4524',
    // paddingRight: 10,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    width: '75%',
    // elevation: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  element: {
    paddingLeft: 10,
    fontSize: 15,
    color: 'black',
    width: width*0.55
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
