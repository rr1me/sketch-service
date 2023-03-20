import React from 'react';
import s from './App.module.scss';
import useControlledCanvas from './Components/MainFrame/useControlledCanvas';
import Controls from './Components/Controls/Controls';

import 'simplebar-react/dist/simplebar.min.css';
import Peer, { DataConnection } from 'peerjs';

export type connType = {peer: Peer | null, conn: DataConnection[]};

const connection: connType = {peer: null, conn: []};

function App() {
	const { canvas, controlledCanvas } = useControlledCanvas(connection);

	return (
		<div className={s.app}>
			<Controls canvas={canvas} connection={connection}/>
			{controlledCanvas}
		</div>
	);
}

export default App;
