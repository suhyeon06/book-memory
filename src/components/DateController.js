import styled from 'styled-components';

const Controller = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const DateText = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const DateChangeButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
  font-size: 18px;
`;

const PrevDate = styled(DateChangeButton)`
  margin-right: 10px;
`;
const NextDate = styled(DateChangeButton)`
  margin-left: 10px;
`;

const DateController = ({ currentYear, setCurrentYear }) => {
  const increaseYear = () => {
    setCurrentYear(currentYear + 1);
  };
  const decreaseYear = () => {
    setCurrentYear(currentYear - 1);
  };
  return (
    <Controller>
      <PrevDate onClick={decreaseYear}>&lt;</PrevDate>
      <DateText>{currentYear}</DateText>
      <NextDate onClick={increaseYear}>&gt;</NextDate>
    </Controller>
  );
};

export default DateController;
