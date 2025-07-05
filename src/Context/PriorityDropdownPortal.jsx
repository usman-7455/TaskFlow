import { createPortal } from 'react-dom';

const PriorityDropdownPortal = ({ children }) => {
  return createPortal(children, document.body);
};

export default PriorityDropdownPortal; 