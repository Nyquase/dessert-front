import { Module } from '../../types/Module';

import ModuleCard from './ModuleCard';

interface Props {
  modules: Module[];
  showAuthor?: boolean;
}

const ModuleList = ({ modules, showAuthor }: Props): JSX.Element => (
  <>
    {
      modules.map((module): JSX.Element => (
        <div className="mt3 mb3" key={module.id}>
          <ModuleCard module={module} showAuthor={showAuthor} />
        </div>
      ))
    }
  </>
);

export default ModuleList;
