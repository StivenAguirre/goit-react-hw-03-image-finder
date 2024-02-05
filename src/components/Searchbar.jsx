import React, { Component } from 'react';
import styles from "../styles/Searchbar.module.css";
import ImageGallery from "../components/ImageGallery"

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busquedaValue: "",
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSearch(this.state.busquedaValue);
    };

    handleChange = (event) => {
        this.setState({
            busquedaValue: event.target.value,
        });
    };

    render() {
        const {busquedaValue} = this.state

        return (
            <div>
                <header className={styles["Searchbar"]}>
                    <form onSubmit={this.handleSubmit} className={styles["SearchForm"]}>
                        <button type="submit" className={styles["SearchForm-button"]}></button>
                        <input
                            className={styles["SearchForm-input"]}
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                            value={this.state.busquedaValue}
                            onChange={this.handleChange}
                        />
                    </form>
                </header>
                <ImageGallery busquedaValue={busquedaValue} />
            </div>
        );
    }
}

export default Searchbar;