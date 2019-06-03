import { observable, action, computed } from 'mobx';

class FormStore {

	//format: inputValues[name].[value|getValue]
	@observable inputValues = {};

	//format: inputState[name]: [isValid, violatedRules]
	@observable inputState = {};

	@observable dataStore = null;

	@observable isFormValid = false;

	@observable submitFailed = false;

	@observable editState = {
		isEditing: false,
		editId: null
	};

	@observable invalidFields = []; f

	@action submitForm(e, history, basePath) {
		e.preventDefault();
		this.testRelations();
		this.testFormValidity();
		if (this.isFormValid) {
			this.dataStore.submitData(this.inputValues);
			if (this.editState.isEditing) {
				history.push(basePath)
			}
			this.initializeFormStore();
		} else this.submitFailed = true;
	}

	testRelations() {
		Object.keys(this.inputValues).forEach(name => {
			const inputField = this.inputValues[name];
			if (inputField.hasOwnProperty('relName')) {
				if (!inputField.relStore.getById(inputField.value)) {
					this.inputState[name].isValid = false;
				}
			}
		});
	}

	@action testFormValidity() {
		let invalidFields = [];
		for (let inputName in this.inputState) {
			if (!this.inputState[inputName].isValid) {
				this.isFormValid = false;
				invalidFields.push(inputName);
			}
		};
		if (invalidFields.length) {
			this.isFormValid = false;
		} else {
			this.isFormValid = true;
		}
		this.invalidFields = invalidFields;
	}

	@action initializeFormStore(dataStore, itemId) {
		this.dataStore = dataStore || this.dataStore;
		this.isFormValid = false;
		this.inputValues = {};
		this.inputState = {};
		this.editState = {
			isEditing: null,
			itemId: null,
			isIdInvalid: null
		}
		let selectedItem = null;
		if (itemId) {
			this.editState.isEditing = true;
			this.editState.itemId = itemId;
			selectedItem = this.dataStore.getById(itemId)
			if (!selectedItem) {
				formStore.editState.isIdInvalid = true;
				return;
			}
		}

		this.dataStore.fields.forEach(field => {
			let tempInputs = {};
			const tempValidity = { isValid: false, violatedRules: [], validationClass: 'light-gray' };
			if (selectedItem) {
				tempInputs.value = selectedItem[field.name].value;
			} else {
				tempInputs.value = '';
			}
			if (field.relName) {
				//if relational:
				tempInputs.relStore = field.relStore;
				tempInputs.relName = field.relName;
				Object.defineProperty(tempInputs, 'getValue', {
					get() {
						return this.relStore.getById(this.value, this.relName);
					}, enumerable: true
				});
			} else {
				Object.defineProperty(tempInputs, 'getValue', {
					get() {
						return this.value;
					}, enumerable: true
				});
			}
			this.inputValues[field.name] = tempInputs;
			if (selectedItem) {
				this.inputValues.id = selectedItem.id;
			}
			this.inputState[field.name] = tempValidity;
			this.testInput(field.name);
		});
		this.submitFailed = false;
	}

	@action testInput(name) {
		console.log(name)
		const value = this.inputValues[name].value;
		const id = this.inputValues.id || null;
		let rules = this.dataStore.getFieldByName(name).rules || [''];
		rules = typeof rules == 'string' ? rules.split('|') : rules;
		let isRequired = false;
		let violatedRules = [];
		rules.forEach(rule => {
			if (rule == 'required') isRequired = true;

			const violatedRule = this.testRule(rule, value, name, id);
			if (violatedRule) {
				return violatedRules.push(violatedRule);
			}
		});
		if (!isRequired && value == '') violatedRules = [];
		this.inputState[name].violatedRules = violatedRules;
		this.inputState[name].isValid = !Boolean(violatedRules.length);
		this.testFormValidity();
	}

	@action testRule(rule, value, name, skipId) {
		let arg;
		// if (/^\s*/.test(value)) return 'no opening space';
		if (rule == 'optional' && !value.length) {
			return;
		}
		if (rule.indexOf('min') || rule.indexOf('max')) {
			arg = parseInt(rule.split(':')[1]);
			rule = rule.split(':')[0];
		}
		switch (rule) {
			case 'required':
				if (!value)
					return 'required';
				break;
			case 'unique':
				if (this.dataStore.isValueUnique(value, name, skipId)) return 'unique';
				break;
			case 'min':
				if (value.length < arg) return `min:${arg}`;
				break;
			case 'max':
				if (value.length > arg) return `max:${arg}`;
				break;
			case 'number':
				if (isNaN(value)) return 'number';
				break;
			default:
				return;
		}
	}
}

const formStore = new FormStore();
export default formStore;