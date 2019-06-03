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
				<div className="">
					{/* {sideBar &&
						<div className="dib w-20 pr3 v-top">
							<div className="dib pv2 w-100 v-top bg-black-80 tr mt3">
								<span className="db mv2 mh1 white-70 hover-light-green pa2 pointer">Add new role</span>
								<span className="db mv2 mh1 white-70 hover-light-green pa2 pointer">Show list</span>
							</div>
						</div>
					} */}
					{this.props.children}
				</div>
			</Fragment>
		);
	}
}

export default PageLayout;