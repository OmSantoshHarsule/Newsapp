import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
  }

  // Fetch data through Azure Function
  fetchNews = async (page) => {
    const { pageSize } = this.props;
    const query = "tesla";
    const from = "2025-07-07";
    const sortBy = "publishedAt";

    this.setState({ loading: true });

    try {
      const response = await fetch(
        `/api/news?q=${query}&from=${from}&sortBy=${sortBy}&page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();

      this.setState({
        articles: data.articles,
        totalResults: data.totalResults || 0,
        loading: false,
        page
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  async componentDidMount() {
    this.fetchNews(this.state.page);
  }

  handlePrevClick = async () => {
    this.fetchNews(this.state.page - 1);
  };

  handleNextClick = async () => {
    const { page, totalResults } = this.state;
    const { pageSize } = this.props;

    if (page + 1 <= Math.ceil(totalResults / pageSize)) {
      this.fetchNews(page + 1);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <div className="container my-3">
          <h1 className="text-center">Exciting India - Top Headlines</h1>
        </div>
        {this.state.loading && <Loading />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
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
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
