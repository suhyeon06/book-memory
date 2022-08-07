import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewEditor from '../components/ReviewEditor';

const New = () => {
  const [isBookSelected, setIsBookSelected] = useState(false);
  const [bookData, setBookData] = useState(false);
  const { id } = useParams();
  const defaultData = {
    bookId: null,
    title: 'Title',
    author: 'Author',
    thumbnail: 'no thumbnail',
  };

  useEffect(() => {
    if (id) {
      fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setBookData({
            bookId: data.id,
            title: data.volumeInfo.title,
            author: data.volumeInfo.authors
              ? data.volumeInfo.authors
              : 'Unknown',
            thumbnail: data.volumeInfo.imageLinks
              ? data.volumeInfo.imageLinks.thumbnail
              : 'no thumbnail',
          });
        });
      setIsBookSelected(true);
    }
  }, []);

  return (
    <div>
      <ReviewEditor
        isEdit={false}
        data={isBookSelected ? bookData : defaultData}
      ></ReviewEditor>
    </div>
  );
};

export default New;
