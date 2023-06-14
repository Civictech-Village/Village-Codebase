import React from "react";

function HomePage() {
  return (
    <>
      <h1>
        Village
      </h1>
      <p>
        Welcome to Village
      </p>
    </>
  );
}

const paragraphs = (
  <div id="i-am-the-outermost-element">
    <p>I am a paragraph.</p>
    <p>I, too, am a paragraph.</p>
  </div>
);

export default function App() {
  return (
    <>
      <paragraphs/>
      <HomePage />
    </>
  );
}
