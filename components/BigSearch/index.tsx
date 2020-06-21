import { FormEvent, useState } from 'react';
import styled from 'styled-components';

// A fat search bar

const BigInput = styled.input`
  width: 100%;
  height: 2.5rem;
  border: 1px solid #ccc;
  font-size: inherit;
  font-family: inherit;
  box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);
`;

const ThiccSelect = styled.select`
  margin-left: 8px;
  padding-left: 6px;
  height: 2.5rem;
  width: 170px;
  background-color: #fff;
  @media (min-width: 600px) {
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 5px;
  }
  border: 1px solid #ccc;
  font-size: inherit;
  font-family: inherit;
  box-shadow: 0 1px #FFFFFF inset, 0 1px 3px rgba(34, 25, 25, 0.4);
`;

interface Props {
  onSearch: (s: string, type?: string) => void;
}

const BigSearch = ({ onSearch }: Props): JSX.Element => {
  const [ moduleType, setModuleType ] = useState<string | undefined>(undefined);
  const [ query, setQuery ] = useState<string>('');

  const handleInput = (e: FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    setQuery(value);
    onSearch(value, moduleType);
  };

  const handleSelect = (e: FormEvent<HTMLSelectElement>): void => {
    const { value } = e.currentTarget;
    const newModuleType = value === 'NONE' ? undefined : value;
    setModuleType(newModuleType);
    onSearch(query, newModuleType);
  };

  return (
    <div className="flex">
      <BigInput
        value={query}
        id="search"
        type="search"
        onInput={handleInput}
        placeholder="Search anything..."
        className="pl1 pr1"
      />
      <ThiccSelect value={moduleType} onChange={handleSelect}>
        <option value="NONE">Module Type</option>
        <option value="CONNECTOR">Connector</option>
        <option value="CORE">Core</option>
      </ThiccSelect>
    </div>
  );
};

export default BigSearch;
