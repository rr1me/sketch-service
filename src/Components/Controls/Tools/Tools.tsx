import s from './Tools.module.scss';
import ic from '../../Icons/Icons';
import React, { FC } from 'react';
import { actions, brushType, IControlState } from '../../../redux/slices/controlSlice';
import { useDispatch, useSelector } from 'react-redux';
import MovingBlock from '../MovingBlock/MovingBlock';

const { tool } = actions;

const Tools: FC = () => {
	const dispatch = useDispatch();
	const {
		tool: { type },
	} = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const selectTool = (type: brushType) => () => {
		dispatch(tool(type));
	};

	return (
		<MovingBlock name={'Tools'} side={'top'} outsideOffset={160} gap={10}>
			<div className={s.tools}>
				<button className={s.iconButton + (type === 'Brush' ? ' ' + s.iconUsing : '')} onClick={selectTool('Brush')}>{ic.paintBrush}</button>
				<button className={s.iconButton + (type === 'Square' ? ' ' + s.iconUsing : '')} onClick={selectTool('Square')}>{ic.square}</button>
				<button className={s.iconButton + (type === 'Circle' ? ' ' + s.iconUsing : '')} onClick={selectTool('Circle')}>{ic.circle}</button>
				<button className={s.iconButton + (type === 'Line' ? ' ' + s.iconUsing : '')} onClick={selectTool('Line')}>{ic.line}</button>
				<button className={s.iconButton + (type === 'Rectangle' ? ' ' + s.iconUsing : '')} onClick={selectTool('Rectangle')}>{ic.triangle}</button>
				<button className={s.iconButton + (type === 'Fill' ? ' ' + s.iconUsing : '')} onClick={selectTool('Fill')}>{ic.fill}</button>
			</div>
		</MovingBlock>
	);
};

export default Tools;