import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as reselect from '../reselect/home-reselect';
import { Row, Col } from 'antd';
import ListItems from './list-item';

const TopSellingPage = () => {
  const {loadingPd, sellingPd } = useSelector(createStructuredSelector({
    loadingPd: reselect.loadingProductSelector,
    sellingPd: reselect.topSellingSelector
  }));
  return (
    <>
      <Row style={{margin: '10px 0px'}}>
        <Col span={24}>
          <h2 style={{textAlign: 'center', margin: '10px 0px'}}>Top selling Products</h2>
        </Col>
      </Row>
      <ListItems
        loading={loadingPd}
        data={sellingPd}
      />
    </>
  )
}
export default React.memo(TopSellingPage);