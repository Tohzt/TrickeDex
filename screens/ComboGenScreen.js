import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native';

// Import Custom Components
import { TRICK_LIST, TRANS_LIST } from '../data/data';

export default class ComboGenScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			combo: [], 
			comboString: [],
			testCombo: []
		};
	}

	_trickButton(tr) {
		return (
			<View style={{width:'80%'}}>
				<TouchableOpacity>
					<View style={{alignItems: 'center',  borderColor: '#00f', borderWidth: 2, margin: 2}}>
						<Text style={{paddingVertical: 2}}>{tr.name}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
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
		var newTrick = [null, null];

		var min = 0;
		var max = 0; // TRICK_LIST.length;
		let rnd = 0; //Math.floor(Math.random() * (max - min) + min);

		// First Trick
		if (this.state.combo.length == 0){
			max = TRICK_LIST.length;
			rnd = Math.floor(Math.random() * (max - min) + min);
			this.setState(() => ({ combo: [...this.state.combo, TRICK_LIST[rnd]] }));
			this.setState(() => ({ comboString: [...this.state.comboString, TRICK_LIST[rnd].name] }));
			this.setState(() => ({ testCombo: [...this.state.testCombo, this._trickButton(TRICK_LIST[rnd])] }));
		}
		else {
			// Find viable list of Trisitions
			var _transArray = [];
			// Filter through 'TRANS_LIST.startPos' for current Tricks endPos.
			for (var tr in TRANS_LIST) {
				if (TRANS_LIST[tr].startPos == this.state.combo[this.state.combo.length-1].landingStance) {
					_transArray.push(TRANS_LIST[tr]);
				}
			}
			// Check that a viable Transition exists
			if (_transArray.length > 0)
			{
				// Select Transition
				var _trans;
				max = _transArray.length;
				rnd = Math.floor(Math.random() * (max-min));
				_trans = _transArray[rnd];

				// Store Saved Transition
				newTrick[0] = _trans;

				// Find viable list of Tricks
				var _trickArray = [];
				// Filter through 'TRICK_LIST.startPos' for '_trans.endPos'
				for (var tr in TRICK_LIST) {
					if (TRICK_LIST[tr].takeoff.includes(_trans.title)) {
						_trickArray.push(TRICK_LIST[tr]);
					}
				}
				// Check that a viable Trick exists
				if (_trickArray.length > 0) {
					// Select Trick
					var _trick;
					max = _trickArray.length;
					rnd = Math.floor(Math.random() * (max-min));
					_trick = _trickArray[rnd];

					// Store Saved Trick
					newTrick[1] = _trick;

					// Add '_trick' to combo and comboString
					this.setState(() => ({ combo: [...this.state.combo, newTrick[0], newTrick[1] ]}));
					this.setState(() => ({ comboString: [...this.state.comboString, newTrick[0].name, newTrick[1].name ]}));
					this.setState(() => ({ testCombo: [
						...this.state.testCombo, 
						this._trickButton(newTrick[0]), 
						this._trickButton(newTrick[1])
					]}));
				}
				else {
					alert('No Tricks Available');
				}
			}
			else { 
				alert('No Transitions Available');
			}
		}
	}

	// Remove last element from Combo
	_remFromCombo_Handler() {
		this.setState(() => ({ combo: [...this.state.combo.slice(0,this.state.combo.length-2)] }) );
		this.setState(() => ({ comboString: [...this.state.comboString.slice(0,this.state.comboString.length-2)] }) );
		this.setState(() => ({ testCombo: [...this.state.testCombo.slice(0,this.state.testCombo.length-2)] }) );
	}

	// Clear Combo
	_delCombo_Handler() {
		this.setState(() => ({ combo: [] }) );
		this.setState(() => ({ comboString: [] }) );
		this.setState(() => ({ testCombo: []}))
	}

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Do This Combo</Text>
				
				{/*
				<View style={styles.comboContainer}>
					<Text style={styles.comboText}>{this.state.comboString.join(" > ")}</Text>
				</View>
				*/}

				<View style={styles.comboContainer}>
					<ScrollView 
						ref={(scroll) => {this.scroll = scroll;}}
						onContentSizeChange={() => {this.scroll.scrollToEnd()}}
						style={styles.scrollComboContainer}
						contentContainerStyle={{alignItems: 'center'}}
					>
						{this.state.testCombo}
					</ScrollView>
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

					{/*
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => this._genCombo_Handler()}>
						<Text style={styles.btnText}>Generate</Text>

					</TouchableOpacity>
					*/}

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
		width: '30%',
		alignItems: 'center'
	},
	scrollComboContainer: {
		width: '100%',
	},
	comboContainer: {
		margin: 10,
		width: '80%',
		height: 200,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 5
	},
	comboText: {
		margin: 10,
	},
	btnText: {
		fontSize: 20,
		color: '#fff',
	},
});
