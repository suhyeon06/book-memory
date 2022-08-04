import { useContext, useEffect, useState } from 'react';
import { ReviewStateContext } from '../context/ReviewStateContext';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';
import ReviewList from '../components/ReviewList';
import DateController from '../components/DateController';

const MyBook = () => {
  const navigate = useNavigate();
  const reviews = useContext(ReviewStateContext);
  const [data, setData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Filter reviews according to current year
    setData(
      reviews.filter((it) => {
        return new Date(it.readingDate).getFullYear() === currentYear;
      })
    );
  }, [reviews, currentYear]);

  return (
    <div>
      <Header
        headerText={'My Books'}
        leftChild={null}
        rightChild={
          <Button
            type={'positive'}
            onClick={() => {
              navigate('/new');
            }}
          >
            New Review
          </Button>
        }
      ></Header>
      <DateController
        currentYear={currentYear}
        setCurrentYear={setCurrentYear}
      ></DateController>
      <ReviewList reviewList={data}></ReviewList>
    </div>
  );
};

export default MyBook;
