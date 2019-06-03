import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import PageLayout from '../Layouts/PageLayout';


@inject(stores => ({
	roleStore: stores.rootStore.roleStore,
	employeeStore: stores.rootStore.employeeStore
}))
@observer
class Home extends Component {
	render() {
		return (
			<PageLayout pageTitle="Home">
				<div className="ph4-l ph3">
					<span className="db pv2 tc">Total employees: {this.props.employeeStore.data.length}</span>
					<span className="db pv2 tc">Total roles: {this.props.roleStore.data.length}</span>
				</div>
			</PageLayout>
		)
	}
}

export default Home;