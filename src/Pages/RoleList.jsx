import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from '../Components/List';
import PageLayout from '../Layouts/PageLayout';

@inject(stores => ({
	dataStore: stores.rootStore.roleStore
}))
@observer
class RoleList extends Component {
	render() {
		const { dataStore } = this.props;
		return (
			<PageLayout pageTitle="Role List" >
				<List dataStore={dataStore} />
			</PageLayout>
		);
	}
}

export default RoleList;