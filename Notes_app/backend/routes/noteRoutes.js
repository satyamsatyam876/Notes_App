const express = require('express')
const router = express.Router()
const Note = require('../models/note')

//get all notes 
router.get('/getNotes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed' });
  }
});

//post a new note
router.post('/createNotes', async (req, res) => {
  const { title, content, tags, id } = req.body
  try {
    console.log(title, content, tags, id)
    const newNote = new Note({ title, content, tags, id })
    console.log(newNote)
    await newNote.save()
    res.status(201).json(newNote)

  } catch (error) {
    res.status(400).json({ error: 'Failed' });
  }
})

//update a note
router.put('/updateNotes', async (req, res) => {

  const { title, content, tags, id } = req.body
  try {
    console.log(title, content, tags, id)
    const updatedNote = await Note.updateOne({ id }, { $set: { title, content, tags } })

    if (!updatedNote) {
      res.status(404).json({ error: 'Note not found' })
    } else {
      res.json(updatedNote);
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed' })
  }
})

//delete a note
router.delete('/deleteNotes/:id', async (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  try {
    console.log(typeof id)
    const deletedNote = await Note.deleteOne({ id });
    if (!deletedNote) {
      res.status(404).json({ error: 'Note not found' });
    } else {
      res.json(deletedNote);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed' })
  }
}
)


module.exports = router;