{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.corepack
  ];
  idx.extensions = [
    "dracula-theme.theme-dracula"
    "ms-vscode.vscode-typescript-next"
    "chadalen.vscode-jetbrains-icon-theme"
    "esbenp.prettier-vscode"
    "prisma.prisma"
    "bradlc.vscode-tailwindcss"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}