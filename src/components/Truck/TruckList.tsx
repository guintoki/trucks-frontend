import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Truck } from "../../types/Truck";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  color: #666;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled(ActionButton)`
  color: #3498db;

  &:hover {
    color: #2980b9;
  }
`;

const DeleteButton = styled(ActionButton)`
  color: #e74c3c;

  &:hover {
    color: #c0392b;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

interface TruckListProps {
  trucks: Truck[];
  onEdit: (truck: Truck) => void;
  onDelete: (truck: Truck) => void;
}

const TruckList: React.FC<TruckListProps> = ({ trucks, onEdit, onDelete }) => {
  if (trucks.length === 0) {
    return <EmptyMessage>Nenhum caminhão encontrado.</EmptyMessage>;
  }

  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Placa</TableHeaderCell>
          <TableHeaderCell>Tipo de CNH Mínimo</TableHeaderCell>
          <TableHeaderCell>Ações</TableHeaderCell>
        </tr>
      </TableHeader>
      <tbody>
        {trucks.map((truck) => (
          <TableRow key={truck.id}>
            <TableCell>{truck.id}</TableCell>
            <TableCell>{truck.plate}</TableCell>
            <TableCell>{truck.min_license_type}</TableCell>
            <TableCell>
              <ButtonGroup>
                <EditButton
                  onClick={() => onEdit(truck)}
                  aria-label="Editar caminhão"
                >
                  <FaEdit />
                </EditButton>
                <DeleteButton
                  onClick={() => onDelete(truck)}
                  aria-label="Excluir caminhão"
                >
                  <FaTrash />
                </DeleteButton>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default TruckList;
