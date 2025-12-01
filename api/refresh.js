import { TINY } from "../tiny_config.js";

export default async function handler(req, res) {
  try {
    const refreshToken = process.env.TINY_REFRESH_TOKEN;

    if (!refreshToken) {
      return res.status(400).json({
        error: "Missing refresh_token",
        message: "Configure TINY_REFRESH_TOKEN na Vercel."
      });
    }

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("client_id", process.env.TINY_CLIENT_ID);
    params.append("client_secret", process.env.TINY_CLIENT_SECRET);
    params.append("refresh_token", refreshToken);

    const tinyResponse = await fetch(TINY.token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await tinyResponse.json();

    if (data.error) {
      return res.status(400).json({
        error: data.error,
        error_description: data.error_description,
      });
    }

    return res.status(200).json({
      access_token: data.access_token,
      token_type: data.token_type,
      expires_in: data.expires_in,
    });

  } catch (e) {
    return res.status(500).json({
      error: "server_error",
      message: e.message,
    });
  }
}
