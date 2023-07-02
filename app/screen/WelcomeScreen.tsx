/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton, { TYPE } from '../components/CustomButton';

export default function WelcomeScreen(props: {
  navigation: { navigate: (arg0: string) => any };
}) {
  const [welcomeScreen, setWelcomeScreen] = useState<boolean>(false);
  const value = new Animated.ValueXY({ x: 0, y: 0 });
  const opacity = new Animated.Value(0);


  // for pokeBall movement animation
  const animateBall = () => {
    Animated.timing(value, {
      toValue: { x: 0, y: -140 },
      duration: 600,
      useNativeDriver: false,
    }).start();
    return true;
  };


  // text fade in animation
  const fadeInAnimation = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      setWelcomeScreen(true);
    }, 3000);
  }, []);

  const welcomeStyles = StyleSheet.create({
    fullscreen: {
      width: '100%',
      height: '100%',
      justifyContent: welcomeScreen ? 'flex-end' : 'center',
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
        source={require('../../utils/assets/bg.png')}
        resizeMode="cover">
        <View>
          <Animated.View style={value.getLayout()}>
            <Image
              style={{
                width: 250,
                height: 250,
                flex: -1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={require('../../utils/assets/tumblr.gif')}
            />
          </Animated.View>
          {!welcomeScreen && <Text style={welcomeStyles.title}>PokeDex</Text>}
        </View>
        {welcomeScreen && animateBall() && fadeInAnimation() && (
          <Animated.View style={{ bottom: 25, opacity }}>
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
            <CustomButton
              type={TYPE.PRIMARY}
              title="Explore Now "
              action={() => props.navigation.navigate('ListingScreen')}
            />

          </Animated.View>
        )}
      </ImageBackground>
    </View>
  );
}
