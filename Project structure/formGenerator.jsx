import formStore from "../src/Stores/FormStore";

function formGenerator(fields) {
	fields.map(input => {
		if (input.hasOwnProperty('type') && input.type == 'select') {
			return (<select value={formStore.inputValues[input.name].value}>
				{input.relStore.data.forEach(field => {
					return <option value={formStore.inputValues[field.name].relStore.value}>{formStore.inputValues[field.name].relStore.getValue}</option>
				})}
			</select>);
		} else {
			return <input id={input.name} name={input.name} value={formStore.inputValues[input.name].value} placeholder={input.label} />
		}
	});
}