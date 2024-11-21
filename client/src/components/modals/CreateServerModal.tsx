import { Flex, Group, Modal, rem, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import classes from "./CreateServerModal.module.css";

const CreateServerModal: React.FC = () => {
  const { isOpen, closeModal } = useModal("CreateServer");
  const form = useForm({
    initialValues: { name: "" },
    validate: {
      name: (value) => !value.trim() && "Please enter the server name",
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  return (
    <div>
      <Modal title={"Create a Server"} opened={isOpen} onClose={closeModal}>
        <Text c="dimmed">
          Give your server a personality with a name you can always change later
        </Text>
        <form onSubmit={() => form.onSubmit(() => {})}>
          <Stack>
            <Flex justify={"center"} align={"center"} direction={"column"}>
              {!imagePreview && (
                <Dropzone
                  mt={"md"}
                  onDrop={() => {}}
                  accept={IMAGE_MIME_TYPE}
                  className={classes.dropzone}
                >
                  <Group
                    style={{ minHeight: rem(100), pointerEvents: "none" }}
                  ></Group>
                </Dropzone>
              )}
            </Flex>
          </Stack>
        </form>
      </Modal>
    </div>
  );
};

export default CreateServerModal;
