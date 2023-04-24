import RangeSlider from '../RangeSlider/RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { actions, IBaseBrushSlice } from '../../redux/slices/baseBrushSlice';

const { setParam } = actions;

const BaseBrushSettings = () => {
	const dispatch = useDispatch<AppDispatch>();
	const params = useSelector((state: { baseBrushSlice: IBaseBrushSlice }) => state.baseBrushSlice);

	const toolParamHandler = (param: keyof IBaseBrushSlice) => (v: number) => dispatch(setParam({
		param: param,
		value: v,
	}));

	return (
		<>
			<RangeSlider name={'Width'} initialValue={params.width.v} start={params.width.start}
						 end={params.width.end} onChange={toolParamHandler('width')} />
		</>
	);
};

export default BaseBrushSettings;