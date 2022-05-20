import ReactSelect from "react-select";

interface SelectProps {
  onChange: any;
  options: any[];
  placeholder: string;
  value: any;
}

export const Select = (props: SelectProps) => {
  const { onChange, options, placeholder = 'Select...', value } = props;

  return (
    <ReactSelect
      closeMenuOnSelect={false}
      isDisabled={!options.length}
      isMulti
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  );
}