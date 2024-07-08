import { InputHTMLAttributes, useId } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const Input = (props: Props) => {
  const id = useId();

  return (
    <InputWrapper>
      <StyledInput disabled={props.disabled}>
        <input id={id} {...props} placeholder={' '} />
        <label htmlFor={id}>
          <span>{props.label}</span>
        </label>
      </StyledInput>
    </InputWrapper>
  );
}

export default Input;

interface StyledInputProps {
  disabled?: boolean;
}
const StyledInput = styled.div<StyledInputProps>`
  position: relative;
  height: 56px;
  background-color: ${props => (props.disabled ? '#fff' : '#f5f5f5')};
  border-radius: 4px;
  display: flex;
  align-items: center;

  input {
    background: rgba(0, 0, 0, 0);
    border: none;
    color: #3d455e;
    font-size: 16px;
    height: 95%;
    margin: 0 12px;
    outline: 0;
    opacity: 0.9;
    overflow-x: hidden;
    top: 0.2em;
    position: relative;
    width: calc(100% - 24px);
    box-sizing: border-box;
    transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease, padding-top 0.2s ease, margin-top 0.2s ease;

    ${props => (props.disabled ? 'cursor: not-allowed;' : '')}
  }

  input + label {
    border-top: 1px solid #3d455e;
    opacity: 0.5;
    display: block;
    height: 0px;
    margin: 0;
    position: absolute;
    padding: 0;
    white-space: nowrap;
    width: 100%;
    top: 100%;
    left: 0;
  }

  input + label > span {
    font-size: 16px;
    left: 0px;
    margin: 0 12px;
    color: #3d455e;
    position: absolute;
    top: -34px;
    transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
    width: calc(100% - 2 * 12px);
    overflow: hidden;
  }

  input:not(:placeholder-shown) {
    padding-top: 14px;
  }

  input:not(:placeholder-shown) + label > span {
    font-size: 12px;
    top: -50px;
  }

  input:focus + label {
    border-top: 2px solid #F47F1F;
    opacity: 1;
  }

  input:focus + label > span {
    color: #F47F1F;
    opacity: unset;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
