import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useReducer, useRef } from 'react';
import { ReviewStateContext } from './context/ReviewStateContext';
import { ReviewDispatchContext } from './context/ReviewDispatchContext';

import BookDetails from './pages/BookDetails';
import BookSearch from './pages/BookSearch';
import Edit from './pages/Edit';
import MyBook from './pages/MyBook';
import New from './pages/New';
import Review from './pages/Review';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [action.data, ...state];
    case 'EDIT':
      return state.map(
        (it) => (it.id === action.data.id ? { ...state, ...action.data } : it)
        // Overwrite readingDate, rate, content on the existing state
      );
    case 'DELETE':
      return state.filter(it.id !== action.targetId);
    default:
      return state;
  }
};

function App() {
  const [reviews, dispatch] = useReducer(reducer, []);

  const reviewId = useRef(0);

  const onCreate = (bookId, title, author, readingDate, rate, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: reviewId.current,
        bookId,
        title,
        author,
        readingDate,
        rate,
        content,
      },
    });
    reviewId.current += 1;
  };

  const onEdit = (targetId, readingDate, rate, content) => {
    dispatch({
      type: 'EDIT',
      data: { id: targetId, readingDate, rate, content },
    });
  };

  const onDelete = (targetId) => {
    dispatch({ type: 'DELETE', targetId });
  };

  return (
    <ReviewStateContext.Provider value={reviews}>
      <ReviewDispatchContext.Provider value={{ onCreate, onEdit, onDelete }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<MyBook />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/new" element={<New />} />
              <Route path="/new/search" element={<BookSearch />} />
              <Route path="/new/search/details" element={<BookDetails />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider>
  );
}

export default App;
