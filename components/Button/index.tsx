import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const Button = ({label, buttonContainerStyle, buttonTextStyle, onPress}:{label: string, buttonContainerStyle?: object, buttonTextStyle?: object, onPress?: ((event: any) => void)}) => {
  return (
    <View style={{width: '100%'}}>
      <TouchableOpacity
        onPress={(e: any) => {onPress && onPress(e)}}
        style={{...styles.buttonContainer, ...buttonContainerStyle}}>
        <Text style={{...styles.buttonText, ...buttonTextStyle}}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
