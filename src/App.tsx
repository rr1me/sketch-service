import React, { useEffect, useLayoutEffect, useState } from 'react';
import s from './App.module.scss';
import useControlledCanvas from './Components/MainFrame/useControlledCanvas';

import 'simplebar-react/dist/simplebar.min.css';
import Peer, { DataConnection } from 'peerjs';
import { ConnectionProvider } from './Components/Controls/Connection/ConnectionProvider';
import Controls from './Components/Controls/Controls';

export type connType = {peer: Peer | null, conn: DataConnection[]};

const connection: connType = {peer: null, conn: []};

function App() {
	const { canvas, controlledCanvas } = useControlledCanvas(connection);
	const [canvasReference, setCanvasReference] = useState<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvas)
			setCanvasReference(canvas.current);
	}, [canvas])

	return (
		<ConnectionProvider canvas={canvasReference}>
			<div className={s.app}>
				<Controls canvas={canvas} connection={connection}/>
				{controlledCanvas}
			</div>
		</ConnectionProvider>
	);
}

export default App;
