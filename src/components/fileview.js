import React from 'react';
import _ from 'lodash';
import loadFile from '../utils/loadFile';

const PAGE_SIZE = 20;

export default class Fileview extends React.Component {
    constructor(props) {
        super(props);

        this.state = Object.assign({
            page: 0,
            hide: false,
            hideBroken: false,
            showPageInput: false,
        }, props);
    }

    componentWillReceiveProps(props) {
        if (props.file !== this.state.file) {
            const english = loadFile(this.state.folder, props.file.english);
            const korean = loadFile(this.state.folder, props.file.korean);
            const all = _.groupBy(english.concat(korean), 'id');
            const data = _.map(all, ([it, k]) => {
                return {
                    id: it.id,
                    broken: it.id.trim() === '' || it.broken || !k || k && k.id.trim() === '' || k && k.broken,
                    english: it.value,
                    englishIndex: it.index,
                    korean: k ? k.value : '',
                    koreanIndex: k ? k.index : -1,
                };
            });

            this.setState({
                file: props.file,
                data,
            });
        }
    }

    handleHide() {
        this.setState({hide: !this.state.hide, page: 0});
    }
    handleHideBroken() {
        this.setState({hideBroken: !this.state.hideBroken, page: 0});
    }

    getData() {
        return this.state.data.filter((it) => {
            if (!this.state.hide) {
                return true;
            }

            if (this.state.hideBroken && it.broken) {
                return false;
            }

            return !it.english || !it.english.trim().length;
        });
    }

    nextPage(e) {
        e.preventDefault();
        this.setState({page: this.state.page + 1});
    }

    prevPage(e) {
        e.preventDefault();
        const page = this.state.page > 1 ? this.state.page - 1 : 0;
        this.setState({page});
    }

    changePage(page) {
        this.setState({page});
    }

    selectPage() {
        this.setState({showPageInput: true});
    }

    handlePageKeyPress(e) {
        if (e.key === 'Enter') {
            const page = parseInt(this.refs.pageInput.getDOMNode().value, 10) - 1;
            if (!isNaN(page)) {
                this.refs.pageInput.getDOMNode().value = '';
                this.setState({page, showPageInput: false});
            }
        }
    }

    pages() {
        return Array.from(
            Array(Math.floor(this.getData().length / 20)).keys()
        );
    }

    render() {
        if (!this.state.data) {
            return <div />;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-xs-3">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" onChange={::this.handleHide}
                                    value={this.state.hide} />
                                Hide translated
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" onChange={::this.handleHideBroken}
                                    value={this.state.hideBroken} />
                                Hide broken
                            </label>
                        </div>
                    </div>
                </div>
                {this.pages().length > 1 ? ([
                    <div className="row" style={{textAlign: 'center'}} key="page">
                        <h3>
                            Page <span className="label label-default"
                                onClick={::this.selectPage} style={{cursor: 'pointer'}}>
                                {this.state.page + 1}
                            </span>
                        </h3>
                        {this.state.showPageInput ? (
                            <input type="text" className="form-control" ref="pageInput"
                                placeholder="Select a page to go to.."
                                onKeyPress={::this.handlePageKeyPress}/>
                        ) : ''}
                    </div>,
                    <div className="row small-well" style={{textAlign: 'center'}} key="paging">
                        <ul className="pagination" style={{margin: 0}}>
                            <li>
                                <a href="#" onClick={::this.prevPage}>
                                    <span>&laquo;</span>
                                </a>
                            </li>
                            {this.pages().slice(this.state.page, this.state.page + 10).map((i) => {
                                return (
                                    <li key={i} onClick={this.changePage.bind(this, i)}
                                        className={this.state.page === i ? 'active' : ''}>
                                        <a href="#" onClick={(e) => e.preventDefault()}>{i + 1}</a>
                                    </li>
                                );
                            })}
                            <li><a href="#" onClick={(e) => e.preventDefault()} className="disabled">...</a></li>
                            <li>
                                <a href="#" onClick={::this.nextPage}>
                                    <span>&raquo;</span>
                                </a>
                            </li>
                         </ul>
                    </div>
                ]) : ''}
                <div className="row well small-well">
                    <div className="col-xs-4">ID</div>
                    <div className="col-xs-4">English</div>
                    <div className="col-xs-4">Korean</div>
                </div>
                {this.getData().slice(this.state.page * PAGE_SIZE, this.state.page * PAGE_SIZE + PAGE_SIZE)
                    .map((it) => {
                        let addClass = '';
                        if (it.broken) {
                            addClass = 'bg-danger';
                        } else if (it.english && it.english.trim().length > 0) {
                            addClass = 'bg-success';
                        }
                        return [
                            <div key={it.id}
                                className={'row padded ' + addClass}>
                                <div className="col-xs-4">{it.id}</div>
                                <div className="col-xs-4">{it.english}</div>
                                <div className="col-xs-4">{it.korean}</div>
                            </div>,
                            <div className="row-separator" key={'separator_' + it.id}></div>
                        ];
                    })
                }
            </div>
        );
    }
}
