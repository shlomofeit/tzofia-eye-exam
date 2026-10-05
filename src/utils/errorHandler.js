export function errorCreator(status, message) {
  return Object.assign(new Error(message), { status });
}

export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Page not found`,
  });
}

export function errorHandler(err, req, res, _next) {
  console.error(err);
  let status = err.status || err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "ZodError") {
    status = 400;
    message = err.issues[0].message;
  }

  if (status >= 500) message = "Internal Server Error";
  return res.status(status).json({ success: false, message });
}
