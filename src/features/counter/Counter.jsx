import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, reset, incrementByAmount } from './counterSlice'
import { useState } from 'react'

const Counter = () => {
    const count = useSelector((state) => state.counter.count)
    const dispatch = useDispatch()

    const [incrementAmount, setIncrementAmount] = useState(0);

    // this checks the input value is a number.
    const addValue = Number(incrementAmount) || "";

    const resetAll = () => {
        // resets incrementAmount to 0 
        // and the global count to 0 using the reset() action through dispatch.
        setIncrementAmount(0);
        dispatch(reset());
    }


  return (
    <div>
      <section>
        <p>{count}</p>
        <div>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>

        <input
        type='text'
        value={incrementAmount}
        onChange={(event) => setIncrementAmount(event.target.value)} />

        <div>
            <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
            <button onClick={resetAll}>Reset</button>
        </div>
       
      </section>
    </div>
  )
}

export default Counter
