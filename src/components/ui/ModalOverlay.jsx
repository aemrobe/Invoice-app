function ModalOverlay({ children, overlay }) {
  return <div className={`fixed z-30 ${overlay}`}>{children}</div>;
}

export default ModalOverlay;
