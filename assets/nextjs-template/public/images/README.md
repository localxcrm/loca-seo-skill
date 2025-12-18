# Image Assets

Place your image files in the appropriate folders. All images should be optimized for web (compressed, appropriate dimensions).

## Required Images

### `/logos/`
- `logo.png` - Main business logo (recommended: 400x200px, transparent PNG)
- `logo-white.png` - White version for dark backgrounds (optional)
- `logo-icon.png` - Square icon version (recommended: 200x200px)

### `/projects/exterior-painting/`
Before/after project photos for exterior painting portfolio.

| File | Description | Recommended Size |
|------|-------------|------------------|
| `project-1-before.jpg` | Before photo - Project 1 | 1200x800px |
| `project-1-after.jpg` | After photo - Project 1 | 1200x800px |
| `project-2-before.jpg` | Before photo - Project 2 | 1200x800px |
| `project-2-after.jpg` | After photo - Project 2 | 1200x800px |

### `/projects/interior-painting/`
Before/after project photos for interior painting portfolio.

| File | Description | Recommended Size |
|------|-------------|------------------|
| `project-1-before.jpg` | Before photo - Project 1 | 1200x800px |
| `project-1-after.jpg` | After photo - Project 1 | 1200x800px |
| `project-2-before.jpg` | Before photo - Project 2 | 1200x800px |
| `project-2-after.jpg` | After photo - Project 2 | 1200x800px |

### `/badges/`
Membership and certification badges.

| File | Description | Recommended Size |
|------|-------------|------------------|
| `chamber-of-commerce.png` | Chamber of Commerce logo | 300x150px, transparent |
| `putnam-business-association.png` | Putnam Business Association logo | 300x150px, transparent |
| `bbb.png` | Better Business Bureau (if applicable) | 300x150px, transparent |
| `lead-safe.png` | EPA Lead-Safe Certified (if applicable) | 300x150px, transparent |

### `/brands/`
Product/brand logos for "Products We Use" section.

| File | Description | Recommended Size |
|------|-------------|------------------|
| `sherwin-williams.png` | Sherwin-Williams logo | 300x150px, transparent |
| `benjamin-moore.png` | Benjamin Moore logo | 300x150px, transparent |

## Image Optimization Tips

1. **Compress images** - Use tools like TinyPNG or Squoosh
2. **Use WebP format** - Better compression (provide JPG fallback)
3. **Lazy load** - Images below fold should use `loading="lazy"`
4. **Alt text** - All images need descriptive alt text for SEO
5. **Consistent aspect ratios** - Before/after pairs should match

## Adding More Projects

To add more project photos, follow the naming convention:
```
/projects/[service-slug]/project-[N]-before.jpg
/projects/[service-slug]/project-[N]-after.jpg
```

Then update `site.config.js` to include the new projects.
