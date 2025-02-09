import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Truck } from "../../types/Truck";

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

interface TruckListProps {
  trucks: Truck[];
  onEdit: (truck: Truck) => void;
  onDelete: (truck: Truck) => void;
}

const TruckList: React.FC<TruckListProps> = ({ trucks, onEdit, onDelete }) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Plate</Th>
          <Th>Min License Type</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {trucks.map((truck) => (
          <tr key={truck.id}>
            <Td>{truck.id}</Td>
            <Td>{truck.plate}</Td>
            <Td>{truck.min_license_type}</Td>
            <Td>
              <IconsDiv>
                <IconButton aria-label="edit" onClick={() => onEdit(truck)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => onDelete(truck)} aria-label="delete">
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

export default TruckList;
