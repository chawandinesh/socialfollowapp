import React, {Component, useState} from 'react';
import {
  ImageBackground,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import firebaseFireStore from '@react-native-firebase/firestore';
import firebaeAuth from '@react-native-firebase/auth';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {DatingAppContext} from '../context/Context';
const {height, width} = Dimensions.get('window');
const DATA = [
  {
    name: 'Dinesh Chandra',
    age: 25,
    image: require('../assets/prf.png'),
  },
  {
    name: 'Vikas Kumar',
    age: 21,
    image: require('../assets/prf.png'),
  },
  {
    name: 'Happy Singh',
    age: 22,
    image: require('../assets/prf.png'),
  },
  {
    name: 'Amit Kumar',
    age: 27,
    image: require('../assets/prf.png'),
  },
  {
    name: 'Pawan Yadav',
    age: 24,
    image: require('../assets/prf.png'),
  },
];

const AllDetails = props => {
  const [filterUserType, setFilterUserType] = useState('Approach');
  const [users, setUsers] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  console.log(profileInfo, 'profileinfo');
  // const profileInfo = state.hasOwnProperty('profileInfo') && state.profileInfo;
  const getConfirm = e => {
    if (e == filterUserType) {
      return true;
    } else {
      return false;
    }
  };

  const getUser = () => {
    firebaseFireStore()
      .collection('users')
      .doc(firebaeAuth().currentUser.uid)
      .onSnapshot(data => {
        console.log(data);
      });
  };

  const getUsers = () => {
    switch (filterUserType) {
      case 'AllUsers':
        return users;
      case 'ShortListed':
        return users.filter(
          e => profileInfo && profileInfo.likes.includes(e.id),
        );
      case 'Approach':
        return users.filter(
          e => profileInfo && profileInfo.approach.includes(e.id),
        );
      case 'Rejected':
        return users.filter(
          e => profileInfo && profileInfo.disLikes.includes(e.id),
        );
      default:
        return [];
    }
  };

  React.useEffect(() => {
    firebaseFireStore()
      .collection('users')
      .doc(firebaeAuth().currentUser.uid)
      .get()
      .then(res => {
        setProfileInfo({...res.data(), id: res.id});
      });
    firebaseFireStore()
      .collection('users')
      .onSnapshot(querySnap => {
        let users = [];
        querySnap.forEach(e => {
          users.push({...e.data(), id: e.id});
        });
        setUsers(users.filter(e => e.id !== firebaeAuth().currentUser.uid));
      });
  }, []);

  const Data = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('UserProfile', {data: item})}>
        <View style={styles.item}>
          {item.image == '' ? (
            <View
              style={{
                width: 115,
                height: 105,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {item.gender == 'male' ? (
                <Fontisto name="male" style={{fontSize: 50}} />
              ) : (
                <Fontisto name="female" style={{fontSize: 50}} />
              )}
            </View>
          ) : (
            <Image
              style={{height: 105, width: 115}}
              source={item.image === '' ? null : item.image}
            />
          )}
          <View style={styles.viewType}>
            <Text style={styles.info}>Name:</Text>
            <Text style={styles.title}>{item.userName}</Text>
            <View style={styles.line}></View>
            <Text style={styles.info}>Age:</Text>
            <Text style={styles.ageType}>{item.age}</Text>
            <View style={styles.line}></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
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
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => setFilterUserType('AllUsers')}
          style={{
            height: height * 0.08,
            width: width * 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getConfirm('AllUsers') ? '#fff' : null,
            borderRadius: getConfirm('AllUsers') ? height * 0.05 : 0,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: height * 0.03,
              fontWeight: 'bold',
              color: 'black',
            }}>
            All Users{' '}
            {getConfirm('AllUsers') ? (
              <AntIcon name="check" style={{fontSize: height * 0.03}} />
            ) : null}
          </Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{justifyContent: 'center', padding: 5}}
            onPress={() => props.navigation.navigate('Profile')}>
            {false ? (
              <AntIcon name="user" style={{fontSize: height * 0.03}} />
            ) : (
              <Image
                source={require('../assets/bg1.jpg')}
                style={{
                  height: height * 0.05,
                  borderRadius: height * 0.05,
                  width: height * 0.05,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 15,
          width: width * 0.97,
          height: height * 0.08,
          backgroundColor: '#DCEDC8',
          borderRadius: 20,
          borderWidth: 3,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => setFilterUserType('Approach')}
          style={{
            width: width * 0.31,
            height: height * 0.06,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getConfirm('Approach') ? 'white' : null,
            borderRadius: getConfirm('Approach') ? 20 : 0,
          }}>
          <Text
            style={{
              width: width * 0.3,
              height: height * 0.035,
              textAlign: 'center',
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Approach
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterUserType('ShortListed')}
          style={{
            width: width * 0.31,
            height: height * 0.06,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getConfirm('ShortListed') ? 'white' : null,
            borderRadius: getConfirm('ShortListed') ? 20 : 0,
          }}>
          <Text
            style={{
              width: width * 0.3,
              height: height * 0.035,
              textAlign: 'center',
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Shortlised
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterUserType('Rejected')}
          style={{
            width: width * 0.31,
            height: height * 0.06,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getConfirm('Rejected') ? 'white' : null,
            borderRadius: getConfirm('Rejected') ? 20 : 0,
          }}>
          <Text
            style={{
              width: width * 0.3,
              height: height * 0.035,
              textAlign: 'center',
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Rejected
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height: height * 0.75, marginTop: 15}}>
        {getUsers().length ? (
          <FlatList
            data={getUsers()}
            renderItem={Data}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{
              height: height * 0.7,
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: height * 0.2,
                width: width * 0.7,
                borderRadius: height * 0.2,
                borderWidth: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: height * 0.03, fontWeight: 'bold'}}>
                No users Found
              </Text>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#DCEDC8',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 5,
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 5,
    elevation: 3,
    shadowRadius: 5,
  },
  title: {
    // backgroundColor: 'pink',
    width: width * 0.56,
    height: height * 0.04,
    fontSize: 22,
    textAlign: 'center',
    color: 'green',
  },
  viewType: {
    marginLeft: 5,
    // backgroundColor: 'white',
    width: width * 0.56,
    height: height * 0.14,
  },
  info: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 1,
    color: 'red',
  },
  line: {
    width: width * 0.55,
    height: height * 0.004,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  ageType: {
    marginTop: 1,
    // backgroundColor: 'pink',
    width: width * 0.56,
    height: height * 0.04,
    fontSize: 22,
    textAlign: 'center',
  },
});

export default AllDetails;
