import './styles.scss';
import vote from '../../actions/vote';

export default function Vote(props) {
  const { pollProps, setHasVoted, setPollProps } = props;
  const { options, _id: pollId } = pollProps;

  const onVote = async (optionId) => {
    const response = await vote(pollId, optionId);
    if (response.successful) {
      setHasVoted(true);
      setPollProps(response.data);
    } else
      alert(
        `There was a problem with your vote ${JSON.stringify(response.data)}`,
      );
  };

  const content = options.map(({ text, _id: optionId }) => (
    <div className="option" key={optionId}>
      <h2>{text}</h2>
      <button onClick={() => onVote(optionId)}>Vote {text}</button>
    </div>
  ));
  return (
    <section className="vote">
      <div className="content">{content}</div>
    </section>
  );
}
