import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import RangeSlider from '../RangeSlider/RangeSlider';
import { actions, ILineSlice } from '../../redux/slices/lineSlice';
import Selector from '../Selector/Selector';
import { lineCapOptions } from '../Brushes/toolOrchestrator';

const {setParam} = actions;

const LineSettings = () => {
	const dispatch = useDispatch<AppDispatch>();
	const params = useSelector((state: { lineSlice: ILineSlice }) => state.lineSlice);

	const toolParamHandler = (param: keyof ILineSlice) => (v: number) => dispatch(setParam({ param: param, value: v }));

	const onSelectorChange = (e:number) => {
		console.log(e);
		dispatch(setParam({param: 'lineCap', value: e}))
	}

	return (
		<>
			<RangeSlider name={'Width'} initialValue={params.width.v} start={params.width.start}
						 end={params.width.end} onChange={toolParamHandler('width')} />
			<Selector options={lineCapOptions.map(v=>v.label)} value={params.lineCap} onChange={onSelectorChange}/>
		</>
	)
};

export default LineSettings;