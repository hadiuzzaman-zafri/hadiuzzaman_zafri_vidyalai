import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

// Content herader where the user info will reflect
const ContentHeader = styled.div(() => ({
  display: 'flex',
  padding: '10px',
  gap: '10px', 
  '& > h4:first-child': { // User First and Last name - first letter in a circle 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#000',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    textAlign: 'center',
  },
}));

// User First and Last Name with email in small text
const ContentInfo = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: '35%',                  // This push the button up with the help of tranform property
  transform: 'translateY(-50%)',  // Align the Button vertically center with respect to the Carouse
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  // This Arrow function extract the First letter from both First and Last name
  const userFirstAndLastLetter = () => {
        const names = post.user.name.split(' '); 
        const firstNameInitial = names[0].charAt(0);
        const lastNameInitial = names[names.length - 1].charAt(0);
        return `${firstNameInitial}${lastNameInitial}`;
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 50,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -70,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <ContentHeader>
        <h4>{userFirstAndLastLetter()}</h4>
        <ContentInfo>
          <h4>{post.user.name}</h4>
          <p><small>{post.user.email}</small></p>
        </ContentInfo>
      </ContentHeader>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;

