import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 115px;
  margin-top: 20px;
  margin-left: 12px;
  margin-right: 10px;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  border-radius: 4px;
  margin-bottom: 4px;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Rate = styled.img`
  width: 70px;
  margin-bottom: 4px;
  transform: translate(-2px, 0);
`;

const ReadingDate = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #616161;
`;

const ReviewItem = ({ id, title, thumbnail, readingDate, rate }) => {
  const navigate = useNavigate();
  const RateImgSrc = process.env.PUBLIC_URL + `/assets/rate${rate}.png`;
  const moveToReviewPage = () => {
    navigate(`/review/${id}`);
  };

  return (
    <ItemContainer onClick={moveToReviewPage}>
      <Thumbnail src={thumbnail} />
      <Title>{title}</Title>
      <Rate src={RateImgSrc} />
      <ReadingDate>{new Date(readingDate).toLocaleDateString()}</ReadingDate>
    </ItemContainer>
  );
};

export default ReviewItem;
