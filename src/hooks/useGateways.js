import { useQuery } from '@tanstack/react-query';
import { getGateways, postGateway} from '../api/services/gateways';

const useGateways = (isQueryEnabled) => {

    const { isLoading, error, data, isFetching, refetch  } = useQuery({
        queryKey:  ["allGateways"],
        queryFn: getGateways,
        retry:false,
        refetchOnWindowFocus:false,
        enabled:isQueryEnabled
      });

      const createGateway = async (gatewayData) => {
        await postGateway(gatewayData);
        refetch(); // Trigger a refetch after the POST request is finished
      };

  return {isLoading, error, data, isFetching, createGateway, refetch }
}

export default useGateways;