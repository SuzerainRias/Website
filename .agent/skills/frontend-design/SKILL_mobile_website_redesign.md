# SKILL.md - Mobile Website Redesign With Full Feature Preservation

## Purpose

Use this skill to redesign an existing website for mobile browsers **without losing features, content, task flow, brand identity, information architecture, or conversion paths**. The job is not to make a smaller desktop site. The job is to preserve the product and adapt the interface to mobile constraints: narrow viewports, touch input, dynamic browser chrome, virtual keyboards, orientation changes, lower bandwidth, and stricter performance budgets.

This skill assumes:
- the desktop site already exists,
- the mobile redesign must preserve functional parity unless the user explicitly authorizes a change,
- responsive behavior must be resilient across current mobile browsers,
- accessibility and performance are part of the redesign, not post-processing.

## Non-negotiable rules

1. **Do not remove features to make the layout fit.** Re-express them.
2. **Do not remove steps from a user flow unless the user explicitly asks.** Compress visually, not logically.
3. **Do not hide important content behind hover-only behavior.** Mobile has no reliable hover.
4. **Do not rely on device-class breakpoints.** Let the content and components determine breakpoints.
5. **Do not lock orientation unless the content is inherently orientation-dependent.**
6. **Do not disable zoom** with `user-scalable=no`, `maximum-scale=1`, or similar.
7. **Do not create horizontal scrolling for primary page content.** If overflow is unavoidable for a specific component, isolate it to that component.
8. **Do not make gestures the only way to operate controls.** Every gesture-heavy interaction needs a simple tap-based alternative.
9. **Do not ship motion-heavy transitions without reduced-motion handling.**
10. **Do not sacrifice performance to preserve visual fidelity.** Preserve the design system while reducing transfer cost, main-thread work, and layout instability.

## Outcome definition

A redesign is complete only when all of the following are true:
- All user-critical desktop features exist on mobile.
- All primary user journeys can be completed with one hand, touch, and the on-screen keyboard.
- Layout adapts to small, large, and dynamic mobile viewports.
- No key content depends on hover.
- Forms use mobile-appropriate keyboards and autofill semantics.
- Images, media, navigation, tables, filters, search, and dialogs remain usable at narrow widths.
- Accessibility passes are built into the implementation.
- Mobile performance is inside target budgets.

## Required mindset

Treat the redesign as a **feature-parity transformation** under constrained I/O.

You are not designing a separate “lite” site. You are building a mobile expression of the same product.

Preserve, in order:
1. business-critical functionality,
2. information architecture,
3. task sequence and decision points,
4. content hierarchy,
5. visual identity,
6. aesthetic details.

When tradeoffs are unavoidable, preserve higher-order structure before lower-order ornament.

## Inputs to collect before changing anything

Create an explicit inventory first.

### 1) Page inventory
For each page/template, record:
- route,
- page purpose,
- audience,
- primary CTA,
- secondary CTAs,
- key modules/components,
- known traffic/conversion importance.

### 2) Feature inventory
For each feature/component, record:
- function,
- whether it is critical / important / decorative,
- whether it depends on hover, drag, multi-column layout, or wide tables,
- whether it contains dynamic data,
- whether it blocks conversion if degraded.

### 3) Journey inventory
Map end-to-end flows such as:
- navigation to content,
- search,
- account creation,
- checkout or lead capture,
- filtering/sorting,
- dashboard analysis,
- support/contact flows.

For each journey, record:
- entry point,
- number of steps,
- required fields,
- possible failure states,
- completion signal.

### 4) Visual system inventory
Capture:
- typography scale,
- spacing system,
- color tokens,
- radii,
- shadows,
- iconography,
- image ratios,
- motion behaviors,
- grid conventions.

### 5) Technical inventory
Capture:
- layout method used now (grid/flex/absolute positioning),
- CSS architecture,
- JS-heavy widgets,
- third-party embeds,
- image delivery path,
- font strategy,
- known performance bottlenecks,
- browser support requirements.

## Mandatory audit before redesign

Before proposing changes, build a **mobile parity matrix**.

For every feature, mark:
- `KEEP_AS_IS` - already mobile-safe,
- `REFLOW` - same component, narrower layout,
- `REPACKAGE` - same function, new interaction pattern,
- `ISOLATED_OVERFLOW` - stays wide but scrolls within its own container,
- `SPLIT_OR_STAGE` - same information broken into progressive steps or panels,
- `REQUIRES_DESIGN_DECISION` - real business tradeoff.

No feature may be silently dropped.

## Core redesign workflow

