import styled from 'styled-components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HiOutlineChevronLeft } from 'react-icons/hi';
import { HiOutlineSearch } from 'react-icons/hi';

import Button from './Button';
import Header from './Header';
import { ReviewDispatchContext } from '../context/ReviewDispatchContext';

const SearchButton = styled.button`
  width: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Dosis', sans-serif;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;
`;

const Section = styled.section`
  margin-bottom: 16px;
`;

const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const SectionItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const BookInfoSection = styled(Section)`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const Thumbnail = styled.img`
  width: 120px;
  border-radius: 4px;
  margin-right: 12px;
`;

const NoThumbnail = styled.div`
  width: 120px;
  height: 150px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  background-color: #ececec;
  border-radius: 4px;
  padding: 18px;
  margin-right: 12px;
`;

const BookInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const BookTitle = styled.span`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 12px;
`;

const BookAuthor = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const ReadingDateWrap = styled.div`
  display: flex;
`;
const DateWrap = styled.div`
  margin-right: 16px;
`;

const InputDate = styled.input`
  background: #ececec;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Dosis', sans-serif;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
`;

const RateController = styled.select`
  background: #ececec;
  font-size: 12px;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  background-color: #ececec;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Dosis', sans-serif;
  border: none;
  border-radius: 4px;
  min-height: 150px;
  resize: vertical;
  padding: 6px 12px;
`;

const ButtonSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const rateOptionList = [
  {
    id: 5,
    value: 5,
    name: '⭐⭐⭐⭐⭐',
  },
  {
    id: 4,
    value: 4,
    name: '⭐⭐⭐⭐',
  },
  {
    id: 3,
    value: 3,
    name: '⭐⭐⭐',
  },
  {
    id: 2,
    value: 2,
    name: '⭐⭐',
  },
  {
    id: 1,
    value: 1,
    name: '⭐',
  },
];

const BookInfo = React.memo(({ thumbnail, title, author }) => {
  return (
    <BookInfoSection>
      {thumbnail === 'no thumbnail' ? (
        <NoThumbnail>No Thumbnail Available</NoThumbnail>
      ) : (
        <Thumbnail src={thumbnail} />
      )}
      <BookInfoWrap>
        <BookTitle>{title}</BookTitle>
        <BookAuthor>{author}</BookAuthor>
      </BookInfoWrap>
    </BookInfoSection>
  );
});

const ReviewEditor = ({ isEdit, data }) => {
  const navigate = useNavigate();
  const readingStartDateRef = useRef();
  const readingFinishDateRef = useRef();
  const contentRef = useRef();

  const [bookId, setBookId] = useState(data.bookId);
  const [title, setTitle] = useState(data.title);
  const [author, setAuthor] = useState(data.author);
  const [thumbnail, setThumbnail] = useState(data.thumbnail);
  const [readingStartDate, setReadingStartDate] = useState(
    isEdit ? data.readingStartDate : ''
  );
  const [readingFinishDate, setReadingFinishDate] = useState(
    isEdit ? data.readingFinishDate : ''
  );
  const [rate, setRate] = useState(isEdit ? data.rate : 5);
  const [content, setContent] = useState(isEdit ? data.content : '');

  const { onCreate, onEdit, onDelete } = useContext(ReviewDispatchContext);

  useEffect(() => {
    setBookId(data.bookId);
    setTitle(data.title);
    setAuthor(data.author);
    setThumbnail(data.thumbnail);
  }, [isEdit, data]);

  const moveToSearchPage = () => {
    navigate('/new/search');
  };

  const moveToMyBookPage = () => {
    navigate('/');
  };

  const moveToPrevPage = () => {
    navigate(-1);
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case 'readingStartDate':
        setReadingStartDate(value);
        break;
      case 'readingFinishDate':
        setReadingFinishDate(value);
        break;
      case 'rate':
        setRate(value);
        break;
      case 'content':
        setContent(value);
        break;
      default:
    }
  };

  const onSubmit = () => {
    // Check if book is selected or not
    if (bookId) {
      // Check readingStartDate
      if (readingStartDate.length < 1) {
        readingStartDateRef.current.focus();
        return;
      }

      // Check readingFinishDate
      if (readingFinishDate.length < 1) {
        readingFinishDateRef.current.focus();
        return;
      }

      // Check content
      if (content.length < 1) {
        contentRef.current.focus();
        return;
      }

      if (
        window.confirm(
          isEdit
            ? 'Do you want to edit this review?'
            : 'Do you want to save this review?'
        )
      ) {
        if (isEdit) {
          onEdit(data.id, readingStartDate, readingFinishDate, rate, content);
        } else {
          onCreate(
            bookId,
            title,
            author,
            thumbnail,
            readingStartDate,
            readingFinishDate,
            rate,
            content
          );
        }
        navigate('/', { replace: true });
      }
    } else {
      window.alert('Please select a book.');
    }
  };

  const deleteReview = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      onDelete(data.id);
      navigate('/', { replace: true });
    }
  };

  return (
    <div>
      <Header
        headerText={isEdit ? 'Review Edit' : 'New Review'}
        leftChild={
          <Button onClick={isEdit ? moveToPrevPage : moveToMyBookPage}>
            <HiOutlineChevronLeft />
          </Button>
        }
        rightChild={
          isEdit ? (
            <Button type={'negative'} onClick={deleteReview}>
              Delete
            </Button>
          ) : null
        }
      ></Header>
      {!isEdit && (
        <SearchButton onClick={moveToSearchPage}>
          <HiOutlineSearch /> Search Book
        </SearchButton>
      )}

      {/* Book Info Section */}
      <BookInfo thumbnail={thumbnail} title={title} author={author}></BookInfo>

      {/* Reading Date Section */}
      <Section>
        <SectionTitle>Reading Date</SectionTitle>
        <ReadingDateWrap>
          <DateWrap>
            <SectionItemName>Start</SectionItemName>
            <InputDate
              type="date"
              name="readingStartDate"
              value={readingStartDate}
              onChange={onChange}
              ref={readingStartDateRef}
            ></InputDate>
          </DateWrap>
          <DateWrap>
            <SectionItemName>Finish</SectionItemName>
            <InputDate
              type="date"
              name="readingFinishDate"
              value={readingFinishDate}
              onChange={onChange}
              ref={readingFinishDateRef}
            ></InputDate>
          </DateWrap>
        </ReadingDateWrap>
      </Section>

      {/* Rate Section */}
      <Section>
        <SectionTitle>Rate</SectionTitle>
        <RateController name="rate" value={rate} onChange={onChange}>
          {rateOptionList.map((it) => (
            <option key={it.id} value={it.value}>
              {it.name}
            </option>
          ))}
        </RateController>
      </Section>

      {/* Content Section */}
      <Section>
        <SectionTitle>Review</SectionTitle>
        <ContentTextArea
          name="content"
          value={content}
          onChange={onChange}
          ref={contentRef}
        ></ContentTextArea>
      </Section>

      {/* Button Section */}
      <ButtonSection>
        <Button onClick={isEdit ? moveToPrevPage : moveToMyBookPage}>
          Cancel
        </Button>
        <Button type={'positive'} onClick={onSubmit}>
          Submit
        </Button>
      </ButtonSection>
    </div>
  );
};

export default ReviewEditor;
