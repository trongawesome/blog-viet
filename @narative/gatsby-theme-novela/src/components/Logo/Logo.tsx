import React from "react";
import styled from "@emotion/styled";

import mediaqueries from "@styles/media";

import { Icon } from '@types';

const Logo: Icon = ({ fill = "white" }) => {
  return (
    <LogoContainer>
      <svg
        viewBox="0 0 72 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="Logo__Desktop"
      >
        <path d="M37.2335766 0v96C13.0778589 96 1 85.1842328 1 63.5526985V25.88972L37.2335766 0zm16.8759125 26.8198433C62.3332912 26.8198433 69 33.5531066 69 41.8590078c0 8.3059012-6.6667088 15.0391645-14.8905109 15.0391645-8.2238022 0-14.890511-6.7332633-14.890511-15.0391645 0-8.3059012 6.6667088-15.0391645 14.890511-15.0391645z" fillRule="evenodd" />
      </svg>

      <svg
        width="24"
        height="32"
        viewBox="0 0 72 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="Logo__Mobile"
      >
        <path d="M37.2335766 0v96C13.0778589 96 1 85.1842328 1 63.5526985V25.88972L37.2335766 0zm16.8759125 26.8198433C62.3332912 26.8198433 69 33.5531066 69 41.8590078c0 8.3059012-6.6667088 15.0391645-14.8905109 15.0391645-8.2238022 0-14.890511-6.7332633-14.890511-15.0391645 0-8.3059012 6.6667088-15.0391645 14.890511-15.0391645z" opacity=".8" fill={fill} fillRule="evenodd" />
      </svg>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`

  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;

  svg {
    fill: ${p => p.theme.colors.primary};
  }

  .Logo__Mobile {
    display: none;
  }
  
  .Logo__Desktop {
    width: 40px;
    height: 40px;
  }

  ${mediaqueries.tablet`
    .Logo__Desktop {
      display: none;
    }
    
    .Logo__Mobile{
      display: block;
    }
  `}
`;
