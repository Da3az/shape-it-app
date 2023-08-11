import PropSelectContainer from './PropSelectContainer';
import RadioCheckbox from './RadioCheckbox';

const SelectShapePropertie = ({
  title,
  list,
  onChange,
  value,
}: {
  title: string;
  onChange: (el: any) => void;
  list: {
    id: string;
    label: string;
    name: string;
    icon?: JSX.Element;
  }[];
  value?: string;
}) => (
  <PropSelectContainer title={title}>
    {list.map((el,index) => (
      <li
        key={el.id}
        className={`w-full border-b border-gray-200 sm:border-b-0  ${index === list.length - 1 ? '' : 'sm:border-r '} dark:border-gray-600`}
      >
        <RadioCheckbox
          icon={el.icon}
          id={el.id}
          label={el.label}
          name={el.name}
          value={value}
          onChange={onChange}
        />
      </li>
    ))}
  </PropSelectContainer>
);

export default SelectShapePropertie;
