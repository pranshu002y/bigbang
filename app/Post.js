import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
const Post = () => {
  const [unsplash, setUnsplash] = useState([]);
  const [likes, setLikes] = useState({});
  const navigation = useNavigation();
  useEffect(() => {
    fetch("https://api.unsplash.com/photos/?client_id=lCRj-Mv0lFa6C2e5D1KntRtPIviTnTt1en2VCePfzU8")
      .then(r => r.json())
      .then(posts => {
        setUnsplash(posts);
       
        const initialLikes = posts.reduce((acc, post) => {
          acc[post.id] = {count: post.likes, isLiked: false};
          return acc;
        }, {});
        setLikes(initialLikes);
      })
      .catch(error => console.error(error));
  }, []);

  const toggleLike = (id) => {
    setLikes(prevLikes => {
      const isLiked = !prevLikes[id].isLiked;
      const count = prevLikes[id].count + (isLiked ? 1 : -1);
      return {...prevLikes, [id]: {count, isLiked}};
    });
  };

  return (
    <View>
      {unsplash.map((data, index) => (
        <View
          key={index}
          style={{
            paddingBottom: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{uri: data.user.profile_image.medium}}
                style={{width: 40, height: 40, borderRadius: 100}}
              />
              <View style={{paddingLeft: 5}}   >
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {data.user.name}
                </Text>
              </View>
            </View>
            <Feather name="more-vertical" style={{fontSize: 20}} />
          </View>
          <View
            style={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: data.urls.regular}}
              style={{width: '100%', height: 400}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 15,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => toggleLike(data.id)}>
                <AntDesign
                  name={likes[data.id]?.isLiked ? 'heart' : 'hearto'}
                  style={{
                    paddingRight: 10,
                    fontSize: 20,
                    color: likes[data.id]?.isLiked ? 'red' : 'black',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionic
                  name="ios-chatbubble-outline"
                  style={{fontSize: 20, paddingRight: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="navigation" style={{fontSize: 20}} />
              </TouchableOpacity>
            </View>
            <Feather name="bookmark" style={{fontSize: 20}} />
          </View>
          <View style={{paddingHorizontal: 15}}>
            <Text>
              Liked by {likes[data.id]?.isLiked ? 'you and' : ''}{' '}
              {likes[data.id]?.count} others
            </Text>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 14,
                paddingVertical: 2,
              }}  
              // onPress={() =>
              //   navigation.navigate('Search')}
                >
              If you enjoy the photo, please like and comment!
            </Text>
            <Text style={{opacity: 0.4, paddingVertical: 2}}>
              View all comments
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: data.user.profile_image.medium}}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    backgroundColor: 'orange',
                    marginRight: 10,
                  }}
                />
                <TextInput
                  placeholder="Add a comment "
                  style={{opacity: 0.5}}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Entypo
                  name="emoji-happy"
                  style={{fontSize: 15, color: 'lightgreen', marginRight: 10}}
                />
                <Entypo
                  name="emoji-neutral"
                  style={{fontSize: 15, color: 'pink', marginRight: 10}}
                />
                <Entypo
                  name="emoji-sad"
                  style={{fontSize: 15, color: 'red'}}
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Post;
