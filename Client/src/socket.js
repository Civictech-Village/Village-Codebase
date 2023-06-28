import { io } from 'socket.io-client';

const socket = io("https://village-codebase.onrender.com/:10000");
//https://village-codebase.onrender.com/
export default socket