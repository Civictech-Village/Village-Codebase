import { io } from 'socket.io-client';

const socket = io("https://village-codebase.onrender.com:3000");
//http://localhost:3000
export default socket