import React from 'react';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;

const ListMoviesComponent = (props) => {
  return (
    <Row style={{marginTop: '20px', marginBottom: '20px'}}>
        {props.movies.map((item, index) => (
          <Col span={6} key={index}>
            <Link to={`/movie/${slugify(item.original_title)}~${item.id}`}>
              <Card
                hoverable
                style={{ width: 300, marginBottom: '15px', marginRight: '5px'}}
                cover={<img alt={item.title} src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />}
              >
                <Meta title={item.title} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
  )
}
ListMoviesComponent.propTypes = {
  movies: PropTypes.array.isRequired
}
export default React.memo(ListMoviesComponent);