import {
  DealService,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardModule,
  MatFormFieldModule,
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule,
  MatToolbar,
  MatToolbarModule,
  colorByDealType
} from "./chunk-KD4VXJLG.js";
import {
  ActivatedRoute,
  CommonModule,
  CurrencyPipe,
  PercentPipe,
  RouterModule,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-XDIKZTZX.js";

// src/app/modules/deal-detail/deal-detail.component.ts
var _DealDetailComponent = class _DealDetailComponent {
  constructor(route, dealService) {
    this.route = route;
    this.dealService = dealService;
    this.color = "#ffffff";
  }
  ngOnInit() {
    this.getDealById();
    this.updateBackgroundColor();
  }
  updateBackgroundColor() {
    this.color = colorByDealType(this.deal);
  }
  getDealById() {
    let dealId = this.route.snapshot.paramMap.get("id");
    this.deal = this.dealService.getDealById(Number(dealId));
  }
};
_DealDetailComponent.\u0275fac = function DealDetailComponent_Factory(t) {
  return new (t || _DealDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(DealService));
};
_DealDetailComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DealDetailComponent, selectors: [["app-deal-detail"]], hostVars: 2, hostBindings: function DealDetailComponent_HostBindings(rf, ctx) {
  if (rf & 2) {
    \u0275\u0275styleProp("--color", ctx.color);
  }
}, decls: 46, vars: 14, consts: [[1, "deal-detail__toolbar--secondary"], [1, "deal-detail"], [1, "card"], [1, "card__container"], [1, "img__container"], [1, "img__title"], ["mat-card-image", "", "alt", "Deal Image", 3, "src"], [1, "side-bar"], [1, "side-bar__container"], ["mode", "side"], [1, "side-bar__wrapper"], [1, "info__title"], [1, "info__label"], [1, "info__value"]], template: function DealDetailComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section");
    \u0275\u0275element(1, "mat-toolbar", 0);
    \u0275\u0275elementStart(2, "div", 1)(3, "div", 2)(4, "mat-card", 3);
    \u0275\u0275element(5, "mat-card-header");
    \u0275\u0275elementStart(6, "div", 4)(7, "h1", 5);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "img", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "mat-card-content");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 7)(12, "mat-sidenav-container", 8)(13, "mat-sidenav-content", 9)(14, "div", 10)(15, "h1", 11);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "hr");
    \u0275\u0275elementStart(18, "div")(19, "label", 12);
    \u0275\u0275text(20, "Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 13);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div")(24, "label", 12);
    \u0275\u0275text(25, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "p", 13);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div")(29, "label", 12);
    \u0275\u0275text(30, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "p", 13);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div")(35, "label", 12);
    \u0275\u0275text(36, "NOI");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p", 13);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(40, "div")(41, "label", 12);
    \u0275\u0275text(42, "Cap Rate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "p", 13);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "percent");
    \u0275\u0275elementEnd()()()()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx.deal.name);
    \u0275\u0275advance(1);
    \u0275\u0275property("src", ctx.deal.image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx.deal.name);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx.deal.address);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.deal.type);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(33, 8, ctx.deal.purchasePrice));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(39, 10, ctx.deal.noi));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(45, 12, ctx.deal.capRate));
  }
}, dependencies: [MatToolbar, MatSidenavContainer, MatSidenavContent, MatCard, MatCardContent, MatCardHeader, MatCardImage, PercentPipe, CurrencyPipe], styles: ["\n\n.deal-detail[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  background-color: var(--alba);\n}\n.deal-detail__toolbar--secondary[_ngcontent-%COMP%] {\n  background: var(--color);\n  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);\n  height: 3rem;\n}\n.card[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  margin-top: 2rem;\n  width: 70rem;\n}\n.img[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.img__container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n.img__container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 90vh;\n  width: 72vw;\n}\n.img__title[_ngcontent-%COMP%] {\n  color: #FFF;\n  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);\n  font-family: Inter;\n  font-size: 64px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: normal;\n  position: absolute;\n  top: 0;\n  left: 4rem;\n  z-index: 1000;\n}\n.side-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--white);\n  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);\n}\n.side-bar__container[_ngcontent-%COMP%] {\n  height: 100vh;\n  width: 20rem;\n}\n.side-bar__wrapper[_ngcontent-%COMP%] {\n  padding: 0.6rem 1rem;\n}\n.info__title[_ngcontent-%COMP%] {\n  font-size: 2.25rem;\n  font-style: normal;\n  font-weight: 600;\n  line-height: normal;\n}\n.info__label[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-style: normal;\n  font-weight: 600;\n  line-height: normal;\n}\n.info__value[_ngcontent-%COMP%] {\n  color: var(--light-gray);\n  font-size: 1.2rem;\n  font-style: normal;\n  font-weight: 600;\n  line-height: normal;\n}\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9tb2R1bGVzL2RlYWwtZGV0YWlsL2RlYWwtZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIuZGVhbC1kZXRhaWwge1xuIGRpc3BsYXk6IGZsZXg7XG4ganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFsYmEpO1xuIFxuICZfX3Rvb2xiYXItLXNlY29uZGFyeSB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yKTtcbiAgYm94LXNoYWRvdzogMHB4IDRweCA0cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gIGhlaWdodDogM3JlbTtcbiB9XG59XG5cbi5jYXJkIHtcbiBtYXJnaW46IDAgYXV0bztcbiBtYXJnaW4tdG9wOiAycmVtO1xuIHdpZHRoOiA3MHJlbTtcbn1cblxuLmltZyB7XG4gZGlzcGxheTogZmxleDtcbiBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gJl9fY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmIGltZyB7XG4gICBoZWlnaHQ6IDkwdmg7XG4gICB3aWR0aDogNzJ2dztcbiAgfVxuIH1cblxuICZfX3RpdGxlIHtcbiAgY29sb3I6ICNGRkY7XG4gIHRleHQtc2hhZG93OiAwcHggNHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICBmb250LWZhbWlseTogSW50ZXI7XG4gIGZvbnQtc2l6ZTogNjRweDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogNHJlbTtcbiAgei1pbmRleDogMTAwMDtcbiB9XG59XG5cbi5zaWRlLWJhciB7XG4gZGlzcGxheTogZmxleDtcbiBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuIGJhY2tncm91bmQ6IHZhcigtLXdoaXRlKTtcbiBib3gtc2hhZG93OiAwcHggNHB4IDRweCAwcHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcblxuICZfX2NvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwdmg7XG4gIHdpZHRoOiAyMHJlbTtcbiB9XG5cbiAmX193cmFwcGVyIHtcbiAgcGFkZGluZzogMC42cmVtIDFyZW07XG4gfVxufVxuXG4uaW5mbyB7XG4gJl9fdGl0bGUge1xuICBmb250LXNpemU6IDIuMjVyZW07XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiB9XG5cbiAmX19sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG5cbiB9XG5cbiAmX192YWx1ZSB7XG4gIGNvbG9yOiB2YXIoLS1saWdodC1ncmF5KTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLENBQUE7QUFDQyxXQUFBO0FBQ0EsbUJBQUE7QUFDQSxvQkFBQSxJQUFBOztBQUVBLENBQUE7QUFDQyxjQUFBLElBQUE7QUFDQSxjQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtBQUNBLFVBQUE7O0FBSUYsQ0FBQTtBQUNDLFVBQUEsRUFBQTtBQUNBLGNBQUE7QUFDQSxTQUFBOztBQUdELENBQUE7QUFDQyxXQUFBO0FBQ0Esa0JBQUE7O0FBRUEsQ0FBQTtBQUNDLFdBQUE7QUFDQSxtQkFBQTtBQUNBLGVBQUE7QUFDQSxZQUFBOztBQUVBLENBTkQsZUFNQztBQUNDLFVBQUE7QUFDQSxTQUFBOztBQUlGLENBQUE7QUFDQyxTQUFBO0FBQ0EsZUFBQSxJQUFBLElBQUEsSUFBQSxLQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0FBQ0EsZUFBQTtBQUNBLGFBQUE7QUFDQSxjQUFBO0FBQ0EsZUFBQTtBQUNBLGVBQUE7QUFDQSxZQUFBO0FBQ0EsT0FBQTtBQUNBLFFBQUE7QUFDQSxXQUFBOztBQUlGLENBQUE7QUFDQyxXQUFBO0FBQ0Esa0JBQUE7QUFDQSxjQUFBLElBQUE7QUFDQSxjQUFBLElBQUEsSUFBQSxJQUFBLElBQUEsS0FBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTs7QUFFQSxDQUFBO0FBQ0MsVUFBQTtBQUNBLFNBQUE7O0FBR0QsQ0FBQTtBQUNDLFdBQUEsT0FBQTs7QUFLRCxDQUFBO0FBQ0MsYUFBQTtBQUNBLGNBQUE7QUFDQSxlQUFBO0FBQ0EsZUFBQTs7QUFHRCxDQUFBO0FBQ0MsYUFBQTtBQUNBLGNBQUE7QUFDQSxlQUFBO0FBQ0EsZUFBQTs7QUFJRCxDQUFBO0FBQ0MsU0FBQSxJQUFBO0FBQ0EsYUFBQTtBQUNBLGNBQUE7QUFDQSxlQUFBO0FBQ0EsZUFBQTs7IiwKICAibmFtZXMiOiBbXQp9Cg== */"] });
var DealDetailComponent = _DealDetailComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DealDetailComponent, { className: "DealDetailComponent" });
})();

// src/app/modules/deal-detail/deal-detail-routing.component.ts
var routes = [
  {
    path: "",
    component: DealDetailComponent
  }
];
var _DealDetailRoutingModule = class _DealDetailRoutingModule {
};
_DealDetailRoutingModule.\u0275fac = function DealDetailRoutingModule_Factory(t) {
  return new (t || _DealDetailRoutingModule)();
};
_DealDetailRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DealDetailRoutingModule });
_DealDetailRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
var DealDetailRoutingModule = _DealDetailRoutingModule;

// src/app/modules/deal-detail/deal-detail.module.ts
var _DealDetailModule = class _DealDetailModule {
};
_DealDetailModule.\u0275fac = function DealDetailModule_Factory(t) {
  return new (t || _DealDetailModule)();
};
_DealDetailModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DealDetailModule });
_DealDetailModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
  CommonModule,
  DealDetailRoutingModule,
  MatToolbarModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatCardModule
] });
var DealDetailModule = _DealDetailModule;
export {
  DealDetailModule
};
//# sourceMappingURL=chunk-NMFIXMYH.js.map
