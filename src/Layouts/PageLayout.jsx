import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import PageTitle from '../Components/PageTitle';

@inject(stores => ({
	pageStore: stores.rootStore.pageStore
}))
@observer
class PageLayout extends Component {

	render() {
		const { pageStore } = this.props;
		const { sideBar } = pageStore.pageState;
		return (
			<Fragment>
				<PageTitle title={this.props.pageTitle} />
					{this.props.children}
			</Fragment>
		);
	}
}

export default PageLayout;