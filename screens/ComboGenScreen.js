import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Button
} from 'react-native';

// Import Custom Components
import { TRICK_LIST, TRANS_LIST } from '../data/data';
import TrickInCombo from '../components/TrickInCombo';

export default class ComboGenScreen extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			combo: [], 
			dispCombo: [],
		};
		this._swapTrick = this._swapTrick.bind(this);
	}

	// Initialize Trick Object to be displayed in Combo
	_trickButton(tr, tr_pos, tr_type) {
		return(
			<TrickInCombo 
				trick={tr} 
				position={tr_pos}
				type={tr_type}
				swapTrick={this._swapTrick}
				extraData={this.state.dispCombo}
			/>
		)
	}

	// Swap out current Trick for a new one
	_swapTrick(tr_pos, tr_type){
		if (this.state.combo.length > 1){
			if (tr_type === 'trick'){
				if (tr_pos == 0){
					var newTrick = [null, null];
					var transOut = [];
					// Get list of transitions that can go into the next trick
					for (var trans in TRANS_LIST){
						if (this.state.combo[2].takeoff.includes(TRANS_LIST[trans].title)){
							transOut.push(TRANS_LIST[trans]);
						}
					}
					if (transOut.length > 0){
						// Choose Transition
						newTrick[1] = transOut[Math.floor(Math.random() * transOut.length)];

						var trickIn = [];
						// Find Trick that can go into new transition
						for (var trick in TRICK_LIST){
							if (TRICK_LIST[trick].landingStance == newTrick[1].startPos){
								trickIn.push(TRICK_LIST[trick]);
							}
						}
						if (trickIn.length > 0){
							// Choose Trick
							newTrick[0] = trickIn[Math.floor(Math.random() * trickIn.length)];

							// Add To Combo
							var newCombo = this.state.combo;
							newCombo[0] = newTrick[0];
							newCombo[1] = newTrick[1];
							this.setState({
								combo: newCombo,
								dispCombo: [
									this._trickButton(newTrick[0], 0, 'trick'), 
									this._trickButton(newTrick[1], 1, 'trans'), 
									this.state.dispCombo.slice(2, this.state.dispCombo.length)
								]
							});
						}
						else {
							alert('Something Goofed when gathering Trick');
						}
					}
					else {
						alert('Something Goofed when gathering transitions');
					}
				}
				else{

				}
			}
			else if (tr_type === 'trans'){
				alert('Transition Change not yet supported.')
			}
		}
		else alert("Longer Combo Required")
	}

	// Generate "random" Combo
	_genCombo_Handler() {
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
			this.setState(() => ({ dispCombo: [...this.state.dispCombo, this._trickButton(TRICK_LIST[rnd], this.state.dispCombo.length, 'trick')] }));
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

					// Add '_trick' to combo and disoDombo
					this.setState(() => ({ combo: [...this.state.combo, newTrick[0], newTrick[1] ]}));
					this.setState(() => ({ dispCombo: [
						...this.state.dispCombo, 
						this._trickButton(newTrick[0], this.state.dispCombo.length, 'trans'), 
						this._trickButton(newTrick[1], this.state.dispCombo.length+1, 'trick')
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
		this.setState(() => ({ dispCombo: [...this.state.dispCombo.slice(0,this.state.dispCombo.length-2)] }) );
	}

	// Clear Combo
	_delCombo_Handler() {
		this.setState(() => ({ combo: [] }) );
		this.setState(() => ({ dispCombo: []}))
	}

	render () {
		return (
			<View style={styles.container}>
				<Text>{this.state.combo.length}</Text>
				<Text style={styles.text}>Do This Combo</Text>

				<View style={styles.comboContainer}>
					<ScrollView 
						ref={(scroll) => {this.scroll = scroll;}}
						onContentSizeChange={() => {this.scroll.scrollToEnd()}}
						style={styles.scrollComboContainer}
						contentContainerStyle={{alignItems: 'center'}}
					>
						{this.state.dispCombo}
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

					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => this._addToCombo_Handler()}>
						<Text style={styles.btnText}>Add</Text>
					</TouchableOpacity>
				</View>
				<Button 
					title={'clear console'} 
						onPress={() => {
							console.log('----------')
						}}
					/>
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
