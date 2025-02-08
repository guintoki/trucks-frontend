import React, { useEffect, useState } from "react";
import {
  getAssignments,
  deleteAssignment,
  getDrivers,
  getTrucks,
} from "../../api";
import styled from "styled-components";
import { Assignment } from "../../types/Assignment";
import { ClipLoader } from "react-spinners";
import Toast from "../Toast/Toast";
import DeleteModal from "../Modals/DeleteModal";
import AssignmentList from "./AssignmentList";
import AssignmentForm from "./AssignmentForm";
import EditAssignmentModal from "./EditAssignmentModal";
import { LicenseType } from "../../types/LicenseType";

interface Driver {
  id: number;
  name: string;
  license_type: LicenseType;
}

interface Truck {
  id: number;
  plate: string;
  min_license_type: LicenseType;
}

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AssignmentPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(
    null
  );
  const [editAssignmentModalIsOpen, setEditAssignmentModalIsOpen] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const assignmentsData = await getAssignments();
        const driversData = await getDrivers();
        const trucksData = await getTrucks();
        setAssignments(assignmentsData);
        setDrivers(driversData);
        setTrucks(trucksData);
      } catch (err) {
        setError("Failed to fetch data.");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (assignmentToDelete !== null) {
      setLoading(true);
      try {
        await deleteAssignment(assignmentToDelete);
        setAssignments(
          assignments.filter(
            (assignment) => assignment.id !== assignmentToDelete
          )
        );
        setAssignmentToDelete(null);
        setDeleteModalIsOpen(false);
        setSuccess("Assignment deleted successfully.");
      } catch (err) {
        setError("Failed to delete assignment.");
      }
      setLoading(false);
    }
  };

  const openDeleteModal = (id: number) => {
    setAssignmentToDelete(id);
    setDeleteModalIsOpen(true);
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setEditAssignmentModalIsOpen(true);
  };

  return (
    <div>
      {loading ? (
        <SpinnerContainer>
          <ClipLoader size={150} />
        </SpinnerContainer>
      ) : (
        <>
          <h2>Add Assignment</h2>
          {error && (
            <Toast
              message={error}
              type="error"
              onClose={() => setError(null)}
            />
          )}
          {success && (
            <Toast
              message={success}
              type="success"
              onClose={() => setSuccess(null)}
            />
          )}
          <AssignmentForm
            drivers={drivers}
            trucks={trucks}
            setAssignments={setAssignments}
            setError={setError}
            setSuccess={setSuccess}
            setLoading={setLoading}
            onSubmit={(assignment: Assignment) => {
              setAssignments((prevAssignments) => [
                ...prevAssignments,
                assignment,
              ]);
              setSuccess("Assignment added successfully.");
            }}
          />
          <h2>Assignment List</h2>
          <AssignmentList
            assignments={assignments}
            onEdit={handleEdit}
            openDeleteModal={openDeleteModal}
          />
          <EditAssignmentModal
            isOpen={editAssignmentModalIsOpen}
            onRequestClose={() => setEditAssignmentModalIsOpen(false)}
            onSubmit={(updatedAssignment: Assignment) => {
              setAssignments((prevAssignments) =>
                prevAssignments.map((assignment) =>
                  assignment.id === updatedAssignment.id
                    ? updatedAssignment
                    : assignment
                )
              );
              setSuccess("Assignment updated successfully.");
            }}
            drivers={drivers}
            trucks={trucks}
            assignment={editingAssignment}
            setError={setError}
            setSuccess={setSuccess}
            setLoading={setLoading}
          />
          <DeleteModal
            isOpen={deleteModalIsOpen}
            onRequestClose={() => setDeleteModalIsOpen(false)}
            onDelete={handleDelete}
            itemType="assignment"
          />
        </>
      )}
    </div>
  );
};

export default AssignmentPage;
