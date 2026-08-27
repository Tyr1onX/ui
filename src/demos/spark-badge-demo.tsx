import { SparkBadge } from "../../components/effects";

export function SparkBadgeDemo() {
  return (
    <div
      style={{
        height: 384,
        overflow: "hidden",
        borderRadius: 13,
        background: "#000",
      }}
    >
      <SparkBadge sourceUrl="spark-badge.html" />
    </div>
  );
}
