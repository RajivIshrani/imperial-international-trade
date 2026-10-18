# Imperial International Trade Private Limited — website

A responsive, multi-page static website designed for deployment on Vercel.

## Files
- `index.html` — home page
- `about.html` — company overview
- `products.html` — reclaimed rubber and cotton yarn product pages
- `contact.html` — contact details and enquiry form
- `assets/styles.css` — responsive styling
- `assets/site.js` — mobile navigation, current year, and email enquiry form

## Preview locally
Open `index.html` in a browser. For a local server, run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Deploy to Vercel
1. Create a GitHub repository and upload the contents of this folder (the HTML files and `assets` folder should be at the repository root).
2. In Vercel, choose **Add New → Project** and import the repository.
3. Select **Other** as the framework preset. No build command is needed; leave the output directory as `.` if Vercel asks for one.
4. Deploy. Vercel will provide a preview URL.
5. In the project’s **Settings → Domains**, add `imperialinternationaltrade.com` and optionally `www.imperialinternationaltrade.com`. Follow the exact DNS instructions Vercel shows for your domain registrar.

## Important notes before publishing
- The contact form uses a `mailto:` link. It opens the visitor's email app; this site does not send form submissions to a server or store them. For reliable lead capture, connect a form backend/service before launch.
- Images and fonts are loaded from Unsplash and Google Fonts, so those assets require an internet connection.
- The site does not claim certifications, a track record, customers, export volumes or guarantees.
- Cotton yarn count labels (`KH`, `CCH`, `KW`) are shown as provided and should be confirmed technically before a commercial offer.
- Confirm all product descriptions, contact details, legal company name, and any required statutory disclosures before publishing.
- If email is already configured for `imperialinternationaltrade.com`, do not delete or replace its MX records when adding website DNS records. Add only the records required by Vercel and preserve email-related DNS records.
