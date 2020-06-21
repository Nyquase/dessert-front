import SocialIcon from './SocialIcon';

// For the users who have filled some social information

const SocialRibbon = (): JSX.Element => (
  <div>
    <SocialIcon url="/" src="/twitter.svg" />
    <SocialIcon url="/" src="/github.svg" />
    <SocialIcon url="/" src="/googlechrome.svg" last />
  </div>
);

export default SocialRibbon;