### Phase 1 - Preserve the structure
Do this first:
- Keep the existing IA, labels, and route structure unless there is a documented reason to change them.
- Keep primary actions visible.
- Keep the current content model intact.
- Preserve analytics-critical and conversion-critical elements.

Deliverable at this phase:
- a component-by-component parity matrix,
- a list of mobile risks,
- a list of desktop assumptions that break on mobile.

### Phase 2 - Rebuild layout using responsive primitives
Adopt a mobile-first implementation.

Base rules:
- Start with the smallest practical viewport.
- Define default styles for narrow screens.
- Expand progressively as space becomes available.
- Choose breakpoints based on content stress, not device names.
- Prefer fluid sizing and component-level adaptation before global breakpoint overrides.

Use:
- fluid widths,
- intrinsic sizing,
- flexbox/grid,
- content-driven media queries,
- container queries for reusable components,
- relative units for spacing and type where sensible.

### Phase 3 - Repackage interactions for touch
Convert desktop assumptions into touch-safe patterns.

Examples:
- hover reveal -> tap/focus disclosure,
- mega menu -> drawer, accordion, or staged navigation,
- inline dense filters -> sticky filter entry + bottom sheet / drawer,
- multi-column comparison -> card stack or horizontally scrollable comparison region,
- drag-only ordering -> explicit move controls,
- swipe-only carousel -> visible previous/next buttons plus swipe support,
- large data tables -> priority columns + isolated overflow + optional row detail view,
- toolbar with many actions -> primary actions visible, secondary actions in overflow menu.

### Phase 4 - Protect performance and stability
Every mobile redesign must include performance controls:
- reserve space for media,
- prioritize the LCP element,
- reduce JS on initial load,
- lazy-load non-critical below-the-fold content,
- keep interaction latency low,
- remove layout shifts,
- reduce render cost for long pages.

### Phase 5 - Validate parity and usability
Run a structured QA pass:
- feature parity,
- content parity,
- touch ergonomics,
- keyboard and screen-reader behavior,
- portrait and landscape,
- virtual keyboard overlap,
- iOS Safari behavior,
- Android Chromium behavior,
- real data stress cases.

## Layout rules

### Viewport setup
Include:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Do not use:
- `user-scalable=no`
- `maximum-scale=1`
- any setting that suppresses user zoom

### Breakpoint strategy
Rules:
- Use **content-driven breakpoints**.
- Start narrow, expand upward.
- Keep the number of global breakpoints low.
- Prefer **container queries** for reusable modules that appear in multiple contexts.
- Avoid brittle page-wide overrides for individual components.

### Width management
Rules:
- Main content must fit the viewport without horizontal scrolling.
- Use `max-width: 100%` for images and embeds by default.
- Constrain line length on large screens, but never force fixed-width desktop blocks onto mobile.
- For unavoidable wide content, isolate overflow inside the component.

### Height and browser chrome
Mobile browsers have dynamic UI bars. Avoid assuming `100vh` is always the visible height.

Use newer viewport units where appropriate:
- `svh` for stable small-viewport sizing,
- `lvh` for large-viewport sizing,
- `dvh` when the component should track dynamic toolbar changes.

Good pattern:
```css
.fullscreen-panel {
  min-height: 100dvh;
}
```

Use safe-area insets for fixed or sticky UI near screen edges:
```css
.bottom-bar {
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
}
```

### Safe-area handling
Any fixed header, footer, sheet, FAB cluster, or tab bar must account for:
- notches,
- rounded corners,
- bottom system overlays,
- dynamic keyboard and browser UI conflicts.

## Component transformation rules

### Navigation
Goals:
- preserve discoverability,
- preserve wayfinding,
- reduce clutter,
- keep current-page context obvious.

Preferred patterns:
- top bar + menu button + slide-in drawer,
- top bar + segmented high-priority tabs,
- accordion-based section navigation,
- bottom navigation only for a small, stable set of top-level destinations.

Rules:
- Expose the highest-value destinations without requiring deep drilling.
- Keep search visible when search is a primary behavior.
- Do not bury account, cart, saved items, support, or other critical destinations.
- Replace hover-open menus with tap/focus toggles.
- Preserve hierarchy with expandable groups and clear back affordances.

### Headers and hero sections
Rules:
- Keep headline hierarchy and brand tone.
- Preserve the primary CTA above the fold when it matters.
- Collapse decorative side-by-side compositions into stacked sequences.
- Preserve reading order.
- Avoid oversized hero media that pushes the primary action too far down.

### Cards and grids
Rules:
- Let cards reflow with flexible tracks.
- Use container queries where card context changes.
- Preserve metadata and action priority.
- Avoid truncating critical labels or prices.
- Convert dense multi-column grids into stacked cards only when scanning remains efficient.

