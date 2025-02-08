import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Driver } from "../../types/Driver";

const Table = styled.table`
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #333;
  color: white;
  padding: 10px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;

  &:hover {
    color: #ff1a1a;
  }
`;

const IconsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

interface DriverListProps {
  drivers: Driver[];
  onEdit: (driver: Driver) => void;
  onDelete: (driver: Driver) => void;
}

const DriverList: React.FC<DriverListProps> = ({
  drivers,
  onEdit,
  onDelete,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>License Type</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((driver) => (
          <tr key={driver.id}>
            <Td>{driver.id}</Td>
            <Td>{driver.name}</Td>
            <Td>{driver.license_type}</Td>
            <Td>
              <IconsDiv>
                <IconButton onClick={() => onEdit(driver)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => onDelete(driver)}>
                  <FaTrash />
                </IconButton>
              </IconsDiv>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DriverList;
