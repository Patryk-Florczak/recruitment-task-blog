import { useState } from 'react';
import { expect, describe, it } from 'vitest';
import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultiSelectInput from 'components/Utility/MultiSelectInput';

const label = 'Input test';
const options = [
  { id: 1, value: 'option 1' },
  { id: 2, value: 'option 2' },
  { id: 3, value: 'option 3' }
];

const TestComponent = ({ filterOptionsByQuery }: { filterOptionsByQuery?: boolean }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState<number>();

  return (
    <MultiSelectInput
      label={label}
      options={options}
      value={searchQuery}
      selectedValue={selectedValue}
      onChange={({ target }) => setSearchQuery(target.value)}
      selectOption={(value) => {
        setSelectedValue(value.id);
        setSearchQuery(value.value);
      }}
      removeOption={() => {
        setSelectedValue(undefined);
        setSearchQuery('');
      }}
      filterOptionsByQuery={filterOptionsByQuery}
    />
  )
}

describe('MultiSelectInput', () => {
  it('should render the input', async () => {
    act(() => {
      render(<TestComponent />);
    });

    expect(screen.getByRole('textbox', { name: label })).toBeInTheDocument();
  });

  it('should display all options on input focus', async () => {
    act(() => {
      render(<TestComponent />);
    });

    await userEvent.click(screen.getByRole('textbox', { name: label }))

    expect(screen.queryByText(options[0].value)).toBeInTheDocument();
    expect(screen.queryByText(options[1].value)).toBeInTheDocument();
    expect(screen.queryByText(options[2].value)).toBeInTheDocument();
  });

  it('should display all options on input query with filterOptionsByQuery flag turned off', async () => {
    act(() => {
      render(<TestComponent />);
    });

    await userEvent.type(screen.getByRole('textbox', { name: label }), options[0].value)

    expect(screen.queryByText(options[0].value)).toBeInTheDocument();
    expect(screen.queryByText(options[1].value)).toBeInTheDocument();
    expect(screen.queryByText(options[2].value)).toBeInTheDocument();
  });

  it('should display filtered options on input query with filterOptionsByQuery flag', async () => {
    act(() => {
      render(<TestComponent filterOptionsByQuery />);
    });

    await userEvent.type(screen.getByRole('textbox', { name: label }), options[0].value)

    expect(screen.queryByText(options[0].value)).toBeInTheDocument();
    expect(screen.queryByText(options[1].value)).not.toBeInTheDocument();
    expect(screen.queryByText(options[2].value)).not.toBeInTheDocument();
  });

  it('should select the option on click', async () => {
    act(() => {
      render(<TestComponent />);
    });

    await userEvent.click(screen.getByRole('textbox', { name: label }))
    await userEvent.click(screen.getByText(options[0].value))

    expect(screen.getByRole('textbox', { name: label })).toHaveValue(options[0].value)
  });

  it('should remove selected option ', async () => {
    act(() => {
      render(<TestComponent />);
    });

    await userEvent.click(screen.getByRole('textbox', { name: label }))
    await userEvent.click(screen.getByText(options[0].value))
    await userEvent.click(screen.getByRole('img'))

    expect(screen.getByRole('textbox', { name: label })).toHaveValue('')
  });
});
