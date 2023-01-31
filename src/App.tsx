import React from 'react';
import s from './App.module.scss';
import useControlledCanvas from './Components/MainFrame/useControlledCanvas';
import Controls from './Components/Controls/Controls';

function App() {
	const { canvas, controlledCanvas } = useControlledCanvas();

	return (
		<div className={s.app}>
			<Controls canvas={canvas} />
			{controlledCanvas}
		</div>
	);
}

export default App;
