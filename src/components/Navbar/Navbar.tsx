import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background-color: #333;
  overflow: hidden;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: 40px;
`;

const NavbarList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const NavbarItem = styled.li`
  float: left;
`;

const NavbarLink = styled(Link)`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  &:hover {
    background-color: #111;
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarItem>
          <NavbarLink to="/drivers">Drivers</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink to="/trucks">Trucks</NavbarLink>
        </NavbarItem>
        <NavbarItem>
          <NavbarLink to="/assignments">Assignments</NavbarLink>
        </NavbarItem>
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
