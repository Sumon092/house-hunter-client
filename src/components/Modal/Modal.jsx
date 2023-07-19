import { toast } from "react-hot-toast";
import Form from "../Form/Form";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Modal = () => {
  const handleModal = async (data) => {
    try {
 console.log("making api request");
      await axios.post(
        "http://localhost:5000/api/v1/owners/addHouse",
        data,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-type": "application/json",
          },
        }
      );
      toast.success("House added successfully!");
      console.log("data is saving");
    //   refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add house.");
    }
  };

  return (
    <div>
      <input type="checkbox" id="house-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="text-2xl font-folder text-center my-4 text-info">
            Add House
          </h1>
          <label
            htmlFor="house-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <Form handleModal={handleModal} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
