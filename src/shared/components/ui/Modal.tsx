import { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
	onClose: () => void;
	children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
	// Close modal on ESC key press
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55">
			<div className="bg-white rounded-2xl shadow-xl w-500 p-8 relative">
				<button
					type="button"
					onClick={onClose}
					className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
				>
					✕
				</button>
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
