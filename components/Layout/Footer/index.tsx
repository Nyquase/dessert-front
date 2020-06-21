import styled from 'styled-components';

const FooterContent = (): JSX.Element => (
  <p className="center">
    Dessert is an open source projet and community-driven project.&nbsp;
    <a href="/">Click here</a>
    { ' ' }
    to learn more.
  </p>
);

const FooterContainer = styled.div`
  border-top: 1px solid #efefef;
  padding: 10px;
`;

const Footer = (): JSX.Element => (
  <FooterContainer>
    <FooterContent />
  </FooterContainer>
);

export default Footer;
