import React, { memo } from "react";

function Home() {
  return (
    <article>
      <section>Home section 1</section>
      <section>Home section 2</section>
    </article>
  );
}

export default memo(Home);
