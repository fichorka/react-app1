import React, { Fragment } from 'react';
import rootStore from '../Stores/RootStore';
import editIcon from '../edit.png';
import deleteIcon from '../delete.png';
import { Link } from 'react-router-dom';


export const generateId = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
}


export const generateRuleList = (fields) => {
	return fields.map((field, index) => {
		const rules = (typeof field.rules == 'string') ? field.rules.split('|') : (field.rules || ['-']);
		return (<div key={index} className="mb2"><span className="dib b f6-l f7 pl3">{field.label}:</span><span className="list ml2 f6-l f7">{rules.map((rule, index, array) => {
			return <span key={index}>{array.length == index + 1 ? `${rule}` : `${rule}, `}</span>
		})}</span></div>);
	});
}

export const generateForm = (fields, inputValues, inputState) => {
	// alert('formGen');
	var result = [];
	// for (let inputName in inputValues) {
	return fields.map((field, index) => {
		const input = inputValues[field.name];
		const label = field.label;
		const name = field.name;
		const relName = input.relName;
		const value = input.value;
		const state = inputState[name];
		var visibility = 'dn';
		const width = 50;
		let temp = null;
		if (field.hasOwnProperty('relName')) {
			const options = input.relStore.data.map(item => {
				return <option key={item.id} value={item.id}>{item[relName].value}</option>;
			});
			options.unshift(<option key={'select-value'} value=''>Select a value</option>);
			temp = <select key={index} className="ml2 pa1 w-50 bn border-box" value={value} name={name} onBlur={() => inputState[name].validationClass = 'dark-red'}>{options}</select>;
		} else {
			temp = <input key={index} className="ml2 pa1 w-50 bn border-box" id={name} name={name} value={value} onChange={() => inputState[name].validationClass = 'dark-red'} placeholder={label} />
		}
		return (<div key={name} className="mt1 mb2"><label className="db tr" >{label}:{temp}</label><span id={`validityInfo-${name}`} className={'db tr f6 mr3 ' + inputState[name].validationClass}>&nbsp; {inputState[name].violatedRules.map((rule, index, array) => { return array.length == (index + 1) ? `${rule}` : `${rule}, ` })}</span></div>);
	})
}

export const sortItems = (data, key, controlVar = 1, relData) => {
	data.replace(data.slice().sort((a, b) => {
		if (relData && (a.relId || b.relId)) {
			a = rootStore[relData.relStore].filterData({ id: a.relId, returnValue: relData.relKey });
			b = rootStore[relData.relStore].filterData({ id: b.relId, returnValue: relData.relKey });
		} else {
			a = a[key].toLowerCase();
			b = b[key].toLowerCase();
		}
		if (a > b) {
			return (1 * controlVar);
		} else if (a < b) {
			return (-1 * controlVar);
		} else {
			return 0;
		}
	}));
}

export const generateList = (listStore, currPath) => {
	const { listState: sortState, dataStore } = listStore;
	let { fields, getFieldByName: getField } = dataStore;
	const list = listStore.extractItems();
	getField = getField.bind(dataStore);
	if (!list.length) return false
	const { sortKey, sortOrder } = sortState;
	let bgShade = '10';
	return (<ul className="pl0 list f5-l f7 ma0">
		{/* Column headings */}
		<li className="db-l db-m dn">
			<div className="dib-l dib-m w-90-l w-90-m db w100">
				{fields.map(column => {
					bgShade = bgShade == '20' ? '10' : '20';
					const { name, label } = column;
					return <span key={name} onClick={() => listStore.dataStore.sortData(name)} className={`dib pv2 ph1 border-box tc pointer truncate w-${column.width} bg-black-${bgShade}`}>{(sortKey == name ? `${label} ${sortOrder}` : label)}</span>
				})}
			</div><div className="dib-l dib-m w-10-l w-10-m db w100"><span className={`dib w-100 pv2 ph1 border-box tc truncate bg-black-${bgShade == '20' ? '10' : '20'}`}>Actions</span></div>
		</li>

		{/* Rows */}
		{list.map(row => {
			return (<li key={row.id} className="db mv1-l mv1-m mv3" ><div className="db w-100-l w-100-m w-70 bn-l bn-m ba br0-l br0-m br2 center tc bg-white"><div className="dib w-90-l w-90-m w-100 border-box">
				{Object.keys(row).map(name => {
					if (typeof row[name] == 'object') {
						return <div key={name} className={`h2-l h2-m h2-auto dib border-box v-mid w-100 db v-mid w-${getField(name).width}-l w-${getField(name).width}-m tl-l tl-m tc br-l br-m br-0`} ><span className="truncate border-box pt1 dn-m dn-l db m-auto tc ph2 w-100 gray">{getField(name).label + ':'}</span><span className={`dib-l dib-m db pt2-l pt2-m ph2-l ph2-m ph1 truncate pt0 pb0-l pb0-m pb1 border-box w-100 bb-0-l bb-0-m bb`} id={name}>{row[name].getValue}</span></div>
					}
				})}
			</div>
				<div className="w-10-m border-box w-10-l dib-l dib-m db w-100 tc"><span className="dib v-mid h2 tc w-100 bn-l border-box"><Link to={currPath + '/id/' + row.id} id={row.id} className="dib w-50 h-100 pointer hover-bg-black-30 center" style={{ backgroundImage: `url(${editIcon})`, backgroundSize: '18px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} ></Link><span id={row.id} className="dib w-50 h-100 pointer hover-bg-black-30 center" onClick={(e) => dataStore.deleteItem(e.target.id)} style={{ backgroundImage: `url(${deleteIcon})`, backgroundSize: '18px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} ></span></span></div></div></li>);
		})}
	</ul>);
}