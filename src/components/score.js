import React, { useState } from "react";
import { useTrail, animated } from "react-spring";
import "./score.css";

const config = { mass: 5, tension: 1000, friction: 200 };

function App({ list }) {
  let items = [];

  if (list.length > 0) {
    let i = 0;

    list.map(data => {
      i++;
      if (i < 6) {
        const score = `${i}. ${data.name}:  ${data.score}`;
        items.push(score);

        return `${i}. ${data.name}:  ${data.score}`;
      } else if (data.id === localStorage.getItem("subscriber")) {
        items.push(`${i}. YOUR POSITION:  ${data.score}`);
      }
    });
  }

  const [toggle, set] = useState(true);
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <div className="trails-main" onClick={() => set(state => !state)}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
            }}
          >
            <animated.div style={{ height }}>{items[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default App;
