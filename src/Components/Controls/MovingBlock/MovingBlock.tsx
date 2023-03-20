import s from './MovingBlock.module.scss';
import React, { FC, ReactElement, useState } from 'react';

type side = 'top' |
	'bottom' |
	'left' | 'right';

const PE = { pointerEvents: 'none' };

const MovingBlock = ({
	children,
	name,
	side,
	outsideOffset,
	gap,
	locationOffsetSide,
	locationOffset,
	openEvent
}: { children: React.ReactNode, name: ReactElement, side: side, outsideOffset: number, gap: number,
	locationOffsetSide: side, locationOffset: number, openEvent?: () => void
}) => {
	const [open, setOpen] = useState(false);
	const [pointerEvents, setPointerEvents] = useState<object | null>(PE);
	const openHandler = () => {
		setOpen(v => {
			if (!v) {
				setTimeout(() => {
					setPointerEvents(null);

					if (openEvent) openEvent()
				}, 300);
			} else {
				setPointerEvents(PE);
			}

			return !v;
		});
	};

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

	const getLocationOffset = () => {
		switch (locationOffsetSide) {
		case 'top':
			return { top: locationOffset + 'vh' };
		case 'bottom':
			return { bottom: locationOffset + 'vh' };
		case 'left':
			return { left: locationOffset + 'vw' };
		case 'right':
			return { right: locationOffset + 'vw' };
		}
	};

	return (
		<div className={s.wrapper + getSideStyle()} style={getLocationOffset()}>
			<button className={getButtonStyle()}
					onClick={openHandler}>{name}</button>
			<div className={s.block} style={{ ...getOutsideStyle(), ...getGap(), ...pointerEvents }}>
				{children}
			</div>
		</div>
	);
};

export default MovingBlock;