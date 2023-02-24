import s from './MovingBlock.module.scss';
import React from 'react';

const MovingBlock = ({
	children,
	open,
	openHandler,
	name,
}: { children: React.ReactNode, open: boolean, openHandler: () => void, name: any }) => {
	const convertName = () =>
		name.split('').map((v: string) => <React.Fragment key={v}>{v}<br /></React.Fragment>);

	return (
		<div className={s.wrapper}>
			<button className={s.openButton + (open ? ' ' + s.opened : '')}
					onClick={openHandler}>{convertName()}</button>
			<div className={s.block + (!open ? ' ' + s.blockOutside : '')}>
				{children}
			</div>
		</div>
	);
};

export default MovingBlock;