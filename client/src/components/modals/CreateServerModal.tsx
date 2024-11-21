import { Modal } from "@mantine/core";
import React from "react";
import useModal from "../../hooks/useModal";

const CreateServerModal: React.FC = () => {
  const { isOpen, closeModal } = useModal("CreateServer");
  return (
    <div>
      <Modal opened={isOpen} onClose={closeModal}>
        Create Server Modal
      </Modal>
    </div>
  );
};

export default CreateServerModal;
