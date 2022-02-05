import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/actions/actionCreator";

export interface ModalProps {
  show?: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const ModalComponent = ({ show, setShow, id }: ModalProps) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseAndDelete = (id: number) => {
    dispatch(deleteUser(id));
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleCloseAndDelete(id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
