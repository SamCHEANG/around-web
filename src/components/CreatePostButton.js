import { Modal, Button, message } from "antd";
import axios from "axios";

import { config } from "../constants";
import { useState } from "react";
import PostForm from "./PostForm";

const CreatePostButton = (props) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [postForm, setPostForm] = useState();

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    console.log("Clicked cancel btn");
    setVisible(false);
  };
  const handleOK = async () => {
    setConfirmLoading(true);
    const validation = await postForm.validateFields();
    if (validation.errorFields) {
      return console.log(`Validation error: ${validation.errorFields}`);
    }

    const { description, uploadPost } = validation;
    const { type, originFileObj } = uploadPost[0];
    const postType = type.match(/^(image|video)/g)[0];
    if (postType) {
      const formData = new FormData();
      formData.append("message", description);
      formData.append("media_file", originFileObj);

      const opt = {
        method: "POST",
        url: `${config.BASE_URL}/upload`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`,
        },
        data: formData,
      };

      try {
        const res = await axios(opt);
        if (res.status === 200) {
          message.success("The image/video is uploaded!");
          handleCancel();
          props.onShowPost(postType);
        }
      } catch (error) {
        console.log(`Upload image/video failed: ${error.message}`);
        message.error("Failed to upload image/video!");
      } finally {
        setConfirmLoading(false);
      }
    }
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create New Post
      </Button>
      <Modal
        title="Create New Post"
        visible={visible}
        onOk={handleOK}
        okText="Create"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <PostForm ref={(refInstance) => setPostForm(refInstance)} />
      </Modal>
    </div>
  );
};
export default CreatePostButton;
