import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { generateForm } from '../../Common/Common';
import FormLayout from '../../Layouts/FormLayout';
import { Link } from 'react-router-dom';


@inject(stores => ({
	formStore: stores.rootStore.formStore
}))
@observer
class Form extends Component {
	constructor(props) {
		super(props);
		const { formStore, dataStore, itemId } = this.props;
		formStore.initializeFormStore(dataStore, itemId);
	}

	render() {
		console.log('form')
		console.log(this.props)
		const { dataStore, formStore, itemId, title, history = null, basePath } = this.props;
		const { editState } = formStore;
		const submitInfo = formStore.submitFailed ? `Submission failed. Invalid fields: ${formStore.invalidFields}` : '';
		console.log(basePath)
		return (
			<FormLayout dataStore={dataStore} itemId={itemId} title={title} editState={editState} >
				{!editState.isIdInvalid &&
					<form className="ma3 pb3" onSubmit={e => { formStore.submitForm(e, history, basePath) }} onChange={(e) => { formStore.inputValues[e.target.name].value = e.target.value; formStore.testInput(e.target.name) }}>
						{generateForm(dataStore.fields, formStore.inputValues, formStore.inputState)}
						<span className="db w-100 f6-l f7">
						<span className="dib w-50 tr"><input className="dib pointer bg-white b--black-50 ph4 bn pv2 mh3" type="submit" disabled={!formStore.isFormValid} value="SUBMIT" /></span><span className="dib w-50 tl" >{submitInfo}<Link className="dib link black br1 bg-white b--black-50 bg-light-gray ph4 pv2 mh3" to={basePath} onClick={() => formStore.initializeFormStore()} >CANCEL</Link></span></span>
					</form>
				}
			</FormLayout>
		)
	}
}

export default Form;