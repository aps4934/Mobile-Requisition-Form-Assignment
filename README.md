# Shadcn-UI Template Usage Instructions

## Technology stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

All shadcn/ui components have been downloaded under `@/components/ui`.

## File Structure

- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration file
- `tailwind.config.js` - Tailwind CSS configuration file
- `package.json` - NPM dependencies and scripts
- `src/app.tsx` - Root component of the project
- `src/main.tsx` - Project entry point
- `src/index.css` - Existing CSS configuration
- `src/pages/Index.tsx` - Home page logic

## Components

- All shadcn/ui components are pre-downloaded and available at `@/components/ui`

## Styling

- Add global styles to `src/index.css` or create new CSS files as needed
- Use Tailwind classes for styling components

## Development

- Import components from `@/components/ui` in your React components
- Customize the UI by modifying the Tailwind configuration

## Note

- The `@/` path alias points to the `src/` directory
- In your typescript code, don't re-export types that you're already importing

# Commands

**Install Dependencies**

```shell
npm i
```

**Add Dependencies**

```shell
npm add some_new_dependency

**Start Preview**

```shell
npm run dev
```

**To build**

```shell
npm run build
```

## Project Structure

```
Mobile-Requisition-Form-Assignment/
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── template_config.json
├── todo.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── components/
    │   ├── HeaderBar.tsx
    │   └── ThemeToggle.tsx
    ├── components/ui/
    │   ├── accordion.tsx
    │   ├── alert-dialog.tsx
    │   ├── alert.tsx
    │   ├── aspect-ratio.tsx
    │   ├── avatar.tsx
    │   ├── badge.tsx
    │   ├── breadcrumb.tsx
    │   ├── button.tsx
    │   ├── calendar.tsx
    │   ├── card.tsx
    │   ├── carousel.tsx
    │   ├── chart.tsx
    │   ├── checkbox.tsx
    │   ├── collapsible.tsx
    │   ├── command.tsx
    │   ├── context-menu.tsx
    │   ├── dialog.tsx
    │   ├── drawer.tsx
    │   ├── dropdown-menu.tsx
    │   ├── form.tsx
    │   ├── hover-card.tsx
    │   ├── input-otp.tsx
    │   ├── input.tsx
    │   ├── label.tsx
    │   ├── menubar.tsx
    │   ├── navigation-menu.tsx
    │   ├── pagination.tsx
    │   ├── popover.tsx
    │   ├── progress.tsx
    │   ├── radio-group.tsx
    │   ├── resizable.tsx
    │   ├── scroll-area.tsx
    │   ├── select.tsx
    │   ├── separator.tsx
    │   ├── sheet.tsx
    │   ├── sidebar.tsx
    ├── skeleton.tsx
    │   ├── slider.tsx
    │   ├── sonner.tsx
    │   ├── switch.tsx
    │   ├── table.tsx
    │   ├── tabs.tsx
    │   ├── textarea.tsx
    │   ├── toast.tsx
    │   ├── toaster.tsx
    │   ├── toggle-group.tsx
    │   ├── toggle.tsx
    │   ├── tooltip.tsx
    │   └── use-toast.ts
    ├── hooks/
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    ├── lib/
    │   ├── pdf.ts
    │   ├── storage.ts
    │   └── utils.ts
    └── pages/
        ├── FormList.tsx
        ├── Index.tsx
        └── NotFound.tsx

## Developer Details

Created by Aditya Pratap Singh

*   [LinkedIn](https://www.linkedin.com/in/aps4934g/)
*   [GitHub](https://github.com/aps4934)
*   [Portfolio](https://portfolio-3hns.onrender.com/)
