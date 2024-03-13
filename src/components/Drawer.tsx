import { Drawer } from "vaul";
import {
  MenuIcon,
  HomeIcon,
  MusicIcon,
  MonitorIcon,
  GithubIcon,
  YoutubeIcon,
  NotebookIcon,
  CpuIcon,

} from "lucide-react";
import { cn } from "../lib/utils";
import Spotify from "./Spotify";

export default function MobileDrawer() {
  const url = window.location.pathname;

  return (
    <Drawer.Root>
      <button>
        <Drawer.Trigger>
          <MenuIcon size={32} color="#c5c0b8" className="block lg:hidden" />
        </Drawer.Trigger>
      </button>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[80%] flex-col rounded-t-lg bg-gradient-to-br from-[#111111] to-[#303030]">
          <div className="flex-1 overflow-y-auto rounded-t-lg bg-[#171717]">
            <div className="pointer-events-none sticky inset-x-0 top-0 flex h-10 items-center justify-center overflow-hidden bg-gradient-to-b from-[#305b99] to-[#5b66af]">
              <div className="h-1.5 w-12 shrink-0 rounded-full bg-gray-300" />
            </div>
            <div className="p-4">
              <div className="flex w-full flex-col text-sm">
                <div className="gap-4">
                  <div className="link-card inline-flex items-center gap-2 p-2">
                    <svg
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1080 1080"
                      className="w-[64px] h-[64px] rounded-full"
                    >
                      <rect
                        className="fill-[#181818] stroke-none"
                        width="1080"
                        height="1080"
                      ></rect>
                      <g>
                        <polygon
                          className="fill-[#5b66af] stroke-none"
                          points="947.67 500.78 902.38 579.22 857.08 657.67 766.48 657.67 811.77 579.22 857.07 500.78 766.48 500.78 721.19 579.22 675.88 657.67 585.3 657.67 630.59 579.22 539.99 579.22 585.28 500.78 675.88 500.78 675.88 500.76 721.17 422.31 902.38 422.31 902.38 422.33 947.67 500.78"
                        ></polygon>
                        <polygon
                          className="fill-[#305b99] stroke-none"
                          points="494.7 500.78 449.41 579.22 494.7 657.67 494.7 657.69 404.1 657.69 404.1 657.67 358.81 579.22 404.1 500.78 313.52 500.78 268.23 579.22 222.92 657.69 132.33 657.69 177.62 579.24 177.64 579.22 222.93 500.78 268.23 422.33 268.23 422.31 539.99 422.31 494.7 500.78"
                        ></polygon>
                      </g>
                    </svg>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-tight text-[#cdc8c2]">
                        Jacob Wiltshire
                      </span>
                      <span className="text-[#cdc8c2]">Student</span>
                    </div>
                  </div>
                  <hr className="bg-[#363b3d] border-none h-[2px] mt-2" />
                  <div className="flex flex-col gap-1 py-4">
                    <a
                      href={"/"}
                      className={cn(
                        "group flex items-center justify-between rounded-lg p-2 text-[#cdc8c2]",
                        url.split("/")[3] === ""
                          ? "bg-[#25282a] text-[#181818] pointer-events-none"
                          : "hover:bg-[#25282a]",
                      )}
                    >
                      <span className="flex items-center justify-between gap-2 text-[#cdc8c2] w-full">
                        <span className="flex items-center gap-2">
                          <HomeIcon />
                          <span
                            className={cn(
                              "font-medium",
                              url.split("/")[3] === "" && "text-[#cdc8c2]",
                            )}
                          >
                            Home
                          </span>
                        </span>
                      </span>
                    </a>
                    <a
                      href={"/games"}
                      className={cn(
                        "group flex items-center justify-between rounded-lg p-2 text-[#cdc8c2]",
                        url.split("/")[3] === "games"
                          ? "bg-[#25282a] text-[#cdc8c2] pointer-events-none"
                          : "hover:bg-[#25282a]",
                      )}
                    >
                      <span className="flex items-center justify-between gap-2 text-[#cdc8c2] w-full">
                        <span className="flex items-center gap-2">
                          <MonitorIcon />
                          <span
                            className={cn(
                              "font-medium",
                              url.split("/")[3] === "games" && "text-[#cdc8c2]",
                            )}
                          >
                            Games
                          </span>
                        </span>
                      </span>
                    </a>
                    <a
                      href={"/music"}
                      className={cn(
                        "group flex items-center justify-between rounded-lg p-2 text-[#cdc8c2]",
                        url.split("/")[3] === "/music"
                          ? "bg-[#25282a] text-[#181818] pointer-events-none"
                          : "hover:bg-[#25282a]",
                      )}
                    >
                      <span className="flex items-center justify-between gap-2 text-[#cdc8c2] w-full">
                        <span className="flex items-center gap-2">
                          <MusicIcon />
                          <span
                            className={cn(
                              "font-medium",
                              url.split("/")[3] === "music" && "text-[#cdc8c2]",
                            )}
                          >
                            Music
                          </span>
                        </span>
                      </span>
                    </a>
                    <a
            href={"/guestbook"}
            className={cn(
              "group flex items-center justify-between rounded-lg p-2 text-[#cdc8c2]",
              url.split("/")[3] === "guestbook"
                ? "bg-gradient-to-br from-[#303030] to-[#111111] text-[#cdc8c2] pointer-events-none"
                : "hover:bg-gradient-to-br from-[#303030] to-[#111111]",
            )}
          >
            <span
              className="flex items-center justify-between gap-2 text-[#cdc8c2] w-full"
            >
              <span className="flex items-center gap-2">
                <NotebookIcon />
                <span
                  className={cn(
                    "font-medium",
                    url.split("/")[3] === "guestbook" && "text-[#cdc8c2]",
                  )}
                >
                  Guestbook
                </span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                ></path>
                <path
                  d="M10 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3"
                ></path>
              </svg>
            </span>
          </a>
                  </div>
                </div>
                <hr className="bg-[#363b3d] border-none h-[2px]" />
                <div className="flex flex-col gap-2 mt-2">
                  <a
                    href="https://go.rcn.sh/github"
                    className="group flex items-center justify-between rounded-lg p-2 text-[#cdc8c2] hover:bg-[#25282a]"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="flex items-center justify-between gap-2 text-[#cdc8c2] w-full">
                      <span className="flex items-center gap-2">
                        <GithubIcon />
                        <span className="font-medium">GitHub</span>
                      </span>
                    </span>
                  </a>
                  <a
                    href="https://go.rcn.sh/yt"
                    className="group flex items-center justify-between rounded-lg p-2 text-[#cdc8c2] hover:bg-[#25282a]"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="flex items-center justify-between gap-2 text-[#cdc8c2] w-full">
                      <span className="flex items-center gap-2">
                        <YoutubeIcon />
                        <span className="font-medium">YouTube</span>
                      </span>
                    </span>
                  </a>
                  <a
                    href="https://go.rcn.sh/valorant"
                    className="group flex items-center justify-between rounded-lg p-2 text-[#cdc8c2] hover:bg-[#25282a]"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="flex items-center justify-between gap-2 text-[#cdc8c2] w-full">
                      <span className="flex items-center gap-2">
                        <CpuIcon />
                        <span className="font-medium">Valorant Tracker</span>
                      </span>
                    </span>
                  </a>
                </div>
                <div className="flex flex-col gap-2 text-sm flex-1 mt-auto">
                  <Spotify />
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
