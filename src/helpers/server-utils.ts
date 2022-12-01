export const getRequestHeaders = () => ({
  authorization: `Bearer ${process.env.BEARER_TOKEN}`,
});
