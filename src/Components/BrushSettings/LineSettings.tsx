import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { IBaseBrushSlice } from '../../redux/slices/baseBrushSlice';
import RangeSlider from '../RangeSlider/RangeSlider';
import { actions, ILineSlice } from '../../redux/slices/lineSlice';

const {setParam} = actions;

const LineSettings = () => {
	const dispatch = useDispatch<AppDispatch>();
	const params = useSelector((state: { lineSlice: ILineSlice }) => state.lineSlice);

	const toolParamHandler = (param: keyof IBaseBrushSlice) => (v: number) => dispatch(setParam({ param: param, value: v }));

	return (
		<>
			<RangeSlider name={'Width'} initialValue={params.width.v} start={params.width.start}
						 end={params.width.end} onChange={toolParamHandler('width')} />
		</>
	)
}