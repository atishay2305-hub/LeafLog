import React from 'react';
import { render, screen } from '@testing-library/react';
import Page404 from '../src/pages/404.jsx';

describe('Page404 component', () => {
  test('renders the 404 page content', () => {
    render(<Page404 />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText("Sorry, we couldn’t find the page you’re looking for.")).toBeInTheDocument();
    expect(screen.getByText('Go back home')).toBeInTheDocument();
    expect(screen.getByText('Contact support')).toBeInTheDocument();
  });
});
