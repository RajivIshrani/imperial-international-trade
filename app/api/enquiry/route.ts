import { NextResponse } from "next/server";
import { Resend } from "resend";
export const runtime = "nodejs";
const allowedProducts = ["Butyl Reclaimed Rubber", "Cotton Yarn", "Other sourcing enquiry"];
function clean(value: unknown, max = 3000) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
export async function POST(request: Request) {
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ error: "Please submit a valid enquiry form." }, { status: 400 }); }
  // Honeypot submissions receive a neutral response without sending email.
  if (clean(body.website)) return NextResponse.json({ ok: true });
  const data = { name: clean(body.name, 150), company: clean(body.company, 180), email: clean(body.email, 254), country: clean(body.country, 100), product: clean(body.product, 100), quantity: clean(body.quantity, 200), specifications: clean(body.specifications, 1500), message: clean(body.message, 5000) };
  const errors: Record<string,string> = {};
  if (!data.name) errors.name = "Enter your full name.";
  if (!data.company) errors.company = "Enter your company name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid business email address.";
  if (!allowedProducts.includes(data.product)) errors.product = "Choose a product of interest.";
  if (!data.message) errors.message = "Add a short message about your requirements.";
  if (Object.keys(errors).length) return NextResponse.json({ errors, error: "Please correct the highlighted fields." }, { status: 422 });
  const apiKey = process.env.RESEND_API_KEY; const to = process.env.ENQUIRY_TO; const from = process.env.ENQUIRY_FROM;
  if (!apiKey || !to || !from) return NextResponse.json({ error: "Enquiry email is not configured yet. Please email connect@imperialinternationaltrade.com directly." }, { status: 503 });
  try {
    const resend = new Resend(apiKey);
    const lines = [`Name: ${data.name}`, `Company: ${data.company}`, `Business email: ${data.email}`, `Country: ${data.country || "Not provided"}`, `Product: ${data.product}`, `Quantity: ${data.quantity || "Not provided"}`, `Specifications: ${data.specifications || "Not provided"}`, "", "Message:", data.message];
    const { error } = await resend.emails.send({ from, to, replyTo: data.email, subject: `Website enquiry: ${data.product}`, text: lines.join("\n") });
    if (error) { console.error("Enquiry email provider returned an error."); return NextResponse.json({ error: "Your enquiry could not be sent right now. Please try again or email us directly." }, { status: 502 }); }
    return NextResponse.json({ ok: true });
  } catch { console.error("Enquiry email send failed."); return NextResponse.json({ error: "Your enquiry could not be sent right now. Please try again or email us directly." }, { status: 502 }); }
}
