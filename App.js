import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//import Signupscreen from'./screens/Signupscreen';
import Loginscreen from'./screens/Loginscreen';
import Loadingscreen from'./screens/Loadingscreen';
import Homescreen from './screens/Homescreen';
import Displayscreen from './screens/Displayscreen';
import Stepscreen from './screens/Stepscreen';

import * as firebase from 'firebase';
import {firebaseConfig } from './config';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
//firebase.initializeApp(firebaseConfig);

export default class App extends Component
{
  render()
  {
    return <AppNavigator/>;
  }
} 
/*const mystack=createStackNavigator({
  
  
  Signup:Signupscreen,
  Login:Loginscreen,
 
},
{
  defaultNavigationOptions:
  {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
})
  */
const myswitch=createSwitchNavigator({
  Loading:Loadingscreen,
  Display:Displayscreen,
  Home:Homescreen,
  Step:Stepscreen,
 // stack:mystack,
 Login:Loginscreen,
 //Signup:Signupscreen,
 

 
  
});


const AppNavigator=createAppContainer(myswitch);

const styles=StyleSheet.create(
  {
    container:
    {
      flex:1,
      backgroundColor:"green",
    },

  });
