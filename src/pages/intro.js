import React from 'react';
import remote from 'remote';
// import {Link} from 'react-router';
import Chrome from '../components/chrome';

// get dialog
const dialog = remote.require('dialog');

export default class IntroPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            folder: localStorage.getItem('folder'),
        };
    }

    componentDidMount() {
        if (this.state.folder) {
            this.redirectToFolder(this.state.folder);
        }
    }

    redirectToFolder(folder) {
        const {router} = this.context;
        router.transitionTo('main', {}, {folder});
    }

    handleFolderFind() {
        const folder = dialog.showOpenDialog({
            properties: ['openDirectory'],
        });
        localStorage.setItem('folder', folder);
        this.redirectToFolder(folder);
    }

    render() {
        return (
            <div>
                <Chrome>
                    <div className="row" style={{textAlign: 'center', paddingTop: 20}}>
                        <img src="images/tos_logo.png" />
                    </div>
                    <div className="row" style={{textAlign: 'center'}}>
                        <h3>Translation helper</h3>
                    </div>
                    <div className="row" style={{textAlign: 'center'}}>
                        <button className="btn btn-primary" onClick={::this.handleFolderFind}>
                            Select a folder with translation files
                        </button>
                    </div>
                </Chrome>
            </div>
        );
    }
}

IntroPage.contextTypes = {
    router: React.PropTypes.func,
};
