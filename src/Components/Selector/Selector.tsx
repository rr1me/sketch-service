import s from './Selector.module.scss';
import React, { useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import ic from '../Icons/Icons';

// interface ISelectorOptions {
// 	value: string,
// 	label: string
// }

const Selector = ({options, value, onChange}: {options: string[], value: number, onChange: (e:number) => void}) => {
	const controlRef = useRef(null);
	const [open, setOpen] = useState(false);

	const onControlClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setOpen(v => !v);
	};
	const onClickHandle = (v:number) => () => onChange(v);

	return (
		<>
			<div className={s.control} onClick={onControlClick} ref={controlRef}>
				<div className={s.inner}>
					{options[value]}
					<div className={s.innerEnd}>
						<div className={s.tab}/>
						<div className={s.arrow}>{ic.selectorArrow}</div>
					</div>
				</div>
				<Modal elemRef={controlRef} state={open} setState={setOpen}>
					<div className={s.modalInner}>
						{options.map((v, i) => {
							return (
								<span key={v} className={s.item} onClick={onClickHandle(i)}>{v}</span>
							)
						})}
					</div>
				</Modal>
			</div>
		</>
	)
};

export default Selector;