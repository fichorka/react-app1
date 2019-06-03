import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { generateList } from '../Common/Common';
import ListLayout from '../Layouts/ListLayout';
import { get } from 'mobx';

@inject(stores => ({
	dataStore: stores.rootStore.dataStore
}))
@observer
class ItemEdit extends Component {
	render() {
		const {id} = this.props;
		return (
			<Form existingValues={dataStore.getById(id)} />
		)
	}
}

export default ItemEdit;