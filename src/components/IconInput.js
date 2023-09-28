// import {TextInput, StyleSheet, View, Image} from 'react-native';
// import { useState } from 'react';

// function IconInput({source, placeholder}) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');


//   function userInputHandler(enteredText) {
//     setUsername(enteredText)
//   };

//   function passInputHandler(enteredText) {
//     setPassword(enteredText)
//   };
//   return (
//     <View style={styles.container}>
//       <Image source={source} style={{width: 17, height: 20}} />
//       <TextInput placeholder={placeholder} style={styles.element}  placeholderTextColor={'gray'} handler={handler} value={value} />
//     </View>
//   );
// }

// export default IconInput;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 10,
//     borderWidth: 0.5,
//     borderColor: 'gray',
//     width: '75%',
//     // elevation: 1,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   element: {
//     paddingLeft: 10,
//     fontSize: 15,
//     color: '#EA4524',
//   },
// });
