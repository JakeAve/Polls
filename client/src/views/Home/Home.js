import './styles.scss';
import { useEffect, useState } from 'react';
import { useSocket } from '../../contexts/socketContext';
import getPolls from '../../actions/getPolls';

import PollList from '../../components/PollList/PollList';

const sumVotes = (options) => {
  return options.reduce((acc, { votes }) => acc + Number(votes), 0);
};

export default function Home() {
  const [polls, setPolls] = useState([]);

  const socket = useSocket();
  useEffect(() => {
    socket.on('vote', (updatedPoll) => {
      setPolls((p) => {
        const index = p.findIndex(({ _id }) => _id === updatedPoll._id);
        if (index >= 0) p.splice(index, 1, updatedPoll);
        return [...p];
      });
    });
    socket.on('new-poll', (newPoll) => {
      setPolls((p) => [...p, newPoll]);
    });
    return () => {
      socket.off('vote');
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
