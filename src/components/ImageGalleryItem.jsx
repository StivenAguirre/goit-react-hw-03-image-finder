import React, { Component } from 'react';
import styles from "../styles/ImageGallery.module.css";
import Button from "../components/button";

class ImageGalleryItem extends Component {
    state = {
        imagesApi: [],
        currentPage: 1, 
    };

    componentDidMount() {
        this.fetchImages(this.props.busquedaValue, this.state.currentPage);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.busquedaValue !== prevProps.busquedaValue) {
            this.setState({ currentPage: 1, imagesApi: [] }, () => {
                this.fetchImages(this.props.busquedaValue, this.state.currentPage);
            });
        } else if (this.state.currentPage !== prevState.currentPage) {
            this.fetchImages(this.props.busquedaValue, this.state.currentPage);
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
                    this.setState({ imagesApi: newImages });
                }
            })
            .catch((error) => console.error("Error al obtener datos de la API", error));
    }

    handleLoadMore = () => {
        this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
    };

    render(){
        return(
            <>
                {this.state.imagesApi.map((image) => (
                    <li key={image.id} className={styles["ImageGalleryItem"]}>
                        <img src={image.webformatURL} alt={image.tags} className={styles["ImageGalleryItem-image"]} />
                    </li>
                ))}
                <Button onClick={this.handleLoadMore} />
            </>
        )
    }
}

export default ImageGalleryItem;