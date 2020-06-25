import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
}

interface ArticlesListItemProps {
  article: IArticle;
  narrow?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
}) => {
  if (!articles) return null;

  const { hasSetGridLayout, getGridLayout } = useContext(
    GridLayoutContext,
  );

  useEffect(() => getGridLayout(), []);

  return (
    <ArticlesListContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      <List>
        {articles.map((ap, index) => {
          return (
            <ListItem key={index} article={ap} />
          );
        })}
      </List>
    </ArticlesListContainer>
  );
};

export default ArticlesList;

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow }) => {
  if (!article) return null;

  const hasOverflow = narrow && article.title.length > 35;
  const imageSource = article.hero.narrow;
  const hasHeroImage =
    imageSource &&
    Object.keys(imageSource).length !== 0 &&
    imageSource.constructor === Object;

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item>
        <TextContainer>
          <Title dark hasOverflow={hasOverflow}>
            {article.title}
          </Title>
          <Excerpt>
            {article.excerpt}
          </Excerpt>
          <MetaData>
            {article.date}
          </MetaData>
        </TextContainer>
        <ImageContainer >
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
        </ImageContainer>
      </Item>
    </ArticleLink>
  );
};

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;

  ${mediaqueries.phablet`
    -webkit-line-clamp: 3;
  `}
`;

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  ${p => p.alwaysShowAllDetails && showDetails}
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 32px;
  grid-template-rows: 2;

  &:not(:last-child) {
    margin-bottom: 75px;
  }

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    
    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const Item = styled.div`
  position: relative;
  margin-bottom: 140px;
  padding: 0 128px;

  ${mediaqueries.desktop`
    padding: 0;
  `}
  ${mediaqueries.tablet`
    margin-bottom: 96px;
  `}

  ${mediaqueries.phablet`
    // margin-bottom: 40px;
    // padding: 0;
  `}

`;

const ImageContainer = styled.div`
  position: relative;
  height: auto;
  margin-bottom: 24px;
  transition: transform 0.3s var(--ease-out-quad),
    box-shadow 0.3s var(--ease-out-quad);

    padding: 16px;
    background-color: white;
    
  
    &::after {
      content: '';
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      z-index: 2;
      background-repeat: no-repeat;
      background-image: linear-gradient(to right, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(to bottom, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(to bottom, rgba(255,255,255,0.1) 0.5%, rgba(0,0,0,0.15) 1.2%, transparent 1.2%), linear-gradient(265deg, rgba(0,0,0,0.2), transparent 10%), linear-gradient(5deg, rgba(0,0,0,0.2), transparent 15%), linear-gradient(-5deg, rgba(0,0,0,0.1), transparent 10%), linear-gradient(5deg, rgba(0,0,0,0.1), transparent 10%), linear-gradient(-265deg, rgba(0,0,0,0.2), transparent 10%), linear-gradient(-5deg, rgba(0,0,0,0.2), transparent 15%), linear-gradient(266deg, rgba(0,0,0,0.2), transparent 10%);
      background-size: 50% 100%, 100% 33.3333%, 100% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%, 50% 33.3333%;
      background-position: right top, left center, left bottom, left top, left top, right top, left center, right center, right center, left bottom;
    }

  & > div {
    height: 100%;

    filter: saturate(70%) contrast(85%);
  }

  ${mediaqueries.tablet`
    margin-bottom: 35px;
    padding: 10px;
  `}

  ${mediaqueries.phablet`
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
  `}
`;

const TextContainer = styled.div`
  margin-bottom: 24px;
`;

const Title = styled(Headings.h2)`
  font-size: 56px;
  line-height: 1.25;
  font-family: ${p => p.theme.fonts.title};
  color: ${p => p.theme.colors.primary};
  margin-bottom: 16px;
  text-align: center;
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};

  ${mediaqueries.desktop`
    font-size: 48px;  
  `}

  ${mediaqueries.tablet`
    font-size: 40px;  
    margin-bottom: 12px;
  `}

  ${mediaqueries.phablet`
    font-size: 38px;  
    line-height: 1.2;
    padding-top: 20px;
    margin-bottom: 12px;
    -webkit-line-clamp: 3;
  `}
`;

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 24px;
  margin-bottom: 16px;
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.body};
  font-weight: ${p => p.theme.fontsWeight.light};
  display: box;
  text-align: center;

  ${mediaqueries.desktop`
    display: -webkit-box;
  `}

  ${mediaqueries.phablet`
    margin-bottom; 15px;
  `}

  ${mediaqueries.phablet`
    max-width: 100%;
    padding:  0 20px;
    font-size: 20px;
    margin-bottom: 12px;
    -webkit-line-clamp: 3;
  `}
`;

const MetaData = styled.div`
  font-weight: ${p => p.theme.fontsWeight.regular};
  font-size: 12px;
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.body};
  opacity: 0.6;
  text-align: center;
  text-transform: uppercase;

  ${mediaqueries.phablet`
    max-width: 100%;
    padding-top: 0;
  `}
`;

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.25s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer} {
    // transform: translateY(-2px);
    // box-shadow: 0 16px 0 -10px rgba(255,255,255,0.71), 0 25px 0 -14px rgba(255,255,255,0.71), 0 25px 0 -14px rgba(240,172,142,0.79);
  }


  &:focus h2 {
    color: ${p => p.theme.colors.accent};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.phablet`
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  `}
`;
