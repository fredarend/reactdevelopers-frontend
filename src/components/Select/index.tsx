import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  SelectHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface PropsSelect extends SelectProps<OptionTypeBase> {
  name: string;
}

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ComponentType<IconBaseProps>;
}

type ComponentProps = PropsSelect & InputProps;

const Select: React.FC<ComponentProps> = props => {
  const { name, ...rest } = props as PropsSelect;
  const { icon: Icon } = props as InputProps;

  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.setValue(value || null);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      <Container isErrored={!!error} isFocused={isFocused}>
        {Icon && <Icon size={20} />}
        <ReactSelect
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={selectRef}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </Container>
    </>
  );
};

export default Select;
