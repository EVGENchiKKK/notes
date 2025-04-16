import { useState, useContext, useRef, useEffect } from 'react';
import { NotesDispatchContext } from '../context/NotesContext';
import { ACTIONS } from '../reducers/notesReducer';
import styles from './NoteForm.module.css';

function NoteForm({ selectedNote, setSelectedNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useContext(NotesDispatchContext);
  const titleRef = useRef(null);

  // Фокус на поле заголовка при монтировании
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  // Заполнение формы при редактировании
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    if (selectedNote) {
      dispatch({
        type: ACTIONS.UPDATE_NOTE,
        payload: {
          id: selectedNote.id,
          updates: { title, content }
        }
      });
      setSelectedNote(null);
    } else {
      dispatch({
        type: ACTIONS.ADD_NOTE,
        payload: { title, content }
      });
    }

    setTitle('');
    setContent('');
    titleRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        ref={titleRef}
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <textarea
        placeholder="Содержание заметки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>
        {selectedNote ? 'Обновить' : 'Добавить'}
      </button>
      {selectedNote && (
        <button 
          type="button" 
          onClick={() => {
            setSelectedNote(null);
            setTitle('');
            setContent('');
          }}
          className={styles.cancelButton}
        >
          Отмена
        </button>
      )}
    </form>
  );
}

export default NoteForm;