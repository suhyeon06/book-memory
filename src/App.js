import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useReducer, useRef } from 'react';
import { ReviewStateContext } from './context/ReviewStateContext';
import { ReviewDispatchContext } from './context/ReviewDispatchContext';

import BookSearch from './pages/BookSearch';
import Edit from './pages/Edit';
import MyBook from './pages/MyBook';
import New from './pages/New';
import Review from './pages/Review';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      newState = [action.data, ...state];
      break;
    case 'EDIT':
      newState = state.map(
        (it) => (it.id === action.data.id ? { ...it, ...action.data } : it)
        // Overwrite readingDate, rate, content on the existing state
      );
      break;
    case 'DELETE':
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    default:
      return state;
  }
  // Store data to local storage
  localStorage.setItem('reviewList', JSON.stringify(newState));
  return newState;
};

function App() {
  const [reviews, dispatch] = useReducer(reducer, []);

  const reviewId = useRef(0);

  useEffect(() => {
    // Get saved data from local storage
    const localData = localStorage.getItem('reviewList');
    if (localData) {
      const reviewList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      reviewId.current = parseInt(reviewList[0].id) + 1;
      dispatch({ type: 'INIT', data: reviewList });
    }
  }, []);

  const onCreate = (
    bookId,
    title,
    author,
    thumbnail,
    readingStartDate,
    readingFinishDate,
    rate,
    content
  ) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: reviewId.current,
        bookId,
        title,
        author,
        thumbnail,
        readingStartDate,
        readingFinishDate,
        rate,
        content,
        createdAt: new Date().getTime(),
      },
    });
    reviewId.current += 1;
  };

  const onEdit = (
    targetId,
    readingStartDate,
    readingFinishDate,
    rate,
    content
  ) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        readingStartDate,
        readingFinishDate,
        rate,
        content,
        createdAt: new Date().getTime(),
      },
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
              <Route path="/new/" element={<New />} />
              <Route path="/new/:id" element={<New />} />
              <Route path="/new/search" element={<BookSearch />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ReviewDispatchContext.Provider>
    </ReviewStateContext.Provider>
  );
}

export default App;
