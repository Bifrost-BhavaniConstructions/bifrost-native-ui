import {View, TextInput, Text, KeyboardTypeOptions, NativeTouchEvent, NativeSyntheticEvent} from 'react-native';
import React from 'react';
import styles from './styles';

const Input = ({
  placeholder,
  setFieldValue,
  keyword,
  error,
  touched,
  value,
  editable,
  secureTextEntry,
  keyboardType,
  max,
  onPressIn,
  inputStyle,
}: {
  placeholder: string | undefined,
  setFieldValue: Function,
  keyword: string | undefined,
  error: string | undefined,
  touched: boolean | undefined,
  value: string | undefined,
  editable?: boolean,
  secureTextEntry?: boolean,
  keyboardType?: KeyboardTypeOptions,
  max?: any,
  onPressIn?: ((e: NativeSyntheticEvent<NativeTouchEvent>) => void),
  inputStyle?: any
}) => {
  return (
    <View style={{width: '100%', marginVertical: 10}}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={'#707070'}
        onChangeText={val => setFieldValue(keyword, val)}
        value={value}
        editable={editable}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={max}
        onPressIn={onPressIn}
      />
      {error && touched && (
        <View style={{marginTop: 8}}>
          <Text style={{color: 'yellow', fontSize: 13}}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
