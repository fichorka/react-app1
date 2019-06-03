import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import FormLayout from '../Layouts/FormLayout';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from '../Components/Forms/Form';
import Card from '../Components/Card';

@observer
class ItemEdit extends Component {
	render() {
		console.log('AAAA')
		console.log(this.props);
		const { dataStore, title, match, basePath } = this.props;
		const { itemId } = match.params;
		return (
			<Form dataStore={dataStore} title={title} itemId={itemId} basePath={basePath} history={this.props.history} />
		)
	}
}

export default ItemEdit;