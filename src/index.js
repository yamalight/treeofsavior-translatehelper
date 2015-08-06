// code
import React from 'react';
import Chrome from './components/chrome';
import Filepicker from './components/filepicker';
import Fileview from './components/fileview';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        };
    }

    handleFile(file) {
        this.setState({file});
    }

    render() {
        return (
            <div>
                <Filepicker fileSelected={::this.handleFile} />

                <Chrome>
                    {!this.state.file ? (<h1>Hi there! Select a file to start</h1>) : ''}
                    <Fileview file={this.state.file} />
                </Chrome>
            </div>
        );
    }
}

React.render(<App />, document.querySelector('#react'));
