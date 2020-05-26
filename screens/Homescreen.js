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

import { LinearGradient } from 'expo-linear-gradient';
import {Title,Card,Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as firebase from 'firebase';
   

export default class Homescreen extends Component
{
  
    state={
      email:"",
      profile_picture:"",
  name:"",
      
    }
  
    
    
   
  
  static navigationOptions ={
   title:"Home"
  }
  componentDidMount()
  {
      this.unsuscribeAuth= firebase.auth().onAuthStateChanged(user=>
        {
            if(user)
            {
                this.setState({
                    email:user.email,
                    profile_picture:user.photoURL,
                    name:user.displayName
                })
            }
            else
            {
                this.props.navigation.navigate("Login");
            }
        })  
  }
 userSignout()
  {
      firebase.auth().signOut()
      .catch(error=>
        {
            Alert.alert(error.message)
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
   <View style={styles.root}> 
        <LinearGradient
        colors={["#0033ff","#6bc1ff"]}
        style={{height:"20%"}}
        />
        <View style={{alignItems:"center"}}>
        <Image
        style={{width:140,height:140,borderRadius:70,marginTop:-60}}
        source={{uri:this.state.profile_picture}}
        />
        </View>
        
        <View style={{alignItems:"center"}}>
            <Title>{this.state.name}</Title>
        </View>
        <Card style={styles.mycard}>
          <View style={styles.cardContent}>
          <Icon name='envelope' size={30} color="#900" />
    <Text style={styles.mytext}> {this.state.email}</Text>
          </View>
        </Card>
        
         <Button icon="home"
           style={styles.inputstyle} 
           mode="contained"
           theme={theme}
            onPress={() => this.props.navigation.navigate("Display")}>
                    Home
         </Button>
   <Button icon="logout"
           style={styles.inputstyle} 
           mode="contained"
           theme={theme}
            onPress={()=>this.userSignout()}
            >
              <Text style={{fontSize:25,color:"white"}}> 
                Log-Out
              </Text>
  </Button>
         </View>
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
      backgroundColor:"white",
      alignItems:"center",
      justifyContent:"center",
      
    },
    root:
        {
          flex:1,
            width:350,
            //height:250,
            //marginBottom:80

        },
        mycard:
        {
            margin:3
        },
        cardContent:
        {
            flexDirection:'row',

        },
        inputstyle:
            {
                margin:5,

            },
        mytext:
        {
            fontSize:18,
            marginLeft:5,
            marginTop:3
        }

  });
