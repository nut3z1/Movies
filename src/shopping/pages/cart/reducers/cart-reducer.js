import * as types from '../actions/types';

const initialState = {
  loadingCart: false,
  dataCart: [],
  /*[{
    id: 1,
    name: 'asas',
    image: '121212',
    price: 121223,
    qty: 1
  }]*/
  errorCart: null,
  totalMoney: 0,
  countItems: 0
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_ADD_CART:
      return {...state, loadingCart: action.loading}
    case types.STOP_ADD_CART:
      return {...state, loadingCart: action.loading}
    case types.ADD_CART_SUCCESS:
      const infoPd = action.data;
      // thong tin chi tiet cua san phan lay api de them vao cart
      // can kiem tra xem gio hang da co san pham nao chua ?
      // neu chua thi them moi san pham luon
      if(!state.dataCart){
        infoPd.qty = 1; // them qty vao - mac dinh la 1
        return {
          ...state,
          dataCart:[...state.dataCart, infoPd],
          errorCart: null,
          totalMoney: parseInt(state.totalMoney) + parseInt(infoPd.price),
          countItems: state.countItems + 1 // mac dinh la 0 + 1 = 1
        }
      } else {
        // da ton tai it nhat 1 san pham trong gio hang
        // kiem tra san pham dang ton tai do co dung la san pham dang them vao cart khong ?
        // neu dung chi cap lai so luong
        // sai them moi nhu ban dau
        const idPd = action.data.id;
        const searchPd = state.dataCart.filter(item => item.id === idPd)[0];
        if(searchPd){
          searchPd.qty += 1;
          return {
            ...state,
            errorCart: null,
            totalMoney: parseInt(state.totalMoney) + parseInt(infoPd.price)
          }
        } else {
          infoPd.qty = 1; // them qty vao - mac dinh la 1
          return {
            ...state,
            dataCart:[...state.dataCart, infoPd],
            errorCart: null,
            totalMoney: parseInt(state.totalMoney) + parseInt(infoPd.price),
            countItems: state.countItems + 1
          }
        }
      }
    case types.ADD_CART_FAILURE:
      return {
        ...state,
        errorCart: action.error,
        dataCart: [],
        totalMoney: 0
      }
    case types.CHANGE_QTY:
      const idCart = action.id;
      const qtyCart = action.qty;
      const changeItem = state.dataCart.filter(item => item.id === idCart)[0]; // dung san pham ma nguoi dung muon cap nhat lai so luong mua;
      // cap nhat lai so luong mua
      changeItem.qty = qtyCart;
      //cap nhat tong tien
      // duyet lai du lieu cart + cong don tien lai
      const newTotalMoney = state.dataCart.map(item => parseInt(item.price) * parseInt(item.qty)).reduce((pre, next) => pre + next);
      return {
        ...state,
        errorCart: null,
        totalMoney: newTotalMoney
      }
    case types.DELETE_ITEM_CART:
      const idItemDel = action.id;
      // can lay ra dc san pham ma nguoi muo xoa
      const delItem = state.dataCart.filter(item => item.id === idItemDel)[0];
      // lay ra toan bo san pham khong chua san pham ma nguoi dung da xoa
      const newsItems = state.dataCart.filter(item => item.id !== idItemDel);
      // tong tien da co tru bo tien vua bi xoa;
      const newsTotalMoney = state.totalMoney - (parseInt(delItem.price) * delItem.qty);
      return {
        ...state,
        dataCart: newsItems,
        totalMoney: newsTotalMoney,
        errorCart: null,
        countItems: state.countItems - 1
      }
    default:
      return state;
  }
}