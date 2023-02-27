import s from './Controls.module.scss';
import React, { FC, RefObject } from 'react';
import History from './History/History';
import Tools from './Tools/Tools';
import Settings from './Settings/Settings';

export interface IControls {
	canvas: RefObject<HTMLCanvasElement>;
}

const Controls: FC<IControls> = ({ canvas }) => {
	return (
		<div className={s.controls}>
			<Tools />
			<Settings />
			<History canvas={canvas}/>
		</div>
	);
};

export default Controls;