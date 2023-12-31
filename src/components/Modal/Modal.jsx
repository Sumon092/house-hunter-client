import { toast } from "react-hot-toast";
import Form from "../Form/Form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Loading from "../Loading/Loading";

// eslint-disable-next-line react/prop-types
const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const { refetch, isLoading } = useAuth();
  const handleModal = async (data) => {
    try {
      await axios.post("https://house-hounter-client.netlify.app/api/v1/owners/addHouse", data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-type": "application/json",
        },
      });
      setShowModal(false);
      refetch();
      {
        isLoading && <Loading />;
      }
    } catch (error) {
      toast.error("Failed to add house.");
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="house-modal"
        className="modal-toggle"
        checked={showModal}
        onChange={() => setShowModal(!showModal)}
      />

      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="house-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-500 text-white"
          >
            ✕
          </label>
          <h1 className="text-2xl font-folder text-center my-4 text-info">
            Add House
          </h1>

          <Form handleModal={handleModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
