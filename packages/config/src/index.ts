const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN;

if (!baseDomain) {
  throw new Error("NEXT_PUBLIC_BASE_DOMAIN is not set");
}

const appConfig = {
  name: "DocBird",
  foundingDate: new Date("2024-10-01"),

  baseUrl: "http://localhost.com:3000",
  appUrl: "http://localhost.com:3001",
  apiUrl: "http://api.localhost.com:3001",
  adminUrl: "http://admin.localhost.com:3001",

  storageUrl: `https://storage.${baseDomain}`,
  assetsUrl: `https://assets.${baseDomain}`,
  cdnUrl: `https://cdn.${baseDomain}`,

  logo: `https://assets.${baseDomain}/logo.png`,
  wordmark: `https://assets.${baseDomain}/wordmark.png`,
  thumbnail: `https://assets.${baseDomain}/thumbnail.jpg`,

  cookies: {
    secure: false,
    domain: ".localhost.com",
  },
};

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
  appConfig.baseUrl = `https://preview.${baseDomain}`;
  appConfig.appUrl = `https://app-preview.${baseDomain}`;
  appConfig.apiUrl = `https://api-preview.${baseDomain}`;
  appConfig.adminUrl = `https://admin-preview.${baseDomain}`;

  appConfig.cookies.secure = true;
  appConfig.cookies.domain = `.${baseDomain}`;
}

if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
  appConfig.baseUrl = `https://${baseDomain}`;
  appConfig.appUrl = `https://app.${baseDomain}`;
  appConfig.apiUrl = `https://api.${baseDomain}`;
  appConfig.adminUrl = `https://admin.${baseDomain}`;

  appConfig.cookies.secure = true;
  appConfig.cookies.domain = `.${baseDomain}`;
}

export { appConfig };
