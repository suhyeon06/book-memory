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

const dummyData = [
  {
    id: 1,
    bookId: 111,
    title: `Harry's Wedding Harry's Wedding`,
    author: 'author 1',
    thumbnail:
      'http://books.google.com/books/content?id=X73mDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    createdAt: 1659312000000,
    rate: 5,
    content: 'content 1',
    readingStartDate: 0,
    readingFinishDate: 0,
  },
  {
    id: 2,
    bookId: 222,
    title: 'title 2',
    author: 'author 2',
    thumbnail:
      'http://books.google.com/books/content?id=X73mDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    createdAt: 1659398400000,
    rate: 3,
    content: 'content 2',
    readingStartDate: 0,
    readingFinishDate: 0,
  },
  {
    id: 3,
    bookId: 333,
    title: 'title 3',
    author: 'author 3',
    thumbnail:
      'http://books.google.com/books/content?id=X73mDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    createdAt: 1659484800000,
    rate: 1,
    content: 'content 3',
    readingStartDate: 0,
    readingFinishDate: 0,
  },
  {
    id: 4,
    bookId: 111,
    title: 'title 1',
    author: 'author 1',
    thumbnail:
      'http://books.google.com/books/content?id=X73mDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    createdAt: 1659312000000,
    rate: 4,
    content: 'content 1',
    readingStartDate: 0,
    readingFinishDate: 0,
  },
  {
    id: 5,
    bookId: 222,
    title: 'title 2',
    author: 'author 2',
    thumbnail:
      'http://books.google.com/books/content?id=X73mDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    createdAt: 1659398400000,
    rate: 5,
    content: 'content 2',
    readingStartDate: 0,
    readingFinishDate: 0,
  },
  {
    id: 6,
    bookId: 333,
    title: 'title 3',
    author: 'author 3',
    thumbnail:
      'http://books.google.com/books/content?id=X73mDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    createdAt: 1659484800000,
    rate: 5,
    content: 'content 3',
    readingStartDate: 0,
    readingFinishDate: 0,
  },
];

function App() {
  const [reviews, dispatch] = useReducer(reducer, dummyData);

  const reviewId = useRef(0);

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
    content,
    createdAt
  ) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        readingStartDate,
        readingFinishDate,
        rate,
        content,
        createdAt,
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
