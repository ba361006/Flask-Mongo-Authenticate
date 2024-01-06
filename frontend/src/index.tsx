import { createRoot } from "react-dom/client";
import App from "./pages/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import ErrorBoundary from "./components/ErrorBoundary";
import Error from "./pages/Error";

// material ui theme
import theme from "./theme";

// fonts - material ui was built with roboto in mind
import "typeface-roboto";

// some global css
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";

// initFirebase();

const root = createRoot(document.getElementById("root")!);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary onError={console.log} errorComponent={<Error />}>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

serviceWorkerRegistration.register();
