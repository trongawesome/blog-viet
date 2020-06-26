import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "@components/Layout";
import MDXRenderer from "@components/MDX";
import Section from "@components/Section";
import Subscription from "@components/Subscription";
import HorizontalRule from "@components/HorizontalRule";

import mediaqueries from "@styles/media";
import { debounce } from "@utils";

import ArticleHero from "../sections/article/Article.Hero";
import ArticleAuthors from '../sections/article/Article.Authors';
import AuthorsList from '../sections/article/Authors.List';
import ArticleSEO from "../sections/article/Article.SEO";

import { Template } from "@types";

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
          }
        }
      }
    }
  }
`;

const Article: Template = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null);

  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const results = useStaticQuery(siteQuery);
  const name = results.allSite.edges[0].node.siteMetadata.name;

  const { article, authors, mailchimp, next } = pageContext;

  const hasCoAUthors = authors.length > 1;

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = contentSectionRef.current;

      if (!contentSection) return;

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize);
        const $imgs = contentSection.querySelectorAll("img");

        $imgs.forEach($img => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation;
        });

        // Prevent rerun of the listener attachment
        setHasCalculated(true);
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height);
    }, 20);

    calculateBodySize();
    window.addEventListener("resize", calculateBodySize);

    return () => window.removeEventListener("resize", calculateBodySize);
  }, []);

  return (
    <Layout>
      <ArticleSEO article={article} authors={authors} location={location} />

      <Section narrow>
        <Container>
          <ArticleHero article={article} authors={authors} />
          <ArticleBody ref={contentSectionRef}>
            <MDXRenderer content={article.body}>
            </MDXRenderer>
            <HorizontalRule />
          </ArticleBody>
          <AuthorsList authors={authors} />
        </Container>
      </Section>
    </Layout>
  );
};

export default Article;

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 64px;
  position: relative;
  box-sizing: border-box;
  display: block;
  box-shadow: 0 3px 12px alpha(black,.2);

`;

const ArticleBody = styled.article`
  position: relative;
  padding: 56px 0 64px;
  transition: background 0.2s linear;
  
  ${mediaqueries.tablet`
    padding: 70px 0 64px;
  `}

  ${mediaqueries.phablet`
    padding: 40px 0 48px;
  `}
`;
