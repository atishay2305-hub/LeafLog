import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import FeedbackForm from '../src/Pages/FeedbackForm.tsx';
import Router from 'next/router';

jest.mock('axios');
jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

describe('FeedbackForm component', () => {
  beforeEach(() => {
    Cookies.get.mockReturnValue('testToken');
  });

  test('renders the feedback form', () => {
    render(<FeedbackForm />);
    
    expect(screen.getByText('Give Feedback')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description (Up to 2000 characters)')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    axios.post.mockResolvedValueOnce({});

    render(<FeedbackForm />);
    
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Description (Up to 2000 characters)'), { target: { value: 'Test description' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://leaflogbe.vercel.app/send-email',
        { userEmail: undefined, title: 'Test Title', description: 'Test description' },
        {
          headers: {
            Authorization: 'Bearer testToken',
          },
        }
      );
      expect(screen.getByText('Feedback submitted successfully!')).toBeInTheDocument();
    });
  });

  test('redirects to homepage if user is not authenticated', async () => {
    Cookies.get.mockReturnValueOnce(undefined);

    render(<FeedbackForm />);

    await waitFor(() => {
      expect(Router.push).toHaveBeenCalledWith('/');
    });
  });
});
