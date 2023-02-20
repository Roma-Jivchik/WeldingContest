import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


export class AddFileMultipleComponent extends Component {
    static displayName = AddFileMultipleComponent.name;

    constructor(props) {
        super(props);

        this.state = {
            uploadedFiles: [],
            fileLimit: false,
            maxFilesCount: 10,
        }

        this.handleFileEvent = this.handleFileEvent.bind(this);
        this.handleUploadFiles = this.handleUploadFiles.bind(this);
    }

    handleUploadFiles(files) {
        const uploaded = [...this.state.uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === this.state.maxFilesCount) {
                    this.setState({ fileLimit: true });
                }

                if (uploaded.length > this.state.maxFilesCount) {
                    alert(`Вы не можете добавить больше ${this.state.maxFilesCount} файлов`);
                    this.setState({ fileLimit: false });
                    limitExceeded = true;
                    return true;
                }
            }
        });

        if (!limitExceeded) {
            this.setState({ uploadedFiles: uploaded });
            this.props.handleChangeFiles(uploaded);
        }
    }

    handleFileEvent(e) {
        const chosenFiles = Array.prototype.slice.call(e.target.files);

        this.handleUploadFiles(chosenFiles);
    }

    render() {
        if (!this.props.isHidden) {
            return (
                <div className="AddFileMultiple">

                    <input id='fileUpload' type='file' multiple hidden={true}
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={(e) => { this.handleFileEvent(e) }}
                        disabled={this.state.fileLimit}
                    />

                    <label htmlFor='fileUpload' hidden={ this.props.isHidden}>
                        <a className={`btn btn-primary ${!this.state.fileLimit ? '' : 'disabled'} `} hidden={this.props.isHidden} >
                            Выбрать файлы
                        </a>
                    </label>
                </div>
            )
        }
    }
}