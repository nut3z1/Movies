import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Card } from 'antd';
import LayoutComponent from '../components/layout';
import { getDataMoviesById } from '../services/api';
import LoadingData from '../components/loading-data';

const { Meta } = Card;

const DetailMoviePage = () => {
  const { id } = useParams(); // lay dc params tu url xuong
  // call api dua id cua bo phim
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [detailMovie, setDetailMovie] = useState({});

  useEffect(() => {
    const getData = async () => {
      setLoadingDetail(true);
      const data = await getDataMoviesById(id);
      if(data){
        setDetailMovie(data);
        setLoadingDetail(false);
      }
    }
    getData();
  }, [id]);
  // check object detailMovie khong rong
  if(loadingDetail && Object.keys(detailMovie).length === 0 && detailMovie.constructor === Object){
    return (
      <LayoutComponent>
        <LoadingData/>
      </LayoutComponent>
    )
  }
  // console.log(detailMovie);

  return (
    <LayoutComponent>
      <Row style={{marginTop: '20px', marginBottom: '20px'}}>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<img alt={detailMovie.title} src={`https://image.tmdb.org/t/p/w300${detailMovie.poster_path}`} />}
          >
            <Meta title={detailMovie.tagline} />
          </Card>
        </Col>
        <Col span={12}>
          <h1>{detailMovie.title}</h1>
          <p>{detailMovie.overview}</p>
          <p>Vote average : {detailMovie.vote_average} - Vote count : {detailMovie.vote_count}</p>
        </Col>
        <Col span={6}>
          <Row>
            {detailMovie.images !== undefined ? detailMovie.images.backdrops.map((item, index) => (
              <Col span={24} key={index}>
                <Card
                  hoverable
                  bordered={false}
                  style={{ width: 300 }}
                  cover={<img alt={detailMovie.title} src={`https://image.tmdb.org/t/p/w300${item.file_path}`} />}
                >
                </Card>
              </Col>
            )) : null}
          </Row>
        </Col>
      </Row>
    </LayoutComponent>
  )
}
export default React.memo(DetailMoviePage);