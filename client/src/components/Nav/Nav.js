import './styles.scss';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  return (
    <nav>
      <ul>
        {location.pathname !== '/' ? (
          <li>
            <Link to="/">Home</Link>
          </li>
        ) : (
          ''
        )}
        <li>
          <Link className="button accent" to="/new">
            New
          </Link>
        </li>
      </ul>
    </nav>
  );
}
