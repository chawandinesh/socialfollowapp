import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  SafeAreaView,
  ImageBackground,
  Animated,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseFirestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon} from 'native-base';
const {width, height} = Dimensions.get('window');
function Signup(props) {
  const [loading, setLoading] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  useEffect(() => {
    if (loading) {
      startShake();
    }
  }, [loading]);
  const [signupState, setSignupState] = useState({
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
  });

  const handleRegister = () => {
    const {email, password, confirmPassword, gender, userName} = signupState;
    if (!email || !password || !confirmPassword || !gender || !userName) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please fill all details',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Passwords not matched',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      setLoading(true);
      firebaseAuth()
        .createUserWithEmailAndPassword(signupState.email, signupState.password)
        .then(res => {
          setLoading(false);
          firebaseFirestore()
            .collection('users')
            .doc(firebaseAuth().currentUser.uid)
            .set({
              userName: signupState.userName,
              email: signupState.email,
              password: signupState.password,
              createdAt: firebaseFirestore.FieldValue.serverTimestamp(),
              age: null,
              gender: signupState.gender,
              description: '',
              image: '',
              likes: [],
              disLikes: [],
              approach: [],
              height: '',
              complexion: '',
              caste:'',
              weight: '',
              interests: '',
              userActions: {
                likes:[],
                disLikes:[],
                approach:[]
              },
              is_active: true,
            })
            .then(result => {
              console.log(result);
            })
            .catch(error => {
              console.log(error, 'error..');
            });
        })
        .catch(err => {
          setLoading(false);
          if (err.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Invalid Email',
              text2: 'Please enter a valid email',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
          }
          if (err.code === 'auth/weak-password') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Weak Password',
              text2: 'Please provide a strong password',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
          }
          if (err.code === 'auth/email-already-in-use') {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Email Already Registered',
              text2: 'Please provide a different mail id',
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 30,
              bottomOffset: 40,
            });
          }
        });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        blurRadius={loading ? 10 : 0}
        source={require('../assets/Dbk.jpeg')}
        style={{height: height, width}}>
        <View
          style={{
            height: height,
            width,
            backgroundColor: loading ? 'rgba(255,255,255,0.5)' : null,
          }}>
          <View
            style={{
              width,
              height: height * 0.1,
              // backgroundColor: 'pink',
              alignContent: 'center',
              marginTop: height * 0.03,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                padding: 5,
                color: 'black',
                alignSelf: 'flex-start',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 50,
              }}>
              Sign Up
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <View
                style={{
                  width: width * 0.5,
                  alignItems: 'center',
                  height: height * 0.1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'flex-end',
                    textAlign: 'right',
                    fontWeight: 'bold',
                    fontSize: 35,
                    color: 'gray',
                  }}>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: height * 0.06,
              width: width * 0.85,
              height: height * 0.6,
              // backgroundColor: '#4D4D4D',
              alignSelf: 'center',
              borderTopColor: 'black',
              borderTopWidth: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 10,
            }}>
            <View
              style={{
                marginTop: 20,
                width: width * 0.8,
                height: height * 0.09,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 5,
                borderBottomColor: 'black',
                borderLeftWidth: 5,
                borderLeftColor: 'black',
                borderRightWidth: 5,
                borderRightColor: 'black',
                borderRadius: 20,
              }}>
              <TextInput
                style={{
                  marginTop: 1,
                  alignSelf: 'center',
                  width: width * 0.7,
                  height: height * 0.07,
                  borderBottomColor: '#F0F4',
                  borderBottomWidth: 4,
                }}
                placeholder="Enter Your Email"
                onChangeText={text =>
                  setSignupState({...signupState, email: text})
                }
                value={signupState.email}
                placeholderTextColor="black"
              />
            </View>
            <View
              style={{
                marginTop: 20,
                width: width * 0.8,
                height: height * 0.09,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 5,
                borderBottomColor: 'black',
                borderLeftWidth: 5,
                borderLeftColor: 'black',
                borderRightWidth: 5,
                borderRightColor: 'black',
                borderRadius: 20,
              }}>
              <TextInput
                style={{
                  marginTop: 1,
                  alignSelf: 'center',
                  width: width * 0.7,
                  height: height * 0.07,
                  borderBottomColor: '#F0F4',
                  borderBottomWidth: 4,
                }}
                onChangeText={text =>
                  setSignupState({...signupState, userName: text})
                }
                value={signupState.userName}
                placeholder="Username"
                placeholderTextColor="black"
              />
            </View>
            {loading ? (
              <Animated.View
                style={{
                  transform: [{translateX: shakeAnimation}],
                  position: 'absolute',
                  top: height * 0.3,
                  left: width * 0.3,
                  zIndex: 10,
                }}>
                <Image
                  source={require('../assets/hrtt.png')}
                  style={{height: height * 0.12, width: height * 0.13}}
                />
              </Animated.View>
            ) : null}
            <View
              style={{
                marginTop: 20,
                width: width * 0.8,
                height: height * 0.09,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 5,
                borderBottomColor: 'black',
                borderLeftWidth: 5,
                borderLeftColor: 'black',
                borderRightWidth: 5,
                borderRightColor: 'black',
                borderRadius: 20,
              }}>
              <TextInput
                style={{
                  marginTop: 1,
                  alignSelf: 'center',
                  width: width * 0.7,
                  height: height * 0.07,
                  borderBottomColor: '#F0F4',
                  borderBottomWidth: 4,
                }}
                onChangeText={text =>
                  setSignupState({...signupState, password: text})
                }
                value={signupState.password}
                placeholder="Enter Your Password"
                placeholderTextColor="black"
              />
            </View>
            <View
              style={{
                marginTop: 20,
                width: width * 0.8,
                height: height * 0.09,
                // backgroundColor: 'pink',
                alignSelf: 'center',
                justifyContent: 'center',
                borderBottomWidth: 5,
                borderBottomColor: 'black',
                borderLeftWidth: 5,
                borderLeftColor: 'black',
                borderRightWidth: 5,
                borderRightColor: 'black',
                borderRadius: 20,
              }}>
              <TextInput
                style={{
                  marginTop: 1,
                  alignSelf: 'center',
                  width: width * 0.7,
                  height: height * 0.07,
                  borderBottomColor: '#F0F4',
                  borderBottomWidth: 4,
                }}
                onChangeText={text =>
                  setSignupState({...signupState, confirmPassword: text})
                }
                value={signupState.confirmPassword}
                placeholder="Repeat Password"
                placeholderTextColor="black"
              />
            </View>
            <View
              style={{
                marginTop: 20,
                width: width * 0.85,
                height: height * 0.07,
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  padding: 10,
                  width: width * 0.25,
                  height: height * 0.07,
                  textAlign: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 30,
                }}>
                Male
              </Text>
              <TouchableOpacity
                onPress={() => setSignupState({...signupState, gender: 'male'})}
                style={{
                  marginLeft: 10,
                  width: width * 0.09,
                  height: height * 0.043,
                  backgroundColor: 'yellow',
                  borderRadius: 20,
                  borderWidth: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                {signupState.gender === 'male' ? (
                  <Icon type="FontAwesome" name="check" />
                ) : null}
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: 10,
                  padding: 10,
                  width: width * 0.31,
                  height: height * 0.07,
                  // backgroundColor: 'white',
                  textAlign: 'center',
                  justifyContent: 'center',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 30,
                }}>
                Female
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setSignupState({...signupState, gender: 'female'})
                }
                style={{
                  marginLeft: 10,
                  width: width * 0.09,
                  height: height * 0.043,
                  backgroundColor: 'yellow',
                  borderRadius: 20,
                  borderWidth: 4,
                  alignSelf: 'center',
                }}>
                {signupState.gender === 'female' ? (
                  <Icon type="FontAwesome" name="check" />
                ) : null}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              padding: 5,
              marginTop: 10,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              width: width * 0.9,
              height: height * 0.09,
              //    backgroundColor: 'pink',
              //   flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => handleRegister()}
              style={{
                //   marginLeft: 1,
                padding: 10,
                backgroundColor: '#F0F4C3',
                height: height * 0.07,
                width: width * 0.85,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: height * 0.04,
                borderWidth: 2,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
          <Toast ref={ref => Toast.setRef(ref)} />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
    // </SafeAreaView>
  );
}
export default Signup;
