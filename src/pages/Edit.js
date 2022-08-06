import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewEditor from '../components/ReviewEditor';
import { ReviewStateContext } from '../context/ReviewStateContext';

const Edit = () => {
  const [savedData, setSavedData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const reviewList = useContext(ReviewStateContext);

  useEffect(() => {
    if (reviewList.length >= 1) {
      const review = reviewList.find((it) => parseInt(it.id) === parseInt(id));
      if (review) {
        setSavedData(review);
      } else {
        // If there is no matching review, return to the MyBook page.
        alert('There is no matching review.');
        navigate('/', { replace: true });
      }
    }
  }, [id, reviewList]);

  return (
    <div>
      {savedData && (
        <ReviewEditor isEdit={true} data={savedData}></ReviewEditor>
      )}
    </div>
  );
};

export default Edit;
