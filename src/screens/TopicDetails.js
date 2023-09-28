import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';

import {CustomHeader} from '../navigation/Navigation';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {colors} from '../../assets';

const {height, width} = Dimensions.get('window');

function TopicDetails({route}) {
  const token = useSelector(state => state?.appReducer?.token);
  const [topicData, setTopicData] = useState([]);
  const [prevTopic, setPrevTopic] = useState([]);
  const [nextTopic, setNextTopic] = useState([])
  const [currentIndex, setCurrentIndex] = useState(1);

  const {name, id, topics, currIndex} = route.params;

  const req = async () => {
    const header = {
      'Content-Type': 'application/json',
      signature: 'abcdefghijklmnopQRSTUVWXYz!@#$%&*()0987654321',
    };

    const params = {
      token: token,
    };

    const response = await axios?.get(
      `https://learningpitch.com/api/get-topic-by-id/43/${id}`,
      {
        headers: header,
        params: params,
      },
    );

    if (response?.data) {

        const currentTopic = response?.data?.topic;
        const prevTopic =  response?.data?.prev_topic;
        const nextTopic = response?.data?.next_topic;

        const modifiedCurrentTopic = Object.keys(currentTopic).map((key) => {
            return {
                title: currentTopic[key]?.topic_title
            };
        });

      try {
        
        console.log('Topic Detail:', modifiedCurrentTopic);
        setTopicData({current: currentTopic, prev: prevTopic, next: nextTopic});
        return response?.data?.topic?.topic_title;
      } catch (e) {
        console.log('Error:', e);
      }
    } else {
      console.log('No data is found');
    }
  };

  useEffect(() => {
    req();
  }, []);

//   function goPrev() {
//     if (currentIndex >= 1) {
//         setCurrentIndex(currentIndex-1)
//     }
//   }

//   function goNext() {
//     if (currentIndex <=1 ) {
//         setCurrentIndex(currentIndex+1)
//     }
//     }

  return (
    <>
      <CustomHeader showBackButton={true} />
      <View style={styles.container}>
        <View style={{ height: height*0.7}}>
          <View style={styles.topicContainer}>
            <Text style={styles.topicName}>{name}</Text>
            <Image
              source={require('../../assets/icons/bookmark_outline.png')}
              style={{width: width * 0.06, height: height * 0.035}}
            />
          </View>
          <View>
            
            <Text style={{color: 'black', marginTop: 20}}>{topicData.current}</Text>
          </View>
        </View>
        <View style={styles.footerButtons}>
          <Pressable style={({pressed}) => [styles.leftButton, pressed ? styles.pressed : null]}>
            <Image
              source={require('../../assets/icons/ic_left_arrow.png')}
              style={{width: width * 0.04, height: height * 0.025}}
            />
            <Text numberOfLines={2} style={styles.buttonText}>{topicData.prev}</Text>
          </Pressable>
          <Pressable style={({pressed}) => [styles.rightButton, pressed ? styles.pressed : null]}>
            <Text numberOfLines={2} style={styles.buttonText}>{topicData.next}</Text>
            <Image
              source={require('../../assets/icons/ic_right_arrow.png')}
              style={{width: width * 0.04, height: height * 0.025}}
            />
          </Pressable>
        </View>
      </View>
    </>
  );
}

export default TopicDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.03,
  },
  topicContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicName: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    width: width * 0.8,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignItems: 'center',
    paddingVertical: width*0.05,
  },
  leftButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.grey3,
    borderRadius: 25,
    width: width * 0.42,
    paddingVertical: width * 0.03,
    paddingHorizontal: 10,
  },
  rightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 25,
    width: width * 0.42,
    paddingVertical: width * 0.03,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    // backgroundColor: 'red',
    width: width*0.3,
    paddingHorizontal: 5
  },
  pressed: {
    opacity: 0.75
  }
});
