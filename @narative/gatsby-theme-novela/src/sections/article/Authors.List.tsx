import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';
import SocialLinks from "@components/SocialLinks";

import mediaqueries from '@styles/media';
import { IAuthor } from "@types";



interface AuthorProps {
  authors: IAuthor[];
}

const AuthorsList: React.FC<AuthorProps> = ({ authors }) => {
  const hasCoAUthors = authors.length > 1;

  return (
    <AuthorsContainer>
      {authors.map((author, index) => (
        <AuthorWrap style={{ left: `${index * 15}px` }} key={author.name}>
          <ImageContainer>
            <Image src={author.avatar.large} />
          </ImageContainer>
          <Info>
            <Bio>{author.bio}</Bio>
            <Social>
              <span> → Follow trên </span>
              <SocialLinks links={author.social} />
            </Social>
          </Info>
        </AuthorWrap>
      ))}
    </AuthorsContainer>
  );
};

export default AuthorsList;

const AuthorsContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 680px;
  color: ${p => p.theme.colors.secondary};
`;

const AuthorWrap = styled.div`
  display: grid;
  grid-gap: 32px;
  position: relative;
  grid-template-columns: 160px 1fr;
  
  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `};
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: 160px;
  height: 160px;
  overflow: hidden;
  justify-self: center;

`;

const Info = styled.div`

`;

const Social = styled.div`
  span {
    font-size: 18px;
    font-family: ${p => p.theme.fonts.body};
    font-weight: ${p => p.theme.fontsWeight.light};
    padding-right: 24px;
  }
`;

const Bio = styled.div`
  font-size: 24px;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 24px;
  font-weight: ${p => p.theme.fontsWeight.light};
  line-height: 1.5;
`;
