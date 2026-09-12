function ModalOverlay({ children, overlay }) {
  return <div className={`fixed z-50 ${overlay}`}>{children}</div>;
}

export default ModalOverlay;
