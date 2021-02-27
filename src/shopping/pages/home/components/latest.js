import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as reselect from '../reselect/home-reselect';
import { Row, Col } from 'antd';
import ListItems from './list-item';

const LatestPage = () => {
  const {loadingPd, latestPd } = useSelector(createStructuredSelector({
    loadingPd: reselect.loadingProductSelector,
    latestPd: reselect.latestSelector
  }));
  return (
    <>
      <Row style={{margin: '10px 0px'}}>
        <Col span={24}>
          <h2 style={{textAlign: 'center', margin: '10px 0px'}}>Latest Products</h2>
        </Col>
      </Row>
      <ListItems
        loading={loadingPd}
        data={latestPd}
      />
    </>
  )
}
export default React.memo(LatestPage);