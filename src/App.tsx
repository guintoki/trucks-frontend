import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import DriverPage from "./Pages/Driver/DriverPage";
import TruckPage from "./Pages/Truck/TruckPage";
import AssignmentPage from "./Pages/Assignment/AssignmentPage";
import { createGlobalStyle } from "styled-components";

const AppContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <AppContainer>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" element={<DriverPage />} />
          <Route path="/drivers" element={<DriverPage />} />
          <Route path="/trucks" element={<TruckPage />} />
          <Route path="/assignments" element={<AssignmentPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
