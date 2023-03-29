import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [departmentList, setDepartmentList] = useState([]);

  const value = useMemo(
    () => ({
      departmentList,
      setDepartmentList,
    }),
    [departmentList],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
