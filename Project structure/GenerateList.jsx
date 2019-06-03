import { Fragment } from 'react';

function generateList(list, sortState, fields) {
	const {sortKey, sortOrder} = sortState;
	return (<Fragment>
		<li className="db-m dn">
			{fields.map(column => {
				const {name} = column;
				return <span className={`dib border-box pa2 tc outline pointer w-${column.width}`}>{() => {return (sortKey == name ? name + sortOrder : name)}}</span>
			})}
		</li>
		{list.map(row => {
			return (<li>
				{Object.keys(row).map(item => {
					return <span className={`w-${row[item].width}`} id={item}>{row[item].value}</span>
				})}
			</li>);
		})}
	</Fragment>);
}