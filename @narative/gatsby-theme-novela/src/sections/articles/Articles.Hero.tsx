import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Section from '@components/Section';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              writingHeading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ArticlesHero: React.FC<IAuthor> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  
  // Hide author
  // const featuredAuthor = authors.find(author => author.featured);

  // if (!featuredAuthor) {
  //   throw new Error(`
  //     No featured Author found.Trong test ssh.
  //     Please ensure you have at least featured Author.
  // `);
  // }

  return (
    <Section narrow id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.writingHeading }} />
        <InfoText>
          Góp nhặt suy nghĩ bằng ngôn ngữ mẹ đẻ. Cà xát thật sâu vào tâm hồn.
        </InfoText>
      </HeadingContainer>
    </Section>
  );
};

export default ArticlesHero;

const HeadingContainer = styled.div`
  margin: 224px 0 96px;
  
  ${mediaqueries.desktop`
    width: 80%;
  `}
  
  ${mediaqueries.tablet`
    width: 100%;
  `}
`;
  
const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-size: 64px;
  line-height: 1.15;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 56px
  `}

  ${mediaqueries.phablet`
    font-size: 56px;
  `}
`;

const InfoText = styled.p`
  font-size: 24px;
  margin-top: 16px;
  line-height: 1.5;
  font-family: ${p => p.theme.fonts.body};
  font-weight: ${p => p.theme.fontsWeight.light};
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.phablet`
    font-size: 22px;
  `}

`;

const Anchor = styled(Link)`
  color: ${p => p.theme.colors.secondary};
  border-bottom: 1px solid ${p => p.theme.colors.secondary};
  margin-left: 6px;

  &:hover,
  &:focus {
    color: ${p => p.theme.colors.accent};
    border-bottom-color: ${p => p.theme.colors.accent};
  }
`;
