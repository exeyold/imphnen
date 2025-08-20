export function startLog() {
  console.log(
    `RPC Server is running on (${detectRuntime()}): http://localhost:${process.env.RPC_PORT}`
  );
}

function detectRuntime() {
  if (typeof Bun !== "undefined") {
    return "BUN RUNTIME";
  } else if (
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.node
  ) {
    return "NODE RUNTIME";
  } else {
    return "UNKNOWN RUNTIME";
  }
}
