import Link from 'next/link';
import styled from 'styled-components';

import ellipsis from '../../../lib/ellipsis';
import { getModule, getProfile } from '../../../lib/paths';
import { Module } from '../../../types/Module';
import { Tag } from '../../../types/Tag';
import TagJSX from '../../Tag';

// Single module display
// Mostly great for a list

interface Props {
  module: Module;
  showAuthor?: boolean;
}

// Delimitates the card
const Box = styled.div`
  box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);
`;

const AuthorText = styled.p`
  font-size: 14px;
`;

// The title of the module is a link to its page
const ModuleNameTitle = styled.a`
  color: #222 !important;
`;

const TagsList = styled.div`
  white-space: nowrap;
  overflow: scroll;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModuleCard = ({ module, showAuthor }: Props): JSX.Element => (
  <Box className="p2 bg-white">
    <p className="h3 bold m0">
      <Link href={getModule(module.id)} passHref>
        <ModuleNameTitle>{ module.name }</ModuleNameTitle>
      </Link>
    </p>

    {
      showAuthor === false || (
        <AuthorText className="italic m0 mt1">
          Authored by&nbsp;
          <Link href={getProfile(module.author.id)}>
            <a>
              @
              { module.author.nickname.toLowerCase() }
            </a>
          </Link>
        </AuthorText>
      )
    }

    <p className="m0 mt2">{ ellipsis(module.description) }</p>
    <br />

    <TagsList>
      {
        module.tags.map((t: Tag): JSX.Element => (
          <div className="inline-block mr1" key={t.id}>
            <TagJSX name={t.name} />
          </div>
        ))
      }
    </TagsList>
  </Box>
);

export default ModuleCard;
