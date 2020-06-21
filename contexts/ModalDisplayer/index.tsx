import React, { createContext, useState } from 'react';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export interface ClosableModal {
  closeModal: () => void;
}

export interface ModalData {
  content: (info: ClosableModal) => React.ReactNode;
  onClose?: () => void;
}

export interface ConfirmButtonProps {
  callback?: () => void;
  content?: React.ReactNode;
}

export interface ModalConfirm {
  title: React.ReactNode;
  content: React.ReactNode;
  cancel?: ConfirmButtonProps;
  ok?: ConfirmButtonProps;
}

interface ModalDisplayContextInterface {
  showConfirm: (data: ModalConfirm) => void;
  closeModal: () => void;
}

const defaultValue = null as unknown as ModalDisplayContextInterface;
const ModalDisplayContext = createContext<ModalDisplayContextInterface>(defaultValue);

interface ChildrenProps {
  children: React.ReactNode;
}

const ModalDisplayContextProviderImpl = (props: ChildrenProps): JSX.Element => {
  const [ data, setData ] = useState<ModalData | undefined>(undefined);

  const closeModal = (): void => {
    if (data !== undefined) {
      if (data.onClose !== undefined) data.onClose();
      setData(undefined);
    }
  };

  const showModal = (newModal: ModalData): void => {
    closeModal();
    setData(newModal);
  };

  const showConfirm = (confirm: ModalConfirm): void => {
    const { cancel, ok } = confirm;

    const closeConfirmModal = (closableModal: ClosableModal): void => {
      closableModal.closeModal();
      if (ok && ok.callback !== undefined) ok.callback();
    };

    showModal({
      onClose: cancel ? cancel.callback : undefined,
      content: (info: ClosableModal) => (
        <div>
          <div>
            <h3 id="contained-modal-title-vcenter">
              { confirm.title }
            </h3>
          </div>
          <div>
            { confirm.content }
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary right"
              onClick={() => closeConfirmModal(info)}
            >
              { (ok && ok.content) ? ok.content : <span>Ok</span> }
            </button>
            <div className="inline-block right" style={{ width: '8px', height: '1px' }} />
            <button
              type="button"
              className="btn btn-primary bg-red right"
              data-dismiss="modal"
              onClick={info.closeModal}
            >
              { (cancel && cancel.content) ? cancel.content : <span>Cancel</span> }
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <ModalDisplayContext.Provider
      value={{
        showConfirm,
        closeModal,
      }}
    >
      { data !== undefined && (
        <Modal
          onRequestClose={closeModal}
          isOpen={data !== undefined}
          style={customStyles}
        >
          { data.content({ closeModal }) }
        </Modal>
      ) }
      { props.children }
    </ModalDisplayContext.Provider>
  );
};

export const ModalDisplayContextProvider = ModalDisplayContextProviderImpl;
export default ModalDisplayContext;
