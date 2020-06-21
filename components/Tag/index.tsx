import styled from 'styled-components';

// Solid background and white text
// Tweakable size

interface TextProps {
  size: number;
}

const Text = styled.div`
  font-size: ${(props: TextProps): number => props.size}px;
  padding: 3px 6px;
`;

interface Props {
  name: string;
  size?: number;
}

const TAG_DEFAULT_SIZE = 13;

const Tag = ({ name, size }: Props): JSX.Element => (
  <div className="bg-black white inline-block">
    <Text size={size || TAG_DEFAULT_SIZE}>
      { name }
    </Text>
  </div>
);

export default Tag;
