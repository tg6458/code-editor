import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SnippetList() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get('http://localhost:5000/snippets');
      setSnippets(result.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Code Snippets</h1>
      <Link to="/snippets/new">New Snippet</Link>
      <ul>
        {snippets.map(snippet => (
          <li key={snippet._id}>
            <Link to={`/snippets/${snippet._id}/edit`}>{snippet.title}</Link> - {snippet.language}
            <pre>{snippet.code}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SnippetList;