import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class ComboListScreen extends React.Component {
	render () {
		return (
			<View style={styles.container}>
				<Text>ComboListScreen</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#888',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
