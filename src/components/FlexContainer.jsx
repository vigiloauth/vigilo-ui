import PropTypes from 'prop-types';
import { Flex } from 'antd';

const FlexContainer = ({
  children,
  vertical = false,
  justify = 'center',
  align = 'center',
  gap,
  width,
  height,
  className,
  style = {},
}) => {
  return (
    <Flex
      gap={gap}
      vertical={vertical}
      justify={justify}
      align={align}
      style={{ width, height, ...style }}
      className={className}
    >
      {children}
    </Flex>
  );
};

FlexContainer.propTypes = {
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool,
  justify: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline']),
  style: PropTypes.object,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default FlexContainer;
