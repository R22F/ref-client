import React, { ReactNode, useEffect, useRef, useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [display, setDisplay] = useState(isOpen);
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setDisplay(false);
    onClose();
  };

  useEffect(() => {
    setDisplay(isOpen);

    // 모달이 열렸을 때, ref에 대한 클릭 이벤트를 추가
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      console.log(ref.current, ref.current.contains(event.target as Node));
      handleClose();
    }
  };

  return (
    <>
      {display && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center "
          style={{ backgroundColor: "rgba(128, 128, 128, 0.5)" }}
        >
          <div className="absolute bg-white shadow-lg rounded-lg" ref={ref}>
            <div className="modal-header px-4 py-3">
              <div className="flex justify-end items-center">
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-black"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-center items-center">
                <h2 className="text-lg font-medium">로그인</h2>
              </div>
            </div>
            <div className="modal-body p-4">{children}</div>
            <div className="modal-footer"></div>
          </div>
        </div>
      )}
    </>
  );
};
