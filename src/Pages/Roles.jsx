import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import PageLayout from '../Layouts/PageLayout';
import ItemsLayout from '../Layouts/ItemsLayout';

@inject(stores => ({
	dataStore: stores.rootStore.roleStore
}))
@observer
class Roles extends Component {
	render() {
		const { dataStore, match } = this.props;
		const { data } = dataStore;
		return (
			<PageLayout pageTitle="Roles" >
				<ItemsLayout itemName="role" dataLength={data.length} dataStore={dataStore} match={match} />
			</PageLayout>
		)
	}
}

export default Roles;