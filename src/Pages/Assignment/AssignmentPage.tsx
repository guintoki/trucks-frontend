import React, { useEffect, useState } from "react";
import {
  getAssignments,
  deleteAssignment,
  getDrivers,
  getTrucks,
} from "../../utils/api";
import styled from "styled-components";
import { Assignment } from "../../types/Assignment";
import { toast } from "react-toastify";
import DeleteAssignmentModal from "../../components/Assignment/DeleteAssignmentModal";
import AssignmentList from "../../components/Assignment/AssignmentList";
import AssignmentForm from "../../components/Assignment/AssignmentForm";
import EditAssignmentModal from "../../components/Assignment/EditAssignmentModal";
import { LicenseType } from "../../types/LicenseType";
import { FaSpinner } from "react-icons/fa";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
`;

const Section = styled.section`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: 2rem;
  color: #3498db;
  margin: 2rem auto;
  display: block;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fde8e8;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [assignmentsData, driversData, trucksData] = await Promise.all([
        getAssignments(),
        getDrivers(),
        getTrucks(),
      ]);
      setAssignments(assignmentsData);
      setDrivers(driversData);
      setTrucks(trucksData);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar dados");
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (assignmentToDelete !== null) {
      try {
        await deleteAssignment(assignmentToDelete);
        setAssignments(
          assignments.filter(
            (assignment) => assignment.id !== assignmentToDelete
          )
        );
        setAssignmentToDelete(null);
        setDeleteModalIsOpen(false);
        toast.success("Atribuição excluída com sucesso");
      } catch (err) {
        console.log("Deleting assignment with ID:", assignmentToDelete);

        toast.error("Erro ao excluir atribuição");
      }
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
    <PageContainer>
      <PageHeader>
        <PageTitle>Gerenciamento de Atribuições</PageTitle>
      </PageHeader>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <Section>
            <SectionTitle>Adicionar Atribuição</SectionTitle>
            <AssignmentForm
              drivers={drivers}
              trucks={trucks}
              setError={setError}
              onSubmit={(assignment: Assignment) => {
                setAssignments((prevAssignments) => [
                  ...prevAssignments,
                  assignment,
                ]);
                toast.success("Atribuição adicionada com sucesso");
              }}
            />
          </Section>

          <Section>
            <SectionTitle>Lista de Atribuições</SectionTitle>
            {assignments.length === 0 ? (
              <p>Nenhuma atribuição encontrada.</p>
            ) : (
              <AssignmentList
                assignments={assignments}
                onEdit={handleEdit}
                openDeleteModal={openDeleteModal}
              />
            )}
          </Section>
        </>
      )}

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
          toast.success("Atribuição atualizada com sucesso");
        }}
        drivers={drivers}
        trucks={trucks}
        assignment={editingAssignment}
        setError={setError}
        setLoading={setLoading}
      />

      <DeleteAssignmentModal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        onConfirm={handleDelete}
        assignmentId={assignmentToDelete}
      />
    </PageContainer>
  );
};

export default AssignmentPage;
