import styled from 'styled-components';
import ReviewItem from './ReviewItem';

const ReviewListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ReviewList = ({ reviewList }) => {
  return (
    <ReviewListContainer>
      {reviewList.map((it) => (
        <ReviewItem key={it.id} {...it}></ReviewItem>
      ))}
    </ReviewListContainer>
  );
};

ReviewList.defaultProps = {
  reviewList: [],
};

export default ReviewList;
