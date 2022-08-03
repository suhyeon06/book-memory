import styled from 'styled-components';

const StyledButton = styled.button`
  color: ${(props) => {
    if (['positive', 'negative'].includes(props.type)) {
      return 'white';
    } else {
      return 'black';
    }
  }};
  background-color: ${(props) => {
    switch (props.type) {
      case 'positive':
        return '#6FBD96';
      case 'negative':
        return '#F79489';
      default:
        return '#ececec';
    }
  }};
  font-size: 16px;
  font-weight: 500;
  font-family: 'Dosis', sans-serif;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Button = ({ children, type, onClick }) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
