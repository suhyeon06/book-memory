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
  height: 155px;
  border-radius: 4px;
  margin-bottom: 4px;
`;

const NoThumbnail = styled.div`
  width: 115px;
  height: 155px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  background-color: #ececec;
  border-radius: 4px;
  padding: 20px;
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

const CreatedAt = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #616161;
`;

const ReviewItem = ({ id, title, thumbnail, createdAt, rate }) => {
  const navigate = useNavigate();
  const RateImgSrc = process.env.PUBLIC_URL + `/assets/rate${rate}.png`;
  const moveToReviewPage = () => {
    navigate(`/review/${id}`);
  };

  return (
    <ItemContainer onClick={moveToReviewPage}>
      {thumbnail === 'no thumbnail' ? (
        // When book doesn't have thumbnail
        <NoThumbnail>No Thumbnail Available</NoThumbnail>
      ) : (
        // When book has thumbnail
        <Thumbnail src={thumbnail}></Thumbnail>
      )}
      <Title>{title}</Title>
      <Rate src={RateImgSrc} />
      <CreatedAt>{new Date(createdAt).toLocaleDateString()}</CreatedAt>
    </ItemContainer>
  );
};

export default ReviewItem;
