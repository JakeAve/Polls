import './styles.scss';
import PollSummary from '../PollSummary/PollSummary';

export default function PollList(props) {
  const { polls = [] } = props;

  return (
    <section className="poll-list">
      {polls.map((pollProps, index) => (
        <PollSummary key={index} {...pollProps} />
      ))}
    </section>
  );
}
