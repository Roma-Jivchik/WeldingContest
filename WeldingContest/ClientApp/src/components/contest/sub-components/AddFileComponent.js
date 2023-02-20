import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class AddFileComponent extends Component {
    static displayName = AddFileComponent.name;

    constructor(props) {
        super(props);

        this.state = {
            imagePreviewUrl: null,
            file: ""
        }
    }

    handleFileChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.props.handleFile(file);
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }


    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
            if (imagePreviewUrl) {
                $imagePreview = (<img style={{ width: "300px", height: "400px" }} src={imagePreviewUrl} />);
            } else {
                $imagePreview = (<Form.Label>Здесь будет фотография</Form.Label>);
            }
        return (
            <Form.Group className="mb-3">
                <Form.Label>Выберите файл для загрузки</Form.Label>
                <Form.Control type="file" onChange={(e) => this.handleFileChange(e)} required/>
                <p style={{ textAlign: "center" }}>
                    {$imagePreview}
                </p>
                <Form.Control.Feedback type="invalid">
                    Пожалуйста, загрузите фотографию
                </Form.Control.Feedback>
            </Form.Group>
        )
    }
}