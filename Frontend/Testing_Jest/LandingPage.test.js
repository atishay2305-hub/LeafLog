import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../src/pages/LandingPage';
import Cookies from 'js-cookie';
import Router from 'next/router';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

describe('LandingPage component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders welcome message', () => {
    render(<LandingPage />);
    expect(screen.getByText('Welcome to Leaflog')).toBeInTheDocument();
    expect(screen.getByText('Your One Stop place to maintain your plants.')).toBeInTheDocument();
  });

  test('redirects to login if token is not present', () => {
    Cookies.get.mockReturnValueOnce(undefined);
    render(<LandingPage />);
    expect(Router.push).toHaveBeenCalledWith('/');
  });

  test('displays team members', () => {
    const people = [
      { name: 'John Doe', email: 'john@example.com', role: 'Developer' },
      { name: 'Jane Doe', role: 'Designer' },
    ];
    Cookies.get.mockReturnValueOnce('fake-token');
    render(<LandingPage />);
    people.forEach(person => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      expect(screen.getByText(person.role)).toBeInTheDocument();
      if (person.email) {
        expect(screen.getByText(person.email)).toBeInTheDocument();
      }
    });
  });
});
