import './styles.scss';
import { useEffect, useState } from 'react';
import { useSocket } from '../../contexts/socketContext';

import PollList from '../../components/PollList/PollList';

import getPolls from '../../actions/getPolls';

const sumVotes = (options) => {
  return options.reduce((acc, { votes }) => acc + Number(votes), 0);
};

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

  const topPolls = [...polls].sort(
    ({ options: optionsA }, { options: optionsB }) => {
      const sumA = sumVotes(optionsA);
      const sumB = sumVotes(optionsB);
      return sumB - sumA;
    },
  );

  const recentPolls = [...polls].sort(({ date: dateA }, { date: dateB }) => {
    return new Date(dateB) - new Date(dateA);
  });

  return (
    <main className="dashboard">
      <PollList title="Top 3 Polls" polls={topPolls.slice(0, 3)} />
      <PollList title="Most Recent Polls" polls={recentPolls} />
    </main>
  );
}
