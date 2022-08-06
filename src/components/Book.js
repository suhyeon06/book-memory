import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const BookContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const Thumbnail = styled.img`
  width: 15%;
  border-radius: 4px;
  margin-right: 16px;
`;

const NoThumbnail = styled.div`
  width: 15%;
  height: 110px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  background-color: #ececec;
  border-radius: 4px;
  padding: 4px;
  margin-right: 16px;
`;

const BookInfo = styled.div`
  width: 60%;
`;

const InfoWrap = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const BookTitle = styled.h4`
  margin-top: 6px;
  margin-bottom: 6px;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-right: 10px;
  color: #353535;
`;
const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #353535;
`;

const ButtonWrap = styled.div`
  width: 25%;
  display: flex;
  justify-content: end;
`;

const Book = ({ id, title, author, thumbnail, publisher, publishedDate }) => {
  const navigate = useNavigate();
  const handleSelectClick = () => {
    navigate(`/new/${id}`);
  };

  return (
    <BookContainer>
      {thumbnail === 'no thumbnail' ? (
        // When book doesn't have thumbnail
        <NoThumbnail>No Thumbnail Available</NoThumbnail>
      ) : (
        // When book has thumbnail
        <Thumbnail src={thumbnail}></Thumbnail>
      )}
      <BookInfo>
        <InfoWrap>
          <BookTitle>{title}</BookTitle>
        </InfoWrap>
        <InfoWrap>
          <InfoLabel>Author</InfoLabel>
          <InfoValue>{author}</InfoValue>
        </InfoWrap>
        <InfoWrap>
          <InfoLabel>Publisher</InfoLabel>
          <InfoValue>{publisher}</InfoValue>
        </InfoWrap>
        <InfoWrap>
          <InfoLabel>Published Date</InfoLabel>
          <InfoValue>{publishedDate}</InfoValue>
        </InfoWrap>
      </BookInfo>
      <ButtonWrap>
        <Button type={'positive'} onClick={handleSelectClick}>
          Select this book
        </Button>
      </ButtonWrap>
    </BookContainer>
  );
};

export default Book;
