import React from 'react';
import Chrome from '../components/chrome';
import Filepicker from '../components/filepicker';
import Fileview from '../components/fileview';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    componentWillMount() {
        this.setState(this.context.router.getCurrentQuery());
    }

    handleFile(file) {
        this.setState({file});
    }

    render() {
        return (
            <div>
                <Filepicker fileSelected={::this.handleFile} folder={this.state.folder} />

                <Chrome>
                    {!this.state.file ? (<h1>Hi there! Select a file to start</h1>) : ''}
                    <Fileview file={this.state.file} />
                </Chrome>
            </div>
        );
    }
}

MainPage.contextTypes = {
    router: React.PropTypes.func,
};
