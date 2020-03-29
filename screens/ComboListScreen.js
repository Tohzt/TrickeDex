import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { comboList } from '../actions/index';


export default function ComboListScreen() {

	const comboList = useSelector(state => state.comboList);
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<Text>{comboList}</Text>
			<Button title="Button" onPress={() => dispatch(comboList())}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#888',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
