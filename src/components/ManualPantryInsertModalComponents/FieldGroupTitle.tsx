import Title from "../Title";

interface FieldGroupTitleProps {
  title: string;
}

const HeaderTitle = (props: FieldGroupTitleProps) => {
  return <Title size={30} title={props.title} weight={800} />;
};

export default HeaderTitle;
