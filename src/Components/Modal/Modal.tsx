import React, { FC, ReactNode, RefObject, useLayoutEffect, useState } from 'react';
import s from './Modal.module.scss';

const Modal: FC<{ elemRef: RefObject<HTMLElement>, state: boolean, setState: (e:any) => void, children: ReactNode }> = ({
	elemRef,
	state,
	setState,
	children,
}) => {

	const id = makeId(5);

	const [width, setWidth] = useState(15);

	// const [style, setStyle] = useState('');

	useLayoutEffect(() => {
		if (!elemRef.current) return;
		const width = elemRef.current.getBoundingClientRect().width;
		setWidth(width);
		if (!state) return;
		// setTimeout(() => { // todo animation?
		// 	setStyle(' ' + s.open);
		// }, 50);

		const closeDP = (e: any) => {
			if (e.composedPath()[0].id !== id){
				console.log(e.composedPath()[0], '/', id, e.composedPath()[0].id !== id);
				setState(false);
			}
		}
		document.body.addEventListener('click', closeDP);
		return () => {
			// setStyle('');
			return document.body.removeEventListener('click', closeDP);
		}
	}, [state]);

	if (!state) return null;
	return (
		<div className={s.modal
			// + style
		} id={id}
			 style={{ width: width }}>
			{children}
		</div>
	);
};

const makeId = (length: number) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export default Modal;