import React, { useEffect, useState } from "react";
import { getTrucks, createTruck, updateTruck, deleteTruck } from "../../api";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditTruckModal from "./EditTruckModal";
import Toast from "../Toast/Toast";
import TruckList from "./TruckList";
import TruckForm from "./TruckForm";
import { Truck } from "../../types/Truck";
import { LicenseType } from "../../types/LicenseType";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TruckPage: React.FC = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [truckToDelete, setTruckToDelete] = useState<Truck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrucks() {
      setLoading(true);
      try {
        const trucksData = await getTrucks();
        setTrucks(trucksData);
      } catch (err) {
        setError("Failed to fetch trucks.");
      }
      setLoading(false);
    }
    fetchTrucks();
  }, []);

  const handleDelete = async () => {
    if (truckToDelete) {
      setLoading(true);
      try {
        await deleteTruck(truckToDelete.id);
        setTrucks(trucks.filter((truck) => truck.id !== truckToDelete.id));
        setTruckToDelete(null);
        setDeleteModalIsOpen(false);
        setSuccess("Truck deleted successfully.");
      } catch (err) {
        setError("Failed to delete truck.");
      }
      setLoading(false);
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
      setLoading(true);
      try {
        const updatedTruck = {
          ...editingTruck,
          plate,
          min_license_type: min_license_type,
        };
        await updateTruck(editingTruck.id, updatedTruck);
        setTrucks(
          trucks.map((truck) =>
            truck.id === editingTruck.id ? updatedTruck : truck
          )
        );
        setEditingTruck(null);
        setEditModalIsOpen(false);
        setSuccess("Truck updated successfully.");
      } catch (err) {
        setError("Failed to update truck.");
      }
      setLoading(false);
    }
  };

  const handleCreate = async (plate: string, min_license_type: LicenseType) => {
    setLoading(true);
    try {
      const newTruck = { plate, min_license_type: min_license_type };
      const createdTruck = await createTruck(newTruck);
      setTrucks([...trucks, createdTruck]);
      setSuccess("Truck created successfully.");
    } catch (err) {
      setError("Failed to create truck.");
    }
    setLoading(false);
  };

  return (
    <div>
      {loading && (
        <SpinnerContainer>
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </SpinnerContainer>
      )}
      {!loading && (
        <>
          <h2>Add Truck</h2>
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
          <TruckForm onSubmit={handleCreate} />
          <h2>Truck List</h2>
          <TruckList
            trucks={trucks}
            onEdit={handleEdit}
            onDelete={(truck) => {
              setTruckToDelete(truck);
              setDeleteModalIsOpen(true);
            }}
          />
          <EditTruckModal
            isOpen={editModalIsOpen}
            onRequestClose={() => setEditModalIsOpen(false)}
            onSubmit={handleEditSubmit}
            truck={editingTruck}
          />
          <DeleteModal
            isOpen={deleteModalIsOpen}
            onRequestClose={() => setDeleteModalIsOpen(false)}
            onDelete={handleDelete}
            itemType="truck"
          />
        </>
      )}
    </div>
  );
};

export default TruckPage;
