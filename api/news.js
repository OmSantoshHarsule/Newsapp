const axios = require("axios");

module.exports = async function (context, req) {
  const apiKey = process.env.NEWS_API_KEY;
  const { q, from, sortBy, page = 1, pageSize = 20 } = req.query;

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q,
        from,
        sortBy,
        page,
        pageSize,
        apiKey,
      },
    });

    context.res = {
      status: 200,
      body: response.data,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: "Failed to fetch news" },
    };
  }
};
