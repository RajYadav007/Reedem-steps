import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  unstable_enableLogBox,
} from 'react-native';
import * as firebase from 'firebase';

export default class Loadingscreen extends Component
{
  
  static navigationOptions ={
   header:null
  }
  componentDidMount()
  {
    this.unsuscribeAuth= firebase.auth().onAuthStateChanged((user)=>{
          if(user)
          {
              this.props.navigation.navigate("Display")
          }
          else
          {
            this.props.navigation.navigate("Login")
          }
      })
     
  }
  componentWillUnmount()
  {
      this.unsuscribeAuth()
  }
  render()
  {
    return (
   <View style={styles.container}>
   <ActivityIndicator  size="large" color="#f4511e"/>
   <View >
   <Image
   style={{width:140,height:140,borderRadius:70,marginTop:-60}} 
   source={{uri:'https://i.pinimg.com/originals/3e/4e/83/3e4e83ecb133c19f2a08fc9fb5ea9f11.png'}}/>
   </View>
   <Text style={{fontStyle:"italic",marginBottom:20,color:"red",fontSize:18}}>Getting-Fit</Text>
   </View>
    );
  }
}

const styles=StyleSheet.create(
  {
    container:
    {
      flex:1,
      backgroundColor:"#90c98d",
      alignItems:"center",
      justifyContent:"center",
      
    },

  });
