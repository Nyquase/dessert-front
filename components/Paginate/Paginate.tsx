import styled from 'styled-components';

interface Props {
  total: number;
  elementsPerPage: number;
  currentPage: number;
  onPageChange: (p: number) => void;
}

interface PageButtonProps {
  active: boolean;
  last: boolean;
}

const PageButton = styled.span`
  display: inline-block;
  padding: 5px;
  min-width: 14px;
  border-color: #aaa;
  background-color: ${(props: PageButtonProps): string => (props.active ? 'black' : 'inherit')};
  color: ${(props: PageButtonProps): string => (props.active ? 'white' : 'black')};
  margin-right: ${(props: PageButtonProps): string => (props.last ? '0px' : '10px')};
  cursor: pointer;
`;

const Paginate = (props: Props): JSX.Element => {
  const {
    total, elementsPerPage, currentPage, onPageChange,
  } = props;

  const lastPage = total / elementsPerPage;

  const pages = [];
  for (let i = 0; i < lastPage; i += 1) {
    pages.push(
      <PageButton
        key={i + 1}
        className="p1 border"
        active={i + 1 === currentPage}
        last={i + 1 === lastPage}
        onClick={(): void => onPageChange(i + 1)}
      >
        { i + 1 }
      </PageButton>,
    );
  }

  return <>{ pages }</>;
};

export default Paginate;
