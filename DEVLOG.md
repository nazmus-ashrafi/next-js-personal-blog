

# Development Log

## Commit 9 - 2025-12-07 - Added ProfEmail Technical Article Series

### Commit Message
```
git commit -m "articles: Add ProfEmail technical article series with architecture documentation"

- Add 5 comprehensive technical articles covering full-stack AI email system
- Include architecture diagrams and sequence flows in public/proj1_profEmail_images/
- Document authentication, OAuth2, email sync, and search features
- Improve homepage bio text size for better readability
```

### Changes
- **Added 5 comprehensive technical articles** documenting the ProfEmail AI Email Agent system:
  - `0_FULL_SYSTEM_ARCHITECTURE_ARTICLE.md` - Complete system architecture overview covering all 11 data flows
  - `1_USER_REGISTRATION_ARTICLE.md` - Deep dive into user registration with frontend/backend architecture
  - `2_OAUTH2_EMAIL_ACCOUNT_CONNECTION_ARTICLE.md` - OAuth2 flow for connecting email accounts
  - `3_EMAIL_SYNC_ARTICLE.md` - Delta sync implementation with Microsoft Graph API
  - `4_EMAIL_SEARCH_ARTICLE.md` - Email search feature architecture and implementation

- **Added supporting images** in `public/proj1_profEmail_images/` directory:
  - Authentication flow diagrams
  - OAuth2 sequence diagrams
  - Email sync architecture visuals
  - Search feature UI screenshots

- **UI improvements**:
  - Increased bio text size to `text-2xl` in `ClientHomePage.tsx` for better readability
  - Minor CSS adjustments in `app/globals.css`


### Technical Details
The article series provides comprehensive documentation of a full-stack AI email management system, covering:
- Frontend: Next.js, React Context, TypeScript
- Backend: FastAPI, SQLAlchemy, Pydantic
- AI: LangGraph workflows with OpenAI/Anthropic
- Security: JWT authentication, bcrypt hashing, OAuth2, token encryption
- External APIs: Microsoft Graph API integration

Each article includes code snippets, architecture diagrams, sequence flows, and security considerations, making it suitable for portfolio presentation and technical documentation.


## Commit 12 - 2025-12-08 - Hierarchical Subcategory System with Kibo UI Tree and Dark Theme

### Commit Message
```
git commit -m "feat: Implement hierarchical blog categories with Kibo UI Tree and dark theme

- Add 3-level hierarchy: Categories → Subcategories → Articles
- Integrate Kibo UI Tree component with animated expand/collapse
- Implement industrial dark theme with Apple SF Pro typography
- Add subcategory field to all ProfEmail articles
- Update type system and create getHierarchicalArticles() function
- Apply stone-950 dark background across entire page
```

### Summary
Transformed the blog from a flat 2-column category layout to a sophisticated hierarchical tree structure using Kibo UI components. Enhanced the type system with `SubcategoryGroup`, `CategoryWithSubcategories`, and `HierarchicalArticles` interfaces, and implemented `getHierarchicalArticles()` function in `lib/articles.ts` to build nested category → subcategory → articles structure. Created `components/CategoryTree.tsx` with TreeProvider, TreeView, and TreeNode components featuring animated expand/collapse, folder/file icons, and responsive date badges. Applied comprehensive dark theme with stone-950 background across html, body, and app wrapper elements, stone-900 gradient for tree container, and Apple SF Pro font stack for modern typography. Updated all 5 ProfEmail articles with `subcategory: "ProfEmail Series"` field. Color system uses stone-100/200/300 for text hierarchy and amber-400/500 for accent colors with smooth hover transitions. Includes comprehensive technical documentation in `commit12 - hierarchical subtree blog kibo -TECHNICAL_DOCUMENTATION.md`.



