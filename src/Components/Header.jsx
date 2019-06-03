import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import NavButton from './NavButton';


@inject(stores => ({
	headerStore: stores.rootStore.headerStore
}))
@observer
class Header extends Component {
	render() {
		const { headerStore } = this.props;
		const {header} = headerStore
		const {navigation} = headerStore;
		return (
			<Fragment>
				<header className="f4-l f5-m f6 pt2-l pb2-l pb3 pt3 dib-l w-20-l db  w-100 pointer bb tc hover-mid-gray bg-light-gray">{header.text}</header>
				<nav className="w-auto f4-l f5-m f6 w-80-l dib-l w-100 db ma0 bb-0 bb-l  bg-light-gray">
					<ul className="dib-l db ma0 pa0 tc nowrap">
						<NavButton linkPath={navigation.paths.link1} text={navigation.text.link1} exact={true}/>
						<NavButton linkPath={navigation.paths.link2} text={navigation.text.link2}/>
						<NavButton linkPath={navigation.paths.link3} text={navigation.text.link3}/>
						{/* <NavButton linkPath={navBarStore.paths.link4} text={navBarStore.text.link4}/>
						<NavButton linkPath={navBarStore.paths.link5} text={navBarStore.text.link5}/> */}
					</ul>
				</nav>
			</Fragment>
		);
	}
}


export default Header;