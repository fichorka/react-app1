import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import PageLayout from '../Layouts/PageLayout';


@inject(stores => ({
	roleStore: stores.rootStore.roleStore,
	employeeStore: stores.rootStore.employeeStore
}))
@observer
class NoMatch extends Component {
	render() {
		return (
			<PageLayout pageTitle="No Match">
				<div className="ph4-l ph3">
					<span className="db pv2 tc">dfsgdgs</span>
				</div>
			</PageLayout>
		)
	}
}

export default NoMatch;