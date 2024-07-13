import React from 'react';

interface ConfirmNavigationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmNavigationModal: React.FC<ConfirmNavigationModalProps> = ({
    isOpen,
    onConfirm,
    onCancel
}) => {
    return (
        <>
            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Unsaved Changes</h3>
                        <p className="py-4">
                            You have unsaved changes. Are you sure you want to
                            leave this page?
                        </p>
                        <div className="modal-action">
                            <button onClick={onCancel} className="btn">
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="btn btn-primary"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConfirmNavigationModal;
