import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native';

export default class TrickInCombo extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<View style={{width:'80%'}}>
				<TouchableOpacity onPress={() => {this.props.swapTrick(this.props.position, this.props.type)}}>
					<View style={{alignItems: 'center',  borderColor: '#00f', borderWidth: 2, margin: 2}}>
						<Text style={{paddingVertical: 2}}>{this.props.trick.name}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	},
});

