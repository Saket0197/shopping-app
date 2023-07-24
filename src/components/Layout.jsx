import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Pagination from './Pagination';
import Categories from './Categories';

export default function Layout() {
  return (
    <div>
        <Header/>
        <Categories/>
        <Outlet/>
        <Pagination/>
    </div>
  )
}
