import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function SnippetForm() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/snippets', { title, language, code });
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>New Snippet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="language">Language:</label>
          <input type="text" id="language" name="language" value={language} onChange={e => setLanguage(e.target.value)} />
        </div>
        <div>
          <label htmlFor="code">Code:</label>
          <textarea id="code" name="code" value={code} onChange={e => setCode(e.target.value)}></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default SnippetForm;