import s from './MovingBlock.module.scss';
import React, { useState } from 'react';

type side = 'top' | 'bottom' | 'left' | 'right';

const MovingBlock = ({
	children,
	name,
	side,
	outsideOffset,
	gap,
}: { children: React.ReactNode, name: string, side: side, outsideOffset: number, gap: number }) => {
	const [open, setOpen] = useState(false);
	const openHandler = () => setOpen(v => !v);

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
		s.openButton + (side == 'right' || side == 'bottom' ? ' ' + s.order : '')

	const getOutsideStyle = () => {
		if (open) return undefined;
		let style: object = {pointerEvents: 'none'};
		switch (side) {
		case 'top':
			style = {...style, ...{ transform: 'translateY(-' + outsideOffset + '%)' }};
			break;
		case 'bottom':
			style = {...style, ...{ transform: 'translateY(' + outsideOffset + '%)' }};
			break;
		case 'left':
			style = {...style, ...{ transform: 'translateX(-' + outsideOffset + '%)' }};
			break;
		case 'right':
			style = {...style, ...{ transform: 'translateX(' + outsideOffset + '%)' }};
			break;
		}
		setTimeout(() => {
			
		}, 500)

		return style;
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
			<button className={
				// s.openButton
				// + (open ? ' ' + s.opened : '')
				// +
				getButtonStyle()
			}
					onClick={openHandler}>{getName()}</button>
			<div className={s.block
				// + (!open ? ' ' + s.blockOutside : '')
			} style={{ ...getOutsideStyle(), ...getGap() }}>
				{children}
			</div>
		</div>
	);
};

// const getStyle = (side: side, styleType: styleType) => {
// 	let style = ' ';
// 	switch (side) {
// 	case 'top':
// 		style += styleType === 'in' ? s.top : s.topOutside;
// 		break;
// 	case 'bottom':
// 		style += styleType === 'in' ? s.bottom : s.bottomOutside;
// 		break;
// 	case 'left':
// 		style += styleType === 'in' ? s.left : s.leftOutside;
// 		break;
// 	case 'right':
// 		style += styleType === 'in' ? s.right : s.rightOutside;
// 		break;
// 	}
// 	return style;
// }

export default MovingBlock;