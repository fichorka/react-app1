inputValues = {
	firstName: {
		get getValue() { return this.value },
		value: value
	},
	lastName: {
		get getValue() { return this.value },
		value: value
	},
	age: {
		get getValue() { return this.value },
		value: value
	},
	employeeRole: {
		relStore: value,
		relName: value,
		value: value,
		get getValue() { return this.relStore.getById(this.relId, this.relName); }
	}
}

inputState = {
	firstName: {
		isValid: false,
		violatedRules: ['max:20']
	},
	lastName: {
		isValid: true,
		violatedRules: []
	},
	age: {
		isValid: false,
		violatedRules: ['required']
	}
};


dataStore = dataStore;

isFormValid = false;


function submitForm(e) {
	e.preventDefault();
	testFormValidity();
	if (this.isFormValid) this.dataStore.submitData(this.inputValues);
	else this.submitFailed = true;
	this.initializeFormState();
}

function testFormValidity() {
	this.inputState.forEach(input => {
		if (!input.isValid) {
			this.isFormValid = false;
			return;
		}
	});
	this.isFormValid = true;
}


function initializeFormState(dataStore) {
	this.dataStore = dataStore || this.dataStore;
	this.isFormValid = false;
	this.inputValues = {};
	this.inputState = {};
	this.dataStore.fields.forEach(field => {
		const tempInputs = {};
		const tempValidity = { isValid: false, violatedRules: [] };
		inputs.value = '';
		if (field.relName) {
			//if relational:
			tempInputs.relStore = field.relStore;
			tempInputs.relName = field.relName;
			Object.defineProperty(this.tempInputs, 'getValue', {
				get function() {
					return this.relStore.getById(this.relId, this.relName);
				}
			});
		} else {
			Object.defineProperty(this.tempInputs, 'getValue', {
				get function() {
					return this.value;
				}
			});
		}
		this.inputValues[field.name] = tempInputs;
		this.inputState[field.name] = tempValidity;
		this.testInput(field.name);
	});
	this.testAllInputs();
}


function testAllInputs() {
	for (name in inputState) {
		this.testInput(name);
	}
	this.testFormValidity();
}

function testInput(name) {
	const value = this.inputValues[name].value;
	let { rules } = this.dataStore.fields[name];
	rules = typeof rules == 'string' ?  rules.split('|') : rules;
	let isRequired = false;
	let violatedRules = rules.map(rule => {
		if (rule == 'required') isRequired = true;
		return this.testRule(rule, value, name);
	});
	if (!isRequired && value == '') violatedRules = [];
	this.inputState[name].violatedRules = violatedRules;
	this.inputState[name].isValid = !Boolean(violatedRules.length);
}


function testRule(rule, value, name) {
	if (/^\s*/.test(value)) return 'no opening space';
	if (rule == 'optional' && !value.length) {

	}
	if (rule.indexOf('min') || rule.indexOf('max')) {

		let arg = parseInt(rule);
		rule.replace(rule.split(':')[0]);

	}
	minRule = /min:(\d+)/;
	maxRule = /max:(\d+)/;
	switch (rule) {
		case 'required':
			if (!value)
				return 'required';
			else break;
		case 'unique':
			if (this.dataStore.isValueUnique(value, name)) return 'unique';
			else break;
		case 'min':
			if (value.length < arg) return `min:${arg}`;
			else break;
		case 'max':
			if (value.length > arg) return `max:${arg}`;
			else break;
		default:
			return;
	}
}
