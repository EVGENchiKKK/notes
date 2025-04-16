import { useState, useContext, useRef } from 'react';
import { NotesDispatchContext } from '../../context/NotesContext';
import { ACTIONS } from '../../reducers/notesReducer';
import Modal from '../Modal/Modal';
import NoteEditor from '../NoteEditor/NoteEditor';
import styles from './Note.module.css';

function Note({ note }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useContext(NotesDispatchContext);
  const noteRef = useRef(null);

  const handleDelete = () => {
    noteRef.current.classList.add(styles.deleting);
    setTimeout(() => {
      dispatch({ type: ACTIONS.DELETE, payload: { id: note.id } });
    }, 300);
  };

  return (
    <>
      <div ref={noteRef} className={`${styles.note} ${note.favorite ? styles.favorite : ''}`}>
        <div className={styles.header}>
          <h3>{note.title}</h3>
          <div className={styles.actions}>
            <button 
              onClick={() => dispatch({ 
                type: ACTIONS.TOGGLE_FAVORITE, 
                payload: { id: note.id } 
              })}
              className={styles.favoriteBtn}
            >
              {note.favorite ? '★' : '☆'}
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className={styles.editBtn}
            >
              Редактировать
            </button>
            <button 
              onClick={handleDelete}
              className={styles.deleteBtn}
            >
              Удалить
            </button>
          </div>
        </div>
        <p className={styles.content}>{note.content}</p>
        <small className={styles.date}>
          {new Date(note.createdAt).toLocaleString()}
        </small>
      </div>

      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <NoteEditor 
            note={note} 
            onClose={() => setIsEditing(false)} 
          />
        </Modal>
      )}
    </>
  );
}

export default Note;