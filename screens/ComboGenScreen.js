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
import SaveCombo from '../components/SaveCombo';

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
				key={Math.random()*1000}
				trick={tr} 
				position={tr_pos}
				type={tr_type}
				tapTrick={this._swapTrick}
				extraData={this.state.dispCombo}
			/>
		)
	}

	show_debugMessage(_pos, _transIn, _trick, _transOut){
		console.log('----------');
		console.log('Position: ' + _pos);
		console.log('Transitions In:');
		for (var ti in _transIn){
			console.log('    > '+_transIn[ti].title)
		}
		console.log('Tricks: '+_trick.title);
		console.log('Transitions Out:');
		for (var to in _transOut){
			console.log('    < '+_transOut[to].title)
		}
		console.log('----------');
	}

	// SWAP OUT SELECTED TRICK
	_swapTrick(tr_pos, tr_type){
		if (this.state.dispCombo.length > 1){
			if (tr_type === 'trick'){
				// STORE NEXT TRICK/TRANS
				var transIn = [];
				var newTrick = [];
				var transOut = [];
				var swapTo = [null, null, null];

				// LOOP THROUGH LIST OF TRANSITION
				for (var trans in TRANS_LIST){
					// IDENTIFY TRANSITIONS INTO NEW TRICK 
					if (tr_pos > 0){
						if (TRANS_LIST[trans].startPos == this.state.dispCombo[tr_pos-2].props.trick.landingStance){
							transIn.push(TRANS_LIST[trans]);
						}
					}
					// IDENTIFY TRANSITIONS OUT OF NEW TRICK
					if (tr_pos < this.state.dispCombo.length-1) {
						if (this.state.dispCombo[tr_pos+2].props.trick.takeoff.includes(TRANS_LIST[trans].title)){
							transOut.push(TRANS_LIST[trans]);
						}
					}
				}

				// LOOP THROUGH LIST OF TRICKS
				for (var trick in TRICK_LIST){
					if (tr_pos > 0){
						// Ignore Transition Out - swapTo[2]
						for (var tr in transIn){
							if (TRICK_LIST[trick].takeoff.includes(transIn[tr].title)){
								if (!newTrick.includes(TRICK_LIST[trick]) && TRICK_LIST[trick] != this.state.dispCombo[tr_pos].props.trick)
									newTrick.push(TRICK_LIST[trick]);
							}
						}
					}

					if (tr_pos < this.state.dispCombo.length-1){
						// Ignore Transition In - swapTo[0]
						for (var tr in transOut){
							if (TRICK_LIST[trick].landingStance == transOut[tr].startPos){
								if (!newTrick.includes(TRICK_LIST[trick]) && TRICK_LIST[trick] != this.state.dispCombo[tr_pos].props.trick)
									newTrick.push(TRICK_LIST[trick]);
							}
						}
					}
				}

				// FILTER VALID TRICK
				var validTricks = [];
				if (tr_pos > 0){
					for (var trick in newTrick){
						for (var trans in transIn){
							if (newTrick[trick].takeoff.includes(transIn[trans].title)){
								if (transOut.length > 0){
									for (var trans_ in transOut){
										if (!validTricks.includes(newTrick[trick])){
											if (!validTricks.includes(newTrick[trick]))
												validTricks.push(newTrick[trick]);
										}
									}
								}
								else{
									if (!validTricks.includes(newTrick[trick]))
										validTricks.push(newTrick[trick]);
								}
							}
						}	
					}
					newTrick = validTricks;
				}
				swapTo[1] = newTrick[Math.floor(Math.random()*newTrick.length)];


				// FILTER VALID TRANS IN
				var validTransIn = [];
				for (var trans in transIn){
					if (swapTo[1].takeoff.includes(transIn[trans].title))
						validTransIn.push(transIn[trans])
				}
				transIn = validTransIn;

				// FILTER TRANS OUT
				var validTransOut = [];
				for (var trans in transOut){
					if (swapTo[1].landingStance == transOut[trans].startPos)
						validTransOut.push(transOut[trans]);
				}
				transOut = validTransOut;

				//this.show_debugMessage(tr_pos, transIn, swapTo[1], transOut);

				// SET TRANSITION IN
				swapTo[0] = transIn[Math.floor(Math.random()*transIn.length)];
				// SET TRANSITION OUT
				swapTo[2] = transOut[Math.floor(Math.random()*transOut.length)];

				// Set Trick
				if (newTrick.length > 0){
					var _arr = [];
					// Update Combo
					switch(tr_pos){
						case 0:
							// Ignore Transition In - newTrick[0]
							_arr = this.state.dispCombo;
							_arr[0] = this._trickButton(swapTo[1], 0, 'trick');
							_arr[1] = this._trickButton(swapTo[2], 1, 'trans');
							_arr.push(null);
							this.setState({ dispCombo: _arr.slice(0, this.state.dispCombo.length-1)});
							break;

						case this.state.dispCombo.length-1:
							// Ignore Transition Out - newTrick[2]
							_arr = this.state.dispCombo;
							_arr[tr_pos-1] = this._trickButton(swapTo[0], tr_pos-1, 'trans');
							_arr[tr_pos] = this._trickButton(swapTo[1], tr_pos, 'trick');
							_arr.push(null);
							this.setState({ dispCombo: _arr.slice(0, this.state.dispCombo.length-1)});
							break;

						default:
							if (swapTo[0] != null && swapTo[1] != null && swapTo[2] != null){
								_arr = this.state.dispCombo;
								_arr[tr_pos-1] = this._trickButton(swapTo[0], tr_pos-1, 'trans');
								_arr[tr_pos] = this._trickButton(swapTo[1], tr_pos, 'trick');
								_arr[tr_pos+1] = this._trickButton(swapTo[2], tr_pos+1, 'trans');
								_arr.push(null);
								this.setState({ dispCombo: _arr.slice(0, this.state.dispCombo.length-1)});
							}
							else{
								if (swapTo[0] == null)
									console.log("No Trans In")
								if (swapTo[1] == null)
									console.log("No Trick")
								if (swapTo[2] == null){
									console.log("No Trans Out of: " + swapTo[1].name)
								}	
								alert("Nope")
							}
							break;
					}
				}
				else {
					console.log('No Trick Found')
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
				{/*
				<Button 
					title={'Test Print: Name'} 
					onPress={() => {
						for (var trick in this.state.dispCombo)
							console.log(this.state.dispCombo[trick].props.trick.name)
					}}
				/>
				<Button 
					title={'Test Print: Obj'} 
					onPress={() => {
						for (var trick in this.state.dispCombo)
							console.log(this.state.dispCombo[trick])//.props.trick.name)
					}}
				/>
				<Button 
					title={'clear console'} 
					onPress={() => {
						console.log('----------')
					}}
				/>
				*/}
				<View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-around'}}>
					<Button title='Saved Combos' onPress={() => this.props.navigation.navigate('ComboList')}/>
					<SaveCombo combo={this.state.dispCombo}/>
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
