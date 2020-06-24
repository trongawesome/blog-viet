import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, navigate, graphql, useStaticQuery } from "gatsby";
import { useColorMode } from "theme-ui";

import Section from "@components/Section";
import Logo from "@components/Logo";
import LinkExternal from "@components/LinkExternal";

import Icons from "@icons";
import mediaqueries from "@styles/media";
import {
  getWindowDimensions,
  getBreakpointFromTheme,
} from "@utils";

const siteQuery = graphql`
  {
    sitePlugin(name: { eq: "@narative/gatsby-theme-novela" }) {
      pluginOptions {
        rootPath
        basePath
      }
    }
  }
`;

const NavigationHeader: React.FC<{}> = () => {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
  const [previousPath, setPreviousPath] = useState<string>("/");
  const { sitePlugin } = useStaticQuery(siteQuery);

  const [colorMode] = useColorMode();
  const fill = colorMode === "dark" ? "#fff" : "#000";
  const { rootPath, basePath } = sitePlugin.pluginOptions;

  useEffect(() => {
    const { width } = getWindowDimensions();
    const phablet = getBreakpointFromTheme("phablet");

    const prev = localStorage.getItem("previousPath");
    const previousPathWasHomepage =
      prev === (rootPath || basePath) || (prev && prev.includes("/page/"));
    const isNotPaginated = !location.pathname.includes("/page/");

    setShowBackArrow(
      previousPathWasHomepage && isNotPaginated && width <= phablet,
    );
    setPreviousPath(prev);
  }, []);

  return (
    <Header>
      <Section narrow>
        <NavContainer>
          <LogoLink
            to={rootPath || basePath}
            data-a11y="false"
            title="Navigate back to the homepage"
            aria-label="Navigate back to the homepage"
            back={showBackArrow ? "true" : "false"}
          >
            {showBackArrow && (
              <BackArrowIconContainer>
                <Icons.ChevronLeft fill={fill} />
              </BackArrowIconContainer>
            )}
            <Logo fill={fill} />
            <Hidden>Navigate back to the homepage</Hidden>
            <ArcTextWrap>
              <Icons.ArcTagline /> 
            </ArcTextWrap>
          </LogoLink>
          <NavControls>
            <NavLink to={`/about`} title={`About me`} activeClassName="active" >
              Tôi
            </NavLink>
            <LinkExternal data-a11y="false" aria-label={`Link to trongnguyen.co`} href={`https://trongnguyen.co`} >
              ★ English
            </LinkExternal>
          </NavControls>
        </NavContainer>
      </Section>
    </Header>
  );
};

export default NavigationHeader;

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  height: 72px;

  box-shadow: 0 7px 16px -17px rgba(107,69,43,0.60);

  ${mediaqueries.desktop_medium`
    // padding-top: 50px;
  `};

  @media screen and (max-height: 800px) {
    // padding-top: 50px;
  }
`;

const NavLink = styled(Link)`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 12px;
  color: ${p => p.theme.colors.secondary};
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
  position: relative;
  margin-left: 40px;

  ${mediaqueries.phone`
    margin-left: 32px;
  `}

  &::after {
    background: none repeat scroll 0 0 transparent;
    bottom: -8px;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: ${p => p.theme.colors.accent};
    transition: width 0.25s ease 0s, left 0.25s ease 0s;
    width: 0;
  }

  &:hover {
    color: ${p => p.theme.colors.secondary};

    &::after {
      width: 100%; 
      left: 0; 
    }
  }

  &.active {
    &::after {
      background: none repeat scroll 0 0 transparent;
      bottom: -8px;
      content: "";
      display: block;
      height: 2px;
      left: calc(50% - 10px);
      position: absolute;
      background: ${p => p.theme.colors.accent};
      transition: width 0.25s ease 0s, left 0.25s ease 0s;
      width: 20px;
    }
  }
`;

const LogoLink = styled(Link)<{ back: string }>`
  position: relative;
  display: flex;
  align-items: center;
  left: 0;
  width: 114px;
  height: 144px;
  background-color: ${p => p.theme.colors.accent};
  box-shadow: 0 7px 16px -12px rgba(107,69,43,0.60);
  margin-top: -16px;
  transition: margin 0.25s ease;

  ${mediaqueries.desktop_medium`
    left: 0
  `}

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -10%;
    top: -30%;
    width: 120%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  &:hover {
    ${BackArrowIconContainer} {
      transform: translateX(-3px);
    }
    margin-top: 0;
  }
`;

const NavControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${mediaqueries.phablet`
    right: -5px;
  `}
`;

const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0px;
  height: 0px;
  visibility: hidden;
  overflow: hidden;
`;

const ArcTextWrap = styled.div`
  position: absolute;
  display: inline-block;
  width: 88px;
  height: 88px;
  bottom: 12px;
  left: 12px;

	animation: rotation 14s infinite linear;

`;

const Header = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  z-index: 1000;
  top: 0;
  background-color: ${p => p.theme.colors.background};
`;
