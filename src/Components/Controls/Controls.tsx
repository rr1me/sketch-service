import s from './Controls.module.scss';
import React, { FC, RefObject } from 'react';
import History from './History/History';
import Settings from './Settings/Settings';
import Tools from './Tools/Tools';

export interface IControls {
	canvas: RefObject<HTMLCanvasElement>;
}

const Controls: FC<IControls> = ({ canvas }) => {

	return (
		<div className={s.controls}>
			<Tools/>

			{/* <button className={s.historyOpener} onClick={openHandler('history', true)} */}
			{/* 		style={(history ? {transition: 'opacity 0.5s',opacity: 0} : {transition: 'opacity 0.5s'})} */}
			{/* > */}
			{/* 	{ic.rightArrow} */}
			{/* </button> */}
			<History canvas={canvas}/>
			<Settings/>
		</div>
	);
};

export default Controls;