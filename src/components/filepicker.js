import React from 'react';
import getFilesList from '../utils/filesList';

export default class Filepicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: getFilesList(props.folder),
            file: null,
            open: false
        };
    }

    toggle() {
        this.setState({open: !this.state.open});
    }

    selectFile(file) {
        this.toggle();
        this.setState({file});
        this.props.fileSelected(file);
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <ul className="nav navbar-nav">
                    <li className={'dropdown' + (this.state.open ? ' open' : '')}>
                        <a className="dropdown-toggle" onClick={::this.toggle}>
                            {this.state.file ? this.state.file.name : 'Select file'}
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            {this.state.files.map((file) => {
                                return (
                                    <li key={file.name} onClick={this.selectFile.bind(this, file)}>
                                        <a href="#">{file.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}
