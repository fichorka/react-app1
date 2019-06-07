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
		const { dataStore, formStore, itemId, title, history = null, basePath } = this.props;
		const { editState } = formStore;
		const submitInfo = (formStore.submitFailed && formStore.invalidFields.length) ? <span className="db gray mv2">Submission failed. Invalid fields: {formStore.invalidFields.map((field, index, array) => { return (array.length - 1) == index ? `${field}` : `${field}, ` })}</span> : null;
		return (
			<FormLayout dataStore={dataStore} title={title} editState={editState} >
				{!editState.isIdInvalid &&
					<form onSubmit={e => { formStore.submitForm(e, history, basePath) }} onChange={(e) => { formStore.inputValues[e.target.name].value = e.target.value; formStore.testInput(e.target.name) }}>
						{editState.isEditing && <span className="db mb3 tr" ><span>Item id:</span><span className="dib pa1 ml2 tl border-box bg-white light-silver code w-50">{editState.itemId}</span></span>}
						{generateForm(dataStore.fields, formStore.inputValues, formStore.inputState)}
						<span className="db w-100 f6-l f7">
							{submitInfo}
							<span className="dib w-50 tr">
								<input className="dib pointer br1 bg-white b--black-50 ph4 bn pv2 mh3" type="submit" disabled={!formStore.isFormValid} value="SUBMIT" />
							</span>
							<span className="dib w-50 tl" >
								<Link className="dib link black br1 bg-white b--black-50 ph4 pv2 mh3" to={basePath} onClick={() => formStore.initializeFormStore()} >CANCEL</Link>
							</span>
						</span>
					</form>
				}
			</FormLayout>
		)
	}
}

export default Form;