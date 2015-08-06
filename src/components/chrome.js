import React from 'react';

class Chrome extends React.Component {
    render() {
        return (
            <div className="container">
            {this.props.children}
            </div>
        );
    }
}

export default Chrome;
