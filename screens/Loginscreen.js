
  import React, { Component } from 'react';
  import { View, Text, StyleSheet, Button,  TouchableOpacity } from 'react-native';
  import * as firebase from 'firebase';
  import * as Google from 'expo-google-app-auth';
  //import * as GoogleSignIn from 'expo-google-sign-in';
  import { AppAuth } from 'expo-app-auth';
  import { Facebook, GoogleSignIn } from "expo";

   export default class Loginscreen extends Component {
    state={
      email:"",
      profile_picture:"",
  name:"",
      
    }
  
  static navigationOptions ={
   title:"Log in"
  }
  componentDidMount()
  {
      this.unsuscribeAuth= firebase.auth().onAuthStateChanged(user=>
        {
            if(user)
            {
              
                this.props.navigation.navigate("Home")
            }
           
        })
        
       
  }

  componentWillUnmount()
  {
      this.unsuscribeAuth()
  }


    onSignIn = googleUser => {
     console.log('Google Auth Response', googleUser);
      var unsubscribe = firebase.auth().onAuthStateChanged(
        function(firebaseUser) {
           
          unsubscribe();
    
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(function(result)  {
               
                
               
               if (result.additionalUserInfo.isNewUser) {
                firebase
                    .database()
                    .ref('/users/' + result.user.uid)
                    .set({
                      gmail: result.user.email,
                      profile_picture: result.additionalUserInfo.profile.picture,
                      first_name: result.additionalUserInfo.profile.given_name,
                      last_name: result.additionalUserInfo.profile.family_name,
                      created_at: Date.now(),
                      
                    })
                    .then(function(snapshot) {
                        console.log('user signed in  ');
                    });
               } else {
                  firebase
                    .database()
                    .ref('/users/' + result.user.uid)
                    .update({
                      last_logged_in: Date.now()
                    });
                    
                }
              })
              .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
              });

        }
      );
    };


    signInWithGoogleAsync = async () => {
      try {
        const result = await Google.logInAsync({
        androidClientId:'313502457939-grjv7bns4ta7i6vii3mib60kl1fju11a.apps.googleusercontent.com',
         
          scopes: ['profile', 'email']
        });
  
        if (result.type === 'success') {
          this.onSignIn(result);
          this.setState({
            email:result.user.email,
            profile_picture:result.user.photoUrl,
            name:result.user.name
            
        })
          return result.accessToken;
        
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    };

    render() {
      return (
        <View style={styles.container}>
         
          <Button
            title="Sign-In With Google"
            onPress={() => this.signInWithGoogleAsync()}
          />
    
        </View>
        
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });