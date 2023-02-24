import s from './MovingBlock.module.scss';
import React, { ReactElement, useRef, useState } from 'react';
import ic from '../../Icons/Icons';
import MovingBlock from './MovingBlock';

interface IMovingBlock {
	children: any;
}

type classElem = 'button' | 'block'

const useMovingBlock = () => {
	const [open, setOpen] = useState(false);
	// const [children, setChildren] = useState<ReactElement>();
	// const children = useRef<ReactElement>()

	const openHandler = () => setOpen(v => !v);

	return {
		MovingBlock: MovingBlock,
		openHandler
	};
};

export default useMovingBlock;