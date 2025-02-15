import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

export const SubmitWarning = ({
    handleSubmit, handleClose, isModelOpen }:
    {
        isModelOpen: boolean
        handleClose: any,
        handleSubmit: any
    }) => {
    return (
        <Modal
            isOpen={isModelOpen}
            backdrop="opaque"
            isDismissable={true}
            hideCloseButton={true}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
            }}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 dark:text-white">Are you sure?</ModalHeader>
                <ModalBody>
                    <p className="dark:text-white">You have a few flagged or unanswered questions. Would you like to continue?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="light" onPress={handleClose}>
                        Close
                    </Button>
                    <Button color="danger" variant="light" onPress={handleSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    );
};