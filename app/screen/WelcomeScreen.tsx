/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import CustomButton, {TYPE} from '../components/CustomButton';

export default function WelcomeScreen() {
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setWelcomeScreen(true);
    }, 3000);
  }, []);

  const welcomeStyles = StyleSheet.create({
    fullscreen: {
      width: '100%',
      height: '100%',
      justifyContent: welcomeScreen ? 'space-between' : 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      color: '#DAA520',
      textAlign: welcomeScreen ? 'left' : 'center',
    },
  });

  return (
    <View>
      <ImageBackground
        style={welcomeStyles.fullscreen}
        source={require('../assets/bg.png')}
        resizeMode="cover">
        <View style={{marginTop: welcomeScreen ? 70 : null}}>
          <Image
            style={{
              width: 250,
              height: 250,
              flex: -1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={require('../assets/tumblr.gif')}
          />
          {!welcomeScreen && <Text style={welcomeStyles.title}>PokeDex</Text>}
        </View>
        {welcomeScreen && (
          <View style={{marginBottom: 25}}>
            <Text style={welcomeStyles.title}> Welcome to</Text>
            <Text style={welcomeStyles.title}> PokeDex</Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 15,
                marginTop: 10,
                marginBottom: 10,
                paddingLeft: 10,
                paddingRight: 70,
              }}>
              This application contains detailed information about various
              pokemon like PIkachu, charlizad and many more ...
            </Text>
            <CustomButton type={TYPE.PRIMARY} title="Explore Now " />
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                marginTop: 15,
                textDecorationLine: 'underline',
              }}>
              About Me
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}
