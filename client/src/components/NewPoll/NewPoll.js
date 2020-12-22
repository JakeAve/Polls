import './styles.scss';
import postPoll from '../../actions/postPoll';
import { useHistory } from 'react-router-dom';

export default function NewPoll() {
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = { options: [] };
    for (let [key, value] of formData.entries()) {
      if (value.trim()) {
        if (key.includes('option')) payload.options.push(value);
        else payload[key] = value;
      }
    }
    if (payload.options.length < 2)
      return alert('You need at least two options');

    const response = await postPoll(payload);
    if (response.successful) {
      alert('Poll was successfully added!');
      history.push('/');
    } else alert(`Poll was not added ${JSON.stringify(response.data)}`);
  };

  return (
    <form className="new-poll" onSubmit={onSubmit}>
      <div className="input-container">
        <label htmlFor="question">Question</label>
        <textarea
          className="question"
          name="question"
          id="question"
          placeholder="Your question..."
          required
        ></textarea>
      </div>
      <div className="input-container">
        <label htmlFor="option-1">Option 1</label>
        <input name="option-1" id="option-1" placeholder="Option 1" required />
        <label htmlFor="option-2">Option 2</label>
        <input name="option-2" id="option-2" placeholder="Option 2" required />
        <label htmlFor="option-3">Option 3</label>
        <input name="option-3" id="option-3" />
        <label htmlFor="option-4">Option 4</label>
        <input name="option-4" id="option-4" />
      </div>
      <input type="submit" />
    </form>
  );
}
