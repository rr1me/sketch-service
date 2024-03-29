import s from './Icons.module.scss';
import { BiArrowToLeft, BiArrowToRight, BiLinkExternal } from 'react-icons/bi';
import React from 'react';
import { FaListAlt, FaPaintBrush, FaToolbox } from 'react-icons/fa';
import { IoIosArrowDown, IoMdSquare } from 'react-icons/io';
import { BsCircleFill, BsFillTriangleFill } from 'react-icons/bs';
import { HiOutlineMinus, HiUserRemove } from 'react-icons/hi';
import {
	RiArrowGoBackFill,
	RiArrowGoForwardFill,
	RiFileHistoryFill,
	RiPaintFill,
	RiSettings3Fill,
} from 'react-icons/ri';
import { GiVacuumCleaner } from 'react-icons/gi';
import { MdCastConnected, MdOutlineHistoryEdu, MdOutlineSettingsEthernet, MdSettings } from 'react-icons/md';
import { FcSettings } from 'react-icons/fc';
import { IoSettingsSharp } from 'react-icons/io5';
import { GoTools } from 'react-icons/go';
import { AiFillLock, AiFillPlusSquare } from 'react-icons/ai';
import { FiFilter, FiUsers } from 'react-icons/fi';
import { ImExit } from 'react-icons/im';

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


const list = <FaListAlt/>
const plus = <AiFillPlusSquare/>
const connect = <BiLinkExternal/>
const filter = <FiFilter/>
const locker = <AiFillLock/>


const exit = <ImExit/>
const users = <FiUsers/>
const roomSettings = <MdOutlineSettingsEthernet/>
const kickUser = <HiUserRemove/>

export default { paintBrush, square, circle, line, triangle, fill,
	arrowBack, arrowForward, clean,
	leftArrow, rightArrow,

	history, settings, tools,

	selectorArrow,

	connection, list, plus, connect, filter, locker,

	exit, users, roomSettings, kickUser
};