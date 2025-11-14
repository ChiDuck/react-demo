import { Children } from "react";

export default function ContentSection({ children }) {
  return (
    <div className="content-section">
      {Children.map(children, (child) => (
        <div>{child}</div>
      ))}
    </div>
  );
}
