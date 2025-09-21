import { createPortal } from "react-dom";

type ModalProps = {
	onClose: () => void;
	children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55">
			<div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-8 relative">
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
