import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReviewStateContext } from '../context/ReviewStateContext';
import { HiOutlineChevronLeft } from 'react-icons/hi';

import Button from '../components/Button';
import Header from '../components/Header';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const Thumbnail = styled.img`
  width: 150px;
`;

const ReviewDetails = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  // align-items: center;
`;
const BookTitle = styled.h3`
  text-align: center;
`;

const ReviewLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;
const ReviewValue = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const AuthorWrap = styled.div``;

const ReadingDateWrap = styled.div``;

const RateWrap = styled.div`
  display: flex;
  align-items: center;
`;

const RateImg = styled.img`
  width: 70px;
  transform: translate(0, 1px);
`;

const Content = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Dosis', sans-serif;
  border-top: 1px dashed #929292;
  min-height: 150px;
  resize: vertical;
  padding: 16px 12px;
  margin-top: 22px;
  margin-bottom: 20px;
`;

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reviewList = useContext(ReviewStateContext);
  const [data, setData] = useState([]);

  const RateImgSrc = process.env.PUBLIC_URL + `/assets/rate${data.rate}.png`;

  const moveToMyBookPage = () => {
    navigate('/');
  };

  const moveToEditPage = () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    if (reviewList.length >= 1) {
      const currentReview = reviewList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (currentReview) {
        setData(currentReview);
      } else {
        // If there is no matching review, return to the MyBook page.
        alert('There is no matching review.');
        navigate('/', { replace: true });
      }
    }
  }, [id, reviewList]);
  return (
    <div>
      <Header
        headerText={'Review'}
        leftChild={
          <Button onClick={moveToMyBookPage}>
            <HiOutlineChevronLeft />
          </Button>
        }
        rightChild={
          <Button type={'positive'} onClick={moveToEditPage}>
            Edit
          </Button>
        }
      ></Header>
      <ReviewContainer>
        <Thumbnail src={data.thumbnail} />
        <ReviewDetails>
          <BookTitle>{data.title}</BookTitle>
          <AuthorWrap>
            <ReviewLabel>Author</ReviewLabel>
            <ReviewValue>{data.author}</ReviewValue>
          </AuthorWrap>
          <ReadingDateWrap>
            <ReviewLabel>Reading Date</ReviewLabel>
            <ReviewValue>
              {data.readingStartDate} ~ {data.readingFinishDate}
            </ReviewValue>
          </ReadingDateWrap>
          <RateWrap>
            <ReviewLabel>Rate</ReviewLabel>
            <RateImg src={RateImgSrc} />
          </RateWrap>
        </ReviewDetails>
        <Content>{data.content}</Content>
      </ReviewContainer>
    </div>
  );
};

export default Review;
