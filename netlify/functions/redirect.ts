import type { HandlerEvent, HandlerContext } from "@netlify/functions";
import redirectJson from "../../data/redirect.json";
import falbackUrlJson from "../../data/fallback_url.json";

export const handler = async (event: HandlerEvent, context: HandlerContext) => {
  const url = new URL(event.rawUrl);
  const params = url.pathname.substring(1).split("/");
  const path = params[1] ? `/${params[1]}` : "";
  const { href, statusCode } = isHrfe(params[0]);

  return {
    statusCode,
    headers: {
      Location: href + path,
      "Referrer-Policy": "no-referrer",
    },
  };
};

type RedirectProps = {
  name: string;
  href: string;
  aliases?: string;
  statusCode?: number;
};

function isHrfe(params: string) {
  const data: any = redirectJson.filter((i: RedirectProps) => {
    return i.name === params || i.aliases === params;
  });

  return {
    href: (data[0] && removeTrailingSlash(data[0]?.href)) || falbackUrlJson.url,
    statusCode: data[0]?.statusCode || 302,
  };
}

function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, "");
}
