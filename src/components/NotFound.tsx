import * as React from 'react';
import { NavLink } from "react-router-dom";

export interface INotFoundProps {
}

export function NotFound (props: INotFoundProps) {
  return (
    <section className=''>
      <h1 className=''>404</h1>
      <p className=''>Page not found</p>
      <NavLink to='/'>Go to main page</NavLink>
    </section>
  );
}
