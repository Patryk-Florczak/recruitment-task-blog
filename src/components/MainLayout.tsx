import { ReactNode } from 'react';
import styled from 'styled-components';

import Navbar from 'components/Navbar';

interface Props {
  children?: ReactNode;
}
const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <Container>
        <PageContent>
          {children}
        </PageContent>
      </Container>
    </>
  )
}

export default MainLayout;

const Container = styled.div`
  padding-top: 50px;
  width: 100vw;
`;

const PageContent = styled.div`
  max-width: 1140px;
  margin: auto;
`;
