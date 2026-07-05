# Despliegue Chamoy Colombia

La app corre en produccion con PM2:

```bash
pm2 describe chamoy
pm2 logs chamoy
pm2 reload /var/www/chamoy/ecosystem.config.cjs --only chamoy
```

## URLs actuales

- Produccion canonica: `https://chamoy.com.co/`
- `http://chamoy.com.co/` redirige a `https://chamoy.com.co/`
- `https://www.chamoy.com.co/` redirige a `https://chamoy.com.co/`
- Temporal por IP y puerto: `http://72.60.175.159:3021/`

## DNS requerido en Namecheap

El DNS debe mantenerse asi:

| Host | Tipo | Valor |
| --- | --- | --- |
| `@` | `A` | `72.60.175.159` |
| `www` | `A` | `72.60.175.159` |

Tambien sirve `www` como `CNAME` hacia `chamoy.com.co`, si Namecheap lo permite.

## SSL

SSL activo con Let's Encrypt:

```bash
certbot certificates | grep -A8 "Certificate Name: chamoy.com.co"
```

Validar:

```bash
curl -I https://chamoy.com.co/
curl https://chamoy.com.co/robots.txt
curl https://chamoy.com.co/sitemap.xml
```
