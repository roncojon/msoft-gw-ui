import './App.css';
import GatewaysContainer from './components/containers/Gateways/Gateways';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
function App() {
const {error} = useQueryErrorResetBoundary();
console.log('error making request')
console.log(error)
  return (
    <>
      <GatewaysContainer/>
    </>
  );
}

export default App;