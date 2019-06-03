import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { generateForm } from '../../Common/Common';
import FormLayout from '../../Layouts/FormLayout';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


@observer
class ItemEdit extends Component {
	render() {
		const {dataStore, match, params} = this.props;
		return (
			<Router path={`${match.path}/:id`} render={() => (
				dataStore.getById(params.id) ?
				<Form dataStore={dataStore} existingValues={dataStore.getById(params.id)} itemId={params.id} returnPath="/roles" history={this.props.history} />
				: <div><span>Invalid id {params.id}</span></div>

			)} />
		)
	}
}

export default ItemEdit;