# Vishal Patil – Portfolio Website

A responsive portfolio built with plain HTML, CSS and JavaScript (no build step, no dependencies).

#vishalcloudjourney

## Contents

```
index.html            Page markup (Home, About me, Technical skills, Projects, Education, Certifications, Contact)
css/style.css         Styles, light/dark themes, responsive layout
js/main.js            Theme toggle, mobile menu, AWS diagram, contact form
assets/vishal.jpg     Profile photo
assets/Vishal-Patil-Resume.pdf   Resume used by the "Download resume" button
assets/favicon.svg    Browser tab icon
```

## Preview locally

Open `index.html` in any browser. (Fonts load from Google Fonts when online; the site falls back to system fonts offline.)

## Deploy on GitHub Pages

1. Sign in to GitHub and create a new **public** repository, for example `vishal-patil-portfolio`.
   (Name it `VishalPatil-DevOps-AWS.github.io` if you want the site at the root URL `https://vishalpatil-devops-aws.github.io/`.)
2. Upload everything from this folder to the repository root, so `index.html` sits at the top level:
   - Web: **Add file → Upload files**, drag in `index.html`, `css`, `js`, `assets` and `README.md`, then **Commit changes**.
   - Or with Git:
     ```bash
     git init
     git add .
     git commit -m "Add portfolio website"
     git branch -M main
     git remote add origin https://github.com/VishalPatil-DevOps-AWS/vishal-patil-portfolio.git
     git push -u origin main
     ```
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then **Save**.
5. Wait one to two minutes. Your site appears at `https://vishalpatil-devops-aws.github.io/vishal-patil-portfolio/` (or the root URL if you used the `.github.io` repository name).

## Updating content

- Text: edit `index.html`.
- Resume: replace `assets/Vishal-Patil-Resume.pdf`, keeping the same file name.
- Photo: replace `assets/vishal.jpg`, keeping the same file name.
- Colours: change the variables at the top of `css/style.css`.

## Notes

- The contact form opens the visitor's email app with the message pre-filled, because GitHub Pages has no server to receive form data.
- Skills, projects, education and certifications come straight from the resume. Python is not listed on the resume, so it is not shown; add it to the Technical skills list in `index.html` once you want it included.
