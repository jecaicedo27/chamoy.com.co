module.exports = {
  apps: [
    {
      name: "chamoy",
      cwd: "/var/www/chamoy",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3021",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
      time: true,
    },
  ],
};
