import React, { useEffect, useState } from "react";
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../../utils/api";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import DeleteDriverModal from "../../components/Driver/DeleteDriverModal";
import EditDriverModal from "../../components/Driver/EditDriverModal";
import DriverList from "../../components/Driver/DriverList";
import DriverForm from "../../components/Driver/DriverForm";
import { Driver } from "../../types/Driver";
import { LicenseType } from "../../types/LicenseType";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

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

const DriverPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const data = await getDrivers();
      setDrivers(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar motoristas");
      toast.error("Erro ao carregar motoristas");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDriver = async (
    name: string,
    license_type: LicenseType
  ) => {
    try {
      const newDriver = await createDriver({ name, license_type });
      setDrivers([...drivers, newDriver]);
      toast.success("Motorista criado com sucesso");
    } catch (err) {
      toast.error("Erro ao criar motorista");
    }
  };

  const handleEditDriver = (driver: Driver) => {
    setEditingDriver(driver);
    setEditModalIsOpen(true);
  };

  const handleUpdateDriver = async (
    name: string,
    license_type: LicenseType
  ) => {
    if (!editingDriver) return;

    try {
      const updatedDriver = await updateDriver(editingDriver.id, {
        name,
        license_type,
      });
      setDrivers(
        drivers.map((driver) =>
          driver.id === updatedDriver.id ? updatedDriver : driver
        )
      );
      setEditModalIsOpen(false);
      toast.success("Motorista atualizado com sucesso");
    } catch (err) {
      toast.error("Erro ao atualizar motorista");
    }
  };

  const handleDeleteDriver = (driver: Driver) => {
    setDriverToDelete(driver);
    setDeleteModalIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!driverToDelete) return;

    try {
      await deleteDriver(driverToDelete.id);
      setDrivers(drivers.filter((driver) => driver.id !== driverToDelete.id));
      setDeleteModalIsOpen(false);
      toast.success("Motorista excluído com sucesso");
    } catch (err) {
      toast.error("Erro ao excluir motorista");
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Gerenciamento de Motoristas</PageTitle>
      </PageHeader>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <Section>
            <SectionTitle>Adicionar Motorista</SectionTitle>
            <DriverForm onSubmit={handleCreateDriver} />
          </Section>

          <Section>
            <SectionTitle>Lista de Motoristas</SectionTitle>
            <DriverList
              drivers={drivers}
              onEdit={handleEditDriver}
              onDelete={handleDeleteDriver}
            />
          </Section>
        </>
      )}

      <EditDriverModal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        onSubmit={handleUpdateDriver}
        initialName={editingDriver?.name || ""}
        initialLicenseType={editingDriver?.license_type || "B"}
      />

      <DeleteDriverModal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        onConfirm={handleConfirmDelete}
        driverName={driverToDelete?.name || ""}
      />
    </PageContainer>
  );
};

export default DriverPage;
