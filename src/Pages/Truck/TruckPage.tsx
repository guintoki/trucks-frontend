import React, { useEffect, useState } from "react";
import {
  getTrucks,
  createTruck,
  updateTruck,
  deleteTruck,
} from "../../utils/api";
import styled from "styled-components";
import { toast } from "react-toastify";
import DeleteTruckModal from "../../components/Truck/DeleteTruckModal";
import EditTruckModal from "../../components/Truck/EditTruckModal";
import TruckList from "../../components/Truck/TruckList";
import TruckForm from "../../components/Truck/TruckForm";
import { Truck } from "../../types/Truck";
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

const TruckPage: React.FC = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [truckToDelete, setTruckToDelete] = useState<Truck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      setLoading(true);
      const trucksData = await getTrucks();
      setTrucks(trucksData);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar caminhões");
      toast.error("Erro ao carregar caminhões");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (truckToDelete) {
      try {
        await deleteTruck(truckToDelete.id);
        setTrucks(trucks.filter((truck) => truck.id !== truckToDelete.id));
        setTruckToDelete(null);
        setDeleteModalIsOpen(false);
        toast.success("Caminhão excluído com sucesso");
      } catch (err) {
        toast.error("Erro ao excluir caminhão");
      }
    }
  };

  const handleEdit = (truck: Truck) => {
    setEditingTruck(truck);
    setEditModalIsOpen(true);
  };

  const handleEditSubmit = async (
    plate: string,
    min_license_type: LicenseType
  ) => {
    if (editingTruck) {
      try {
        const updatedTruck = {
          ...editingTruck,
          plate,
          min_license_type,
        };
        await updateTruck(editingTruck.id, updatedTruck);
        setTrucks(
          trucks.map((truck) =>
            truck.id === editingTruck.id ? updatedTruck : truck
          )
        );
        setEditingTruck(null);
        setEditModalIsOpen(false);
        toast.success("Caminhão atualizado com sucesso");
      } catch (err) {
        toast.error("Erro ao atualizar caminhão");
      }
    }
  };

  const handleCreate = async (plate: string, min_license_type: LicenseType) => {
    try {
      const newTruck = { plate, min_license_type };
      const createdTruck = await createTruck(newTruck);
      setTrucks([...trucks, createdTruck]);
      toast.success("Caminhão criado com sucesso");
    } catch (err) {
      toast.error("Erro ao criar caminhão");
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Gerenciamento de Caminhões</PageTitle>
      </PageHeader>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <Section>
            <SectionTitle>Adicionar Caminhão</SectionTitle>
            <TruckForm onSubmit={handleCreate} />
          </Section>

          <Section>
            <SectionTitle>Lista de Caminhões</SectionTitle>
            {trucks.length === 0 ? (
              <p>Nenhum caminhão encontrado.</p>
            ) : (
              <TruckList
                trucks={trucks}
                onEdit={handleEdit}
                onDelete={(truck) => {
                  setTruckToDelete(truck);
                  setDeleteModalIsOpen(true);
                }}
              />
            )}
          </Section>
        </>
      )}

      <EditTruckModal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        onSubmit={handleEditSubmit}
        truck={editingTruck}
      />

      <DeleteTruckModal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        onConfirm={handleDelete}
        truck={truckToDelete}
      />
    </PageContainer>
  );
};

export default TruckPage;
