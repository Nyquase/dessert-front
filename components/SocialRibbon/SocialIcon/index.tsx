import Link from 'next/link';
import styled from 'styled-components';

const getProfileIconOffset = (last = false): string => {
  if (last) {
    return '0px';
  }

  return '20px';
};

interface ProfileIconProps {
  last?: boolean;
}

const Icon = styled.img`
  width: 25px;
  margin-right: ${(props: ProfileIconProps): string => getProfileIconOffset(props.last)};
`;

interface SocialIconProps {
  url: string;
  src: string;
}

const SocialIcon = (props: SocialIconProps & ProfileIconProps): JSX.Element => {
  const { url, last, src } = props;

  return (
    <Link href={url}>
      <a><Icon src={src} last={last} /></a>
    </Link>
  );
};

export default SocialIcon;
