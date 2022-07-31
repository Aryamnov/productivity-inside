import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface INotFoundProps {}

export function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__header">404</h1>
      <p className="not-found__text">Page not found</p>
      <NavLink to="/" className="not-found__link">
        Go to main page
      </NavLink>
    </section>
  );
}
