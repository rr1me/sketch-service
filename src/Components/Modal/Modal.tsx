import React, { FC, ReactNode, RefObject, useLayoutEffect, useState } from 'react';
import s from './Modal.module.scss';

const Modal: FC<{ elemRef: RefObject<HTMLElement>, state: boolean, children: ReactNode }> =
	({ elemRef, state, children}) => {

	const [width, setWidth] = useState(15);

	useLayoutEffect(() => {
		if (!elemRef.current) return;
		const width = elemRef.current.getBoundingClientRect().width;
		setWidth(width);
	}, [state]);

	if (!state) return null;
	return (
		<div className={s.modal}
			style={{width: width}}>
			{children}
		</div>
	)
};

export default Modal;