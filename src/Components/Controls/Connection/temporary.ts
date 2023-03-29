
import { IControlState } from '../../../redux/slices/controlSlice';
// import { regEvents } from './ConnectionUtils';

// const { tool } = useSelector((state: { controlSlice: IControlState }) => state.controlSlice);
// const params = useSelector((state: any) => { // am I really want to assign type for this callback? x_x
// 	const type = tool.type;
// 	switch (type) {
// 	case 'Brush':
// 		return state.baseBrushSlice;
// 	case 'Square':
// 		return state.squareSlice;
// 	case 'Line':
// 		return state.lineSlice;
// 	default:
// 		return state.baseBrushSlice;
// 	}
// });
//
// const f = useRef(false);
// useEffect(() => {
// 	if (!f.current && connections == null) {
// 		f.current = true;
// 		return;
// 	}
// 	regEvents(canvas.current!, tool, connections);
// }, [tool, params]);











// const makePeer = () => {
// 	makeHostPeer();
//
// 	peer.on('connection', (data: any) => {
// 		connections.push(data);
// 		regEvents();
// 		data.on('open', () => {
// 			const save = canvas.current?.toDataURL();
// 			data.send(save);
// 		});
// 	});
// 	console.log(peer.id);
// };
// const connectToPeer = () => {
// 	if (!peer) return;
// 	const value = inputRef.current!.value;
//
// 	const items = peer.connect(value);
// 	console.log(items);
// 	connections.push(items);
//
// 	regEvents();
// };
// const makeRoom = () => {
// 	if (!peer)
// 		makePeer();
//
// 	console.log(peer);
//
// 	socket.emit('makeRoom', {
// 		hostPeerId: peer?.id,
// 		slots: 5,
// 		isPrivate: false,
// 	});
// };
// const regEvent = () => {
// 	socket.on('rooms', (data: any) => {
// 		console.log(data);
// 		setRooms(data);
// 	})
// }
// const openEvent = () => {
// 	socket.emit('subscribe');
// 	socket.on('rooms', (data: any) => {
// 		console.log(data);
// 		setRooms(data);
// 	});
//
// 	// if (!subscribed) setSubscribed(true);
// 	console.log(rooms);
// };