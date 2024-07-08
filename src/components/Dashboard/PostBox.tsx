import styled from 'styled-components';

import { Post } from 'types/Post';
import { Author } from 'types/Author';

import image from 'assets/placeholder.png'

interface Props {
  post: Post;
  author?: Author
}
const PostBox = ({ post, author }: Props) => {
  return (
    <Wrapper>
      <img src={image} height={200} width={300} alt='post-image' />
      <Info>
        {author && (
          <Name>
            {author.name}
          </Name>
        )}
        <Title>
          {post.title}
        </Title>
        <div>
          {post.body}
        </div>
      </Info>
    </Wrapper>
  )
}

export default PostBox;

const Wrapper = styled.div`
  display: flex;
  padding: 30px;
  width: 100%;
  border: 1px solid #e2e5ed;
  border-radius: 32px;
  background-color: #fff;
  box-sizing: border-box;
  gap: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  flex: 1;
`;

const Name = styled.div`
  color: #696e7c;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
`;