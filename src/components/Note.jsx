import styles from './Note.module.css';

function Note({ note, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className={`${styles.note} ${note.favorite ? styles.favorite : ''}`}>
      <div className={styles.header}>
        <h3>{note.title}</h3>
        <div className={styles.actions}>
          <button 
            onClick={() => onToggleFavorite(note.id)}
            className={styles.favoriteButton}
            aria-label={note.favorite ? 'Убрать из избранного' : 'В избранное'}
          >
            {note.favorite ? '★' : '☆'}
          </button>
          <button 
            onClick={() => onEdit(note)}
            className={styles.editButton}
          >
            Редактировать
          </button>
          <button 
            onClick={() => onDelete(note.id)}
            className={styles.deleteButton}
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
  );
}

export default Note;