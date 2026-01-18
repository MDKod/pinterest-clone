import "./galleryItem.css";
import { Link } from "react-router-dom";
import Image from "../image/image";
import { getImageProps } from "../../utils/getImageProps";

const GalleryItem = ({ item }) => {

const optimizedHeight = (372 * item.height) / item.width

  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {/* <img src={item.media} alt="" /> */}
  <Image {...getImageProps(item.media)} alt="" w={372} h={optimizedHeight} />
      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button>
          <Image {...getImageProps("/general/share.svg")} alt="" />
        </button>
        <button>
          <Image {...getImageProps("/general/more.svg")} alt="" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;

