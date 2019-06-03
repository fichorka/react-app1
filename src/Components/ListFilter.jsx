import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { generateList } from '../Common/Common';
import ListLayout from '../Layouts/ListLayout';
import { get } from 'mobx';
import closeIcon from '../cross.png';
import searchIcon from '../search.png';
import UIButton from './UIButton';

@inject(stores => ({
	listStore: stores.rootStore.listStore
}))
@observer
class ListFilter extends Component {
	render() {
		const { listState } = this.props.listStore;
		return (
			<Fragment>
				<div className="dib ba br2 bg-white b--gray mv1">
					<form onSubmit={e => { e.preventDefault(); listState.filter = e.target.filter.value }}>
						<input id="filter" size="15" className="pa1 dib br2 bn pa0 f6-l f7" placeholder="Search" />
						<span className="dib h1 w1 v-mid" style={{ backgroundImage: `url(${searchIcon})`, backgroundSize: '70% 70%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></span>
					</form>
				</div>
				{listState.filter.length > 0 &&
					<div className="mv2 pointer" onClick={() => listState.filter = ''}>
						<span className="dib v-mid"><span className="dib h1 w1"><span className="dib w-50 h-50 v-mid mr2" style={{ backgroundImage: `url(${closeIcon})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} ></span></span>{listState.filter}</span>
					</div>
				}

			</Fragment>
		);
	}
}

export default ListFilter;