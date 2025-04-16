import { useContext } from 'react';
import { NotesContext, NotesDispatchContext } from '../context/NotesContext';
import { ACTIONS } from '../reducers/notesReducer';
import Note from './Note';
import styles from './NoteList.module.css';

function NoteList({ setSelectedNote }) {
  const notes = useContext(NotesContext);
  const dispatch = useContext(NotesDispatchContext);

  const handleDelete = (id) => {
    dispatch({ type: ACTIONS.DELETE_NOTE, payload: { id } });
  };

  const handleToggleFavorite = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: { id } });
  };

  return (
    <div className={styles.list}>
      {notes.length === 0 ? (
        <p className={styles.empty}>Заметок пока нет</p>
      ) : (
        notes.map(note => (
          <Note
            key={note.id}
            note={note}
            onEdit={setSelectedNote}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        ))
      )}
    </div>
  );
}

export default NoteList;