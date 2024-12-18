import { Suspense } from 'react';

import Router from "@/router";

function App() {
  return (
    <>
      <Suspense fallback={<div></div>}>
        <Router />
      </Suspense>
    </>
  );
}

export default App
