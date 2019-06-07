import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';


@inject(stores => ({
	sideBarStore: stores.rootStore.sideBarStore
}))
@observer
class SideBar extends Component {
	render() {
		const {sideBarStore} = this.props;
		const {items} = sideBarStore;
		return (
			<div className="dib-l db w-20-l pr3-l pr0 v-top h-100">
				<div className="dib pv2 w-100 v-top bg-black-80 tr">
					{Object.keys(items).map((name, index) => {
						return <span key={index} onClick={() => items[name].show = !items[name].show} className={`db-l dib w-auto-l w-50 tr-l tc mv2 mh1-l mh0 hover-white pa2-l pa0 pointer ${items[name].show ? 'light-green' : 'white-60'}`}>{items[name].label}</span>
					})}
				</div>
			</div>
		)
	}
}

export default SideBar;