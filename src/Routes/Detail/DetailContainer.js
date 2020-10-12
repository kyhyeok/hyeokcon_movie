import React from "react";
import { movieApi, tvApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      results: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let results = null;

    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedId));
        ({ data: results } = await movieApi.movieVideos(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: results } = await tvApi.showVideos(parsedId));
      }
      throw Error();
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, results });
    }
  }
  render() {
    const { result, results, loading, error } = this.state;
    return (
      <DetailPresenter
        result={result}
        videos={results}
        error={error}
        loading={loading}
      />
    );
  }
}
