import React, { useRef } from 'react';

export default function OrganizationPosts () {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputVal = inputRef.current.value;
    console.log(`Input value: ${inputVal}`);
  }

  return (
    <>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='Input'>
          Input:
          <input type="text" ref={inputRef} />
        </label>
        <br/>
        <button type="submit">Submit</button>
      </form>
    </>
    
  );
}

