# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "unstable"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    # pkgs.nodejs_24
    pkgs.bun
    pkgs.gh
    
  ];


  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "google.gemini-cli-vscode-ide-companion"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {

        # npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
        next-install = "mv .idx ~/idx_backup; bun create next-app@latest . --yes; mv ~/idx_backup .idx";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [
          # Cover all the variations of language, src-dir, router (app/pages)
          "pages/index.tsx" "pages/index.js"
          "src/pages/index.tsx" "src/pages/index.js"
          "app/page.tsx" "app/page.js"
          "src/app/page.tsx" "src/app/page.js"
        ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;



      previews = {
        web = {
          # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
          # and show it in IDX's web preview panel
          # command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          # command = ["bun" "dev" "--" "--host" "$HOST" "--port" "$PORT"];
          
          
          # command = ["bun" "dev" "--" "--host" "0.0.0.0" "--port" "$PORT"];

             command = [
          "bun"
          # "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];

          manager = "web";
          env = {
          #   # Environment variables to set for your server
            PORT = "9000";
            HOST = "0.0.0.0";
          };
        };
      };



    };
  };
}


