import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Assignment } from "../../types/Assignment";

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

interface AssignmentListProps {
  assignments: Assignment[];
  openDeleteModal: (id: number) => void;
  onEdit: (assignment: Assignment) => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  onEdit,
  openDeleteModal,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <Th>ID</Th>
          <Th>Driver</Th>
          <Th>Truck</Th>
          <Th>Date</Th>
          <Th>Actions</Th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment) => (
          <tr key={assignment.id}>
            <Td>{assignment.id}</Td>
            <Td>{assignment.driver.name}</Td>
            <Td>{assignment.truck.plate}</Td>
            <Td>{assignment.date}</Td>
            <Td>
              <IconsDiv>
                <IconButton onClick={() => onEdit(assignment)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => openDeleteModal(assignment.id)}>
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

export default AssignmentList;
