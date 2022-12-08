import React from "react";
import HomePage from "./pages/home";
import ToastLoading from "./components/toast-loading";

function App() {
  return (
    <React.Fragment>
    <HomePage />
    <ToastLoading />
  </React.Fragment>
  );
}

export default App;
