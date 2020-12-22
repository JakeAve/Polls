import { useEffect } from 'react';
import { useSocket } from '../../contexts/socketContext';
import './styles.scss';

export default function Home() {
  const socket = useSocket();
  useEffect(() => {
    socket.on('start', (data) => {
      console.log({ data });
    });
    socket.emit('join');
    return () => {
      socket.off('start');
    };
  });
  return <main></main>;
}
