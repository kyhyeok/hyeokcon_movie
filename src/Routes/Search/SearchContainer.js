import React from "react";
import { movieApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieResult: null,
    tvResult: null,
    searchTerm: "",
    loading: false,
    error: null
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  updateTerm = (event) => {
    const {
      target: { value }
    } = event;
    this.setState({
      searchTerm: value
    });
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    try {
      const {
        data: { results: movieResult }
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResult }
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResult,
        tvResult
      });
      this.setState({ loading: true });
    } catch {
      this.setState({ error: "Can't  find results" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResult, tvResult, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResult={movieResult}
        tvResult={tvResult}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
