import { io } from 'socket.io-client';

const socket = io.connect();
console.log(socket, io.connect())
//https://village-codebase.onrender.com/
export default socket