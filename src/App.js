import { useState, useEffect, useReducer, useContext, useMemo } from 'react';
import { NotesContext, NotesDispatchContext } from './context/NotesContext';
import { notesReducer } from './reducers/notesReducer';
import { useLocalStorage } from './hooks/useLocalStorage';
import NoteList from './components/NoteList/NoteList';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './App.module.css';

function App() {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [state, dispatch] = useReducer(notesReducer, notes);
  const [searchTerm, setSearchTerm] = useState('');

  // Синхронизация с localStorage
  useEffect(() => {
    setNotes(state);
  }, [state, setNotes]);

  // Оптимизированный поиск заметок (useMemo)
  const filteredNotes = useMemo(() => {
    return state.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [state, searchTerm]);

  return (
    <NotesContext.Provider value={filteredNotes}>
      <NotesDispatchContext.Provider value={dispatch}>
        <div className={styles.app}>
          <h1 className={styles.title}>Мои заметки</h1>
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          <NoteList />
        </div>
      </NotesDispatchContext.Provider>
    </NotesContext.Provider>
  );
}

export default App;