import { TINY } from "../tiny_config.js";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Nenhum code recebido." });
  }

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.TINY_REDIRECT_URI);
    params.append("client_id", process.env.TINY_CLIENT_ID);
    params.append("client_secret", process.env.TINY_CLIENT_SECRET);

    const tokenRes = await fetch(TINY.token_url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const data = await tokenRes.json();

    return res.status(200).json({
      status: "OK",
      message: "Token recebido com sucesso!",
      token: data
    });

  } catch (err) {
    return res.status(500).json({
      error: "Erro ao trocar code por token.",
      details: err.message
    });
  }
}
