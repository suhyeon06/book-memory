import styled from 'styled-components';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  margin-bottom: 14px;
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
`;

const Thumbnail = styled.img`
  width: 120px;
  border-radius: 4px;
  margin-right: 12px;
`;

const BookInfo = styled.div`
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

const ReviewEditor = () => {
  const navigate = useNavigate();
  const readingStartDateRef = useRef();
  const readingFinishDateRef = useRef();
  const contentRef = useRef();
  const { id } = useParams();

  const [isBookSelected, setIsBookSelected] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [title, setTitle] = useState('Title');
  const [author, setAuthor] = useState('Author');
  const [thumbnail, setThumbnail] = useState();
  const [readingStartDate, setReadingStartDate] = useState('');
  const [readingFinishDate, setReadingFinishDate] = useState('');
  const [rate, setRate] = useState(5);
  const [content, setContent] = useState('');

  const { onCreate } = useContext(ReviewDispatchContext);

  useEffect(() => {
    if (id) {
      fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.volumeInfo.title);
          setAuthor(data.volumeInfo.authors);
          setThumbnail(data.volumeInfo.imageLinks.thumbnail);
        });
      setIsBookSelected(true);
      setBookId(id);
    }
  }, []);

  const moveToSearchPage = () => {
    navigate('/new/search');
  };
  const moveToMyBookPage = () => {
    navigate('/');
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
    }
  };

  const onSubmit = () => {
    if (isBookSelected) {
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

      navigate('/', { replace: true });
    } else {
      window.alert('Please select a book.');
    }
  };

  return (
    <div>
      <Header
        headerText={'New Review'}
        leftChild={
          <Button
            onClick={() => {
              navigate('/');
            }}
          >
            <HiOutlineChevronLeft />
          </Button>
        }
        rightChild={null}
      ></Header>
      <SearchButton onClick={moveToSearchPage}>
        <HiOutlineSearch /> Search Book
      </SearchButton>

      {/* Book Info Section */}
      <BookInfoSection>
        <Thumbnail src={thumbnail} />
        <BookInfo>
          <BookTitle>{title}</BookTitle>
          <BookAuthor>{author}</BookAuthor>
        </BookInfo>
      </BookInfoSection>

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
        <Button onClick={moveToMyBookPage}>Cancel</Button>
        <Button type={'positive'} onClick={onSubmit}>
          Submit
        </Button>
      </ButtonSection>
    </div>
  );
};

export default ReviewEditor;
