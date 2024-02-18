import React, { Component } from "react";
import styles from "../styles/ImageGallery.module.css";
import Button from "../components/button";
import { ThreeDots } from "react-loader-spinner"; // Corregir importación del componente Loader

class ImageGalleryItem extends Component {
    state = {
        imagesApi: [],
        currentPage: 1, 
        isOpen: false,
        selectedImage: "",
        loading: false
    };

    componentDidMount() {
        this.fetchImages(this.props.busquedaValue, this.state.currentPage);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.busquedaValue !== prevProps.busquedaValue) {
            this.setState({ currentPage: 1, imagesApi: [], loading: true }, () => {
                this.fetchImages(this.props.busquedaValue, this.state.currentPage);
            });
        } else if (this.state.currentPage !== prevState.currentPage) {
            this.setState({ loading: true }, () => {
                this.fetchImages(this.props.busquedaValue, this.state.currentPage);
            });
        }
    }

    fetchImages(busquedaValue, page) {
        const apiKey = "42209623-d9b23eb6aa8e7e0ba07e64e71";
        let url = `https://pixabay.com/api/?q=${busquedaValue}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.hits) {
                    const newImages = page === 1 ? data.hits : [...this.state.imagesApi, ...data.hits];
                    this.setState({ imagesApi: newImages, loading: false });
                }
            })
            .catch((error) => {
                console.error("Error al obtener datos de la API", error);
                this.setState({ loading: false });
            });
    }

    handleLoadMore = () => {
        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
    };

    openModal = (imageUrl) => {
        this.setState({ isOpen: true, selectedImage: imageUrl });
    };
      
    closeModal = () => {
        this.setState({ isOpen: false });
    };

    render(){
        return(
            <>
                {this.state.loading ? (
                    <div className={styles.spinnerContainer}>
                        <ThreeDots color="#00BFFF" height={80} width={80} /> {/* Usar el componente ThreeDots directamente */}
                    </div>
                ) : (
                    <>
                        {this.state.imagesApi.map((image) => (
                            <li key={image.id} className={styles["ImageGalleryItem"]}>
                                <img onClick={() => this.openModal(image.webformatURL)} src={image.webformatURL} alt={image.tags} className={`${styles["ImageGalleryItem-image"]} ${styles["modal-trigger"]}`} />
                            </li>
                        ))}
                        {this.state.isOpen && (
                            <div className={styles.modalOverlay} onClick={this.closeModal}>
                                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                                    <span className={styles.close} onClick={this.closeModal}>&times;</span>
                                    <img src={this.state.selectedImage} alt="Imagen" />
                                    <button className={styles["close-button"]} onClick={this.closeModal}>❌</button>
                                </div>
                            </div>
                        )}
                        <Button onClick={this.handleLoadMore} />
                    </>
                )}
            </>
        )
    }
}

export default ImageGalleryItem;