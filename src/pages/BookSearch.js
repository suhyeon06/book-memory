import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';

import Button from '../components/Button';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import Book from '../components/Book';

const BookSearch = () => {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div>
      <Header
        headerText={'Book Search'}
        leftChild={
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            <HiOutlineChevronLeft />
          </Button>
        }
        rightChild={null}
      ></Header>
      <SearchBar setSearchResult={setSearchResult}></SearchBar>
      {searchResult.map((it, idx) => (
        <Book
          key={it.id}
          id={it.id}
          title={it.volumeInfo.title}
          author={it.volumeInfo.authors}
          thumbnail={it.volumeInfo.imageLinks.thumbnail}
          publisher={it.volumeInfo.publisher}
          publishedDate={it.volumeInfo.publishedDate}
        ></Book>
      ))}
    </div>
  );
};

export default BookSearch;
