import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaTruck, FaUser, FaClipboardList } from "react-icons/fa";

const Nav = styled.nav`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #3498db;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)<{ "data-isactive": boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ "data-isactive": isActive }) =>
    isActive ? "#3498db" : "#64748b"};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    color: #3498db;
    background-color: #f1f5f9;
  }

  svg {
    font-size: 1.25rem;
  }
`;

const Navbar = () => {
  const location = useLocation();

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <FaTruck />
          Sistema de Transportes
        </Logo>
        <NavLinks>
          <NavLink to="/" data-isactive={location.pathname === "/"}>
            <FaUser />
            Motoristas
          </NavLink>
          <NavLink to="/trucks" data-isactive={location.pathname === "/trucks"}>
            <FaTruck />
            Caminhões
          </NavLink>
          <NavLink
            to="/assignments"
            data-isactive={location.pathname === "/assignments"}
          >
            <FaClipboardList />
            Atribuições
          </NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
