import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    padding: Platform.OS === 'ios' ? 15 : 10,
    backgroundColor: '#000',
    width: '100%',
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default styles;
