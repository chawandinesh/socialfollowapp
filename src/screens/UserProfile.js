import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Alert,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import firebaseFireStore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {DatingAppContext} from '../context/Context';
const {height, width} = Dimensions.get('window');

function UserProfile(props) {
  const [user, setUser] = useState({});
  const data = props.route.params.data;

  /**
   * Like handle, dislike remove
   */
  const handleLike = item => {
    if (
      data.likes.includes(firebaseAuth().currentUser.uid) &&
      user.userActions.likes.includes(data.id)
    ) {
      console.log('already there');
      alert('Already Liked');
    } else {
      firebaseFireStore()
        .collection('users')
        .doc(firebaseAuth().currentUser.uid)
        .update({
          ...user,
          userActions: {
            ...user.userActions,
            likes: [...user.userActions.likes, item.id],
            disLikes: user.userActions.likes.filter(e => e !== item.id),
          },
        });

      firebaseFireStore()
        .collection('users')
        .doc(item.id)
        .update({
          ...data,
          likes: [...data.likes, firebaseAuth().currentUser.uid],
          disLikes: data.disLikes.filter(
            e => e !== firebaseAuth().currentUser.uid,
          ),
        })
        .then(res => {
          Alert.alert('Success', 'Like done successfully', [
            {text: 'OK', onPress: () => props.navigation.goBack()},
          ]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  /**
   * dislike handle, like remove
   */
  const handleDislike = item => {
    if (
      data.disLikes.includes(firebaseAuth().currentUser.uid) &&
      user.userActions.disLikes.includes(data.id)
    ) {
      console.log('already there');
      alert('Already disLiked');
    } else {
      firebaseFireStore()
        .collection('users')
        .doc(firebaseAuth().currentUser.uid)
        .update({
          ...user,
          userActions: {
            ...user.userActions,
            disLikes: [...user.userActions.disLikes, item.id],
            likes: user.userActions.disLikes.filter(e => e !== item.id),
          },
        });

      firebaseFireStore()
        .collection('users')
        .doc(item.id)
        .update({
          ...data,
          disLikes: [...data.disLikes, firebaseAuth().currentUser.uid],
          likes: data.likes.filter(e => e !== firebaseAuth().currentUser.uid),
        })
        .then(res => {
          Alert.alert('Success', 'Dislike done successfully', [
            {text: 'OK', onPress: () => props.navigation.goBack()},
          ]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  /**
   * approach handle
   */
  const handleApproach = item => {
    if (
      data.approach.includes(firebaseAuth().currentUser.uid) &&
      user.userActions.approach.includes(data.id)
    ) {
      console.log('already there');
      alert('already approached');
    } else {
      firebaseFireStore()
        .collection('users')
        .doc(firebaseAuth().currentUser.uid)
        .update({
          ...user,
          userActions: {
            ...user.userActions,
            approach: [...user.userActions.approach, item.id],
          },
        });

      firebaseFireStore()
        .collection('users')
        .doc(item.id)
        .update({
          ...data,
          approach: [...data.approach, firebaseAuth().currentUser.uid],
        })
        .then(res => {
          Alert.alert('Success', 'Approach done successfully', [
            {text: 'OK', onPress: () => props.navigation.goBack()},
          ]);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    firebaseFireStore()
      .collection('users')
      .doc(firebaseAuth().currentUser.uid)
      .onSnapshot(docSnap => {
        setUser({...docSnap.data(), id: docSnap.id});
      });
  }, []);
  return (
    <ImageBackground
      source={require('../assets/Dbk.jpeg')}
      style={{height, width}}>
      <View
        style={{
          marginTop: height * 0.04,
          width: width * 1,
          height: height * 0.06,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View>
          <TouchableOpacity
            style={{justifyContent: 'center', padding: 5}}
            onPress={() => props.navigation.goBack()}>
            <AntIcon name="arrowleft" style={{fontSize: height * 0.05}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width * 0.8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: height * 0.03,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Profile
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width * 0.45,
          height: height * 0.22,
          // backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          flexDirection: 'row',
        }}>
        {/* {data.image == '' ? (
          <View
            style={{
              width: width * 0.45,
              height: height * 0.2,
              backgroundColor: 'pink',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {data.gender == 'male' ? (
              <Fontisto name="male" style={{fontSize: height * 0.08}} />
            ) : (
              <Fontisto name="female" style={{fontSize: height * 0.08}} />
            )}
          </View>
        ) : (
          <Image
            source={{uri: data.image}}
            style={{width: width * 0.45, height: height * 0.2}}
          />
        )} */}
        <View
          style={{
            marginLeft: 10,
            width: width * 0.45,
            height: height * 0.2,
            backgroundColor: 'pink',
            borderRadius: 100,
            borderWidth: 4,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <EntypoIcon
            name="images"
            style={{fontSize: height * 0.15, alignSelf: 'auto'}}
          /> */}
          {data.image == '' ? (
            <View
              style={{
                width: width * 0.45,
                height: height * 0.2,
                // backgroundColor: 'pink',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {data.gender == 'male' ? (
                <Fontisto name="male" style={{fontSize: height * 0.08}} />
              ) : (
                <Fontisto name="female" style={{fontSize: height * 0.08}} />
              )}
            </View>
          ) : (
            <Image
              source={{uri: data.image}}
              style={{width: width * 0.45, height: height * 0.2}}
            />
          )}
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          width: width * 0.95,
          height: height * 0.7,
          backgroundColor: '#DCEDC8',
          alignSelf: 'center',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderWidth: 5,
        }}>
        <View
          style={{
            marginTop: 20,
            width: width * 0.95,
            height: height * 0.09,
            // backgroundColor: 'pink',
            alignSelf: 'center',
            borderBottomColor: 'black',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderBottomWidth: 5,
            borderRightWidth: 5,
            borderLeftWidth: 5,
          }}>
          <View
            style={{
              marginTop: 5,
              width: width * 0.8,
              height: height * 0.075,
              // backgroundColor:'white',
              borderBottomWidth: 2,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                padding: 15,
                width: width * 0.75,
                height: height * 0.1,
                //  backgroundColor: 'yellow',
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                color: 'red',
              }}>
              {data.userName}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            width: width * 0.95,
            height: height * 0.17,
            // backgroundColor: 'pink',
            alignSelf: 'center',
            borderBottomColor: 'black',
            borderRadius: 25,
            borderWidth: 5,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 5,
              width: width * 0.2,
              height: height * 0.03,
              // backgroundColor: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Details :
          </Text>
          <View
            style={{
              marginTop: 5,
              width: width * 0.87,
              height: height * 0.112,
              // backgroundColor: 'white',
              borderBottomWidth: 2,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                padding: 5,
                width: width * 0.86,
                height: height * 0.095,
                //  backgroundColor: 'yellow',
                textAlign: 'justify',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#33691E',
              }}>
              {data.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            width: width * 0.95,
            height: height * 0.09,
            // backgroundColor: 'pink',
            alignSelf: 'center',
            alignItems: 'center',
            // borderWidth: 3,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => handleLike(data)}
            style={{
              width: width * 0.42,
              height: height * 0.07,
              backgroundColor: '#B3E5FC',
              alignItems: 'center',
              // justifyContent: 'center',
              marginLeft: 14,
              borderTopLeftRadius: 15,
              borderBottomRightRadius: 15,
              borderWidth: 5,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                padding: 5,
                marginLeft: 5,
                width: width * 0.23,
                height: height * 0.05,
                // backgroundColor: 'yellow',
                textAlign: 'center',
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Like
            </Text>
            <AntIcon name="like1" style={{fontSize: height * 0.04}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDislike(data)}
            style={{
              width: width * 0.42,
              height: height * 0.07,
              backgroundColor: '#B3E5FC',
              alignItems: 'center',
              // justifyContent: 'center',
              marginLeft: 15,
              borderTopRightRadius: 15,
              borderBottomLeftRadius: 15,
              borderWidth: 5,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                padding: 5,
                marginLeft: 5,
                width: width * 0.29,
                height: height * 0.05,
                // backgroundColor: 'yellow',
                textAlign: 'center',
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: 'black',
              }}>
              Dislike
            </Text>
            <AntIcon name="dislike1" style={{fontSize: height * 0.04}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            width: width * 0.95,
            height: height * 0.18,
            backgroundColor: '#c1e1c5',
            alignSelf: 'center',
            // alignItems: 'center',
            borderWidth: 3,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              marginLeft: 5,
              marginTop: 5,
              width: width * 0.9,
              height: height * 0.06,
              // backgroundColor: 'white',
              fontWeight: 'bold',
              fontSize: 40,
              // color:'green'
            }}>
            Want to approach :
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                width: width * 0.42,
                height: height * 0.07,
                backgroundColor: '#7bdcb5',
                alignItems: 'center',
                marginLeft: 14,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                borderWidth: 5,
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => handleApproach(data)}>
                <Text
                  style={{
                    padding: 5,
                    marginLeft: 1,
                    width: width * 0.4,
                    height: height * 0.05,
                    // backgroundColor: 'yellow',
                    textAlign: 'center',
                    fontSize: height * 0.03,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                width: width * 0.42,
                height: height * 0.07,
                backgroundColor: '#7bdcb5',
                alignItems: 'center',
                marginLeft: 15,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
                borderWidth: 5,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  padding: 5,
                  marginLeft: 5,
                  width: width * 0.4,
                  height: height * 0.05,
                  // backgroundColor: 'yellow',
                  textAlign: 'center',
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
export default UserProfile;
