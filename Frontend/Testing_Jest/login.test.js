import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../src/Pages/Login';
import { login_user } from '../../../Backend/services/index';

jest.mock('next/router', () => ({
  replace: jest.fn(),
  push: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

jest.mock('../../../Backend/services/index', () => ({
  login_user: jest.fn(),
}));

describe('Login component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByLabelText('Your email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account yet?")).toBeInTheDocument();
  });

  test('handles form submission with valid credentials', async () => {
    const formData = { email: 'test@example.com', password: 'password' };
    login_user.mockResolvedValueOnce({ success: true, message: 'Login successful', token: 'xyz' });
    render(<Login />);
    userEvent.type(screen.getByLabelText('Your email'), formData.email);
    userEvent.type(screen.getByLabelText('Password'), formData.password);
    fireEvent.click(screen.getByText('Sign in'));
    await waitFor(() => {
      expect(login_user).toHaveBeenCalledWith(formData);
    });
    expect(screen.getByText('Login successful')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeDisabled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(window.location.href).toEqual('/LandingPage');
  });

  test('handles form submission with invalid credentials', async () => {
    const formData = { email: 'test@example.com', password: 'password' };
    login_user.mockResolvedValueOnce({ success: false, message: 'Invalid credentials' });
    render(<Login />);
    userEvent.type(screen.getByLabelText('Your email'), formData.email);
    userEvent.type(screen.getByLabelText('Password'), formData.password);
    fireEvent.click(screen.getByText('Sign in'));
    await waitFor(() => {
      expect(login_user).toHaveBeenCalledWith(formData);
    });
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    expect(window.location.href).not.toEqual('/LandingPage');
  });
});
