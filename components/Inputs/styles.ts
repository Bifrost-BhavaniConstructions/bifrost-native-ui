import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  input: {
    padding: Platform.OS === 'ios' ? 20 : 10,
    borderWidth: 1,
    borderColor: 'white',
    // width: '100%',
    borderRadius: 10,
    color: '#000',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 13,
    elevation: 8,
  },
});

export default styles;
