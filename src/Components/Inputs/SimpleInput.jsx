import React, { Component } from 'react'
import { inject } from 'mobx-react';

@inject (stores => ({
	formStore: stores.rootStore.formStore
}))
class SimpleInput extends Component {
	render() {
		const {name, label, size, formStore, dataStore} = this.props;
		// const validationClass = store.validationState[name].isValid ? 'valid' : 'invalid' || 'unchecked';
		return (
				<label className="db mb3 mt2 f4-l f5">
					{this.props.label}
					<input className={'db mt1 pt1 pb1 pl1 pr1'} value={formStore.inputValues[name]} size={size} placeholder={`Enter ${label}`} name={name} id={name} />
				</label>
		);
	}
}

export default SimpleInput;