import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../src/pages/search';

// Mocking the logPlant function
jest.mock('../../../Backend/services/plantService', () => ({
  logPlant: jest.fn(),
}));

describe('Search component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search form', () => {
    render(<Search />);
    expect(screen.queryByText(/Search for Plants/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/Type and search for a plant species/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('displays search results', async () => {
    const mockSearchData = [
      {
        _id: { $oid: '1' },
        plantId: 1,
        common_name: 'Test Plant',
        scientific_name: 'Test Scientific Name',
        watering: 'Test Watering',
        sunlight: 'Test Sunlight',
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSearchData),
    });

    render(<Search />);
    const searchInput = screen.queryByPlaceholderText(/Type and search for a plant species/i);
    const searchButton = screen.queryByRole('button', { name: /Search/i });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.queryByText(/Test Plant/i)).toBeInTheDocument();
      expect(screen.queryByText(/Test Scientific Name/i)).toBeInTheDocument();
      expect(screen.queryByText(/Test Watering/i)).toBeInTheDocument();
      expect(screen.queryByText(/Test Sunlight/i)).toBeInTheDocument();
    });
  });

  it('adds plant to my plants', async () => {
    const mockPlant = {
      _id: { $oid: '1' },
      plantId: 1,
      common_name: 'Test Plant',
      scientific_name: 'Test Scientific Name',
      watering: 'Test Watering',
      sunlight: 'Test Sunlight',
    };

    render(<Search />);
    const addToMyPlantsButton = screen.queryByRole('button', { name: /Add to My Plants/i });

    fireEvent.click(addToMyPlantsButton);

    await waitFor(() => {
      expect(global.logPlant).toHaveBeenCalledWith(mockPlant);
    });
  });
});
