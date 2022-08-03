import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e2e2;
`;

const HeaderText = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  font-size: 20px;
  font-weight: 600;
`;
const LeftChild = styled.div`
  display: flex;
  justify-content: start;
  width: 25%;
`;
const RightChild = styled.div`
  display: flex;
  justify-content: end;
  width: 25%;
`;

const Header = ({ headerText, leftChild, rightChild }) => {
  return (
    <StyledHeader>
      <LeftChild>{leftChild}</LeftChild>
      <HeaderText>{headerText}</HeaderText>
      <RightChild>{rightChild}</RightChild>
    </StyledHeader>
  );
};

export default Header;
