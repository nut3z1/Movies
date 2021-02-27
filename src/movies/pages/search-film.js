import React, { useState } from 'react';
import { Row, Col, Input, Card, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
import LayoutComponent from '../components/layout';
import { searchMovieByKeywords } from '../services/api';
import LoadingData from '../components/loading-data';

const { Search } = Input;
const { Meta } = Card;

const SearchFilmPage = () => {
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [listMovies, setListMovies] = useState([]);

  const changeInput = (event) => {
    const val = event.target.value;
    setKeyword(val);
  }

  const searchMovies = async (keywords = '', currentPage = 1) => {
    if(keywords.length > 0){
      setLoadingSearch(true);
      const data = await searchMovieByKeywords(keywords, currentPage);
      if(data){
        setListMovies(data.results);
        setTotalItems(data.total_results);
        setPage(currentPage);
        setLoadingSearch(false);
        window.scrollTo(0,0);
      }
    }
  }

  if(loadingSearch && listMovies.length === 0){
    return(
      <LayoutComponent>
        <LoadingData/>
      </LayoutComponent>
    )
  }

  return (
    <LayoutComponent>
      <Row style={{marginTop: '20px', marginBottom: '20px'}}>
        <Col span={12} offset={6}>
        <Search
          placeholder="input search text"
          onSearch={(val) => searchMovies(val, page)}
          enterButton
          onChange={changeInput}
          value={keyword}
        />
        </Col>
      </Row>
      <Row style={{marginTop: '20px', marginBottom: '20px'}}>
        {listMovies.map((item, index) => (
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
      {/* phan trang */}
      {listMovies.length > 0 && (
        <Row style={{marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>
          <Col span={24}>
            <Pagination
              current={page}
              total={totalItems}
              pageSize={20}
              onChange={(pages) => searchMovies(keyword, pages)}
            />
          </Col>
        </Row>
      )}
      
    </LayoutComponent>
  )
}
export default React.memo(SearchFilmPage);