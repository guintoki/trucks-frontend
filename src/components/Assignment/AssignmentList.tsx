import React from "react";
import styled from "styled-components";
import { Assignment } from "../../types/Assignment";
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

interface AssignmentListProps {
  assignments: Assignment[];
  onEdit: (assignment: Assignment) => void;
  openDeleteModal: (id: number) => void;
}

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  onEdit,
  openDeleteModal,
}) => {
  if (assignments.length === 0) {
    return <EmptyMessage>Nenhuma atribuição cadastrada</EmptyMessage>;
  }

  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Motorista</TableHeaderCell>
          <TableHeaderCell>Caminhão</TableHeaderCell>
          <TableHeaderCell>Data</TableHeaderCell>
          <TableHeaderCell>Ações</TableHeaderCell>
        </tr>
      </TableHeader>
      <tbody>
        {assignments.map((assignment) => (
          <TableRow key={assignment.id}>
            <TableCell>{assignment.id}</TableCell>
            <TableCell>{assignment.driver.name}</TableCell>
            <TableCell>{assignment.truck.plate}</TableCell>
            <TableCell>{formatDate(assignment.date)}</TableCell>
            <TableCell>
              <ButtonGroup>
                <ActionButton
                  onClick={() => onEdit(assignment)}
                  aria-label="Editar atribuição"
                >
                  <FaEdit />
                </ActionButton>
                <ActionButton
                  onClick={() => openDeleteModal(assignment.id)}
                  className="delete"
                  aria-label="Excluir atribuição"
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

export default AssignmentList;
