import axios from 'axios';
import { Parking, ApiResponse } from '../types/Parking';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const parkingService = {
  async getAllParkings(): Promise<Parking[]> {
    try {
      const response = await axios.get<ApiResponse<Parking[]>>(
        `${API_BASE_URL}/parkings`
      );
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener parkings:', error);
      return [];
    }
  },

  async getParkingById(id: string): Promise<Parking | null> {
    try {
      const response = await axios.get<ApiResponse<Parking>>(
        `${API_BASE_URL}/parkings/${id}`
      );
      return response.data.data || null;
    } catch (error) {
      console.error('Error al obtener parking:', error);
      return null;
    }
  }
};
