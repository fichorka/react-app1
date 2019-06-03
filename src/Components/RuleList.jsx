import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import { generateRuleList } from '../Common/Common';

@observer
class RuleList extends Component {
	render() {
		const { fields } = this.props;
		return (
			<div className="overflow-x-auto bg-black-10 pv2 ph3 db">
				<h2 className="f5 normal f4-l mt1 mb1">List of rules:</h2>
				{generateRuleList(fields)}
			</div>
		)
	}
}

export default RuleList;