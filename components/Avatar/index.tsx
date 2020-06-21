import styled from 'styled-components';

interface AvatarProps {
  url: string;
}

// We use the background to have correct ratio/zoom in most cases
// We should still require minimum dimensions at the upload
// I guess this component will take some size parameters and such at some point
const Avatar = styled.div`
  width: 175px;
  height: 175px;

  background-image: url(${(props: AvatarProps): string => props.url});
  background-position: 52% 54%;
`;

export default Avatar;
