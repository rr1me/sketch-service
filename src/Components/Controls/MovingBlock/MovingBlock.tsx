import s from './MovingBlock.module.scss';
import React, { useLayoutEffect, useState } from 'react';

type side = 'top' | 'bottom' | 'left' | 'right';

const PE = { pointerEvents: 'none' };

const MovingBlock = ({
	children,
	name,
	side,
	outsideOffset,
	gap,
}: { children: React.ReactNode, name: string, side: side, outsideOffset: number, gap: number }) => {
	const [open, setOpen] = useState(false);
	const [pointerEvents, setPointerEvents] = useState<object | null>(PE);
	const openHandler = () => {
		setOpen(v => {
			// const value = !v;

			if (!v) {
				setTimeout(() => {
					setPointerEvents(null);
				}, 300);
			} else {
				setPointerEvents(PE);
			}

			return !v;
		});
	};

	useLayoutEffect(() => {
		// d

	}, []);

	const convertName = () =>
		name.split('').map((v, i) => <React.Fragment key={i}>{v}<br /></React.Fragment>);

	const getSideStyle = () => {
		let style = ' ';
		switch (side) {
		case 'top':
			style += s.top;
			break;
		case 'bottom':
			style += s.bottom;
			break;
		case 'left':
			style += s.left;
			break;
		case 'right':
			style += s.right;
			break;
		}
		return style;
	};

	const getButtonStyle = () =>
		s.openButton + (side == 'right' || side == 'bottom' ? ' ' + s.order : '');

	const getOutsideStyle = () => {
		if (open) return undefined;
		switch (side) {
		case 'top':
			return { transform: 'translateY(-' + outsideOffset + '%)' };
		case 'bottom':
			return { transform: 'translateY(' + outsideOffset + '%)' };
		case 'left':
			return { transform: 'translateX(-' + outsideOffset + '%)' };
		case 'right':
			return { transform: 'translateX(' + outsideOffset + '%)' };
		}
	};

	const getGap = () => {
		if (!open) return undefined;
		switch (side) {
		case 'top':
			return { marginTop: gap };
		case 'bottom':
			return { marginBottom: gap };
		case 'left':
			return { marginLeft: gap };
		case 'right':
			return { marginRight: gap };
		}
	};

	const getName = () => side == 'left' || side == 'right' ? convertName() : name;

	return (
		<div className={s.wrapper + getSideStyle()}>
			<button className={getButtonStyle()}
					onClick={openHandler}>{getName()}</button>
			<div className={s.block} style={{ ...getOutsideStyle(), ...getGap(), ...pointerEvents }}>
				{children}
			</div>
		</div>
	);
};

export default MovingBlock;