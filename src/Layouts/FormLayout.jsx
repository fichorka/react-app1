import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import RuleList from '../Components/RuleList';
import Card from '../Components/Card';

@observer
class FormLayout extends Component {
	render() {
		const { dataStore: { fields }, title, editState } = this.props;
		return (
			<Fragment>
				<Card componentWidth="measure-narrow-l measure-narrow-m w-auto" componentTitle={title}>
					{!editState.isIdInvalid &&
						<Fragment>
							<RuleList fields={fields} />
							<div className="measure-narrow ma3 pb3">
								{this.props.children}
							</div>
						</Fragment>
					}
					{editState.isEditing && editState.isIdInvalid &&
						<span>Invalid Id <span className="b" >{editState.itemId}</span></span>
					}
				</Card>
			</Fragment>
		);
	}
}

export default FormLayout;