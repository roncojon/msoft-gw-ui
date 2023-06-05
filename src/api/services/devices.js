/* eslint-disable no-useless-catch */
import axios from 'axios';
import { DEVICES_BASE_URL } from '../endpoints';

export const deleteDevice = async (deviceUid) => {
    try {
      const response = await axios.delete(`${DEVICES_BASE_URL}/${deviceUid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const postDevice = async (deviceData) => {
    try {
      const response = await axios.post(DEVICES_BASE_URL, deviceData);
      console.log('response data from post');
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };