import React, { useEffect, useState } from "react";
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../../utils/api";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import EditDriverModal from "../../components/Driver/EditDriverModal";
import Toast from "../../components/Toast/Toast";
import DriverList from "../../components/Driver/DriverList";
import DriverForm from "../../components/Driver/DriverForm";
import { Driver } from "../../types/Driver";
import { LicenseType } from "../../types/LicenseType";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DriverPage: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDrivers() {
      setLoading(true);
      try {
        const driversData = await getDrivers();
        setDrivers(driversData);
      } catch (err) {
        setError("Failed to fetch drivers.");
      }
      setLoading(false);
    }
    fetchDrivers();
  }, []);

  const handleDelete = async () => {
    if (driverToDelete) {
      setLoading(true);
      try {
        await deleteDriver(driverToDelete.id);
        setDrivers(drivers.filter((driver) => driver.id !== driverToDelete.id));
        setDriverToDelete(null);
        setDeleteModalIsOpen(false);
        setSuccess("Driver deleted successfully.");
      } catch (err) {
        setError("Failed to delete driver.");
      }
      setLoading(false);
    }
  };

  const handleEdit = (driver: Driver) => {
    setEditingDriver(driver);
    setEditModalIsOpen(true);
  };

  const handleEditSubmit = async (name: string, license_type: LicenseType) => {
    if (editingDriver) {
      setLoading(true);
      try {
        const updatedDriver = {
          ...editingDriver,
          name,
          license_type: license_type,
        };
        await updateDriver(editingDriver.id, updatedDriver);
        setDrivers(
          drivers.map((driver) =>
            driver.id === editingDriver.id
              ? { ...driver, name, license_type: license_type }
              : driver
          )
        );
        setEditingDriver(null);
        setEditModalIsOpen(false);
        setSuccess("Driver updated successfully.");
      } catch (err) {
        setError("Failed to update driver.");
      }
      setLoading(false);
    }
  };

  const handleCreate = async (name: string, license_type: LicenseType) => {
    setLoading(true);
    try {
      const newDriver = { name, license_type: license_type };
      const createdDriver = await createDriver(newDriver);
      setDrivers([...drivers, createdDriver]);
      setSuccess("Driver created successfully.");
    } catch (err: any) {
      setError(err.message);
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
          <h2>Add Driver</h2>
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
          <DriverForm onSubmit={handleCreate} />
          <h2>Driver List</h2>
          <DriverList
            drivers={drivers}
            onEdit={handleEdit}
            onDelete={(driver) => {
              setDriverToDelete(driver);
              setDeleteModalIsOpen(true);
            }}
          />
          <EditDriverModal
            isOpen={editModalIsOpen}
            onRequestClose={() => setEditModalIsOpen(false)}
            onSubmit={handleEditSubmit}
            initialName={editingDriver?.name || ""}
            initialLicenseType={editingDriver?.license_type || "A"}
          />
          <DeleteModal
            isOpen={deleteModalIsOpen}
            onRequestClose={() => setDeleteModalIsOpen(false)}
            onDelete={handleDelete}
            itemType="driver"
          />
        </>
      )}
    </div>
  );
};

export default DriverPage;
