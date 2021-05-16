import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native'
import AntIcon from 'react-native-vector-icons/AntDesign';
import firebaseFirestore from '@react-native-firebase/firestore';
import firebaseAuth from '@react-native-firebase/auth';
const {height, width} = Dimensions.get('window');

const Details = props => {
  const isFocused = useIsFocused()
  const control = async() => {}
  const [loggedInUser, setLoggedInUser] = useState({});
  const [users, setUsers] = useState({});
  /**
   * all users  and login user
   */
  const getAsyncData = () => {
    try {
      firebaseFirestore()
        .collection('users')
        .onSnapshot(querySnap => {
          let usersList = [];
          querySnap.forEach(docSnap => {
            usersList.push({...docSnap.data(), id: docSnap.id});
          });
          setUsers(usersList);
        });
      firebaseFirestore()
        .collection('users')
        .doc(firebaseAuth().currentUser.uid)
        .get()
        .then(docSnap => {
          setLoggedInUser({...docSnap.data(), id: docSnap.id});
        });
    } catch (err) {}
  };
  /**
   * use effect
   */
  useEffect(() => {
    control()
    getAsyncData();
  }, [isFocused,props]);

  const getImage = gender => {
    switch (gender) {
      case 'male':
        return (
          <Image
            style={{height: 105, width: 115}}
            source={require('../assets/prf.png')}
          />
        );

      case 'female':
        return (
          <Image
            style={{height: 105, width: 115}}
            source={require('../assets/fml.png')}
          />
        );

      default:
        break;
    }
  };

  const Data = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => props.navigation.navigate('UserProfile', {data: item})}>
        <View
          style={{
            marginLeft: 5,
            width: width * 0.87,
            height: height * 0.17,
            backgroundColor: 'rgba(255, 205, 210, 0.7)',
            alignSelf: 'center',
            flexDirection:'row',
            // justifyContent:'center'
            alignItems:'center',
            borderRadius: 5,
            borderBottomColor:'#e91e63',
            borderBottomWidth: 5
          }}>
          {item.image.length ? (
            <Image
              style={{marginLeft: 3, height: 105, width: 110, borderRadius: 20}}
              source={{uri: item.image}}
            />
          ) : (
            getImage(item.gender)
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

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [props])

  // console.log( users.filter((e) => loggedInUser  && Array.isArray(loggedInUser.blocks) && !loggedInUser.blocks.includes(e.id) ) ,'loginuser')
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
            onPress={() => props.navigation.openDrawer()}>
            <AntIcon name="bars" style={{fontSize: height * 0.05}} />
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
            All Users
          </Text>
        </View>
      </View>
      <View style={{height: height * 0.85}}>
        
        <FlatList
          data={
            users.length &&
            users.filter(e => e.id !== firebaseAuth().currentUser.uid)
            .filter((e) => loggedInUser  && Array.isArray(loggedInUser.blocks) && !loggedInUser.blocks.includes(e.id))
          }
          renderItem={Data}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#F0F4C3',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 15,
    height: height * 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    // borderWidth: 5,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 10},
    shadowOpacity: 5,
    elevation: 3,
    shadowRadius: 5,
  },
  title: {
    // backgroundColor: 'pink',
    width: width * 0.56,
    height: height * 0.04,
    fontSize: 16,
    textAlign: 'center',
    color: 'green',
  },
  viewType: {
    marginLeft: 5,
    // backgroundColor: 'white',
    width: width * 0.54,
    height: height * 0.14,
  },
  info: {
    marginTop: 2,
    fontSize: 14,
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
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Details;
