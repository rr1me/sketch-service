import s from './Selector.module.scss';
import { useRef, useState } from 'react';
import Modal from '../Modal/Modal';

interface ISelectorOptions {
	value: string,
	label: string
}

const Selector = ({options, value, onChange}: {options: ISelectorOptions[], value: number, onChange: (e:number) => void}) => {
	const controlRef = useRef(null);
	const [open, setOpen] = useState(false);

	const onControlClick = () => setOpen(v => !v);

	return (
		<>
			<div className={s.control} onClick={onControlClick} ref={controlRef}>
				<div className={s.label}>
					{options[value].value}
				</div>
				{/* <PortalModal elemRef={controlRef} state={open}> */}
				{/* 	hui */}
				{/* </PortalModal> */}
				<Modal elemRef={controlRef} state={open}>
					hui
				</Modal>
			</div>
		</>
	)
};

export default Selector;