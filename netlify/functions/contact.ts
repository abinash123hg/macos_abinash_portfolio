const escapeHtml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");
const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const contactDailyLimit = 2;
const contactWindowMs = 24 * 60 * 60 * 1000;
const apiError = (status: number, code: string, message: string) => Response.json({ success: false, error: { code, message } }, { status });

export default async (request: Request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ success: false, error: { code: "METHOD_NOT_ALLOWED", message: "This request method is not supported." } }), { status: 405, headers: { "Allow": "POST", "Content-Type": "application/json" } });
  }

  const { name, email, subject, message, website } = await request.json().catch(() => ({}));
  if (typeof website === "string" && website.trim()) {
    return new Response(null, { status: 204 });
  }

  const clientIp = request.headers.get("x-nf-client-connection-ip") || "unknown";
  const now = Date.now();
  const usage = contactAttempts.get(clientIp);
  const activeUsage = usage && usage.resetAt > now ? usage : { count: 0, resetAt: now + contactWindowMs };
  if (activeUsage.count >= contactDailyLimit) {
    return new Response(JSON.stringify({ success: false, error: { code: "RATE_LIMITED", message: "Too many requests. Please wait a moment and try again." } }), { status: 429, headers: { "Retry-After": String(Math.ceil((activeUsage.resetAt - now) / 1000)), "Content-Type": "application/json" } });
  }
  const values = [name, email, subject, message];
  if (values.some(value => typeof value !== "string" || !value.trim())) {
    return apiError(422, "VALIDATION_ERROR", "Some information is missing or invalid.");
  }

  if (name.trim().length > 120 || subject.trim().length > 200 || message.trim().length > 5000 || email.trim().length > 254) {
    return apiError(422, "VALIDATION_ERROR", "Some information is missing or invalid.");
  }

  const normalizedEmail = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return apiError(422, "VALIDATION_ERROR", "Some information is missing or invalid.");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.MAIL_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    return apiError(503, "SERVICE_UNAVAILABLE", "This service is temporarily unavailable. Please try again shortly.");
  }

  let providerResponse: Response;
  try {
    providerResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${process.env.MAIL_FROM_NAME || "Abinash Swain Portfolio"} <${fromEmail}>`,
        to: [process.env.CONTACT_RECEIVER_EMAIL || process.env.MAIL_TO_EMAIL || "swainabinash839@gmail.com"],
        reply_to: normalizedEmail,
        subject: `Portfolio contact: ${subject.trim()}`,
        text: `Name: ${name.trim()}\nReply email: ${normalizedEmail}\n\n${message.trim()}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(name.trim())}</p><p><strong>Reply email:</strong> ${escapeHtml(normalizedEmail)}</p><p>${escapeHtml(message.trim()).replace(/\n/g, "<br>")}</p>`,
        headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
      }),
    });
  } catch (error) {
    console.error("Resend API error:", error);
    return apiError(502, "BAD_GATEWAY", "A connected service returned an invalid response.");
  }

  if (!providerResponse.ok) {
    console.error("Resend API Error:", await providerResponse.text());
    return apiError(502, "BAD_GATEWAY", "A connected service returned an invalid response.");
  }

  contactAttempts.set(clientIp, { count: activeUsage.count + 1, resetAt: activeUsage.resetAt });
  return Response.json({ success: true });
};