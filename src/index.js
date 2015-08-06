// code
import React from 'react';
import Chrome from './components/chrome';
import Filepicker from './components/filepicker';

// const file = fs.readFileSync('./EnglishTranslation/ETC.tsv').toString();
// const lines = file.split('\n');
// const symbols = lines[0].split('\t');
// console.log(lines[0]);
// console.log(symbols);

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
                </Chrome>
            </div>
        );
    }
}

React.render(<App />, document.querySelector('#react'));
