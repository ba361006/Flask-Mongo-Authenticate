// import { useCallback, useEffect } from "react";
import { Route, Routes, Navigate } from 'react-router';
import Signin from './Signin';
import Home from './Home';
import Error from './Error';
import routes from './routes';
// import { useAppDispatch } from "../hooks";
// import { setSessionState } from "../redux/workItems";

const App = () => {
  // const dispatch = useAppDispatch();

  return (
    <Routes>
      <Route path={routes.signin} element={<Signin />} />
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.error} element={<Error />} />
      <Route path='*' element={<Navigate to={routes.home} />} />
    </Routes>
  );
};

export default App;
