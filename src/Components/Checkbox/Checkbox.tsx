import s from './Checkbox.module.scss';
import { FC, useState } from 'react';

const Checkbox: FC<{callback: () => void, checked: boolean}> = ({callback, checked}) => {

	return (
		<div onClick={callback} className={s.checkbox + (checked ? ' ' + s.checked : '')}>
			{checked ? <>&#x2714;</> : ''}
		</div>
	)
};

export default Checkbox;