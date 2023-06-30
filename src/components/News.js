import React, { Component } from 'react';
import Newsitem from './Newsitem';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  capitlizeText = (word)=> 
{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title= `${this.capitlizeText(this.props.category)} - App`
  }

  async UpdatNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c41d4dafc3814f7090e800e8d6ffecab&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parshedata = await data.json();
    this.setState({
      articles: parshedata.articles,
      totalResults: parshedata.totalResults,
    });
  }

  async componentDidMount() {
    this.UpdatNews();
  }

  HandleNext = async () => {
    this.setState({ page: this.state.page + 1 });
    this.UpdatNews();
  };

  HandlePrev = async () => {
    this.setState({ page: this.state.page - 1 });
    this.UpdatNews();
  };

  render() {
    return (
      <div className="container my-3">
        <div className="text-center">
          <h1 style={{ margin: '40px 0px' }}>NewsMonkey - Top {this.capitlizeText(this.props.category)} Headlines</h1>
        </div>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 45) : ''}
                  description={
                    element.description ? element.description.slice(0, 88) : ''
                  }
                  imageUrl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-around">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.HandlePrev}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.HandleNext}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
