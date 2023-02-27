import React, { FC, ReactNode, RefObject, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import s from './PortalModal.module.scss';

const PortalModal: FC<{ elemRef: RefObject<HTMLElement>, state: boolean, children: ReactNode }> =
	({ elemRef, state, children}) => {

		const [pos, setPos] = useState<{x: number, y: number, width: number}>({x: 0, y: 0, width: 0});

		const resize = () => {
			if (!elemRef.current) return;
			const rect = elemRef.current.getBoundingClientRect();
			setPos({x: rect.x, y: rect.y + rect.height + 5, width: rect.width})
		};

		useLayoutEffect(() => {
			resize();
			window.addEventListener('resize', resize);
			return () => window.removeEventListener('resize', resize);
		}, [state]);

		if (!state) return null;

		return ReactDOM.createPortal(
			<div className={s.modal} style={{ left: pos.x, top: pos.y, width: pos.width }}>
				{children}
			</div>
			, document.body);
	};

export default PortalModal;