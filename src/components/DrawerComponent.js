import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseStorage from '@react-native-firebase/storage';
import firebaseFireStore from '@react-native-firebase/firestore'
import {DrawerContentScrollView} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');
export default function DrawerContent(props) {
  const handleLogout = () => {
    firebaseAuth().signOut();
    AsyncStorage.clear()
  };
  const [loggedInUser, setLoggedInUser] = useState({});
  const getAsyncData = async () => {
    try {
      firebaseFireStore().collection('users').doc(firebaseAuth().currentUser.uid).get().then((res) => {
        setLoggedInUser({...res.data(), id: res.id})
      })
    } catch (err) {}
  };
  useEffect(() => {
    getAsyncData()
  }, [])

  const image = null;
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        <View style={styles.profileImageContainer}>
          {image === null ? (
            <FontAwesome5 name="user-circle" size={height * 0.1} />
          ) : (
            <Image
              style={{
                width: height * 0.16,
                height: height * 0.16,
                borderRadius: height * 0.1,
              }}
              source={{uri: image}}
            />
          )}
        </View>
        <View style={styles.drawerNavigationContainer}>
          <View style={styles.drawerItemsContainer}>
            <View>
              <Text>{loggedInUser.userName}</Text>
            </View>
            <TouchableOpacity
              style={{
                borderTopWidth: 4,
                borderTopColor: '#ee3',
                backgroundColor: '#478',
                width: width * 0.6,
                alignItems: 'center',
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowRadius: 1,
                shadowOpacity: 1,
                paddingVertical: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
              }}
              onPress={() => {
                props.navigation.navigate('ProfileScreen');
              }}>
              <Text style={{color:'#fff', fontSize: height * 0.023, fontWeight:'bold'}}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderTopWidth: 4,
                borderTopColor: '#ee3',
                backgroundColor: '#478',
                width: width * 0.6,
                alignItems: 'center',
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowRadius: 1,
                shadowOpacity: 1,
                paddingVertical: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
              }}
              onPress={() => {
                props.navigation.navigate('AllDetailsScreen');
                setActive('Categories');
              }}>
              <Text style={{color:'#fff', fontSize: height * 0.023, fontWeight:'bold'}}>Users requests</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderTopWidth: 4,
                borderTopColor: '#ee3',
                backgroundColor: '#478',
                width: width * 0.6,
                alignItems: 'center',
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowRadius: 1,
                shadowOpacity: 1,

                paddingVertical: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
              }}
              onPress={() => {
                props.navigation.navigate('AboutUs');
                setActive('Categories');
              }}>
              <Text style={{color:'#fff', fontSize: height * 0.023, fontWeight:'bold'}}>AboutUs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderTopWidth: 4,
                borderTopColor: '#ee3',
                backgroundColor: '#478',
                width: width * 0.6,
                alignItems: 'center',
                elevation: 1,
                shadowColor: '#000',
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowRadius: 1,
                shadowOpacity: 1,
                paddingVertical: 10,
                borderRightWidth: 2,
                borderLeftWidth: 2,
              }}
              onPress={() => {
                props.navigation.navigate('RateUs');
                setActive('Categories');
              }}>
              <Text style={{color:'#fff', fontSize: height * 0.023, fontWeight:'bold'}}>Rate Us</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => handleLogout()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: { backgroundColor:'#fdd', height: height * 0.96},
  profileImageContainer: {
    height: height * 0.14,
    marginBottom: 20,
    width: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerNavigationContainer: {
    height: height * 0.7,
    justifyContent: 'space-between',
  },
  drawerItemsContainer: {
    width: width * 0.7,
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  drawerItem: {
    width: width * 0.7,
    height: height * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutBtn: {
    width: width * 0.7,
    alignItems: 'center',
    backgroundColor: 'darkred',
    height: height * 0.06,
    justifyContent: 'center',
  },
  logoutText: {color: 'white', fontWeight: 'bold'},
});
