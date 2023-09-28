import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';

import {colors} from '../../assets';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';

const {width, height} = Dimensions.get('window');

function Chapters({route, navigation}) {
  const token = useSelector(state => state?.appReducer?.token);
  const [chapterData, setChaptersData] = useState([]);

  const req = async () => {
    const headers = {
      'Content-Type': 'application/json',
      signature: 'abcdefghijklmnopQRSTUVWXYz!@#$%&*()0987654321',
    };

    const params = {
      token: token,
    };

    const response = await axios?.get(
      'https://learningpitch.com/api/get-chapters-by-course-id/43/68/',
      {
        headers: headers,
        params: params,
      },
    ); 

    if (response?.data) {

      // const modifiedChapterData = chapterTopics.map((title, index) => {
      //   return {
      //     id: index + 1,
      //     title: title,
      //     count: topicsCount
      //   }
      // })

      const modifiedChapterData = response.data.map((chapter, index) => {
        // const topicsCount = chapter.count_topics.reduce(
        //   (total, topic) => total + topic.total_count,
        //   0
        // );

        let  topicsCount = 0;
        for (let count of chapter?.count_topics) {
          topicsCount += count?.total_count
        }

        let topics = [];
        for(let topic of chapter?.topics) {
          topics.push(topic?.topic_title)
        }

        return {
          id: index + 1,
          title: chapter.chapter_title,
          topicsCount: topicsCount,
          topics: topics
        };
      });

      try {
        // console.log('chapter:', modifiedChapterData);
        setChaptersData(modifiedChapterData);
        return modifiedChapterData;
      } catch (e) {
        console.log('Error:', e);
      }
    } else {
      console.log('This is a chapters error ');
    }
  };

  useEffect(() => {
    req();
  }, []);

  const {name} = route.params;

  return (
    <View style={styles.container}>

      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 25}}>
        {name}
      </Text>
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => navigation.navigate('Progress')}>
        <Text style={styles.analytics}>Course Analytics</Text>
        <Text style={[styles.analytics, {marginLeft: 5}]}>Icon</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <TouchableOpacity>
          <Image
            source={require('../../assets/images/ic_user.png')}
            style={{width: width * 0.16, height: height * 0.08}}
          />
        </TouchableOpacity>
        <View style={styles.innerContainer}>
          <Text style={styles.instrName}>name</Text>
          <Text style={styles.instructor}>Instructor</Text>
        </View>
        <TouchableOpacity style={styles.resumeContainer}>
          <Text style={styles.resume}>Resume</Text>
          <Text> text</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 15, flex: 1}}>
        <FlatList
          data={chapterData}
          contentContainerStyle={{ paddingBottom: '10%' }}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => {navigation.navigate("Topics", {id: item.id, title: item.title, topicCount: item.topicsCount, topics: item.topics})}}>
                <View style={styles.listContainer}>
                  <View style={{width: width*0.13, alignItems: 'center', backgroundColor: colors.primary, borderRadius: 7}}>
                    <Text style={styles.id}>{item.id}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.info}> {item.topicsCount} Topics</Text>
                  </View>
                  <View style={{marginLeft: width * 0.07}}>
                    <Image
                      source={require('../../assets/icons/ic_right_arrow.png')}
                      style={{width: width * 0.02, height: height * 0.017}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

export default Chapters;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    overflow: 'hidden',
    flex: 1
  },
  name: {
    fontWeight: 'bold',
    fontSize: 29,
    color: 'black',
  },
  analytics: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 7,
  },
  imageContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  instrName: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  instructor: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
  },
  innerContainer: {
    marginLeft: 10,
  },
  resumeContainer: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 5,
    marginLeft: '27%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resume: {
    color: 'white',
    fontSize: 15,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderLeftColor: 'lightgray',
    borderRightColor: 'lightgray',
    borderRadius: 7,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 7,
    marginTop: 15,
  },
  id: {
    fontSize: 30,
    color: 'white',
    paddingVertical: 3
  },
  infoContainer: {
    marginLeft: 15,
  },
  name: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    width: width * 0.55,
  },
  info: {
    color: 'gray',
    fontSize: 10,
    marginTop: 4,
  },
});
