import styled from 'styled-components';

import logo from '/logo.svg';

const Navbar = () => {
  return (
    <Wrapper>
      <Content>
        <Header>
          <img src={logo} />
          SKBlog - The best kind of blog
        </Header>
      </Content>
    </Wrapper>
  )
}

export default Navbar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100vw;
  background-color: #fff;
  border-bottom: 1px solid #e2e5ed;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1140px;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  gap: 5px;
  align-items: center;
  white-space: nowrap;
`;
