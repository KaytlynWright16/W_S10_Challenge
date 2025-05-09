import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useGetOrderQuery} from '../state/api';

export default function OrderList() {
  const {data: orders = []} = useGetOrderQuery();
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.size === filter)


  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map((order, idx) => {
            return (
              <li key={idx}>
                <div>
                  {order.fullName} ordred a {order.size} pizza with: 
                  {order.toppings.map(id => {
                    
                    const toppingsMap = {'1': 'Peperoni', '2': 'Green Pepers', '3': 'Pineapple', '4': 'Mushrooms', '5': 'Ham'}
                    return `${toppingsMap[id] || ''}`
                  }).join(', ')}
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
