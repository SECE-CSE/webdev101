import React, { useState } from 'react';
import PricingCard from './PricingCard';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [name, setName] = useState<string>('sanju');
  const [is_disabled, setDisabled] = useState<boolean>(false);
  const [is_annual, setAnnual] = useState<boolean>(false);

  return (
    <div>
      <h1
        className={`text-2xl font-bold ${is_disabled ? 'text-red-500' : 'text-green-500'}`}
      >
        {is_disabled ? 'Input is disabled' : 'Everything is working alright!'}
      </h1>
      <h1 className="text-3xl font-bold">{count}</h1>
      <h1 className="text-3xl font-bold">{name}</h1>

      <input
        type="checkbox"
        id="pricing-toggle"
        value={is_annual ? 'annual' : 'monthly'}
        onChange={(e) => {
          setAnnual(e.target.checked);
        }}
      />

      <input
        type="text"
        id="name"
        value={name}
        className="border-2 border-gray-500 p-2 w-1/2 disabled:bg-gray-500 disabled:hover:cursor-not-allowed"
        disabled={is_disabled}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex flex-row gap-3">
        <button
          id="increase"
          onClick={() => {
            setCount(count + 1);
            setName('sanju kumar');
            setDisabled(false);
          }}
        >
          Increase
        </button>

        <button
          id="decrease"
          onClick={() => {
            setCount(count - 1);
            setName('sanju');
            setDisabled(true);
          }}
        >
          Decrease
        </button>
      </div>

      <PricingCard />
    </div>
  );
}
