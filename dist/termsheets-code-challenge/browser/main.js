import {
  MatIcon,
  MatIconModule
} from "./chunk-V2IKQFDU.js";
import {
  CommonModule,
  RouterLink,
  RouterModule,
  RouterOutlet,
  bootstrapApplication,
  provideAnimations,
  provideRouter,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtext
} from "./chunk-XDIKZTZX.js";

// src/app/app.routes.ts
var routes = [
  {
    path: "deals",
    loadChildren: () => import("./chunk-PEZ3DSK3.js").then((mod) => mod.DealListModule)
  },
  {
    path: "deal/:id",
    loadChildren: () => import("./chunk-NMFIXMYH.js").then((mod) => mod.DealDetailModule)
  },
  { path: "", redirectTo: "deals", pathMatch: "full" },
  { path: "**", redirectTo: "deals", pathMatch: "full" }
];

// src/app/app.config.ts
var appConfig = {
  providers: [provideRouter(routes), provideAnimations()]
};

// src/app/shared/components/header/header.component.ts
var _c0 = () => ["/deals"];
var _HeaderComponent = class _HeaderComponent {
};
_HeaderComponent.\u0275fac = function HeaderComponent_Factory(t) {
  return new (t || _HeaderComponent)();
};
_HeaderComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HeaderComponent, selectors: [["app-header"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 4, consts: [[1, "header"], [1, "header__items"], [1, "header__items__logo", 3, "routerLink"], [1, "header__items__link", 3, "routerLink"], ["aria-hidden", "false", "aria-label", "Example home icon", "fontIcon", "payments"]], template: function HeaderComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "header", 0)(1, "div", 1)(2, "a", 2);
    \u0275\u0275text(3, " TermSheet ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "a", 3);
    \u0275\u0275element(5, "mat-icon", 4);
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Deals");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(2, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(3, _c0));
  }
}, dependencies: [
  CommonModule,
  RouterModule,
  RouterLink,
  MatIconModule,
  MatIcon
], styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"] });
var HeaderComponent = _HeaderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HeaderComponent, { className: "HeaderComponent" });
})();

// src/app/app.component.ts
var _AppComponent = class _AppComponent {
  constructor() {
    this.title = "termsheets-code-challenge";
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(t) {
  return new (t || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-header");
    \u0275\u0275elementStart(1, "main");
    \u0275\u0275element(2, "router-outlet");
    \u0275\u0275elementEnd();
  }
}, dependencies: [
  CommonModule,
  RouterModule,
  RouterOutlet,
  HeaderComponent
], styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"] });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent" });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
