import requireContext from "require-context.macro";

const req =
  process.env.NODE_ENV === "test"
    ? requireContext(".", true, /\.\/[^/]+\/[^/]+\/index\.(ts|tsx|js)$/)
    : require.context(".", true, /\.\/[^/]+\/[^/]+\/index\.(ts|tsx|js)$/);

req.keys().forEach(key => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.(ts|tsx|js)/, "$1");
  module.exports[componentName] = req(key).default;
});
