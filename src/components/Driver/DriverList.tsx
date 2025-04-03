import React from "react";
import styled from "styled-components";
import { Driver } from "../../types/Driver";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background-color: #f8fafc;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 2px solid #e2e8f0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8fafc;
  }

  &:hover {
    background-color: #f1f5f9;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  color: #2c3e50;
  border-bottom: 1px solid #e2e8f0;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  color: #64748b;

  &:hover {
    background-color: #f1f5f9;
    color: #3498db;
  }

  &.delete:hover {
    color: #e74c3c;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #64748b;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  if (drivers.length === 0) {
    return <EmptyMessage>Nenhum motorista cadastrado</EmptyMessage>;
  }

  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Nome</TableHeaderCell>
          <TableHeaderCell>Tipo de Carteira</TableHeaderCell>
          <TableHeaderCell>Ações</TableHeaderCell>
        </tr>
      </TableHeader>
      <tbody>
        {drivers.map((driver) => (
          <TableRow key={driver.id}>
            <TableCell>{driver.id}</TableCell>
            <TableCell>{driver.name}</TableCell>
            <TableCell>{driver.license_type}</TableCell>
            <TableCell>
              <ButtonGroup>
                <ActionButton
                  onClick={() => onEdit(driver)}
                  aria-label="Editar motorista"
                >
                  <FaEdit />
                </ActionButton>
                <ActionButton
                  onClick={() => onDelete(driver)}
                  className="delete"
                  aria-label="Excluir motorista"
                >
                  <FaTrash />
                </ActionButton>
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default DriverList;
