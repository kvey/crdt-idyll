const React = require('react');

const Flex = ({children}) => {

  return (
    <div className="flex flex-row items-stretch">
      {children}
    </div>
  );
}

module.exports = Flex;
