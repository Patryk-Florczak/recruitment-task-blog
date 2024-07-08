import { useState } from 'react';
import styled from 'styled-components';

import PostBox from 'components/Dashboard/PostBox';
import MultiSelectInput from 'components/Utility/MultiSelectInput';
import { Post } from 'types/Post';
import { Author } from 'types/Author';
import useFetchData from 'hooks/useFetchData';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<number>();

  const { data: authors } = useFetchData<Author[]>({ queryKey: 'authors', url: '/users' })
  const { data: posts, isLoading } = useFetchData<Post[]>({
    queryKey: 'posts',
    url: `/posts${selectedAuthor ? `?userId=${selectedAuthor}` : ''}`,
    resourceId: selectedAuthor
  })

  if (!posts && !isLoading) {
    return <>Sorry, no posts yet!</>
  }

  return (
    <>
      <FilterWrapper>
        {selectedAuthor && (
          <div>Results filtered by: {authors?.find(author => author.id === selectedAuthor)?.name}</div>
        )}
        {authors && (
          <MultiSelectInput
            label='Filter by Author'
            value={searchQuery}
            selectedValue={selectedAuthor}
            onChange={({ target }) => setSearchQuery(target.value)}
            options={authors.map(author => ({ id: author.id, value: author.name }))}
            selectOption={(value) => {
              setSelectedAuthor(value.id);
              setSearchQuery(value.value);
            }}
            removeOption={() => {
              setSelectedAuthor(undefined);
              setSearchQuery('');
            }}
            filterOptionsByQuery
          />
        )}
      </FilterWrapper>
      <PostsContainer>
        {posts?.map(post => (
          <PostBox key={post.id} post={post} author={authors?.find(author => author.id === post.userId)} />
        ))}
      </PostsContainer>
    </>
  )
}

export default Dashboard;

const FilterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
  
  & > div:only-child {
    margin-left: auto;
  }
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
