import { useQuery, useMutation, useQueryClient  } from "react-query";
import { api } from "../api/api";
import { message } from 'antd';

const fetchData = async (url) => {
  const { data } = await api.get(url);
  return data;
};

export const useFetchData = (url, options = {}) => {
  return useQuery(
    url,
    () => fetchData(url),
    options
  );
};

const addSpace = async (newSpace) => {
  const response = await api.post('/space', newSpace);
  return response.data;
};

const useAddSpace = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation(addSpace, {
    onSuccess: (data) => {
      message.success('New Space Added Successfully');
      queryClient.setQueryData('spaces', (old) => [...(old || []), data]);
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: () => {
      message.error('There was an error adding the space');
    },
  });
};

export default useAddSpace;

