import React, { useState, useCallback } from 'react';

const Button = () => {
  const [cnt, setCnt] = useState<number>(0);
  const increment = useCallback(() => setCnt(prev => prev + 1), [setCnt]);

  return (
    <button onClick={increment}>{cnt ? `${cnt}회 클릭됨` : '테스트 버튼'}</button>
  );
}

export default Button;