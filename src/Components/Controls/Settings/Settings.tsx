import s from './Settings.module.scss';
import { HexColorPicker } from 'react-colorful';
import RangeSlider from '../../RangeSlider/RangeSlider';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as ctrlActions, IBrush, IControlState } from '../../../redux/slices/controlSlice';
import MovingBlock from '../MovingBlock/MovingBlock';
import { actions as brushActions } from '../../../redux/slices/baseBrushSlice';

const { setColor, toolParam } = ctrlActions;
const { setParam: setBrushParam } = brushActions;

const Settings: FC = () => {
	const dispatch = useDispatch();
	const { tool: { type, color, params: {width, opacity} } } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);
	const params = useSelector((state: any) => {
		// const type = type;
		switch (type) {
		case 'Brush':
			return state.baseBrushSlice;
		default:
			return state.baseBrushSlice;
		}
	});

	const setParam = (newColor: string) => dispatch(setColor(newColor));

	// const toolParamHandler = (param: keyof IBrush) => (v: number) => dispatch(toolParam({ param: param, value: v }));
	const toolParamHandler = (param: any) => (v: number) => {

		let reducer;
		switch (type) {
		case 'Brush':
			reducer = setBrushParam;
			break;
		default:
			reducer = setBrushParam;
			break;
		}

		dispatch(reducer({param: param, value: v}))

		// d
	}
	console.log(params);

	// Object.keys(params).map((v:any) => {
	// 	console.log(v);
	// })
	// Object.entries(params).map((v:any) => {
	// 	console.log(v);
	//
	// })

	return (
		<MovingBlock name={'Settings'} side={'right'} outsideOffset={120} gap={20}>
			<div className={s.settings}>
				<HexColorPicker color={color} onChange={setParam} />
				{/* <RangeSlider name={'Width'} initialValue={params.width.v} start={params.width.start} end={params.width.end} onChange={toolParamHandler('width')} /> */}
				{/* <RangeSlider name={'Opacity'} initialValue={params.opacity.v} start={params.opacity.start} end={params.opacity.end} onChange={toolParamHandler('opacity')} /> */}
				{Object.entries(params).map((v:any) => {
					console.log(v);
					if (typeof v[1] === 'object'){
						const {v: value, start, end} = v[1];
						return <RangeSlider key={v[0]} name={v[0]} initialValue={value} start={start} end={end} onChange={toolParamHandler(v[0])} />
					}
					return;
				})}
			</div>
		</MovingBlock>
	);
};

export default Settings;