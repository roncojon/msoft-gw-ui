/* eslint-disable no-useless-catch */
import axios from 'axios';
import { GATEWAYS_BASE_URL } from '../endpoints';

export const getGateways = async () => {
  try {
    const response = await axios.get(GATEWAYS_BASE_URL);
    console.log('response.data')
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postGateway = async (gatewayData) => {
  try {
    const response = await axios.post(GATEWAYS_BASE_URL, gatewayData);
    console.log('response data from post');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneGateway = async (gatewaySerialNumber) => {
  try {
    const response = await axios.get(`${GATEWAYS_BASE_URL}/${gatewaySerialNumber}`);
    console.log('response data from single gateway');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
