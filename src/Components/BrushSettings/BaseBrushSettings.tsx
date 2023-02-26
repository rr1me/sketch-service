import RangeSlider from '../RangeSlider/RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { IBaseBrushSlice } from '../../redux/slices/INumberParam';
import { AppDispatch } from '../../redux/store';
import { actions } from '../../redux/slices/baseBrushSlice';

const {setParam} = actions;

const BaseBrushSettings = () => {
	const dispatch = useDispatch<AppDispatch>();
	const params = useSelector((state: { baseBrushSlice: IBaseBrushSlice }) => state.baseBrushSlice);

	const toolParamHandler = (param: keyof IBaseBrushSlice) => (v: number) => dispatch(setParam({ param: param, value: v }));

	return (
		<>
			<RangeSlider name={'Width'} initialValue={params.width.v} start={params.width.start}
						 end={params.width.end} onChange={toolParamHandler('width')} />
			<RangeSlider name={'Opacity'} initialValue={params.opacity.v} start={params.opacity.start}
						 end={params.opacity.end} onChange={toolParamHandler('opacity')} />
		</>
	);
};

export default BaseBrushSettings;