### Tables and comparison matrices
Never delete columns just because the screen is narrow.

Choose among these patterns:
1. isolated horizontal scroll with sticky key column/header,
2. priority-column view + expandable row details,
3. card-per-row transformation for record-style data,
4. stepwise comparison selector when the table is too large for direct comparison.

Rules:
- Keep headers and values semantically associated.
- Preserve sort/filter affordances.
- Show overflow intentionally; do not clip.
- Keep row actions accessible without accidental taps.

### Forms
Forms are usually where mobile redesigns fail.

Rules:
- Keep labels visible; do not rely on placeholders as labels.
- Use the correct input `type` and `inputmode`.
- Use semantic `autocomplete` tokens.
- Preserve validation clarity.
- Group related fields.
- Split only when the form is genuinely long or cognitively dense.
- Keep the submit action visible and obvious.
- Prevent keyboard overlap on active fields and CTA.
- Use generous touch targets and spacing.

Recommended mappings:
- email -> `type="email"`
- phone -> `type="tel"` or suitable `inputmode`
- numeric entry without spinner semantics -> `inputmode="numeric"`
- address / identity / payment fields -> proper `autocomplete` tokens

Example:
```html
<input type="email" name="email" id="email" autocomplete="username" />
<input type="text" name="postalCode" autocomplete="shipping postal-code" inputmode="text" />
```

### Search, sort, and filters
Rules:
- Keep search accessible from the top of the experience when it is primary.
- Convert dense sidebars into drawers, sheets, or staged controls.
- Preserve active filter visibility.
- Keep sort state visible.
- Support clearing filters quickly.
- Avoid filter interfaces that require precise dragging.

### Dialogs, drawers, sheets
Rules:
- Prefer bottom sheets or full-height dialogs when content is task-focused.
- Keep close affordances obvious.
- Respect safe areas.
- Prevent background scroll when appropriate.
- Ensure focus management and screen-reader announcements are correct.
- Avoid trapping the user in oversized modals that the virtual keyboard covers.

### Carousels and sliders
Rules:
- Do not make swipe the only control.
- Provide tap targets for previous/next.
- Keep pagination visible when meaningful.
- Do not autoplay critical content.
- Avoid multi-item carousels that shrink content below readability.

### Dashboards and dense enterprise UI
Rules:
- Preserve the workflow and data model.
- Use priority stacking, sectional disclosure, sticky summary bars, and segmented navigation.
- Keep filters and actions reachable.
- For metrics, preserve comparisons and deltas, not just single numbers.
- For wide visualizations, allow intentional internal overflow or alternate views rather than deleting dimensions.

## Interaction rules for touch and accessibility

### Target size and spacing
Minimum ergonomic target guideline:
- aim for approximately **48x48 CSS/device-independent pixels** for primary touch targets,
- use padding when the visible icon is smaller.

Do not place destructive or primary actions too close together.

### Hover and pointer assumptions
Desktop hover behavior must have a non-hover equivalent.

Use capability queries carefully:
```css
@media (hover: hover) and (pointer: fine) {
  /* optional hover enhancement */
}
```

Rules:
- Hover may enhance, never gate.
- Any tooltip-like content needed for comprehension must also be available on tap/focus or inline.

### Gesture alternatives
If a feature uses:
- multipoint gestures,
- path-based gestures,
- dragging,

then provide a simple single-pointer alternative.

Examples:
- pinch zoom map -> plus/minus controls,
- drag slider -> increment/decrement buttons or text input,
- drag reorder -> explicit move up/down or pick destination flow,
- swipe carousel -> visible arrow controls.

### Activation behavior
Avoid destructive activation on `pointerdown`.

Prefer activation on release / click semantics, or provide a clear undo / cancel path.

### Motion
Support reduced motion.

