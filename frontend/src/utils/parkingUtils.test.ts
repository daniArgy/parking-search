import { getOccupancyColor, getOccupancyLabel, formatAddress } from './parkingUtils';

describe('parkingUtils', () => {
  describe('getOccupancyColor', () => {
    test('returns green for low occupancy', () => {
      expect(getOccupancyColor(30)).toBe('#10b981');
    });

    test('returns orange for medium occupancy', () => {
      expect(getOccupancyColor(60)).toBe('#f59e0b');
    });

    test('returns red for high occupancy', () => {
      expect(getOccupancyColor(90)).toBe('#ef4444');
    });
  });

  describe('getOccupancyLabel', () => {
    test('returns correct label for low occupancy', () => {
      expect(getOccupancyLabel(30)).toBe('Baja ocupación');
    });

    test('returns correct label for medium occupancy', () => {
      expect(getOccupancyLabel(60)).toBe('Ocupación media');
    });

    test('returns correct label for high occupancy', () => {
      expect(getOccupancyLabel(90)).toBe('Alta ocupación');
    });
  });

  describe('formatAddress', () => {
    test('returns address when provided', () => {
      expect(formatAddress('Calle Principal, 1')).toBe('Calle Principal, 1');
    });

    test('returns default message when address is empty', () => {
      expect(formatAddress('')).toBe('Dirección no disponible');
    });
  });
});
