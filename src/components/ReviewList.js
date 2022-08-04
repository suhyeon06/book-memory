import { useState } from 'react';
import styled from 'styled-components';
import ReviewItem from './ReviewItem';

const ReviewListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const sortOptionList = [
  {
    id: 0,
    value: 'newest',
    name: 'Newest',
  },
  {
    id: 1,
    value: 'oldest',
    name: 'Oldest',
  },
];

const filterOptionList = [
  {
    id: 0,
    value: 'all',
    name: 'All',
  },
  {
    id: 1,
    value: 1,
    name: '⭐',
  },
  {
    id: 2,
    value: 2,
    name: '⭐⭐',
  },
  {
    id: 3,
    value: 3,
    name: '⭐⭐⭐',
  },
  {
    id: 4,
    value: 4,
    name: '⭐⭐⭐⭐',
  },
  {
    id: 5,
    value: 5,
    name: '⭐⭐⭐⭐⭐',
  },
];

const Menu = styled.select`
  font-size: 12px;
  font-weight: 500;
  font-family: 'Dosis', sans-serif;
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  padding: 4px 8px;
  margin-left: 12px;
  cursor: pointer;
`;

const MenuController = ({ type, onChange, options }) => {
  return (
    <Menu value={type} onChange={(e) => onChange(e.target.value)}>
      {options.map((it) => (
        <option key={it.id} value={it.value}>
          {it.name}
        </option>
      ))}
    </Menu>
  );
};

const ReviewList = ({ reviewList }) => {
  const [sortType, setSortType] = useState('newest');
  const [filterType, setFilterType] = useState('all');

  const getProcessedReviewList = () => {
    const compare = (a, b) => {
      if (sortType === 'newest') {
        // newest
        return parseInt(b.createdAt) - parseInt(a.createdAt);
      } else {
        // oldest
        return parseInt(a.createdAt) - parseInt(b.createdAt);
      }
    };

    const copyList = JSON.parse(JSON.stringify(reviewList));

    // Filter list by rate
    const filteredList =
      filterType === 'all'
        ? copyList
        : copyList.filter((it) => it.rate === parseInt(filterType));

    // Sort list by time
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <MenuController
        type={sortType}
        onChange={setSortType}
        options={sortOptionList}
      ></MenuController>
      <MenuController
        type={filterType}
        onChange={setFilterType}
        options={filterOptionList}
      ></MenuController>
      <ReviewListContainer>
        {getProcessedReviewList().map((it) => (
          <ReviewItem key={it.id} {...it}></ReviewItem>
        ))}
      </ReviewListContainer>
    </div>
  );
};

ReviewList.defaultProps = {
  reviewList: [],
};

export default ReviewList;
