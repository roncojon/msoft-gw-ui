import './App.css';
import SnackbarError from './components/common/SnackBarError';
import GatewaysContainer from './components/containers/Gateways/Gateways';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

function App() {
const {error} = useQueryErrorResetBoundary();
console.log('error making request. :)',error)
  return (
    <>
      <GatewaysContainer/>
      <SnackbarError />
    </>
  );
}

export default App;