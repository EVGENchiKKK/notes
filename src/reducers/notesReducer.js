export const ACTIONS = {
    ADD: 'add',
    UPDATE: 'update',
    DELETE: 'delete',
    TOGGLE_FAVORITE: 'toggle-favorite'
  };
  
  export function notesReducer(state, action) {
    switch (action.type) {
      case ACTIONS.ADD:
        return [...state, {
          id: Date.now(),
          title: action.payload.title,
          content: action.payload.content,
          favorite: false,
          createdAt: new Date().toISOString()
        }];
      case ACTIONS.UPDATE:
        return state.map(note => 
          note.id === action.payload.id ? { ...note, ...action.payload.updates } : note
        );
      case ACTIONS.DELETE:
        return state.filter(note => note.id !== action.payload.id);
      case ACTIONS.TOGGLE_FAVORITE:
        return state.map(note => 
          note.id === action.payload.id ? { ...note, favorite: !note.favorite } : note
        );
      default:
        return state;
    }
  }