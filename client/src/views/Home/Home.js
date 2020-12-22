import './styles.scss';
import { useEffect, useState } from 'react';
import { useSocket } from '../../contexts/socketContext';

import PollList from '../../components/PollList/PollList';

import getPolls from '../../actions/getPolls';

export default function Home() {
  const [polls, setPolls] = useState([]);

  const socket = useSocket();
  useEffect(() => {
    socket.on('start', (data) => {
      console.log({ data });
    });
    socket.emit('join');
    return () => {
      socket.off('start');
    };
  }, [socket]);

  useEffect(() => {
    getPolls().then((newPolls) => setPolls(newPolls));
  }, []);

  // const topPolls = polls.sort({});

  return (
    <main className="dashboard">
      <PollList polls={polls} />
      <PollList polls={polls} />
    </main>
  );
}
