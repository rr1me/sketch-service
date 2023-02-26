import React, { FC, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import s from './RangeSlider.module.scss';

interface IRangeSlider {
	name: string
	start: number,
	end: number,
	initialValue: number,
	onChange: (v: number) => void
}

const RangeSlider: FC<IRangeSlider> = ({ name, start, end, initialValue, onChange }) => {

	const sliderRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(15);
	const value = useRef(initialValue);

	const pressed = useRef(false);
	const mouseDown = () => {
		pressed.current = true;
	};

	useLayoutEffect(() => {
		if (!sliderRef.current) return;
		const initialFill = calcFillWidth(initialValue, start, end, sliderRef.current.getBoundingClientRect().width);
		setWidth(initialFill);
	}, []);

	useEffect(() => {
		const mouseMove = (e: MouseEvent) => {
			if (!pressed.current) return;

			const { range, fillPercent, position } = getRangeData(sliderRef, e);
			const v = calcValue(start, end, fillPercent);
			value.current = v;

			setWidth(() => {
				if (position < 0) return 0;
				if (position > range) return range;
				return position;
			});
		};
		const mouseUp = (e: MouseEvent) => {
			if (!pressed.current) return;

			const { fillPercent } = getRangeData(sliderRef, e);
			const v = calcValue(start, end, fillPercent);
			onChange(v < start ? start : v);

			pressed.current = false;
		};
		document.body.addEventListener('mousemove', mouseMove);
		document.body.addEventListener('mouseup', mouseUp);

		return () => {
			document.body.removeEventListener('mousemove', mouseMove);
			document.body.removeEventListener('mouseup', mouseUp);
		};

	}, []);

	return (
		<div ref={sliderRef} className={s.rangeSlider}
			 onMouseDown={mouseDown}
		>
			<div className={s.sliderInner} style={{ width: width }} />
			<div className={s.data}>
				<span className={s.label}>{name}</span>
				<span className={s.value}>{Math.round(value.current * 100) / 100}</span> {/* (v*100)/100 done to correct a round (1.23 => 123 => 1.23) */}
			</div>
		</div>
	);
};

const getRangeData = (sliderRef: RefObject<HTMLDivElement>, e: MouseEvent) => {
	const rect = sliderRef.current!.getBoundingClientRect();
	const startX = Math.floor(rect.x);
	const currentX = e.clientX;

	const range = rect.width;
	const position = currentX - startX;

	const fillPercent = getFP(100 / (range / position));

	// console.log(startX, currentX, range, position, fillPercent);

	return { range, fillPercent, position };
};

const getFP = (x: number) => {
	if (x < 0) return 0;
	if (x > 100) return 100;
	return x;
};

const calcFillWidth = (value: number, start: number, end: number, width: number) => {
	const range = end - start;
	const v = value-start;

	const valueFromRange = 100/(range/v);
	return (width / 100) * valueFromRange;
};

const calcValue = (start: number, end: number, fillPercent: number) => {
	const range = end - start;
	const stepsRatio = range / 100;
	return stepsRatio * fillPercent + start;
};

export default RangeSlider;