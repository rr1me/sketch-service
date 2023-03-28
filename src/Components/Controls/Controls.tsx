import s from './Controls.module.scss';
import React, { FC, RefObject } from 'react';
import History from './History/History';
import Tools from './Tools/Tools';
import Settings from './Settings/Settings';
import Connection from './Connection/Connection';
import { connType } from '../../App';

export interface IControls {
	canvas: RefObject<HTMLCanvasElement>;
	connection: connType;
}

const Controls: FC<IControls> = ({ canvas, connection }) => {
	return (
		<div className={s.controls}>
			<Tools />
			<Settings />
			<History canvas={canvas}/>
			<Connection canvas={canvas}/>
		</div>
	);
};

export default Controls;