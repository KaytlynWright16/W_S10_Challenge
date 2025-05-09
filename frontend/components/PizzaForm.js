import React, {useReducer} from 'react'
import {usePostOrderMutation} from '../state/api'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': 
      return { ...state, [action.payload.name]: action.payload.value}
    case 'TOGGLE_TOPPING': 
      return {...state, [action.payload]: !state[action.payload]}
    case 'RESET': 
      return initialFormState 
    default: 
      return state 
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [postOrder, {isLoading, error, isSuccess}] = usePostOrderMutation();

  const onSubmit = async evt => {
    evt.preventDefault();
    const toppings = Object.keys(state).filter(k => ['1', '2', '3', '4', '5'].includes(k) && state[k])
    const payload = {fullName: state.fullName, size: state.size, toppings,}

    try {
      await postOrder(payload).unwrap()
      dispatch({type: 'RESET'})
    } catch (e) {}
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>Order failed: fullName is required</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={e => dispatch({type: 'CHANGE', payload: {name: 'fullName', value: e.target.value}})}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size} onChange={e => dispatch({type: 'CHANGE', payload: {name: 'size', value: e.target.value}})}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        {(() => {
          const labels = {
            '1': 'Pepperoni',
            '2': 'Green Peppers',
            '3': 'Pineapple',
            '4': 'Mushrooms',
            '5': 'Ham'
          }

          const testIds = {
            '1': 'checkPepperoni',
            '2': 'checkGreenpeppers',
            '3': 'checkPineapple',
            '4': 'checkMushrooms',
            '5': 'checkHam'
          }
          return ['1', '2', '3', '4', '5'].map(id => (
            <label key={id}>
              <input
                data-testidd={testIds[id]}
                name={id}
                type='checkbox'
                checked={state[id]}
                onChange={() => dispatch({type: 'TOGGLE_TOPPING', payload: id})}
                />
                {labels[id]}<br />
            </label>
          ))
        })}
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
