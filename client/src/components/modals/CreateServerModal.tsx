import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  rem,
  Stack,
  Text,
} from "@mantine/core";
import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import classes from "./CreateServerModal.module.css";
import { IconUpload, IconX } from "@tabler/icons-react";

const CreateServerModal: React.FC = () => {
  const { isOpen, closeModal } = useModal("CreateServer");
  const form = useForm({
    initialValues: { name: "" },
    validate: {
      name: (value) => !value.trim() && "Please enter the server name",
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleDropZoneChange = (files: File[]) => {
    if (files.length === 0) return setImagePreview(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target?.result);
      setImagePreview(e.target?.result as string);
    };
    setFile(files[0]);
    reader.readAsDataURL(files[0]);
  };
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
                  onDrop={handleDropZoneChange}
                  accept={IMAGE_MIME_TYPE}
                  className={classes.dropzone}
                >
                  <Group style={{ minHeight: rem(100), pointerEvents: "none" }}>
                    <Dropzone.Accept>
                      <IconUpload size={"3.2rem"} stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                      <IconX size={"3.2rem"} stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                      <IconUpload size={"3.2rem"} stroke={1.5} />
                    </Dropzone.Idle>
                    <>
                      <Text size="xl" inline>
                        Drag images here or click to select files
                      </Text>
                      <Text size="sm" inline mt={7}>
                        Upload the server icon
                      </Text>
                    </>
                  </Group>
                </Dropzone>
              )}
              {imagePreview && (
                <Flex pos={"relative"} w={rem(150)} h={rem(150)} mt={"md"}>
                  <>
                    <Button
                      onClick={() => setImagePreview(null)}
                      color="red"
                      pos="absolute"
                      style={{
                        padding: 0,
                        zIndex: 1,
                        width: rem(30),
                        borderRadius: "50%",
                        top: 0,
                      }}
                    >
                      <IconX color="white" />
                    </Button>
                    <Image src={imagePreview} w={rem(250)} h={rem(150)} />
                  </>
                </Flex>
              )}
            </Flex>
          </Stack>
        </form>
      </Modal>
    </div>
  );
};

export default CreateServerModal;
