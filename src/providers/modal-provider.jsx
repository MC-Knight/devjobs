import { useEffect, useState } from "react";
import AddJobModal from "../components/Modals/AddJobModal";
import DeleteJobModal from "../components/Modals/DeleteJobModal";
import EditJobModal from "../components/Modals/EditJobModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddJobModal />
      <DeleteJobModal />
      <EditJobModal />
    </>
  );
};
