import React from 'react';
import { Row, Col, Image, InputNumber, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as reselect from '../reselect/cart-reselect';
import * as actions from '../actions/index';

const ListCarts = () => {
  const dispatch = useDispatch();
  const { totalMoney, dataCart } = useSelector(createStructuredSelector({
    totalMoney: reselect.getTotalMoneyCart,
    dataCart: reselect.getDataCarts
  }));

  const changeItemQtyCart = (id, qty) => {
    dispatch(actions.changeQtyCart(id, qty));
  }

  const deleteItemCart = ( id ) => {
    dispatch(actions.removeItemCart(id));
  }

  return (
    <>
      <Row style={{margin: '10px 0px'}}>
        <Col span={24}>
          <h1 style={{ textAlign: 'center'}}> Carts </h1>
        </Col>
      </Row>
      {dataCart.length > 0
        ?  dataCart.map((item, index) => (
          <Row key={index} style={{ margin: '20px 0px', borderBottom: '1px solid #ccc', padding: '5px 0px' }}>
            <Col span={4}>
              <Image
                width={200}
                src={item.image}
              />
            </Col>
            <Col span={20} style={{padding: '8px'}}>
              <h3>{item.name}</h3>
              <p>Price : {item.price}</p>
              <p>Money: {parseInt(item.price)*item.qty}</p>
              <InputNumber
                min={1}
                max={10}
                defaultValue={item.qty}
                onChange={(val) => changeItemQtyCart(item.id, val)}
              />
              <Button
                type="dashed"
                onClick={() => deleteItemCart(item.id)}
              >Remove</Button>
            </Col>
          </Row>
        ))
        : null
      }
      <Row>
        <Col span={24}>
          <h2 style={{ textAlign:'right' }}>Tong tien: {totalMoney}</h2>
        </Col>
      </Row>
    </>
  )
}
export default React.memo(ListCarts);