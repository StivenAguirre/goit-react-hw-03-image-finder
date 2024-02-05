import React from 'react';
import styles from "../styles/ImageGallery.module.css";
import ImageGalleryItem from "../components/ImageGalleryItem"

const ImageGallery = ({busquedaValue}) => {
    return(
        <div>
            <ul className={styles["ImageGallery"]}>
                <ImageGalleryItem busquedaValue={busquedaValue} />
            </ul>
        </div>
    )
}

export default ImageGallery;