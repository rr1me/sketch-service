import s from './Tools.module.scss';
import ic from '../../Icons/Icons';
import React, { FC } from 'react';
import { actions, brushType } from '../../../redux/slices/controlSlice';
import { useDispatch } from 'react-redux';

const { tool } = actions;

const Tools: FC = () => {
	const dispatch = useDispatch();

	const selectTool = (type: brushType) => () => {
		dispatch(tool(type));
	};

	return (
		<div className={s.tools}>
			<button className={s.iconButton} onClick={selectTool('Brush')}>{ic.paintBrush}</button>
			<button className={s.iconButton} onClick={selectTool('Square')}>{ic.square}</button>
			<button className={s.iconButton} onClick={selectTool('Circle')}>{ic.circle}</button>
			<button className={s.iconButton} onClick={selectTool('Line')}>{ic.line}</button>
			<button className={s.iconButton} onClick={selectTool('Rectangle')}>{ic.triangle}</button>
			<button className={s.iconButton} onClick={selectTool('Fill')}>{ic.fill}</button>
		</div>
	);
};

export default Tools;