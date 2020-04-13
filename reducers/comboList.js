const comboListReducer = (state = [], action) => {
	switch(action.type){
		case 'ADD_COMBO':
			state.push(action.payload);
			return state;
		case 'DEL_ALL':
			state = [];
			return state;
		default:
			return state;
	}
};

export default comboListReducer;
