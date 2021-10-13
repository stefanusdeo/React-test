import React from 'react';
import './list.css';

const List = (props) => {
  // const [deleteText, setDeleteText] = useState('');

  const deleteHandler = () => {
    // setDeleteText('(Deleted!)');
    props.onDelete(props.id);
  };

  return (
    <li className='item' onClick={deleteHandler}>
      {props.children}
    </li>
  );
};

export default List;
