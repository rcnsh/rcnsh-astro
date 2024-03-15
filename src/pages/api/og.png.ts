import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async ({ url }) => {
  try {
    const { searchParams } = url;
    const GeistMono = fs.readFileSync(
      path.resolve("./public/fonts/GeistMono-Regular.otf"),
    );

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "No title provided.";

    const html = {
      type: "div",
      props: {
        style: {
          backgroundColor: "#181818",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: "data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1080 1080'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: %23305b99; %7D .cls-1, .cls-2, .cls-3 %7B stroke-width: 0px; %7D .cls-2 %7B fill: %235b66af; %7D .cls-3 %7B fill: %23181818; %7D %3C/style%3E%3C/defs%3E%3Crect class='cls-3' width='1080' height='1080'/%3E%3Cg%3E%3Cpolygon class='cls-2' points='947.67 500.78 902.38 579.22 857.08 657.67 766.48 657.67 811.77 579.22 857.07 500.78 766.48 500.78 721.19 579.22 675.88 657.67 585.3 657.67 630.59 579.22 539.99 579.22 585.28 500.78 675.88 500.78 675.88 500.76 721.17 422.31 902.38 422.31 902.38 422.33 947.67 500.78'/%3E%3Cpolygon class='cls-1' points='494.7 500.78 449.41 579.22 494.7 657.67 494.7 657.69 404.1 657.69 404.1 657.67 358.81 579.22 404.1 500.78 313.52 500.78 268.23 579.22 222.92 657.69 132.33 657.69 177.62 579.24 177.64 579.22 222.93 500.78 268.23 422.33 268.23 422.31 539.99 422.31 494.7 500.78'/%3E%3C/g%3E%3C/svg%3E",
                    alt: "RCN Logo",
                    width: 800,
                    height: 800,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: 50,
                right: 0,
                fontSize: 60,
                fontStyle: "normal",
                letterSpacing: "-0.025em",
                color: "white",
                marginTop: 30,
                padding: "0 120px",
                lineHeight: 1.4,
                whiteSpace: "pre-wrap",
                fontFamily: "Geist Mono",
              },
              children: title,
            },
          },
        ],
      },
    };

    return new ImageResponse(
      { ...html, key: "og-image" },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist Mono",
            data: Buffer.from(GeistMono.buffer),
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};
