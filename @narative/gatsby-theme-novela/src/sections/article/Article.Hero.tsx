import React from 'react';
import styled from '@emotion/styled';

import Headings from '@components/Headings';
import Image, { ImagePlaceholder } from '@components/Image';

import mediaqueries from '@styles/media';
import { IArticle, IAuthor } from '@types';

import ArticleAuthors from './Article.Authors';

interface ArticleHeroProps {
  article: IArticle;
  authors: IAuthor[];
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article, authors }) => {
  const hasCoAUthors = authors.length > 1;
  const hasHeroImage =
    article.hero &&
    Object.keys(article.hero.full).length !== 0 &&
    article.hero.full.constructor === Object;

  return (
    <Hero>
      <Header>
        <HeroHeading>{article.title}</HeroHeading>
        <Excerpt>{article.excerpt}</Excerpt>
        <HeroSubtitle hasCoAUthors={hasCoAUthors}>
          <ArticleAuthors authors={authors} />
          <ArticleMeta hasCoAUthors={hasCoAUthors}>
            {article.date}
            {/* {article.date} · {article.timeToRead} min read */}
          </ArticleMeta>
        </HeroSubtitle>
      </Header>
      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage ? (
          <Image src={article.hero.full} />
        ) : (
          <ImagePlaceholder />
        )}
      </HeroImage>
    </Hero>
  );
};

export default ArticleHero;

const Hero = styled.div`
  position: relative;
`;

const ArticleMeta = styled.div<{ hasCoAUthors: boolean }>`
  margin-left: ${p => (p.hasCoAUthors ? '10px' : '0')};

  ${mediaqueries.phablet`
    margin-left: 0;
  `}
`;

const Header = styled.header`
  position: relative;
  z-index: 10;
  margin: 0px auto 56px;
  max-width: 944px;
  padding: 96px 128px 0px;

  ${mediaqueries.desktop`
    padding-left: 53px;
    max-width: calc(507px + 53px);
    margin: 0 auto 70px;
  `}

  ${mediaqueries.tablet`
    padding-left: 0;
    margin: 0 auto 70px;
    max-width: 480px;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto 64px;
    padding: 0 40px;
  `}

  @media screen and (max-height: 700px) {
    margin: 0 auto 48px;
  }
`;

const HeroHeading = styled(Headings.h1)`
  font-family: ${p => p.theme.fonts.title};
  margin-bottom: 25px;
  text-align: center;
  font-weight: ${p => p.theme.fontsWeight.bold};

  ${mediaqueries.tablet`
    margin-bottom: 20px;
  `}
`;

const Excerpt = styled(Headings.h3)`
  font-size: 28px;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  text-align: center;
  margin-bottom: 24px;
  margin-top: 24px;
  font-weight: normal;
  line-height: 1.5;

  ${mediaqueries.tablet`
  `}

  ${mediaqueries.phablet`
    font-size: 22px;
  `}
`;

const HeroSubtitle = styled.div<{ hasCoAUthors: boolean }>`
  position: relative;
  display: flex;
  font-size: 14px;
  color: ${p => p.theme.colors.secondary};
  align-items: center;
  
  ${p => mediaqueries.phablet`
    flex-direction: column;
    align-items: left;
    align-items: flex-start;

    ${p.hasCoAUthors &&
      `
        &::before {
          content: '';
          position: absolute;
          left: -20px;
          right: -20px;
          top: -10px;
          bottom: -10px;
          border: 1px solid ${p.theme.colors.horizontalRule};
          opacity: 0.5;
          border-radius: 5px;
        }
    `}


    strong {
      display: block;
      font-weight: 500;
      margin-bottom: 5px;
    }
  `}
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  background-color: white;
  padding: 32px;

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

  ${mediaqueries.tablet`
    max-width: 100%;
  `}

  ${mediaqueries.phablet`
    margin: 0 auto;
    width: calc(100vw - 40px);
    height: 220px;

    & > div {
      height: 220px;
      filter: saturate(90%) contrast(85%);
    }
`}
`;
