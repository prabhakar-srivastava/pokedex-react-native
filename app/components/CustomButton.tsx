/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

export enum TYPE {
  PRIMARY,
  SECONDARY,
}

interface ButtonProps {
  title: string;
  type: TYPE;
  // action:
}

export default function CustomButton(props: ButtonProps) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
      }}>
      <View
        style={{
          width: 370,
        }}>
        <Button
          style={ButtonStyle.primary}
          title={props?.title}
          color={TYPE.PRIMARY === props.type ? '#DAA520' : '#FFFFFF'}
          onPress={() => null}
        />
      </View>
    </View>
  );
}
const ButtonStyle = StyleSheet.create({
  primary: {
    backgroundColor: '#DAA520',
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    width: 50,
  },
});
