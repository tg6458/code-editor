import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SnippetList from './components/SnippetList';
import SnippetForm from './components/SnippetForm';
import SnippetEdit from './components/SnippetEdit';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/new">New Snippet</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <SnippetList />
        </Route>
        <Route exact path="/new">
          <SnippetForm />
        </Route>
        <Route exact path="/edit/:id">
          <SnippetEdit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
