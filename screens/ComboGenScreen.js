import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class ComboGenScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = { combo: [] };
	}

	// Generate Combo Button
	_genCombo_Handler() {
		this.setState(prevState => ({ combo: ["New Combo"] }));
	}
	
	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Do This Combo</Text>
				<View style={styles.comboContainer}>
					<Text>{this.state.combo}</Text>
				</View>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => this._genCombo_Handler()}>
					<Text style={styles.btnText}>Generate</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ebebeb',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#101010',
		fontSize: 24,
		fontWeight: 'bold'
	},
	buttonContainer: {
		backgroundColor: '#222',
		borderRadius: 5,
		padding: 10,
		margin: 20
	},
	comboContainer: {
		margin: 10,
		width: '80%',
		height: 40,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 5
	},
	btnText: {
		fontSize: 20,
		color: '#fff',
	},
});
