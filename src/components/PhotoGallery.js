import { useState } from "react";
import PropTypes from "prop-types";

import { Gallery } from "react-grid-gallery";
import axios from "axios";
import { config } from "../constants";
import { Button, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const captionStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  maxHeight: "240px",
  overflow: "hidden",
  position: "absolute",
  bottom: "0",
  width: "100%",
  color: "white",
  padding: "2px",
  fontSize: "90%",
};

const wrapperStyle = {
  display: "block",
  minHeight: "1px",
  width: "100%",
  border: "1px solid #ddd",
  overflow: "auto",
};

const PhotoGallery = (props) => {
  const [images, setImages] = useState(props.images);
  const onDeleteImage = async (postId) => {
    if (window.confirm(`Are you sure you want to delete this image?`)) {
      const newImageArr = images.filter((img) => img.postId !== postId);
      console.log("delete image ", newImageArr);
      const opt = {
        method: "DELETE",
        url: `${config.TOKEN_KEY}/post/${postId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(config.TOKEN_KEY)}`,
        },
      };
      try {
        const res = await axios(opt);
        if (res.status === 200) setImages(newImageArr);
      } catch (error) {
        message.error("Delete post failed");
        console.log(`Delete post failed${error.message}`);
      }
    }
  };
  const imageArr = images.map((image) => {
    return {
      ...image,
      customOverlay: (
        <div style={captionStyle}>
          <div
            onClick={() => console.log("test")}
          >{`${image.user}: ${image.caption}`}</div>
          <Button
            style={{ marginTop: "10px", marginLeft: "5px" }}
            key="deleteImage"
            type="primary"
            icon={<DeleteOutlined />}
            size="big"
            onClick={() => onDeleteImage(image.postId)}
          >
            Delete Image
          </Button>
        </div>
      ),
    };
  });

  return (
    <div style={wrapperStyle}>
      <Gallery
        images={imageArr}
        enableImageSelection={false}
        backdropClosesModal={true}
      />
    </div>
  );
};

PhotoGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      thumbnailWidth: PropTypes.number.isRequired,
      thumbnailHeight: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PhotoGallery;
