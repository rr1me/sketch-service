import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import s from './RangeSlider.module.scss';

interface IRangeSlider {
	name: string
	start: number,
	end: number,
	onChange: (v: number) => void
}

const RangeSlider: FC<IRangeSlider> = ({name, start, end, onChange}) => {

	const sliderRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(15);
	const value = useRef(0);

	const pressed = useRef(false);
	const mouseDown = () => {
		pressed.current = true;
	};

	useEffect(() => {
		const mouseMove = (e: MouseEvent) => {
			if (!pressed.current) return;

			const {range,fillPercent ,position} = getRangeData(sliderRef, e);

			const stepsRatio = (end - start)/100;
			const v = stepsRatio*fillPercent;
			value.current = v;

			setWidth(() => {
				if (position < 0) return 0;
				if (position > range) return range;
				return position;
			});
		};
		const mouseUp = (e: MouseEvent) => {
			if (!pressed.current) return;
			const {fillPercent} = getRangeData(sliderRef, e);
			const stepsRatio = (end - start)/100;

			const v = stepsRatio*fillPercent;
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
				<span className={s.value}>{Math.round(value.current * 100) / 100}</span>
			</div>
		</div>
	);
};

const getRangeData = (sliderRef: RefObject<HTMLDivElement>, e: MouseEvent) => {
	const startX = Math.floor(sliderRef.current!.getBoundingClientRect().x);
	const endX = sliderRef.current!.getBoundingClientRect().width + startX;
	const currentX = e.clientX;

	const range = endX - startX;
	const position = currentX - startX;

	const fillPercent = getFP(100 / (range / position));

	console.log(startX, endX, currentX, range, position, fillPercent);

	return {range, fillPercent, position};
};

const getFP = (x: number) => {
	if (x < 0) return 0;
	if (x > 100) return 100;
	return x;
}

export default RangeSlider;