interface Props {
  children: React.ReactNode;
  nospace?: boolean;
}

const PageTitle = ({ children, nospace }: Props): JSX.Element => (
  <p className={`h1 ${nospace ? 'mb0' : ''}`}>
    { children }
  </p>
);

export default PageTitle;
