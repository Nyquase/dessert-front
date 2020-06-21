import { useQuery } from '@apollo/react-hooks';
import Octicon, {
  Icon, RepoForked, Star, Eye, Law,
} from '@primer/octicons-react';
import Markdown from 'react-markdown';
import * as renderers from 'react-markdown-github-renderers';
import styled from 'styled-components';

import REPOSITORY_QUERY from '../../graphql/github/repository';

interface Props {
  name: string;
  owner: string;
}

const GithubDisplayContainer = styled.div``;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-evenly;

  box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  background-color: white;
  z-index: 3;
`;

const GithubDescription = styled.p`
  font-style: italic;
`;

const MarkdownContainer = styled.div``;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = ({ icon, info }: { icon: Icon; info: string }): JSX.Element => (
  <InfoWrapper className="col col-3 m1">
    <Octicon icon={icon} className="inline-block" />
    <span className="ml1">{ info }</span>
  </InfoWrapper>
);

const GithubDisplay = ({ name, owner }: Props): JSX.Element => {
  const { data, loading, error } = useQuery(REPOSITORY_QUERY, {
    context: { clientName: 'github' },
    variables: {
      name,
      owner,
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        { error.message }
      </p>
    );
  }

  const { repository } = data;

  return (
    <GithubDisplayContainer>
      <InfoBox className="clearfix center">
        <Info icon={Eye} info={repository.watchers.totalCount} />
        <Info icon={Star} info={repository.stargazers.totalCount} />
        <Info icon={RepoForked} info={repository.forkCount} />
        { repository.licenseInfo && <Info icon={Law} info={repository.licenseInfo.spdxId} /> }
      </InfoBox>

      <GithubDescription className="mt3">{ repository.description }</GithubDescription>

      <MarkdownContainer>
        <Markdown source={repository.object.text} escapeHtml={false} renderers={renderers} />
      </MarkdownContainer>
    </GithubDisplayContainer>
  );
};

export default GithubDisplay;
