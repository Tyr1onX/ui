const sourceModules = import.meta.glob("../components/**/*.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export function getComponentSource(path: string) {
  return sourceModules[`../${path}`] ?? "";
}
