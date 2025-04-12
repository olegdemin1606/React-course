import {useReducer, createContext} from 'react';
import { getCurrentDate } from '../utils/date';

export const MyContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LIST_ITEM_MEMBER':
      const {itemId, member} = action.payload;
      return { ...state, list: state.list.map(item=>item.id === itemId ? {...item, members: item.members.map(itemMember=>itemMember.id === member.id ? member : itemMember)} : item )};
    case 'CHANGE_LIST_ITEM':
      const {item} = action.payload;
      return { ...state, list: state.list.map(listItem=>listItem.id === item.id ? item : listItem  )};
    case 'ADD_LIST_ITEM':
      const {newItem} = action.payload;
      const addItem={
        ...newItem,
        status: 'start',
        created_at: getCurrentDate(),
        id: state?.list?.[state?.list?.length]?.id ?? 0 + 1,
        points: newItem.points.split(',')
      }
      return { ...state, list: [...state.list, addItem]};  
    default:
      return state;
  }
};

export default function MyProvider({ children, initialValue }){
  const [state, dispatch] = useReducer(reducer, { list: initialValue });
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};