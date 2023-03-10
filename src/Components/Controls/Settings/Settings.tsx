import s from './Settings.module.scss';
import { HexColorPicker } from 'react-colorful';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as ctrlActions, IControlState } from '../../../redux/slices/controlSlice';
import MovingBlock from '../MovingBlock/MovingBlock';
import { actions as brushActions } from '../../../redux/slices/baseBrushSlice';
import BaseBrushSettings from '../../BrushSettings/BaseBrushSettings';
import RangeSlider from '../../RangeSlider/RangeSlider';
import ic from '../../Icons/Icons';
import LineSettings from '../../BrushSettings/LineSettings';
import GeometrySettings from '../../BrushSettings/GeometrySettings';
import { actions as squareActions } from '../../../redux/slices/squareSlice';

const { setColor, setOpacity } = ctrlActions;
const {setParam: setSquareParam} = squareActions
// const { setParam: setBrushParam } = brushActions;

const Settings: FC = () => {
	const dispatch = useDispatch();
	const { tool: { type, color, opacity } } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const setColorHandler = (newColor: string) => dispatch(setColor(newColor));
	const setOpacityHandler = (v: number) => dispatch(setOpacity(v));

	const getCorrectSettings = () => {
		switch (type) {
		case 'Brush':
			return <BaseBrushSettings/>;
		case 'Square':
			return <GeometrySettings paramType={'squareSlice'} reducer={setSquareParam}/>;
		// case 'Circle':
		// 	return <GeometrySettings paramType={'circleSlice'} reducer={setSquareParam}/>;
		case 'Line':
			return <LineSettings/>;
		// case 'Rectangle':
		// 	return rectangle({ canvas, pos, dispatch, ctx });
		// case 'Fill':
		// 	return fill({ canvas, pos, dispatch, ctx });
		default:
			return <></>;
		}
	}

	return (
		<MovingBlock name={ic.settings} side={'right'} outsideOffset={120} gap={20} locationOffsetSide={'top'} locationOffset={20}>
			<div className={s.settings}>
				<HexColorPicker color={color} onChange={setColorHandler} />
				<RangeSlider name={'Opacity'} initialValue={opacity} start={0}
							 end={1} onChange={setOpacityHandler} />
				{getCorrectSettings()}
			</div>
		</MovingBlock>
	);
};

export default Settings;