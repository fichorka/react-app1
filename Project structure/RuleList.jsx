function generateRuleList(fields) {
	return fields.map(field => {
		extractedRules = !rules
			? [null]
			: (typeof rules == 'object')
				? rules.split('|')
				: rules;
		return <ul>
			{extractedRules.map(rule => {
				<li>{rule}</li>
			})}
		</ul>
	});

}