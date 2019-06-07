import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';


@inject(stores => ({
	headerStore: stores.rootStore.headerStore
}))
@observer
class Footer extends Component {
	render() {
		const { headerStore } = this.props;
		const {header} = headerStore
		const {navigation} = headerStore;
		return (
			<Fragment>
				<footer className="db bg-light-gray">
					<ul className="list f6-l f7 ma0 pv5 ph4-l ph3 w-two-thirds-l w-100 center" >
						<div className="mb3" >Icons made by <a className="link gray" href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a className="link gray" href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a className="link gray" href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
						<li className="mv2">App made by Filip Biterski<br />
						filip.biterski@gmail.com</li>
					</ul>
				</footer>
			</Fragment>
		);
	}
}


export default Footer;