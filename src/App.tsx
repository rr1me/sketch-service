import React, { useEffect, useState } from 'react';
import s from './App.module.scss';
import useControlledCanvas from './Components/MainFrame/useControlledCanvas';

import 'simplebar-react/dist/simplebar.min.css';
import { ConnectionProvider } from './Components/Controls/Connection/ConnectionProvider';
import Controls from './Components/Controls/Controls';

function App() {
	const { canvas, controlledCanvas } = useControlledCanvas();
	const [canvasReference, setCanvasReference] = useState<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvas)
			setCanvasReference(canvas.current);
	}, [canvas])

	return (
		<ConnectionProvider canvas={canvasReference}>
			<div className={s.app}>
				<Controls canvas={canvas}/>
				{controlledCanvas}
			</div>
		</ConnectionProvider>
	);
}

export default App;
