// import React, {useContext} from 'react';
// import {
//   SafeAreaView,
//   ImageBackground,
//   Alert,
//   View,
//   Dimensions,
//   Text,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import firebaseFireStore from '@react-native-firebase/firestore';
// import firebaseAuth from '@react-native-firebase/auth';
// import AntIcon from 'react-native-vector-icons/AntDesign';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
// import {DatingAppContext} from '../context/Context';
// const {height, width} = Dimensions.get('window');

// function profilePage(props) {
//   const {state, setState} = useContext(DatingAppContext);
//   // console.log(props.route.params, state)
//   const data = props.route.params.data;
//   console.log(data);
//   const handleLike = item => {
//     if (data.likes.includes(firebaseAuth().currentUser.uid)) {
//       console.log('already there');
//     } else {
//       firebaseFireStore()
//         .collection('users')
//         .doc(item.id)
//         .update({
//           ...data,
//           likes: [...data.likes, firebaseAuth().currentUser.uid],
//           disLikes: data.disLikes.filter(
//             e => e !== firebaseAuth().currentUser.uid,
//           ),
//         })
//         .then(res => {
//           Alert.alert('Success', 'Like done successfully', [
//             {text: 'OK', onPress: () => props.navigation.goBack()},
//           ]);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   };
//   const handleDislike = item => {
//     if (data.disLikes.includes(firebaseAuth().currentUser.uid)) {
//       console.log('already there');
//     } else {
//       firebaseFireStore()
//         .collection('users')
//         .doc(item.id)
//         .update({
//           ...data,
//           disLikes: [...data.disLikes, firebaseAuth().currentUser.uid],
//           likes: data.likes.filter(e => e !== firebaseAuth().currentUser.uid),
//         })
//         .then(res => {
//           Alert.alert('Success', 'Dislike done successfully', [
//             {text: 'OK', onPress: () => props.navigation.goBack()},
//           ]);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   };
//   const handleApproach = item => {
//     if (data.approach.includes(firebaseAuth().currentUser.uid)) {
//       console.log('already there');
//     } else {
//       firebaseFireStore()
//         .collection('users')
//         .doc(item.id)
//         .update({
//           ...data,
//           approach: [...data.approach, firebaseAuth().currentUser.uid],
//         })
//         .then(res => {
//           Alert.alert('Success', 'Approach done successfully', [
//             {text: 'OK', onPress: () => props.navigation.goBack()},
//           ]);
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     }
//   };
//   return (
//     <ImageBackground
//       source={require('.../assets/Dbk.jpeg')}
//       style={{height, width}}>
//       <View
//         style={{
//           marginTop: height * 0.04,
//           width: width * 1,
//           height: height * 0.06,
//           alignItems: 'center',
//           flexDirection: 'row',
//           //   justifyContent: 'center',
//           //    backgroundColor: 'orange',
//         }}>
//         <View>
//           <TouchableOpacity
//             style={{justifyContent: 'center', padding: 5}}
//             onPress={() => props.navigation.goBack()}>
//             <AntIcon name="arrowleft" style={{fontSize: height * 0.05}} />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             //  backgroundColor: 'pink',
//             width: width * 0.8,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text
//             style={{
//               textAlign: 'center',
//               fontSize: height * 0.03,
//               fontWeight: 'bold',
//               color: 'black',
//             }}>
//             Profile
//           </Text>
//         </View>
//       </View>
//       <View
//         style={{
//           width: width * 0.95,
//           height: height * 0.22,
//           backgroundColor: 'white',
//           // justifyContent:'center',
//           alignItems: 'center',
//           alignSelf: 'center',
//           flexDirection: 'row',
//         }}>
//         {data.image == '' ? (
//           <View
//             style={{
//               width: width * 0.45,
//               height: height * 0.2,
//               backgroundColor: 'pink',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             {data.gender == 'male' ? (
//               <Fontisto name="male" style={{fontSize: height * 0.08}} />
//             ) : (
//               <Fontisto name="female" style={{fontSize: height * 0.08}} />
//             )}
//           </View>
//         ) : (
//           <Image
//             source={{uri: data.image}}
//             style={{width: width * 0.45, height: height * 0.2}}
//           />
//         )}
//         <View
//           style={{
//             marginLeft: 10,
//             width: width * 0.45,
//             height: height * 0.2,
//             backgroundColor: 'pink',
//             borderRadius: 100,
//             borderWidth: 4,
//             alignSelf: 'center',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <EntypoIcon
//             name="images"
//             style={{fontSize: height * 0.15, alignSelf: 'auto'}}
//           />
//         </View>
//       </View>
//       <View
//         style={{
//           marginTop: 10,
//           width: width * 0.95,
//           height: height * 0.7,
//           backgroundColor: '#DCEDC8',
//           alignSelf: 'center',
//           borderTopLeftRadius: 30,
//           borderTopRightRadius: 30,
//           borderWidth: 5,
//         }}>
//         <View
//           style={{
//             marginTop: 20,
//             width: width * 0.95,
//             height: height * 0.09,
//             // backgroundColor: 'pink',
//             alignSelf: 'center',
//             borderBottomColor: 'black',
//             borderBottomLeftRadius: 30,
//             borderBottomRightRadius: 30,
//             borderBottomWidth: 5,
//             borderRightWidth: 5,
//             borderLeftWidth: 5,
//           }}>
//           <View
//             style={{
//               marginTop: 5,
//               width: width * 0.8,
//               height: height * 0.075,
//               // backgroundColor:'white',
//               borderBottomWidth: 2,
//               alignSelf: 'center',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <Text
//               style={{
//                 padding: 15,
//                 width: width * 0.75,
//                 height: height * 0.1,
//                 //  backgroundColor: 'yellow',
//                 textAlign: 'center',
//                 fontSize: 30,
//                 fontWeight: 'bold',
//                 color: 'red',
//               }}>
//               {data.userName}
//             </Text>
//           </View>
//         </View>
//         <View
//           style={{
//             marginTop: 15,
//             width: width * 0.95,
//             height: height * 0.17,
//             // backgroundColor: 'pink',
//             alignSelf: 'center',
//             borderBottomColor: 'black',
//             borderRadius: 25,
//             borderWidth: 5,
//             flexDirection: 'column',
//           }}>
//           <Text
//             style={{
//               marginLeft: 10,
//               marginTop: 5,
//               width: width * 0.2,
//               height: height * 0.03,
//               // backgroundColor: 'white',
//               fontWeight: 'bold',
//               fontSize: 20,
//             }}>
//             Details :
//           </Text>
//           <View
//             style={{
//               marginTop: 5,
//               width: width * 0.87,
//               height: height * 0.112,
//               // backgroundColor: 'white',
//               borderBottomWidth: 2,
//               justifyContent: 'center',
//               alignSelf: 'center',
//             }}>
//             <Text
//               style={{
//                 padding: 5,
//                 width: width * 0.86,
//                 height: height * 0.095,
//                 //  backgroundColor: 'yellow',
//                 textAlign: 'justify',
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 color: '#33691E',
//               }}>
//               {data.description}
//             </Text>
//           </View>
//         </View>
//         <View
//           style={{
//             marginTop: 10,
//             width: width * 0.95,
//             height: height * 0.09,
//             // backgroundColor: 'pink',
//             alignSelf: 'center',
//             alignItems: 'center',
//             // borderWidth: 3,
//             flexDirection: 'row',
//           }}>
//           <TouchableOpacity
//             onPress={() => handleLike(data)}
//             style={{
//               width: width * 0.42,
//               height: height * 0.07,
//               backgroundColor: '#B3E5FC',
//               alignItems: 'center',
//               // justifyContent: 'center',
//               marginLeft: 14,
//               borderTopLeftRadius: 15,
//               borderBottomRightRadius: 15,
//               borderWidth: 5,
//               flexDirection: 'row',
//             }}>
//             <Text
//               style={{
//                 padding: 5,
//                 marginLeft: 5,
//                 width: width * 0.23,
//                 height: height * 0.05,
//                 // backgroundColor: 'yellow',
//                 textAlign: 'center',
//                 fontSize: height * 0.03,
//                 fontWeight: 'bold',
//                 color: 'black',
//               }}>
//               Like
//             </Text>
//             <AntIcon name="like1" style={{fontSize: height * 0.04}} />
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => handleDislike(data)}
//             style={{
//               width: width * 0.42,
//               height: height * 0.07,
//               backgroundColor: '#B3E5FC',
//               alignItems: 'center',
//               // justifyContent: 'center',
//               marginLeft: 15,
//               borderTopRightRadius: 15,
//               borderBottomLeftRadius: 15,
//               borderWidth: 5,
//               flexDirection: 'row',
//             }}>
//             <Text
//               style={{
//                 padding: 5,
//                 marginLeft: 5,
//                 width: width * 0.29,
//                 height: height * 0.05,
//                 // backgroundColor: 'yellow',
//                 textAlign: 'center',
//                 fontSize: height * 0.03,
//                 fontWeight: 'bold',
//                 color: 'black',
//               }}>
//               Dislike
//             </Text>
//             <AntIcon name="dislike1" style={{fontSize: height * 0.04}} />
//           </TouchableOpacity>
//         </View>
//         <View
//           style={{
//             marginTop: 10,
//             width: width * 0.95,
//             height: height * 0.18,
//             backgroundColor: '#c1e1c5',
//             alignSelf: 'center',
//             // alignItems: 'center',
//             borderWidth: 3,
//             flexDirection: 'column',
//           }}>
//           <Text
//             style={{
//               marginLeft: 5,
//               marginTop: 5,
//               width: width * 0.9,
//               height: height * 0.06,
//               // backgroundColor: 'white',
//               fontWeight: 'bold',
//               fontSize: 40,
//               // color:'green'
//             }}>
//             Want to approach :
//           </Text>
//           <View style={{flexDirection: 'row', marginTop: 10}}>
//             <View
//               style={{
//                 width: width * 0.42,
//                 height: height * 0.07,
//                 backgroundColor: '#7bdcb5',
//                 alignItems: 'center',
//                 marginLeft: 14,
//                 borderTopLeftRadius: 15,
//                 borderBottomLeftRadius: 15,
//                 borderWidth: 5,
//                 flexDirection: 'row',
//               }}>
//               <TouchableOpacity onPress={() => handleApproach(data)}>
//                 <Text
//                   style={{
//                     padding: 5,
//                     marginLeft: 1,
//                     width: width * 0.4,
//                     height: height * 0.05,
//                     // backgroundColor: 'yellow',
//                     textAlign: 'center',
//                     fontSize: height * 0.03,
//                     fontWeight: 'bold',
//                     color: 'black',
//                   }}>
//                   Yes
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <TouchableOpacity
//               onPress={() => props.navigation.goBack()}
//               style={{
//                 width: width * 0.42,
//                 height: height * 0.07,
//                 backgroundColor: '#7bdcb5',
//                 alignItems: 'center',
//                 marginLeft: 15,
//                 borderTopRightRadius: 15,
//                 borderBottomRightRadius: 15,
//                 borderWidth: 5,
//                 flexDirection: 'row',
//               }}>
//               <Text
//                 style={{
//                   padding: 5,
//                   marginLeft: 5,
//                   width: width * 0.4,
//                   height: height * 0.05,
//                   // backgroundColor: 'yellow',
//                   textAlign: 'center',
//                   fontSize: height * 0.03,
//                   fontWeight: 'bold',
//                   color: 'black',
//                 }}>
//                 No
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// }
// export default profilePage;
import React, {Component} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const {height, width} = Dimensions.get('window');

