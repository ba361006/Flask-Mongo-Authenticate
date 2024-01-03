// import { useCallback, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import Signin from "./Signin";
import Home from "./Home";
import Error from "./Error";
import routes from "./routes";
// import { useAppDispatch } from "../hooks";
// import { setSessionState } from "../redux/workItems";

const App = () => {
  // const dispatch = useAppDispatch();

  // Subscribe to firebase auth
  // const memoizedDispatch = useCallback(() => {
  //   const subscriber = onAuthStateChanged(getAuth(), async resultUser => {
  //     if (resultUser) {
  //       const db = getFirestore();
  //       if (resultUser.email) {
  //         const adminsCollection = collection(db, 'admins');
  //         const adminQuery = query(
  //           adminsCollection,
  //           where('email', '==', resultUser.email)
  //         );
  //         const result = await getDocs(adminQuery);
  //         if (result.size > 0) {
  //           dispatch(
  //             setSessionState({
  //               isAuthenticating: true,
  //               isAdmin: true,
  //               user: {
  //                 uid: resultUser.uid,
  //                 email: resultUser.email,
  //                 displayName: resultUser.displayName,
  //                 avatar: resultUser.photoURL
  //               }
  //             })
  //           );
  //         } else {
  //           const usersCollection = collection(db, 'users');
  //           const userQuery = query(
  //             usersCollection,
  //             where('email', '==', resultUser.email)
  //           );
  //           const result = await getDocs(userQuery);
  //           if (result.size > 0) {
  //             dispatch(
  //               setSessionState({
  //                 isAuthenticating: true,
  //                 isAdmin: false,
  //                 user: {
  //                   uid: resultUser.uid,
  //                   email: resultUser.email,
  //                   displayName: resultUser.displayName,
  //                   avatar: resultUser.photoURL
  //                 }
  //               })
  //             );
  //           } else {
  //             dispatch(
  //               setSessionState({
  //                 isAuthenticating: false,
  //                 isAdmin: false,
  //                 user: {
  //                   uid: resultUser.uid,
  //                   email: resultUser.email,
  //                   displayName: resultUser.displayName,
  //                   avatar: resultUser.photoURL
  //                 }
  //               })
  //             );
  //           }
  //         }
  //       }
  //     }
  //   });
  //   return subscriber;
  // }, [dispatch]);

  // Subscribe to firebase auth
  // useEffect(() => {
  //   memoizedDispatch();
  // }, [memoizedDispatch]);

  return (
    <Routes>
      <Route path={routes.signin} element={<Signin />} />
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.error} element={<Error />} />
      <Route path="*" element={<Navigate to={routes.home} />} />
    </Routes>
  );
};

export default App;
