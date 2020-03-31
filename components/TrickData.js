import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TrickData = (props) => {
	return (
		<TouchableOpacity 
			style={styles.container}
		>
			<Text>{props.trick.name}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		backgroundColor: '#444',
		borderWidth: 2,
		borderColor: '#000',
		borderRadius: 5
	},
});

export default TrickData;
