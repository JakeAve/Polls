import './styles.scss';
import { Doughnut } from 'react-chartjs-2';

const backgroundColors = ['#f5759d', '#f7e733', '#f7f7f9', '#c45b7c'];

export default function Results(props) {
  const { pollProps } = props;
  const { options } = pollProps;
  const content = options.map(({ text, votes, _id }) => (
    <div className="result" key={_id}>
      <div>{text}</div>
      <div className="votes">
        {votes} {parseInt(votes) === 1 ? 'vote' : 'votes'}
      </div>
    </div>
  ));

  const graphData = {
    datasets: [
      {
        data: options.map(({ votes }) => votes),
        backgroundColor: backgroundColors.slice(0, options.length),
      },
    ],
    labels: options.map(({ text }) => text),
  };

  const graphOptions = {
    legend: {
      display: true,
      position: 'right',
    },
    maintainAspectRatio: false,
  };

  return (
    <section className="results">
      <div>
        <Doughnut options={graphOptions} data={graphData} />
      </div>
      <div className="text">{content}</div>
    </section>
  );
}
