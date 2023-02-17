import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import React from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { IoMdSquare } from 'react-icons/io';
import { BsCircleFill, BsFillTriangleFill } from 'react-icons/bs';
import { HiOutlineMinus } from 'react-icons/hi';
import { RiArrowGoBackFill, RiArrowGoForwardFill, RiPaintFill } from 'react-icons/ri';
import { GiVacuumCleaner } from 'react-icons/gi';

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

export default { paintBrush, square, circle, line, triangle, fill,
	arrowBack, arrowForward, clean,
	leftArrow, rightArrow };