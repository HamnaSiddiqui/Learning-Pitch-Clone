import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {colors} from '../../assets';
import {useState} from 'react';
import {CustomHeader} from '../navigation/Navigation';

const {width, height} = Dimensions.get('window');

function Topics({navigation, route}) {
  const {id, title, topicCount, topics, topicId} = route.params;
  const [completedTopics, setCompletedTopics] = useState([]);

  const topicsWithIds = topics.map((title, index) => {
    return {
      title: title,
      topicId: topicId[index], 
    };
  });
  

  return (
    <>
      <CustomHeader showBackButton={true} />
      <View style={{paddingHorizontal: 20, paddingTop: 10, flex: 1}}>

        <View>
          <View style={styles.listContainer}>
            <View
              style={{
                width: width * 0.13,
                alignItems: 'center',
                backgroundColor: colors.primary,
                borderRadius: 7,
              }}>
              <Text style={styles.id}>{id}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.info}> {topicCount} Topics</Text>
            </View>
          </View>
        </View>

        <View
          style={styles.topicsContainer}>
          {topics && topics.length ? (
            <FlatList
              data={topicsWithIds}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{borderRadius: 10,
                overflow: 'hidden'}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? 'lightgray' : colors.light_grey,
                    }}
                    onPress={() => navigation.navigate('TopicDetails', {name: item.title, id: item.topicId, topics: topics, currIndex: index})}
                    >
                    <View style={styles.markCompleteContainer}>
                      {completedTopics.length == 0 ? (
                        <View
                          style={styles.emptyMark}></View>
                      ) : (
                        <Image
                          source={require('../../assets/icons/checked.png')}
                          style={{width: width * 0.04, height: height * 0.02}}
                        />
                      )}

                      <Text style={styles.topicName}>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 60,
              }}>
              <Text style={{color: 'black', fontSize: 15}}>
                No topics available.
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

export default Topics;

const styles = StyleSheet.create({
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
    paddingVertical: 3,
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
  topicsContainer: {
    marginTop: 20,
    flex: 1,
    marginBottom: 20
  },
  markCompleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 9,
    marginLeft: 5,
  },
  emptyMark: {
    width: width * 0.04,
    height: height * 0.02,
    backgroundColor: 'white',
    borderRadius: 25,
    marginLeft: 5,
  },
  topicName: {
    color: 'black', 
    fontSize: 13,
    paddingRight: width*0.1,
    marginLeft: width * 0.05
}, 
pressed: {
  opacity: 0.75
}
});
