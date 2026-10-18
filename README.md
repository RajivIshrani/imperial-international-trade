# Imperial International Trade Private Limited

Responsive, multi-page website built with Next.js App Router, TypeScript, and CSS. It is prepared for deployment on Vercel and uses the production domain `imperialinternationaltrade.com` for canonical metadata.

## Routes

- `/` — Home
- `/about` — About the company
- `/products` — Product overview
- `/products/butyl-reclaimed-rubber` — Butyl Reclaimed Rubber
- `/products/cotton-yarn` — Cotton Yarn and listed counts
- `/contact` — Contact details and enquiry form
- `/privacy-policy` — Website enquiry privacy information

## Run locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local` and configure the email variables (details below).
3. Run `npm install`.
4. Run `npm run dev` and open [http://localhost:3000](http://localhost:3000).
5. Run `npm run typecheck` to check TypeScript and `npm run build` to create the production build; `npm start` serves that build locally.

The site pages work without email credentials. The form validates inputs and shows a clear configuration message when email is not set up; it never reports success unless the email provider accepts the message.

## Enquiry email setup

The form submits to `app/api/enquiry/route.ts`, which validates all fields on the server, uses a honeypot for basic spam filtering, and sends through Resend. No enquiry API key is exposed in the browser, and enquiry details are not written to application logs.

Set these environment variables in `.env.local` for local use and in the Vercel project's **Settings → Environment Variables** for deployment:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from your Resend account |
| `ENQUIRY_TO` | Inbox receiving enquiries; default intended address is `connect@imperialinternationaltrade.com` |
| `ENQUIRY_FROM` | Sender identity using a domain verified with Resend, for example `Imperial International Trade <website@your-verified-domain.com>` |

Verify the sender domain with Resend and configure its requested DNS records before relying on email delivery. Add variables to Vercel for Production, Preview, and Development as appropriate, then redeploy after changing them. The email service account and domain verification may have separate provider limits or charges; ordinary site hosting does not require a paid Vercel plan.

## Publish with GitHub and Vercel

1. Create a GitHub repository and push this project, including `app/`, `components/`, `package.json`, and `package-lock.json` (created by `npm install`). Do not commit `.env.local` or real credentials.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js framework and default build settings.
3. Add the three email environment variables in project settings. The website itself deploys without these; form submissions return a visible configuration error until they are set.
4. Deploy. Vercel runs `npm run build` and hosts the app.
5. In **Settings → Domains**, add `imperialinternationaltrade.com` and optionally `www.imperialinternationaltrade.com`. Follow the DNS records Vercel shows at your registrar.
6. Preserve any existing MX and email-related DNS records when connecting the website domain. Configure the preferred `www` or apex redirect in Vercel if desired.

## Before launch

- Verify legal and product wording, email and phone details, and any jurisdiction-specific privacy disclosures.
- Verify the sending domain and test an enquiry end to end after setting Resend variables.
- Product photos are stored locally and rendered through Next.js Image with responsive sizing and WebP assets.
- The provided logo is used in the header and footer and as the site icon.
- Selected company-supplied rubber images are exported to optimized WebP files in `public/images/`; the original photos remain in `assets/`.
- Cotton yarn and port photos are illustrative stock images downloaded from Pexels and used under the [Pexels license](https://www.pexels.com/license/). Attribution is not required; source credits are recorded below.
- No street address, legal identifiers, certifications, testimonials, export history, factory ownership, supplier network, guaranteed quality, prices, or delivery commitments are claimed.

## Project structure

```text
app/
  about/page.tsx
  api/enquiry/route.ts
  contact/page.tsx
  products/page.tsx
  products/butyl-reclaimed-rubber/page.tsx
  products/cotton-yarn/page.tsx
  privacy-policy/page.tsx
  globals.css
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  contact-form.tsx
  site-chrome.tsx
public/
  logo.jpeg
  images/
    trade-port.webp
    cotton-yarn.webp
    rubber-sheets.webp
    rubber-packaged.webp
```

## Image credits and selection

- Homepage hero: “Cargo Containers at the Port” by Jimmy Chan, [Pexels photo 12999283](https://www.pexels.com/photo/cargo-containers-at-the-port-12999283/). A wide Hong Kong port scene used only to illustrate international trade.
- Cotton yarn: “White Threads in Factory” by Rajesh Kumar Verma, [Pexels photo 8246480](https://www.pexels.com/photo/white-threads-in-factory-8246480/). Illustrative textile production; it does not depict company stock, suppliers, or facilities.
- Butyl Reclaimed Rubber: company-confirmed material views from `IMG_9600.jpg` (sheet stacks) and `IMG_9605.jpg` (bagged material). The secondary image is inset on the specific product page. They do not depict a company-owned facility.
