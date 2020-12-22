import './styles.scss';
import PollSummary from '../PollSummary/PollSummary';

export default function PollList(props) {
  const { title, polls = [] } = props;

  return (
    <section className="poll-list">
      <h2>{title}</h2>
      {polls.map((pollProps, index) => (
        <PollSummary key={index} {...pollProps} />
      ))}
    </section>
  );
}
