import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import Form from '../Components/Forms/Form';

@observer
class ItemEdit extends Component {
	render() {
		const { dataStore, title, match, basePath, history } = this.props;
		const { itemId } = match.params;
		return (
			<Form dataStore={dataStore} title={title} itemId={itemId} basePath={basePath} history={history} />
		)
	}
}

export default ItemEdit;