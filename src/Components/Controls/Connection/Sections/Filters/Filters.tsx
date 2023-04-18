import s from './Filters.module.scss';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../../redux/store';
import { actions, IConnectionSlice, RoomFilters } from '../../../../../redux/slices/connectionSlice';

const { setFilter } = actions;

const Filters: FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {
		filters: {
			unfilled,
			noPassword,
		},
	} = useSelector((state: { connectionSlice: IConnectionSlice }) => state.connectionSlice);

	const onFilterClick = (type: keyof RoomFilters) => () => dispatch(setFilter({ filter: type }));

	return (
		<div className={s.filters}>
			<div className={s.filter}>
				<input className={s.filterCheckbox} type='checkbox' checked={unfilled}
					   onChange={onFilterClick('unfilled')} />
				<span>Unfilled</span>
			</div>
			<div className={s.filter}>
				<input className={s.filterCheckbox} type='checkbox' checked={noPassword}
					   onChange={onFilterClick('noPassword')} />
				<span>No password</span>
			</div>
		</div>
	);
};

export default Filters;