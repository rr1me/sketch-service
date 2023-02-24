import s from './Settings.module.scss';
import { HexColorPicker } from 'react-colorful';
import RangeSlider from '../../RangeSlider/RangeSlider';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, IBrush, IControlState, IToolParam } from '../../../redux/slices/controlSlice';

const { param, toolParam } = actions;

const Settings: FC = () => {
	const dispatch = useDispatch();
	const {
		tool: { color },
	} = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);

	const setParam = (type: keyof IToolParam) => (newColor: string) => {
		dispatch(param([type, newColor]));
	};
	const toolParamHandler = (param: keyof IBrush) => (v: number) => dispatch(toolParam({ param: param, value: v }));

	return (
		<div className={s.settings}>
			<HexColorPicker color={color} onChange={setParam('color')} />
			<RangeSlider name={'Width'} start={1} end={50} onChange={toolParamHandler('width')} />
			<RangeSlider name={'Opacity'} start={0} end={1} onChange={toolParamHandler('opacity')} />
		</div>
	);
};

export default Settings;