import React from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function PopupModal({ isModalOpen, closeModal, title }) {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={title}
      >
        <div className="space-between">
          <h2>{title}</h2>

          <IoMdClose onClick={closeModal} />
        </div>
        This is my modal
      </Modal>
    </div>
  );
}

export default PopupModal;
