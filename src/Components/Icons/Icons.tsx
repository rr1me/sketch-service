import s from './Icons.module.scss';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import React from 'react';
import { FaPaintBrush, FaToolbox } from 'react-icons/fa';
import { IoIosArrowDown, IoMdSquare } from 'react-icons/io';
import { BsCircleFill, BsFillTriangleFill } from 'react-icons/bs';
import { HiOutlineMinus } from 'react-icons/hi';
import {
	RiArrowGoBackFill,
	RiArrowGoForwardFill,
	RiFileHistoryFill,
	RiPaintFill,
	RiSettings3Fill,
} from 'react-icons/ri';
import { GiVacuumCleaner } from 'react-icons/gi';
import { MdCastConnected, MdOutlineHistoryEdu, MdSettings } from 'react-icons/md';
import { FcSettings } from 'react-icons/fc';
import { IoSettingsSharp } from 'react-icons/io5';
import { GoTools } from 'react-icons/go';

const paintBrush = <FaPaintBrush />;
const square = <IoMdSquare />;
const circle = <BsCircleFill />;
const line = <HiOutlineMinus />;
const triangle = <BsFillTriangleFill />;
const fill = <RiPaintFill />;

const arrowBack = <RiArrowGoBackFill />;
const arrowForward = <RiArrowGoForwardFill />;
const clean = <GiVacuumCleaner />;

const leftArrow = <BiArrowToLeft />;
const rightArrow = <BiArrowToRight />;

// const history = <MdOutlineHistoryEdu className={s.history}/>
const history = <RiFileHistoryFill/>
// const settings = <FcSettings/>
// const settings = <RiSettings3Fill/>
// const settings = <MdSettings/>
const settings = <IoSettingsSharp/>
// const tools = <FaToolbox/>
const tools = <GoTools/>

const selectorArrow = <IoIosArrowDown/>

const connection = <MdCastConnected/>

export default { paintBrush, square, circle, line, triangle, fill,
	arrowBack, arrowForward, clean,
	leftArrow, rightArrow,

	history, settings, tools,

	selectorArrow,

	connection
};