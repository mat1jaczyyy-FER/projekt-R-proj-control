import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';



export const SideBarData = [
  
  {
    title: 'Moji projekti',
    path: '/projekti',
    icon: <AiIcons.AiOutlineFundProjectionScreen />,
    cName: 'nav-text'
  },
  /*{
    title: 'Moji timovi',
    path: '/timovi',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },*/
  {
    title: 'Moji zadaci',
    path: '/zadaci',
    icon: <FaIcons.FaTasks/>,
    cName: 'nav-text'
  },
  {
    title: 'Novi projekt',
    path: '/noviprojekt',
    icon: <FaIcons.FaPlus/>,
    cName: 'nav-text'
  } 
];

