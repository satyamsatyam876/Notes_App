import Form from './Component/Form';
import List from './Component/List';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const baseUrl = 'http://localhost:5000'
  async function handleSubmit(title, content, tag) {
    let id = notes.length;

    const postData = {
      id, content, title, tag
    }
    await axios.post(`${baseUrl}/createNotes`, postData)
      .then(response => {
        // Handle the successful response here
        console.log('Post created successfully:', response.data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error creating post:', error);
      });



  }

  function removeNotes(ind) {

    console.log("remove is working")
    // const new_notes = notes.filter((note) => note.id !== ind)
    // setNotes(new_notes)

    const apiUrl = 'http://localhost:5000/deleteNotes';


    // Use Axios to send the DELETE request with the id as a query parameter
    axios.delete(`${apiUrl}/${ind}`)

      .then((response) => {
        // Handle the successful response here
        console.log('DELETE request successful:', response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error making DELETE request:', error);
      });
    ;

  }
  function handleEdit(id, title, content) {

    const apiUrl = 'http://localhost:5000/updateNotes'

    // Define the data you want to send as the updated resource.
    const updatedData = {
      id, title, content
    };

    // Send the update request using Axios.
    axios.put(apiUrl, updatedData)
      .then(response => {
        // Handle the successful response here.
        console.log('Update successful:', response.data);
      })
      .catch(error => {
        // Handle any errors that occur during the request.
        console.error('Update failed:', error);
      });
  }
  return (
    <>
      <Form handleSubmit={handleSubmit} />
      <List notes={notes} removeNotes={removeNotes} handleEdit={handleEdit} />
    </>
  );
}

export default App;
