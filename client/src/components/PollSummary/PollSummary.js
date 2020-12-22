import './styles.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function PollSummary(props) {
  const { question, options, date, _id: pollId } = props;
  const optionsContent = options.map(({ text, votes, _id }) => (
    <span key={_id}>
      <span>{text}:</span> <span>{votes}</span>
    </span>
  ));

  return (
    <Link className="poll-summary" to={`polls/${pollId}`}>
      <div className="question">{question}</div>
      <div className="options">{optionsContent}</div>
      <div className="time-stamp">({moment(new Date(date)).fromNow()})</div>
    </Link>
  );
}
