import s from './Controls.module.scss';
import React, { FC, RefObject } from 'react';
import History from './History/History';
import Tools from './Tools/Tools';
import Settings from './Settings/Settings';
import Connection from './Connection/Connection';

const Controls: FC<{canvas: RefObject<HTMLCanvasElement>}> = ({ canvas }) => {
	return (
		<div className={s.controls}>
			<Tools />
			<Settings />
			<History canvas={canvas}/>
			<Connection/>
		</div>
	);
};

export default Controls;