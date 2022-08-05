import styled from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import { useState } from 'react';

const SearchInput = styled.input`
  width: 300px;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  font-size: 16px;
  font-family: 'Dosis', sans-serif;
  font-weight: 500;
`;

const SearchButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  font-size: 20px;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const SearchBar = ({ setSearchResult }) => {
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    getSearchResult(searchWord);
  };

  const getSearchResult = (word) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${word}&maxResults=30`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResult(data.items ? data.items : []);
      });
  };

  return (
    <SearchForm onSubmit={handleSearch}>
      <SearchInput
        placeholder="Search for books by title"
        value={searchWord}
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <SearchButton>
        <HiOutlineSearch />
      </SearchButton>
    </SearchForm>
  );
};

export default SearchBar;
