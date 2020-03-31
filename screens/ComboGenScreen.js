import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Import Custom Components
import { TRICK_LIST } from '../data/data';

export default class ComboGenScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			combo: [], 
			comboString: []
		};
	}

	// Generate "random" Combo
	_genCombo_Handler() {
		var _arr = [];
		var _arrStr = [];

		for (var trick in TRICK_LIST) {
			_arr.push(TRICK_LIST[trick]);
			_arrStr.push(TRICK_LIST[trick].name);
		}

		this.setState(() => ({ combo: _arr }));
		this.setState(() => ({ comboString: _arrStr }));
	}

	// Add element to end of Combo
	_addToCombo_Handler() {
		var min = 0;
		var max = TRICK_LIST.length;
		let _rnd = Math.floor(Math.random() * (max - min) + min);

		this.setState(() => ({ combo: [...this.state.combo, TRICK_LIST[_rnd]] }) );
		this.setState(() => ({ comboString: [...this.state.comboString, TRICK_LIST[_rnd].name] }) );
	}

	// Remove last element from Combo
	_remFromCombo_Handler() {
		this.setState(() => ({ combo: [...this.state.combo.slice(0,this.state.combo.length-1)] }) );
		this.setState(() => ({ comboString: [...this.state.comboString.slice(0,this.state.comboString.length-1)] }) );
	}

	// Clear Combo
	_delCombo_Handler() {
		this.setState(() => ({ combo: [] }) );
		this.setState(() => ({ comboString: [] }) );
	}
	
	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Do This Combo</Text>
				<View style={styles.comboContainer}>
					<Text>{this.state.comboString.join(" > ")}</Text>
				</View>

				<View style={{
					flexDirection: 'row', 
					justifyContent: 'space-around',
				}}>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => this._remFromCombo_Handler()}
						onLongPress={() => this._delCombo_Handler()}
					>
						<Text style={styles.btnText}>Remove</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => this._genCombo_Handler()}>
						<Text style={styles.btnText}>Generate</Text>
					
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => this._addToCombo_Handler()}>
						<Text style={styles.btnText}>Add</Text>
					</TouchableOpacity>
				</View>
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
		margin: 20,
		width: '20%',
		alignItems: 'center'
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
