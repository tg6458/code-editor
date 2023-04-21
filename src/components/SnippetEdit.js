import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function SnippetEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`http://localhost:5000/snippets/${id}`);
      setTitle(result.data.title);
      setLanguage(result.data.language);
      setCode(result.data.code);
    }
    fetchData();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:5000/snippets/${id}`, { title, language, code });
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();

    try {
      await axios.delete(`http://localhost:5000/snippets/${id}`);
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Edit Snippet</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="language">Language:</label>
          <input type="text"

        <label htmlFor="code">Code:</label>
        <textarea id="code" name="code" value={code} onChange={e => setCode(e.target.value)}></textarea>
      </div>
      <button type="submit">Save</button>
      <button onClick={handleDelete}>Delete</button>
    </form>
  </div>
  );
}

export default SnippetEdit;