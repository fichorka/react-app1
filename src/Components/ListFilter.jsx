import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import closeIcon from '../cross.png';
import searchIcon from '../search.png';

@inject(stores => ({
	listStore: stores.rootStore.listStore
}))
@observer
class ListFilter extends Component {
	render() {
		const { listState } = this.props.listStore;
		return (
			<Fragment>
				<div className="dib ba br2 bg-white b--gray mb1">
					<form onSubmit={e => { e.preventDefault(); listState.filter = e.target.filter.value; listState.pageCorrect(); }}>
						<input id="filter" size="15" className="pa1 dib br2 bn pa0" placeholder="Search" />
						<span className="dib mh1 h1 w1 v-mid" style={{ backgroundImage: `url(${searchIcon})`, backgroundSize: '70% 70%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></span>
					</form>
				</div>
				{listState.filter.length > 0 &&
					<div className="mv2">
						<span className="dib pa2 pr3 v-mid pointer bg-black-20" onClick={() => listState.filter = ''}><span className="dib h1 w1"><span className="dib w-50 h-50 v-mid mr2" style={{ backgroundImage: `url(${closeIcon})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} ></span></span>{listState.filter}</span>
					</div>
				}

			</Fragment>
		);
	}
}

export default ListFilter;