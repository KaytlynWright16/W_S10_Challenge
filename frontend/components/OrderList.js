import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useGetOrderQuery} from '../state/api';

export default function OrderList() {
  const {data: orders = []} = useGetOrderQuery();
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.size === filter)

const toppingsMap = {
  '1': 'Pepperoni',
  '2': 'Green Peppers',
  '3': 'Pineapple',
  '4': 'Mushrooms',
  '5': 'Ham'        
}

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((order, idx) => {
            return (
              <li key={idx}>
                <div>
                  {order.fullName} ordered a {order.size} pizza{order.toppings.length ? `with ${order.toppings.map(t => toppingsMap[t]).join(', ')}` : ' with no toppings'}}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={`button-filter${filter === size ? ' active' : ''}`}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
