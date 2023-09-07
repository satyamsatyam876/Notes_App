import Note from "./Note";
import { useState, useEffect } from "react";
import axios from "axios";

export default function List({ notes, removeNotes, handleEdit }) {

  const [selectedTag, setSelectedTag] = useState("All");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = 'http://localhost:5000/getNotes'; // Replace with your API URL

    // Use Axios to fetch data from the API
    axios.get(apiUrl)
      .then(response => {
        // Update the state with the fetched data
        setData(response.data);
        console.log(response.data)
        setLoading(false); // Set loading to false
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        setError(error);
        setLoading(false); // Set loading to false
      });
    console.log(loading, data)
  }, [])
  const uniqueTags = [...new Set(notes.map((note) => note.tag))];

  const filteredNotes = selectedTag === "All" ? notes : notes.filter((note) => note.tag === selectedTag);

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  return (
    <>
      <h1>Your Notes</h1>
      <label htmlFor="tagFilter">Filter by Tag: </label>
      <select id="tagFilter" value={selectedTag} onChange={handleTagChange}>
        <option value="All">All</option>
        {uniqueTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <h1>Your Notes </h1>

      {!loading ? data.map((note) => {
        return (
          <Note key={note.id} id={note.id} title={note.title} content={note.content} tag={note.tag} removeNotes={removeNotes} handleEdit={handleEdit} />

        )
      }
      ) : null}


    </>
  )
}