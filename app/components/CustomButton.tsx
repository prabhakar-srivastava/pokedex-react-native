/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export enum TYPE {
  PRIMARY,
  SECONDARY,
}

interface ButtonProps {
  title: string;
  type: TYPE;
  action: any;
  width?: number;
}

const primary_width = '100%';
const secondary_width = '40%';

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
          width: props?.width ?? 370,
        }}>
        <TouchableOpacity
          onPress={props.action}
          style={[
            {
              width:
                props.type === TYPE.PRIMARY ? primary_width : secondary_width,
            },
            ButtonStyle.primary,
          ]}>
          <Text style={ButtonStyle.textView}>{props.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const ButtonStyle = StyleSheet.create({
  primary: {
    backgroundColor: '#DAA520',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
  },
  textView: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