Pattern:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto;
  }

  .animated,
  .parallax,
  .auto-slide {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

Rules:
- Keep transitions short and purposeful.
- Avoid parallax and large-scale motion for essential flows.
- Prefer opacity/transform over layout-moving animation when animation is necessary.

### Touch gesture handling
Do not casually block browser panning and zooming.

Use `touch-action` only where custom gesture behavior is required and understood.

Bad:
```css
* { touch-action: none; }
```

Better:
```css
.custom-canvas {
  touch-action: pan-x pan-y;
}
```

## Content and reading-flow rules

### Preserve hierarchy
On mobile, the page becomes more vertical. Do not flatten meaning.

Preserve:
- heading order,
- summary-before-detail sequencing,
- CTA priority,
- content dependencies,
- evidence near claims,
- labels near controls.

### Reorder carefully
Reordering for mobile is allowed only if:
- the reading order remains logical,
- DOM order still supports accessibility,
- the task flow improves,
- context is not lost.

Avoid visual order that contradicts source order for critical content.

### Progressive disclosure
Use disclosure only for:
- secondary detail,
- rarely used filters,
- supporting metadata,
- optional explanations.

Do not hide:
- prices,
- eligibility conditions,
- errors,
- form labels,
- primary actions,
- mandatory steps.

## Media rules

### Images
Rules:
- Use `srcset` and `sizes` for responsive image delivery.
- Use `<picture>` for art direction when the crop or composition must change by layout.
- Set `width` and `height` attributes on `<img>` to reserve layout space.
- Use CSS `max-width: 100%` by default.
- Preserve focal points on small screens.

Example:
```html
<img
  src="hero-1200.jpg"
  srcset="hero-480.jpg 480w, hero-800.jpg 800w, hero-1200.jpg 1200w"
  sizes="100vw"
  width="1200"
  height="800"
  alt="..."
/>
```

### Video and embeds
Rules:
- Maintain aspect ratio.
- Avoid fixed dimensions.
- Ensure controls remain usable at narrow widths.
- Test fullscreen behavior and orientation changes.

Pattern:
```css
.media-frame {
  aspect-ratio: 16 / 9;
}

.media-frame iframe,
.media-frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## Performance rules

Target at least these user-experience thresholds:
- **LCP < 2.5s**
- **INP < 200ms**
- **CLS < 0.1**

### LCP rules
- Identify the actual LCP candidate on mobile.
- Do not lazy-load the LCP image.
- Consider `fetchpriority="high"` for the LCP image.
- Preload only genuinely critical assets.
- Reduce render-blocking CSS/JS.

### CLS rules
- Reserve space for images, embeds, ads, and async UI.
- Set image `width` and `height`.
- Use `aspect-ratio` for media shells where needed.
- Avoid injecting banners above already-visible content.
- Animate with `transform`/`opacity` instead of properties that trigger layout shifts.

### INP rules
- Reduce main-thread JS.
- Keep handlers light.
- Defer non-critical third-party code.
- Avoid giant hydration costs for simple pages.
- Split code by route and interaction.

### Long-page rendering rules
For content-heavy pages, consider:
- `content-visibility: auto` for long off-screen sections,
- `contain-intrinsic-size` where necessary,
- incremental rendering of non-critical panels,
- virtualization for very large lists.

Use these only when they do not break find-in-page, anchoring, measurement, or accessibility expectations.

## Accessibility rules

Minimum conformance target:
- WCAG 2.2 AA behavior for the mobile experience.

Must-haves:
- reflow without horizontal scrolling for standard content,
- support for portrait and landscape unless orientation is essential,
- identified input purpose for common user data fields,
- focus visibility,
- sufficient target sizes or spacing,
- single-pointer alternatives to path-based or drag-heavy interactions,
- cancellable pointer interactions for risky actions,
- reduced-motion handling.

### Specific checks
- Content must remain usable at 320 CSS px wide.
- Standard text content must reflow at 400% zoom without two-dimensional scrolling, except where inherently necessary.
- Do not trap users in custom gesture systems.
- Errors must be visible, associated, and recoverable.

## Mobile-specific engineering checks

### Virtual keyboard
Test:
- focused input near bottom of viewport,
- sticky CTA + keyboard overlap,
- bottom sheets with forms,
- iOS Safari viewport changes,
- Android resize behavior.

Rules:
- Keep focused fields visible.
- Scroll intentionally into view.
- Avoid fixed elements that cover the active field or action button.

### Sticky UI
Sticky headers/footers are allowed only if they do not:
- consume excessive vertical space,
- obscure content,
- conflict with safe areas,
- create double-scroll traps,
- cover validation messages or bottom controls.

### Scroll behavior
Rules:
- Prefer one primary page scroll.
- Avoid nested scroll containers unless there is a strong reason.
- When nested scroll is necessary, make the boundaries obvious.
- Use `overscroll-behavior` deliberately to reduce scroll chaining issues.

## Anti-patterns

Never do these unless explicitly required:
- desktop screenshot scaled down to mobile width,
- hover-only navigation or tooltips,
- hiding core functionality under “more” without evidence,
- horizontal page scrolling as the default layout strategy,
- fixed-width forms or tables inside the main page flow,
- locking landscape/portrait for convenience,
- disabling pinch zoom,
- making drag, swipe, or pinch the only interaction,
- shipping decorative animation that harms readability or performance,
- replacing tables with lossy summaries,
- collapsing all detail into accordions until scanability is destroyed,
- preserving the desktop visual composition at the cost of mobile task completion.

## Decision heuristics

When the mobile version feels crowded, apply this order:
1. reduce redundant decoration,
2. tighten spacing within the design system,
3. stack layout regions vertically,
4. convert sidebars into drawers/sheets,
5. convert dense controls into staged interactions,
6. isolate overflow to the specific component,
7. use progressive disclosure for secondary information,
8. split a long flow only when cognitive load or error risk improves.

Do **not** jump directly to feature deletion.

## Required deliverables for a real redesign task

Produce these outputs:
1. **Mobile parity matrix**
2. **Annotated layout strategy** per page/template
3. **Component remapping table** describing desktop pattern -> mobile pattern
4. **Implementation notes** for CSS/JS/semantic changes
5. **Accessibility notes**
6. **Performance notes**
7. **QA checklist**

## Output template

Use this structure when reporting or implementing a redesign.

### A. Constraints
- preserved features,
- preserved flows,
- allowed deviations,
- browser/support assumptions.

### B. Audit summary
- mobile risks,
- overflow risks,
- hover dependencies,
- gesture dependencies,
- performance risks.

### C. Page strategy
For each page/template:
- purpose,
- desktop structure,
- mobile structure,
- component changes,
- preserved CTAs,
- special technical notes.

### D. Component remapping
For each component:
- desktop behavior,
- mobile behavior,
- preserved information,
- preserved actions,
- accessibility/performance concerns.

### E. Implementation rules
- viewport,
- breakpoints/container queries,
- spacing/type rules,
- media delivery,
- form semantics,
- gesture alternatives,
- motion handling.

### F. Validation
- feature parity check,
- user-journey check,
- accessibility check,
- performance check,
- browser/device check.

## Acceptance checklist

A redesign passes only if all answers are yes.

### Parity
- Are all critical features present?
- Are all critical user journeys complete?
- Is all essential content still available?
- Are desktop-only hover states replaced with mobile-safe access?

### Layout
- Does the main page avoid horizontal scrolling?
- Do wide components handle overflow intentionally?
- Does the layout survive 320px width?
- Does it work in portrait and landscape?

### Touch
- Are primary targets comfortably tappable?
- Are destructive actions protected from accidental activation?
- Are gesture-only interactions given simple alternatives?

### Forms
- Do fields summon the right keyboards?
- Does autofill work?
- Do labels remain visible?
- Does the keyboard avoid hiding active inputs and submit actions?

### Performance
- Is the LCP element prioritized?
- Is the LCP image not lazy-loaded?
- Are image dimensions reserved?
- Are CLS and INP risks controlled?

### Accessibility
- Is zoom preserved?
- Is reduced motion respected?
- Does content reflow properly?
- Are orientation restrictions avoided unless essential?

## Reference implementation snippets

### Responsive image shell
```css
img,
picture,
video,
canvas,
svg {
  max-width: 100%;
  height: auto;
}
```

### Content-driven grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
}
```

### Component-level responsiveness
```css
.product-card-shell {
  container-type: inline-size;
}

@container (width > 42rem) {
  .product-card {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 1rem;
  }
}
```

### Table overflow isolation
```css
.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table-scroll table {
  min-width: 42rem;
}
```

### Sticky footer with safe area
```css
.mobile-action-bar {
  position: sticky;
  bottom: 0;
  padding: 0.75rem 1rem calc(0.75rem + env(safe-area-inset-bottom));
  background: var(--surface);
}
```

## Failure conditions

This skill has failed if it does any of the following:
- drops features without explicit approval,
- preserves appearance but breaks task completion,
- keeps desktop hover semantics on mobile,
- introduces page-level horizontal scrolling,
- blocks zoom,
- ignores safe areas and dynamic viewport behavior,
- leaves forms semantically weak on mobile,
- depends on gesture-only interaction,
- regresses accessibility or performance while claiming success.

## Research basis behind this skill

This skill is aligned with current primary guidance from:
- web.dev responsive design guidance,
- MDN responsive design, media queries, container queries, responsive images, viewport units, `env()`, `inputmode`, `autocomplete`, `touch-action`, `aspect-ratio`, and `object-fit` documentation,
- W3C WCAG 2.2 and WAI understanding documents for reflow, orientation, target size, pointer gestures, pointer cancellation, dragging movements, reduced motion / animation from interactions, and identify input purpose,
- Google Core Web Vitals guidance,
- Apple Safari web content viewport guidance.

Use this skill as a strict operating spec, not loose inspiration.
