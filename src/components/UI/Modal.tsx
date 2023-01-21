import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

interface BackdropProps {
    backdrop?: () => void,
    onClose: () => void
}
const Backdrop: React.FC<BackdropProps> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}/>;
};

interface ModalOverlayProps {
    children: React.ReactNode
}
const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement: HTMLElement | null = document.getElementById('overlays');

interface ModalProps {
    onClose: () => void,
    children: React.ReactNode
}
const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Fragment>
      {portalElement && ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {portalElement && ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
