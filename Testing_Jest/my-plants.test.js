import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MyPlants from './MyPlants';
import { getUserPlants, sendWateringReminder, logPlant } from '../../../Backend/services/plantService';

jest.mock('next/router', () => ({
  push: jest.fn(),
}));

jest.mock('../../../Backend/services/plantService', () => ({
  getUserPlants: jest.fn(),
  sendWateringReminder: jest.fn(),
  logPlant: jest.fn(),
}));

const mockPlants = [
  {
    _id: { $oid: '1' },
    common_name: 'Plant A',
    scientific_name: 'Scientific A',
    cycle: 'Annual',
    watering: 'Weekly',
    sunlight: 'Full Sun',
  },
  {
    _id: { $oid: '2' },
    common_name: 'Plant B',
    scientific_name: 'Scientific B',
    cycle: 'Perennial',
    watering: 'Biweekly',
    sunlight: 'Partial Shade',
  },
];

describe('MyPlants component', () => {
  beforeEach(() => {
    getUserPlants.mockResolvedValue(mockPlants);
  });

  test('renders loading state initially', () => {
    render(<MyPlants />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches user plants and renders them', async () => {
    render(<MyPlants />);
    await waitFor(() => {
      expect(getUserPlants).toHaveBeenCalled();
    });
    expect(screen.getByText('Plant A')).toBeInTheDocument();
    expect(screen.getByText('Plant B')).toBeInTheDocument();
  });

  test('renders message when no plants are available', async () => {
    getUserPlants.mockResolvedValue([]);
    render(<MyPlants />);
    await waitFor(() => {
      expect(getUserPlants).toHaveBeenCalled();
    });
    expect(screen.getByText('You have not added any plants yet.')).toBeInTheDocument();
  });

  test('handles send reminder button click', async () => {
    render(<MyPlants />);
    await waitFor(() => {
      expect(getUserPlants).toHaveBeenCalled();
    });
    fireEvent.click(screen.getByText('Send Watering Reminder'));
    await waitFor(() => {
      expect(sendWateringReminder).toHaveBeenCalled();
    });
  });

  test('handles log plant function call', async () => {
    const newPlant = {
      _id: { $oid: '3' },
      common_name: 'New Plant',
      scientific_name: 'New Scientific',
      cycle: 'Annual',
      watering: 'Weekly',
      sunlight: 'Full Sun',
    };
    logPlant.mockResolvedValue(newPlant);
    render(<MyPlants />);
    await waitFor(() => {
      expect(getUserPlants).toHaveBeenCalled();
    });
    fireEvent.click(screen.getByText('Log Plant'));
    await waitFor(() => {
      expect(logPlant).toHaveBeenCalled();
    });
    expect(screen.getByText('New Plant')).toBeInTheDocument();
  });
});

