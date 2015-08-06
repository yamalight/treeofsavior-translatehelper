import React from 'react';
import loadFile from '../utils/loadFile';

const PAGE_SIZE = 20;

export default class Fileview extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({page: 0}, props);
    }

    componentWillReceiveProps(props) {
        if (props.file !== this.state.file) {
            const english = loadFile(props.file.english);
            const korean = loadFile(props.file.korean);
            const data = english.map((it, i) => {
                return {
                    id: it.id,
                    english: it.value,
                    korean: korean[i].id === it.id ? korean[i].value : -1,
                };
            });

            this.setState({
                file: props.file,
                data,
            });
        }
    }

    nextPage() {
        this.setState({page: this.state.page + 1});
    }

    prevPage() {
        const page = this.state.page > 1 ? this.state.page - 1 : 0;
        this.setState({page});
    }

    changePage(page) {
        this.setState({page});
    }

    pages() {
        return Array.from(
            Array(Math.floor(this.state.data.length / 20)).keys()
        );
    }

    render() {
        if (!this.state.data) {
            return <div />;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xs-4">ID</div>
                    <div className="col-xs-4">English</div>
                    <div className="col-xs-4">Korean</div>
                </div>
                {this.state.data.slice(this.state.page * PAGE_SIZE, this.state.page * PAGE_SIZE + PAGE_SIZE)
                    .map((it) => {
                        return (
                            <div className="row" key={it.id}>
                                <div className="col-xs-4">{it.id}</div>
                                <div className="col-xs-4">{it.english}</div>
                                <div className="col-xs-4">{it.korean}</div>
                            </div>
                        );
                    })
                }
                <div className="row">
                    <ul className="pagination pagination-lg">
                        <li>
                            <a href="#" onClick={::this.prevPage}>
                                <span>&laquo;</span>
                            </a>
                        </li>
                        {this.pages().slice(this.state.page, this.state.page + 10).map((i) => {
                            return (
                                <li key={i} onClick={this.changePage.bind(this, i)}
                                    className={this.state.page === i ? 'active' : ''}>
                                    <a href="#">{i + 1}</a>
                                </li>
                            );
                        })}
                        <li><a href="#" className="disabled">...</a></li>
                        <li>
                            <a href="#" onClick={::this.nextPage}>
                                <span>&raquo;</span>
                            </a>
                        </li>
                     </ul>
                </div>
            </div>
        );
    }
}
