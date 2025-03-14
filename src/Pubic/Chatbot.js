import React, { useEffect, useRef } from 'react';

function KommunicateChat() {
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (scriptAdded.current) return;

    const kommunicateSettings = {
      appId: "89e3ee364096a28608c60eea96761c22", 
      automaticChatOpenOnNavigation: true,
      popupWidget: true,
    };

    // Tạo thẻ script mới để tải Kommunicate widget
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widget.kommunicate.io/v2/kommunicate.app";

    // Đảm bảo chỉ thêm script nếu chưa tồn tại
    if (document.querySelector(`script[src="${script.src}"]`)) {
      scriptAdded.current = true;
      return;
    }

    const head = document.getElementsByTagName("head")[0];
    head.appendChild(script);

    // Đặt cấu hình cho Kommunicate
    window.kommunicate = window.kommunicate || {};
    window.kommunicate._globals = kommunicateSettings;

  }, []);

  return null;
}

export default KommunicateChat;
