import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import RangeSlider from '../RangeSlider/RangeSlider';
import { actions, ILineSlice } from '../../redux/slices/lineSlice';
import Selector from '../Selector/Selector';

const {setParam} = actions;

const LineSettings = () => {
	const dispatch = useDispatch<AppDispatch>();
	const params = useSelector((state: { lineSlice: ILineSlice }) => state.lineSlice);

	const toolParamHandler = (param: keyof ILineSlice) => (v: number) => dispatch(setParam({ param: param, value: v }));

	const options = [
		{value: 'v', label: 'h'},
		{value: 'v1', label: 'h1'},
		{value: 'v2', label: 'h2'}
	]

	const onSelectorChange = (e:number) => {
		console.log(e);
	}

	return (
		<>
			<RangeSlider name={'Width'} initialValue={params.width.v} start={params.width.start}
						 end={params.width.end} onChange={toolParamHandler('width')} />
			<Selector options={options} value={2} onChange={onSelectorChange}/>
		</>
	)
};

export default LineSettings;