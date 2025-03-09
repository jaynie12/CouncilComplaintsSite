import useSWR, { mutate } from 'swr';
import { Cases } from './data'
import axios from "axios";

const url = 'http://127.0.0.1:8000/api/';

async function updateRequest(id: number, data: Cases) {
    return axios.put(`http://127.0.0.1:8000/api/case_details/${id}`, data)
    .then((response) => response.data)
    .catch((error) => {
        console.error("Error updating case:", error);
        throw error;
    });
}

async function getRequest() {
    return axios.get(`http://127.0.0.1:8000/api/cases/`)
    .then((response) => response.data)
    .catch((error) => {
        console.error("Error getting cases:", error);
        throw error;
    });
}

/**
 * Custom hook to manage use cases data.
 *
 * This hook uses SWR (stale-while-revalidate) for data fetching and caching.
 *
 * @returns {Object} An object containing:
 * - `data`: The fetched data, defaulting to an empty array if not available.
 * - `isValidating`: A boolean indicating if the data is currently being validated.
 * - `updateRow`: A function to update a specific row by ID with the provided data.
 *
 * @example
 * const { data, isValidating, updateRow } = useCases();
 *
 * @function
 * @name useCases
 */
export default function useCases() {
  const { data: data, isValidating: isValidating } = useSWR(url, getRequest);

  const updateRow = async (id: number, postData: Cases) => {
    await updateRequest(id, postData);
    mutate(url);
  };


  return {
    data: data ?? [],
    isValidating,
    updateRow,    
  };
}