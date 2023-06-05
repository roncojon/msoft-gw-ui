/* eslint-disable react/prop-types */
import GatewayUnit from './GatewayUnit'

export const GatewaysList = ({gatewaysList, refetch}) => {
    console.log('gatewaysList asd')
    console.log(gatewaysList)
  return (
    <div>{gatewaysList.gateways.map((gw)=><GatewayUnit key={gw.serialNumber} gw={gw} refetchReq={refetch}/>)}</div>
  )
}
