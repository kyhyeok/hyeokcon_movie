import React from "react";
import PropTypes, { exact } from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Youtube from "react-youtube";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
  position: relative;
`;

const Title = styled.h4`
  font-size: 30px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overviwe = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const TrailerContainer = styled.div`
  position: absolute;
  bottom: 5px;
`;

const Trailer = styled.div`
  display: flex;
`;

const opts = {
  height: "200",
  width: "100%"
};

const DetailPresenter = ({ result, videos, loading, error }) => (
  <>
    <Helmet>
      <title>Loading | Hyeokcon-Movie</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : error ? (
      <Container>
        <Helmet>
          <title>
            {result?.original_title
              ? result.original_title
              : result.original_name}{" "}
            | Hyeokcon-Movie
          </title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result?.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/Neumann.gif")
            }
          />
          <Data>
            <Title>
              {result?.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                created_at :{" "}
                {result?.release_date
                  ? result.release_date
                  : result.first_air_date}
              </Item>
              <Divider>•</Divider>
              <Item>
                runingTime :{" "}
                {result?.runtime ? result.runtime : result.episode_run_time} min
              </Item>
              <Divider>•</Divider>
              <Item>
                genres :{" "}
                {result?.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
              <Divider>•</Divider>
              <Item>
                language :{" "}
                {result?.original_language && result.original_language}
              </Item>
              <Divider>•</Divider>
              <Item>
                <a
                  href={
                    result?.imdb_id
                      ? `https://www.imdb.com/title/${result.imdb_id}`
                      : "https://kyhyeok.github.io/hyeokcon_movie"
                  }
                  target="blank"
                >
                  IMDB
                </a>
              </Item>
              <TrailerContainer>
                <Trailer>
                  {videos?.results &&
                    videos?.results.map((result) => (
                      <Youtube videoId={result.key} opts={opts} />
                    ))}{" "}
                </Trailer>
              </TrailerContainer>
            </ItemContainer>
            <Overviwe>{result?.overview && result.overview}</Overviwe>
          </Data>
        </Content>
      </Container>
    ) : (
      <Message text={error} color="#e74c3c" />
    )}
  </>
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