function UserProfile(props) {
  return (
    <ImageBackground
      source={require('../assets/Dbk.jpeg')}
      style={{height, width}}>
      <View
        style={{
          marginTop: -20,
          width,
          height: height * 0.55,
          backgroundColor: 'rgba(22,23,23,0.5)',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          shadowColor: 'rgba(22,23,23,0.9)',
          shadowOffset: {height: 15},
          shadowOpacity: 5,
          elevation: 3,
        }}>
        <View
          style={{
            marginTop: height * 0.07,
            width: width * 1,
            height: height * 0.06,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <TouchableOpacity
              style={{justifyContent: 'center', padding: 5}}
              onPress={() => props.navigation.goBack()}>
              <AntIcon
                name="arrowleft"
                style={{fontSize: height * 0.05, color: 'white'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // backgroundColor: 'pink',
              width: width * 0.8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Details
            </Text>
          </View>
        </View>
        <View
          style={{
            width: width * 0.95,
            height: height * 0.17,
            // backgroundColor: 'pink',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: width * 0.37,
              height: height * 0.16,
              //   backgroundColor: 'pink',
              borderRadius: 100,
              borderWidth: 4,
              borderColor: 'white',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: width * 0.28,
                height: height * 0.13,
                alignSelf: 'center',
              }}
              source={require('../assets/prf.png')}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 8,
            width: width * 0.85,
            height: height * 0.04,
            // backgroundColor: 'pink',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              width: width * 0.8,
              height: height * 0.05,
              //    backgroundColor: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 30,
              color: 'red',
            }}>
            Vikas Kumar
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: width * 0.89,
            height: height * 0.08,
            // backgroundColor: 'pink',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              width: width * 0.89,
              height: height * 0.08,
              // backgroundColor: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: 'green',
            }}>
            It work on professional IT company in India.
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            width: width * 0.98,
            height: height * 0.08,
            // backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              marginLeft: 2,
              width: width * 0.32,
              height: height * 0.07,
              backgroundColor: 'rgba(220, 231, 117, 0.3)',
              borderWidth: 3,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                width: width * 0.32,
                height: height * 0.04,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
              }}>
              Approach
            </Text>
          </View>
          <View
            style={{
              marginLeft: 2,
              width: width * 0.32,
              height: height * 0.07,
              backgroundColor: 'rgba(220, 231, 117, 0.3)',
              borderWidth: 3,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                width: width * 0.32,
                height: height * 0.04,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
              }}>
              Shortlist
            </Text>
          </View>
          <View
            style={{
              marginLeft: 2,
              width: width * 0.32,
              height: height * 0.07,
              backgroundColor: 'rgba(220, 231, 117, 0.3)',
              borderWidth: 3,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                width: width * 0.32,
                height: height * 0.04,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
              }}>
              Rejected
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          width: width * 0.95,
          height: height * 0.42,
          backgroundColor: 'rgba(220, 231, 117, 0.3)',
          alignSelf: 'center',
          alignItems: 'center',
          borderWidth: 3,
          borderRadius: 10,
        }}>
        <View
          style={{
            marginTop: 10,
            width: width * 0.9,
            height: height * 0.11,
            //  backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: 'rgba(22,23,23,0.9)',
            shadowOffset: {width: 2, height: 7},
            shadowOpacity: 3,
            elevation: 3,
          }}>
          <View
            style={{
              marginLeft: 7,
              width: width * 0.42,
              height: height * 0.09,
              backgroundColor: 'rgba(217, 217, 217, 0.7)',
              borderRadius: 10,
              borderWidth: 3,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: width * 0.4,
                height: height * 0.033,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
                // backgroundColor: 'white',
              }}>
              Caste :
            </Text>
            <Text
              style={{
                marginTop: 3,
                width: width * 0.4,
                height: height * 0.035,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              Hindu
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              width: width * 0.42,
              height: height * 0.09,
              backgroundColor: 'rgba(217, 217, 217, 0.7)',
              borderRadius: 10,
              borderWidth: 3,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: width * 0.4,
                height: height * 0.033,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              Height :
            </Text>
            <Text
              style={{
                marginTop: 3,
                width: width * 0.4,
                height: height * 0.035,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              5.0 ft.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            width: width * 0.9,
            height: height * 0.11,
            // backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: 'rgba(22,23,23,0.9)',
            shadowOffset: {width: 2, height: 7},
            shadowOpacity: 3,
            elevation: 3,
          }}>
          <View
            style={{
              marginLeft: 7,
              width: width * 0.42,
              height: height * 0.09,
              backgroundColor: 'rgba(217, 217, 217, 0.7)',
              borderRadius: 10,
              borderWidth: 3,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: width * 0.4,
                height: height * 0.033,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
                // backgroundColor: 'white',
              }}>
              Caste :
            </Text>
            <Text
              style={{
                marginTop: 3,
                width: width * 0.4,
                height: height * 0.035,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              Hindu
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              width: width * 0.42,
              height: height * 0.09,
              backgroundColor: 'rgba(217, 217, 217, 0.7)',
              borderRadius: 10,
              borderWidth: 3,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: width * 0.4,
                height: height * 0.033,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              Height :
            </Text>
            <Text
              style={{
                marginTop: 3,
                width: width * 0.4,
                height: height * 0.035,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              5.0 ft.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            width: width * 0.9,
            height: height * 0.11,
            // backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: 'rgba(22,23,23,0.9)',
            shadowOffset: {width: 2, height: 7},
            shadowOpacity: 3,
            elevation: 3,
          }}>
          <View
            style={{
              marginLeft: 7,
              width: width * 0.42,
              height: height * 0.09,
              backgroundColor: 'rgba(217, 217, 217, 0.7)',
              borderRadius: 10,
              borderWidth: 3,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: width * 0.4,
                height: height * 0.033,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
                // backgroundColor: 'white',
              }}>
              Caste :
            </Text>
            <Text
              style={{
                marginTop: 3,
                width: width * 0.4,
                height: height * 0.035,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              Hindu
            </Text>
          </View>
          <View
            style={{
              marginLeft: 10,
              width: width * 0.42,
              height: height * 0.09,
              backgroundColor: 'rgba(217, 217, 217, 0.7)',
              borderRadius: 10,
              borderWidth: 3,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: width * 0.4,
                height: height * 0.033,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              Height :
            </Text>
            <Text
              style={{
                marginTop: 3,
                width: width * 0.4,
                height: height * 0.035,
                fontSize: 25,
                fontWeight: 'bold',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              5.0 ft.
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
export default UserProfile;