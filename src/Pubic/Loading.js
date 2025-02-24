const LoadingOverlay = () => {
    return (
      <div
        style={{
          position: "fixed",  // Che phủ toàn bộ màn hình
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(116, 116, 116, 0.5)", // Làm mờ nền
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,  // Đảm bảo nằm trên tất cả các thành phần khác
          backdropFilter: "blur(3px)", // Làm mờ nội dung phía sau
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };
  
  export default LoadingOverlay;
  