import { useState, useContext, useEffect } from 'react';
import { NotesDispatchContext } from '../../context/NotesContext';
import { ACTIONS } from '../../reducers/notesReducer';
import styles from './NoteEditor.module.css';

function NoteEditor({ note, onClose }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const dispatch = useContext(NotesDispatchContext);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    if (note) {
      dispatch({
        type: ACTIONS.UPDATE,
        payload: {
          id: note.id,
          updates: { title, content }
        }
      });
    } else {
      dispatch({
        type: ACTIONS.ADD,
        payload: { title, content }
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{note ? 'Редактировать заметку' : 'Новая заметка'}</h2>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <textarea
        placeholder="Содержание заметки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
        rows="5"
      />
      <div className={styles.buttons}>
        <button type="submit" className={styles.saveBtn}>
          {note ? 'Обновить' : 'Добавить'}
        </button>
        <button 
          type="button" 
          onClick={onClose}
          className={styles.cancelBtn}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

export default NoteEditor;