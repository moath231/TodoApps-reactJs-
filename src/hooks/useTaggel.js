import { useState } from 'react';

function useTaggel(initialState = true) {
  const [visible, setvisible] = useState(initialState);

  function taggel() {
    setvisible((prevVisible) => !prevVisible);
  }

  return [visible, taggel];
}

export default useTaggel;
