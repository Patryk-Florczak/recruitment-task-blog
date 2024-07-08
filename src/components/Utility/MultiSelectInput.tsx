import { InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

import Input from 'components/Utility/Input';
import closeIcon from 'assets/icons/close.svg';

interface Option {
  value: string;
  id: number;
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: Option[];
  selectedValue: unknown | undefined;
  value: string;
  selectOption: (option: Option) => void;
  removeOption: () => void;
  filterOptionsByQuery?: boolean;
}
const MultiSelectInput = ({label, options, selectedValue, value: inputValue, selectOption, removeOption, filterOptionsByQuery, onChange, ...rest}: Props) => {
  const [isActive, setIsActive] = useState(false);

  const getOptions = () => {
    if (filterOptionsByQuery) {
      return options.filter(option => option.value.toLowerCase().includes(inputValue?.toLowerCase()));
    }

    return options;
  };

  return (
    <Wrapper
      tabIndex={100}
      onFocus={() => setIsActive(true)}
      onBlur={(e) => {
        const currentTarget = e.currentTarget;

        requestAnimationFrame(() => {
          if (!currentTarget.contains(document.activeElement)) {
            setIsActive(false);
          }
        });
      }}
    >
      <Input
        label={label}
        value={inputValue}
        onChange={onChange}
        {...rest}
      />
      {!!selectedValue && <img src={closeIcon} onClick={removeOption} />}
      {isActive && !!getOptions().length && (
        <Dropdown>
          {getOptions().map(option => (
            <Option key={option.id} onClick={() => {
                selectOption(option);
                setIsActive(false);
              }}>
              {option.value}
            </Option>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  )
}

export default MultiSelectInput

const Wrapper = styled.div`
  display: flex;
  min-width: 250px;
  position: relative;

  & > img {
    position: absolute;
    right: 10px;
    top: 30px;
    width: 12px;
    cursor: pointer;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 57px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 5px 0;
  border: 1px solid #e2e5ed;
  border-radius: 0 0 6px 6px;
`;

const Option = styled.div`
  white-space: nowrap;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;
