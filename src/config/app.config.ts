const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://192.168.123.20:8080/api",
  apiUrlV1:
    import.meta.env.VITE_API_URL_V1 || "http://192.168.123.20:8080/api/v1",
  apiUrlAdminV1:
    import.meta.env.VITE_API_URL_ADMIN_V1 ||
    "http://192.168.123.20:8080/api/v1/admin",
};

export default config;
