import './styles.scss';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import getPoll from '../../actions/getPoll';
import Vote from '../../components/Vote/Vote';
import Results from '../../components/Results/Results';

export default function Poll() {
  const {
    params: { id: pollId },
  } = useRouteMatch('/polls/:id');
  const [pollProps, setPollProps] = useState();
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    getPoll(pollId).then((newProps) => setPollProps(newProps));
  }, [pollId]);

  const component =
    hasVoted && pollProps ? (
      <Results pollProps={pollProps} />
    ) : pollProps ? (
      <Vote
        pollProps={pollProps}
        setHasVoted={setHasVoted}
        setPollProps={setPollProps}
      />
    ) : (
      'Loading...'
    );

  return (
    <main className="poll-view">
      <h1>{pollProps ? <h1>{pollProps.question}</h1> : ''}</h1>
      {component}
    </main>
  );
}
