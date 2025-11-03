// components/CustomModal.tsx
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
  ButtonProps,
} from "@heroui/react";

interface CustomModalProps extends Omit<ModalProps, "children"> {
  title?: string;
  children?: React.ReactNode;
  showActions?: boolean;
  onClose: () => void;

  // Action button
  onAction?: () => void;
  actionText?: string;
  actionButtonProps?: ButtonProps;

  // Close button
  closeButtonProps?: ButtonProps;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title = "",
  children,
  showActions = true,
  onAction,
  actionText = "Confirm",
  actionButtonProps,
  closeButtonProps,
  ...modalProps
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} {...modalProps}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>

            {showActions && (
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  {...closeButtonProps}
                >
                  Close
                </Button>

                {onAction && (
                  <Button
                    color="primary"
                    onPress={onAction}
                    {...actionButtonProps}
                  >
                    {actionText}
                  </Button>
                )}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
