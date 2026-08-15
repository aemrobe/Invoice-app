function ModalOverlay({ children, overlay }) {
  return (
    <div className={`border-4 border-red-500 fixed z-40 ${overlay}`}>
      {children}
    </div>
  );
}

export default ModalOverlay;
