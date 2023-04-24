import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';

const GeometrySettings = ({ paramType, reducer }: { paramType: any, reducer: any }) => { // todo future stroke param
	const dispatch = useDispatch<AppDispatch>();
	const params = useSelector((state: any) => state[paramType]);

	const options = [
		'Fill',
		'Stroke',
	];

	const onSelectorChange = (e: number) => {
		dispatch(reducer({ param: 'stroke', value: options[e] === 'Stroke' }));
	};

	return (
		<>
			{/* <Selector options={options} value={params.stroke ? 1 : 0} onChange={onSelectorChange} /> */}
		</>
	);
};

export default GeometrySettings;