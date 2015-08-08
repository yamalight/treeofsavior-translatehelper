import React from 'react';
import Chrome from '../components/chrome';
import Filepicker from '../components/filepicker';
import Fileview from '../components/fileview';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            folder: localStorage.getItem('folder'),
        };
    }

    handleFile(file) {
        this.setState({file});
    }

    render() {
        return (
            <div>
                <Filepicker fileSelected={::this.handleFile} folder={this.state.folder} />

                <Chrome>
                    {!this.state.file ? (
                        <div className="row" style={{textAlign: 'center'}}>
                            <h1>Select a file to start translating!</h1>
                        </div>
                    ) : ''}
                    <Fileview file={this.state.file} folder={this.state.folder} />
                </Chrome>
            </div>
        );
    }
}

MainPage.contextTypes = {
    router: React.PropTypes.func,
};
