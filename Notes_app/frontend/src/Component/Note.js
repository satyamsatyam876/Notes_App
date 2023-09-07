
import React, { useState } from "react";



export default function Note({ id, title, content, tag, removeNotes, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedTag, setEditedTag] = useState(tag);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    handleEdit(id, editedTitle, editedContent, editedTag);
    setIsEditing(false);
  };

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <input
            type="text"
            value={editedTag}
            onChange={(e) => setEditedTag(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{editedTitle}</h3>
          <p>{editedContent}</p>
          <p>Tag: {editedTag}</p>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={() => removeNotes(id)}>Remove</button>
        </div>
      )}
    </div>
  );
}
