import s from './Controls.module.scss';
import React, { FC, RefObject } from 'react';
import History from './History/History';
import Tools from './Tools/Tools';
import useMovingBlock from './MovingBlock/useMovingBlock';

export interface IControls {
	canvas: RefObject<HTMLCanvasElement>;
}

const Controls: FC<IControls> = ({ canvas }) => {

	// const {MovingBlock, openHandler} = useMovingBlock()

	return (
		<div className={s.controls}>
			<Tools />

			{/* <button className={s.historyOpener} onClick={openHandler('history', true)} */}
			{/* 		style={(history ? {transition: 'opacity 0.5s',opacity: 0} : {transition: 'opacity 0.5s'})} */}
			{/* > */}
			{/* 	{ic.rightArrow} */}
			{/* </button> */}
			{/* <Settings /> */}
			<History canvas={canvas}/>
		</div>
	);
};

export default Controls;