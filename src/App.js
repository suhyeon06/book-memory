import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookDetails from './pages/BookDetails';
import BookSearch from './pages/BookSearch';
import Edit from './pages/Edit';
import MyBook from './pages/MyBook';
import New from './pages/New';
import Review from './pages/Review';
import Button from './components/Button';

function App() {
  return (
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
  );
}

export default App;
