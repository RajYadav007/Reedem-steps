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
  Alert,
} from 'react-native';
import { Pedometer } from 'expo-sensors';
import {Title,Card,Button} from 'react-native-paper';
import * as firebase from 'firebase';

export default class Displayscreen extends Component
{
  state = {
    email:""
  };

  componentDidMount() {
    this.unsuscribeAuth= firebase.auth().onAuthStateChanged(user=>
      {
          if(!user)
          {
            this.props.navigation.navigate("Login");
          }
    })   
  }

  componentWillUnmount() {
    this.unsuscribeAuth()
  }


  
  static navigationOptions ={
   title:"Display"
  }
 
  render()
  {
    return (
   <View style={styles.container}>
    
                           <Button icon="account-circle"
                            style={styles.inputstyle} 
                            mode="contained"
                            theme={theme}
                           onPress={()=>this.props.navigation.navigate("Home")}
                             > 
                            <Text>Profile</Text>     
                           </Button>
                   
           
   </View>
    );
  }
}

const theme =
{
    colors:{
        primary:"#006aff"
    }
}

const styles=StyleSheet.create(
  {
    container:
    {
      flex:1,
      backgroundColor:"#818794",
      alignItems:"center",
      justifyContent:"center",
      
    },
    inputstyle:
            {
                margin:5,
                marginLeft:230,
                marginTop:550,
                justifyContent:"space-between"

            },

  });



