import { useState, useContext, useMemo } from 'react';
import { NotesContext, NotesDispatchContext } from '../../context/NotesContext';
import { ACTIONS } from '../../reducers/notesReducer';
import Note from '../Note/Note';
import NoteEditor from '../NoteEditor/NoteEditor';
import Modal from '../Modal/Modal';
import styles from './NoteList.module.css';

function NoteList() {
  const notes = useContext(NotesContext);
  const dispatch = useContext(NotesDispatchContext);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Разделение заметок на избранные и обычные (useMemo для оптимизации)
  const [favoriteNotes, regularNotes] = useMemo(() => {
    const favorites = notes.filter(note => note.favorite);
    const regular = notes.filter(note => !note.favorite);
    return [favorites, regular];
  }, [notes]);

  const handleDelete = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: { id } });
  };

  const handleToggleFavorite = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: { id } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Мои заметки</h2>
        <button 
          onClick={() => setIsCreating(true)}
          className={styles.addButton}
        >
          + Новая заметка
        </button>
      </div>

      {favoriteNotes.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Избранное</h3>
          <div className={styles.notesGrid}>
            {favoriteNotes.map(note => (
              <Note
                key={note.id}
                note={note}
                onEdit={setSelectedNote}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      <div className={styles.section}>
        {favoriteNotes.length > 0 && <h3 className={styles.sectionTitle}>Все заметки</h3>}
        {notes.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Заметок пока нет</p>
            <button 
              onClick={() => setIsCreating(true)}
              className={styles.addButton}
            >
              Создать первую заметку
            </button>
          </div>
        ) : (
          <div className={styles.notesGrid}>
            {regularNotes.map(note => (
              <Note
                key={note.id}
                note={note}
                onEdit={setSelectedNote}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно для создания новой заметки */}
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <NoteEditor onClose={() => setIsCreating(false)} />
        </Modal>
      )}

      {/* Модальное окно для редактирования заметки */}
      {selectedNote && (
        <Modal onClose={() => setSelectedNote(null)}>
          <NoteEditor 
            note={selectedNote} 
            onClose={() => setSelectedNote(null)} 
          />
        </Modal>
      )}
    </div>
  );
}

export default NoteList;