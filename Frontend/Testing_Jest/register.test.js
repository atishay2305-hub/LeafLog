import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Register from '../src/pages/register';
import { register_user } from '../../../Backend/services/index';
import Router from 'next/router';

jest.mock('next/router', () => ({
  replace: jest.fn(),
  push: jest.fn(),
}));

jest.mock('../../../Backend/services/index', () => ({
  register_user: jest.fn(),
}));

describe('Register component', () => {
  beforeEach(() => {
    register_user.mockReset();
  });

  test('renders the registration form', () => {
    render(<Register />);
    
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Your email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    register_user.mockResolvedValueOnce({ success: true, message: 'Registration successful' });

    render(<Register />);
    
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Your email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(register_user).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(Router.push).toHaveBeenCalledWith('/login');
    });
  });

  test('displays error message on failed registration', async () => {
    register_user.mockResolvedValueOnce({ success: false, message: 'Registration failed' });

    render(<Register />);
    
    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Your email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Sign up'));

    await waitFor(() => {
      expect(register_user).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });
});
