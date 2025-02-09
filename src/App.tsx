import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import DriverPage from "./Pages/Driver/DriverPage";
import TruckPage from "./Pages/Truck/TruckPage";
import AssignmentPage from "./Pages/Assignment/AssignmentPage";
import GlobalStyle from "./GlobalStyles";

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/drivers" element={<DriverPage />} />
          <Route path="/trucks" element={<TruckPage />} />
          <Route path="/assignments" element={<AssignmentPage />} />
          <Route path="*" element={<Navigate to="/drivers" />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
