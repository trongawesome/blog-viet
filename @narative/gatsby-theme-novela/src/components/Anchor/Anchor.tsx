import styled from "@emotion/styled";

const Anchor = styled.a`
  transition: ${p => p.theme.colorModeTransition};
  color: ${p => p.theme.colors.articleText};
  border-bottom: 1px solid ${p => p.theme.colors.articleText};
  
  &:visited {
    color: ${p => p.theme.colors.primary};
    opacity: 0.85;
  }
  
  &:hover,
  &:focus {
    color: ${p => p.theme.colors.accent};
    border-bottom-color: ${p => p.theme.colors.accent};
  }
`;

export default Anchor;
