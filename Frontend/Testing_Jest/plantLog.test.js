import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import PlantLog from '../src/pages/plant-log';
import { usePlants } from '../context/PlantContext';
import { useAuth } from '../context/AuthContext';
import Router from 'next/router';

jest.mock('next/router', () => ({
  replace: jest.fn(),
}));

jest.mock('../context/PlantContext', () => ({
  usePlants: jest.fn(),
}));

jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('PlantLog component', () => {
  beforeEach(() => {
    usePlants.mockReturnValue({
      submittedDataList: [],
      setSubmittedDataList: jest.fn(),
    });
    useAuth.mockReturnValue({
      user: { email: 'test@example.com' },
    });
  });

  test('renders the plant log form', () => {
    render(<PlantLog />);
    
    expect(screen.getByText('Create a Plant Log Entry')).toBeInTheDocument();
    expect(screen.getByLabelText('Plant Species')).toBeInTheDocument();
    expect(screen.getByLabelText('Growth Cycle')).toBeInTheDocument();
    expect(screen.getByLabelText('Watering Frequency')).toBeInTheDocument();
    expect(screen.getByLabelText('Sunlight Requirement')).toBeInTheDocument();
    expect(screen.getByText('Submit Log Entry')).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    render(<PlantLog />);
    
    fireEvent.change(screen.getByLabelText('Plant Species'), { target: { value: 'Plant Species Test' } });
    fireEvent.change(screen.getByLabelText('Growth Cycle'), { target: { value: 'annual' } });
    fireEvent.change(screen.getByLabelText('Watering Frequency'), { target: { value: 'daily' } });
    fireEvent.change(screen.getByLabelText('Sunlight Requirement'), { target: { value: 'full_sun' } });

    fireEvent.click(screen.getByText('Submit Log Entry'));

    await waitFor(() => {
      // Add your assertions here
      // For example, check if the form data is submitted correctly
      // Check if the form is submitted and the user is redirected to a different page
    });
  });

  // Add more test cases as needed
});
