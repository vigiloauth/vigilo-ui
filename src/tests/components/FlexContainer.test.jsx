import React from 'react';
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropTypes from 'prop-types';
import FlexContainer from '../../components/FlexContainer';

vi.mock('antd', () => {
  function Flex({
    children,
    vertical = true,
    justify = 'center',
    align = 'center',
    gap = '10px',
    width = '100%',
    height = '100%',
    className = '',
    style = {},
  }) {
    return (
      <div
        data-testid="flex-mock"
        data-vertical={vertical ? 'true' : 'false'}
        data-justify={justify}
        data-align={align}
        data-gap={gap}
        className={className}
        style={{
          width,
          height,
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  Flex.propTypes = {
    children: PropTypes.node,
    vertical: PropTypes.bool,
    justify: PropTypes.string,
    align: PropTypes.string,
    gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.shape({}),
  };

  Flex.defaultProps = {
    children: null,
    vertical: true,
    justify: 'center',
    align: 'center',
    gap: '10px',
    width: '100%',
    height: '100%',
    className: '',
    style: {},
  };

  return { Flex };
});

describe('FlexContainer', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <FlexContainer>
        <span>Child</span>
      </FlexContainer>
    );
    expect(getByText('Child')).toBeInTheDocument();
  });

  it('applies default props', () => {
    const { getByTestId } = render(
      <FlexContainer>
        <span>Child</span>
      </FlexContainer>
    );
    const flex = getByTestId('flex-mock');
    expect(flex).toHaveAttribute('data-vertical', 'false');
    expect(flex).toHaveAttribute('data-justify', 'center');
    expect(flex).toHaveAttribute('data-align', 'center');
    expect(flex).toHaveAttribute('data-gap', '10px');
  });

  it('applies custom props', () => {
    const style = { background: 'red' };
    const { getByTestId } = render(
      <FlexContainer
        vertical
        justify="end"
        align="start"
        gap={20}
        width="100px"
        height="50px"
        className="custom-class"
        style={style}
      >
        <span>Child</span>
      </FlexContainer>
    );
    const flex = getByTestId('flex-mock');
    expect(flex).toHaveAttribute('data-vertical', 'true');
    expect(flex).toHaveAttribute('data-justify', 'end');
    expect(flex).toHaveAttribute('data-align', 'start');
    expect(flex).toHaveAttribute('data-gap', '20');
    expect(flex).toHaveAttribute('class', 'custom-class');
    expect(flex.style.width).toBe('100px');
    expect(flex.style.height).toBe('50px');
    expect(flex.style.background).toBe('red');
  });

  it('handles missing optional props', () => {
    const { getByTestId } = render(
      <FlexContainer>
        <span>Child</span>
      </FlexContainer>
    );
    const flex = getByTestId('flex-mock');
    expect(flex).toBeInTheDocument();
  });

  it('renders with empty className and style by default', () => {
    const { getByTestId } = render(
      <FlexContainer>
        <span>Child</span>
      </FlexContainer>
    );
    const flex = getByTestId('flex-mock');
    expect(flex.className).toBe('');
    expect(flex.style.width).toBe('');
    expect(flex.style.height).toBe('');
  });
});
