import { TINY } from "../tiny_config.js";

export default function auth(req, res) {

  const redirectUri = process.env.TINY_REDIRECT_URI;
  const clientId = process.env.TINY_CLIENT_ID;


  const url = `${TINY.auth_url}?` +
    `client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=openid`;

  return res.status(200).json({
    message: "Abra esta URL para login:",
    url
  });
}
