module.exports = {
  apps: [
    {
      name: "chamoy",
      cwd: "/var/www/chamoy",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3021",
      // Cluster de 2 instancias: permite `pm2 reload chamoy` sin downtime
      // (recarga una instancia a la vez, nginx nunca ve el backend caído).
      exec_mode: "cluster",
      instances: 2,
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
      time: true,
    },
  ],
};
