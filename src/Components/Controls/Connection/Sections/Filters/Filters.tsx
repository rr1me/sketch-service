import s from './Filters.module.scss';
import { FC, useState } from 'react';

const Filters: FC = () => {
	const [checked, setChecked] = useState(false);

	return (
		<div className={s.filters}>
			<div className={s.filter}>
				<input className={s.filterCheckbox} type='checkbox' checked={checked} onClick={()=>{
					setChecked(v=>!v)
					console.log(checked);
				}}/>
				<span>Unfilled</span>
			</div>
			<div className={s.filter}>
				<input className={s.filterCheckbox} type='checkbox' checked={checked} onClick={()=>{
					setChecked(v=>!v)
					console.log(checked);
				}}/>
				<span>No password</span>
			</div>
		</div>
	);
};

export default Filters;