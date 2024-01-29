import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  BidiModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ConnectableObservable,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  Directionality,
  Directive,
  ESCAPE,
  ElementRef,
  EventEmitter,
  FocusMonitor,
  FocusTrapFactory,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  InteractivityChecker,
  IterableDiffers,
  MatCommonModule,
  NgModule,
  NgTemplateOutlet,
  NgZone,
  Observable,
  ObserversModule,
  Optional,
  Output,
  Platform,
  QueryList,
  SkipSelf,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation$1,
  __spreadProps,
  __spreadValues,
  animate,
  animationFrameScheduler,
  asapScheduler,
  auditTime,
  booleanAttribute,
  coerceBooleanProperty,
  coerceElement,
  coerceNumberProperty,
  debounceTime,
  distinctUntilChanged,
  filter,
  forwardRef,
  fromEvent,
  getRtlScrollAxisType,
  hasModifierKey,
  inject,
  isObservable,
  map,
  mapTo,
  merge,
  mixinColor,
  of,
  pairwise,
  setClassMetadata,
  shareReplay,
  startWith,
  state,
  style,
  supportsScrollBehavior,
  switchMap,
  take,
  takeUntil,
  transition,
  trigger,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵinject,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵsyntheticHostListener,
  ɵɵsyntheticHostProperty,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-XDIKZTZX.js";

// node_modules/@angular/cdk/fesm2022/observers/private.mjs
var loopLimitExceededErrorHandler = (e) => {
  if (e instanceof Error && e.message === "ResizeObserver loop limit exceeded") {
    console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
  }
};
var SingleBoxSharedResizeObserver = class {
  constructor(_box) {
    this._box = _box;
    this._destroyed = new Subject();
    this._resizeSubject = new Subject();
    this._elementObservables = /* @__PURE__ */ new Map();
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver((entries) => this._resizeSubject.next(entries));
    }
  }
  /**
   * Gets a stream of resize events for the given element.
   * @param target The element to observe.
   * @return The stream of resize events for the element.
   */
  observe(target) {
    if (!this._elementObservables.has(target)) {
      this._elementObservables.set(target, new Observable((observer) => {
        const subscription = this._resizeSubject.subscribe(observer);
        this._resizeObserver?.observe(target, {
          box: this._box
        });
        return () => {
          this._resizeObserver?.unobserve(target);
          subscription.unsubscribe();
          this._elementObservables.delete(target);
        };
      }).pipe(
        filter((entries) => entries.some((entry) => entry.target === target)),
        // Share a replay of the last event so that subsequent calls to observe the same element
        // receive initial sizing info like the first one. Also enable ref counting so the
        // element will be automatically unobserved when there are no more subscriptions.
        shareReplay({
          bufferSize: 1,
          refCount: true
        }),
        takeUntil(this._destroyed)
      ));
    }
    return this._elementObservables.get(target);
  }
  /** Destroys this instance. */
  destroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._resizeSubject.complete();
    this._elementObservables.clear();
  }
};
var _SharedResizeObserver = class _SharedResizeObserver {
  constructor() {
    this._observers = /* @__PURE__ */ new Map();
    this._ngZone = inject(NgZone);
    if (typeof ResizeObserver !== "undefined" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      this._ngZone.runOutsideAngular(() => {
        window.addEventListener("error", loopLimitExceededErrorHandler);
      });
    }
  }
  ngOnDestroy() {
    for (const [, observer] of this._observers) {
      observer.destroy();
    }
    this._observers.clear();
    if (typeof ResizeObserver !== "undefined" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      window.removeEventListener("error", loopLimitExceededErrorHandler);
    }
  }
  /**
   * Gets a stream of resize events for the given target element and box type.
   * @param target The element to observe for resizes.
   * @param options Options to pass to the `ResizeObserver`
   * @return The stream of resize events for the element.
   */
  observe(target, options) {
    const box = options?.box || "content-box";
    if (!this._observers.has(box)) {
      this._observers.set(box, new SingleBoxSharedResizeObserver(box));
    }
    return this._observers.get(box).observe(target);
  }
};
_SharedResizeObserver.\u0275fac = function SharedResizeObserver_Factory(t) {
  return new (t || _SharedResizeObserver)();
};
_SharedResizeObserver.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _SharedResizeObserver,
  factory: _SharedResizeObserver.\u0275fac,
  providedIn: "root"
});
var SharedResizeObserver = _SharedResizeObserver;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedResizeObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@angular/material/fesm2022/form-field.mjs
var _c0 = ["notch"];
var _c1 = ["matFormFieldNotchedOutline", ""];
var _c2 = ["*"];
var _c3 = ["textField"];
var _c4 = ["iconPrefixContainer"];
var _c5 = ["textPrefixContainer"];
function MatFormField_ng_template_0_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 16);
  }
}
function MatFormField_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 14);
    \u0275\u0275projection(1, 1);
    \u0275\u0275template(2, MatFormField_ng_template_0_Conditional_0_Conditional_2_Template, 1, 0, "span", 15);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext(2);
    \u0275\u0275property("floating", ctx_r13._shouldLabelFloat())("monitorResize", ctx_r13._hasOutline())("id", ctx_r13._labelId);
    \u0275\u0275attribute("for", ctx_r13._control.id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(2, !ctx_r13.hideRequiredMarker && ctx_r13._control.required ? 2 : -1);
  }
}
function MatFormField_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatFormField_ng_template_0_Conditional_0_Template, 3, 5, "label", 14);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional(0, ctx_r0._hasFloatingLabel() ? 0 : -1);
  }
}
function MatFormField_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 17);
  }
}
function MatFormField_Conditional_6_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function MatFormField_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatFormField_Conditional_6_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 9);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const _r1 = \u0275\u0275reference(1);
    \u0275\u0275property("ngTemplateOutlet", _r1);
  }
}
function MatFormField_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275template(1, MatFormField_Conditional_6_Conditional_1_Template, 1, 1, null, 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("matFormFieldNotchedOutlineOpen", ctx_r4._shouldLabelFloat());
    \u0275\u0275advance(1);
    \u0275\u0275conditional(1, !ctx_r4._forceDisplayInfixLabel() ? 1 : -1);
  }
}
function MatFormField_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18, 19);
    \u0275\u0275projection(2, 2);
    \u0275\u0275elementEnd();
  }
}
function MatFormField_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20, 21);
    \u0275\u0275projection(2, 3);
    \u0275\u0275elementEnd();
  }
}
function MatFormField_Conditional_10_ng_template_0_Template(rf, ctx) {
}
function MatFormField_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatFormField_Conditional_10_ng_template_0_Template, 0, 0, "ng-template", 9);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const _r1 = \u0275\u0275reference(1);
    \u0275\u0275property("ngTemplateOutlet", _r1);
  }
}
function MatFormField_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22);
    \u0275\u0275projection(1, 4);
    \u0275\u0275elementEnd();
  }
}
function MatFormField_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275projection(1, 5);
    \u0275\u0275elementEnd();
  }
}
function MatFormField_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 12);
  }
}
function MatFormField_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275projection(1, 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r11 = \u0275\u0275nextContext();
    \u0275\u0275property("@transitionMessages", ctx_r11._subscriptAnimationState);
  }
}
function MatFormField_Case_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-hint", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r20 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", ctx_r20._hintLabelId);
    \u0275\u0275advance(1);
    \u0275\u0275textInterpolate(ctx_r20.hintLabel);
  }
}
function MatFormField_Case_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275template(1, MatFormField_Case_17_Conditional_1_Template, 2, 2, "mat-hint", 26);
    \u0275\u0275projection(2, 7);
    \u0275\u0275element(3, "div", 27);
    \u0275\u0275projection(4, 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r12 = \u0275\u0275nextContext();
    \u0275\u0275property("@transitionMessages", ctx_r12._subscriptAnimationState);
    \u0275\u0275advance(1);
    \u0275\u0275conditional(1, ctx_r12.hintLabel ? 1 : -1);
  }
}
var _c6 = ["*", [["mat-label"]], [["", "matPrefix", ""], ["", "matIconPrefix", ""]], [["", "matTextPrefix", ""]], [["", "matTextSuffix", ""]], [["", "matSuffix", ""], ["", "matIconSuffix", ""]], [["mat-error"], ["", "matError", ""]], [["mat-hint", 3, "align", "end"]], [["mat-hint", "align", "end"]]];
var _c7 = ["*", "mat-label", "[matPrefix], [matIconPrefix]", "[matTextPrefix]", "[matTextSuffix]", "[matSuffix], [matIconSuffix]", "mat-error, [matError]", "mat-hint:not([align='end'])", "mat-hint[align='end']"];
var _MatLabel = class _MatLabel {
};
_MatLabel.\u0275fac = function MatLabel_Factory(t) {
  return new (t || _MatLabel)();
};
_MatLabel.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatLabel,
  selectors: [["mat-label"]]
});
var MatLabel = _MatLabel;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatLabel, [{
    type: Directive,
    args: [{
      selector: "mat-label"
    }]
  }], null, null);
})();
var nextUniqueId$2 = 0;
var MAT_ERROR = new InjectionToken("MatError");
var _MatError = class _MatError {
  constructor(ariaLive, elementRef) {
    this.id = `mat-mdc-error-${nextUniqueId$2++}`;
    if (!ariaLive) {
      elementRef.nativeElement.setAttribute("aria-live", "polite");
    }
  }
};
_MatError.\u0275fac = function MatError_Factory(t) {
  return new (t || _MatError)(\u0275\u0275injectAttribute("aria-live"), \u0275\u0275directiveInject(ElementRef));
};
_MatError.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatError,
  selectors: [["mat-error"], ["", "matError", ""]],
  hostAttrs: ["aria-atomic", "true", 1, "mat-mdc-form-field-error", "mat-mdc-form-field-bottom-align"],
  hostVars: 1,
  hostBindings: function MatError_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275hostProperty("id", ctx.id);
    }
  },
  inputs: {
    id: "id"
  },
  features: [\u0275\u0275ProvidersFeature([{
    provide: MAT_ERROR,
    useExisting: _MatError
  }])]
});
var MatError = _MatError;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatError, [{
    type: Directive,
    args: [{
      selector: "mat-error, [matError]",
      host: {
        "class": "mat-mdc-form-field-error mat-mdc-form-field-bottom-align",
        "aria-atomic": "true",
        "[id]": "id"
      },
      providers: [{
        provide: MAT_ERROR,
        useExisting: MatError
      }]
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["aria-live"]
    }]
  }, {
    type: ElementRef
  }], {
    id: [{
      type: Input
    }]
  });
})();
var nextUniqueId$1 = 0;
var _MatHint = class _MatHint {
  constructor() {
    this.align = "start";
    this.id = `mat-mdc-hint-${nextUniqueId$1++}`;
  }
};
_MatHint.\u0275fac = function MatHint_Factory(t) {
  return new (t || _MatHint)();
};
_MatHint.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatHint,
  selectors: [["mat-hint"]],
  hostAttrs: [1, "mat-mdc-form-field-hint", "mat-mdc-form-field-bottom-align"],
  hostVars: 4,
  hostBindings: function MatHint_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275hostProperty("id", ctx.id);
      \u0275\u0275attribute("align", null);
      \u0275\u0275classProp("mat-mdc-form-field-hint-end", ctx.align === "end");
    }
  },
  inputs: {
    align: "align",
    id: "id"
  }
});
var MatHint = _MatHint;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatHint, [{
    type: Directive,
    args: [{
      selector: "mat-hint",
      host: {
        "class": "mat-mdc-form-field-hint mat-mdc-form-field-bottom-align",
        "[class.mat-mdc-form-field-hint-end]": 'align === "end"',
        "[id]": "id",
        // Remove align attribute to prevent it from interfering with layout.
        "[attr.align]": "null"
      }
    }]
  }], null, {
    align: [{
      type: Input
    }],
    id: [{
      type: Input
    }]
  });
})();
var MAT_PREFIX = new InjectionToken("MatPrefix");
var _MatPrefix = class _MatPrefix {
  constructor() {
    this._isText = false;
  }
  set _isTextSelector(value) {
    this._isText = true;
  }
};
_MatPrefix.\u0275fac = function MatPrefix_Factory(t) {
  return new (t || _MatPrefix)();
};
_MatPrefix.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatPrefix,
  selectors: [["", "matPrefix", ""], ["", "matIconPrefix", ""], ["", "matTextPrefix", ""]],
  inputs: {
    _isTextSelector: ["matTextPrefix", "_isTextSelector"]
  },
  features: [\u0275\u0275ProvidersFeature([{
    provide: MAT_PREFIX,
    useExisting: _MatPrefix
  }])]
});
var MatPrefix = _MatPrefix;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPrefix, [{
    type: Directive,
    args: [{
      selector: "[matPrefix], [matIconPrefix], [matTextPrefix]",
      providers: [{
        provide: MAT_PREFIX,
        useExisting: MatPrefix
      }]
    }]
  }], null, {
    _isTextSelector: [{
      type: Input,
      args: ["matTextPrefix"]
    }]
  });
})();
var MAT_SUFFIX = new InjectionToken("MatSuffix");
var _MatSuffix = class _MatSuffix {
  constructor() {
    this._isText = false;
  }
  set _isTextSelector(value) {
    this._isText = true;
  }
};
_MatSuffix.\u0275fac = function MatSuffix_Factory(t) {
  return new (t || _MatSuffix)();
};
_MatSuffix.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatSuffix,
  selectors: [["", "matSuffix", ""], ["", "matIconSuffix", ""], ["", "matTextSuffix", ""]],
  inputs: {
    _isTextSelector: ["matTextSuffix", "_isTextSelector"]
  },
  features: [\u0275\u0275ProvidersFeature([{
    provide: MAT_SUFFIX,
    useExisting: _MatSuffix
  }])]
});
var MatSuffix = _MatSuffix;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSuffix, [{
    type: Directive,
    args: [{
      selector: "[matSuffix], [matIconSuffix], [matTextSuffix]",
      providers: [{
        provide: MAT_SUFFIX,
        useExisting: MatSuffix
      }]
    }]
  }], null, {
    _isTextSelector: [{
      type: Input,
      args: ["matTextSuffix"]
    }]
  });
})();
var FLOATING_LABEL_PARENT = new InjectionToken("FloatingLabelParent");
var _MatFormFieldFloatingLabel = class _MatFormFieldFloatingLabel {
  /** Whether the label is floating. */
  get floating() {
    return this._floating;
  }
  set floating(value) {
    this._floating = value;
    if (this.monitorResize) {
      this._handleResize();
    }
  }
  /** Whether to monitor for resize events on the floating label. */
  get monitorResize() {
    return this._monitorResize;
  }
  set monitorResize(value) {
    this._monitorResize = value;
    if (this._monitorResize) {
      this._subscribeToResize();
    } else {
      this._resizeSubscription.unsubscribe();
    }
  }
  constructor(_elementRef) {
    this._elementRef = _elementRef;
    this._floating = false;
    this._monitorResize = false;
    this._resizeObserver = inject(SharedResizeObserver);
    this._ngZone = inject(NgZone);
    this._parent = inject(FLOATING_LABEL_PARENT);
    this._resizeSubscription = new Subscription();
  }
  ngOnDestroy() {
    this._resizeSubscription.unsubscribe();
  }
  /** Gets the width of the label. Used for the outline notch. */
  getWidth() {
    return estimateScrollWidth(this._elementRef.nativeElement);
  }
  /** Gets the HTML element for the floating label. */
  get element() {
    return this._elementRef.nativeElement;
  }
  /** Handles resize events from the ResizeObserver. */
  _handleResize() {
    setTimeout(() => this._parent._handleLabelResized());
  }
  /** Subscribes to resize events. */
  _subscribeToResize() {
    this._resizeSubscription.unsubscribe();
    this._ngZone.runOutsideAngular(() => {
      this._resizeSubscription = this._resizeObserver.observe(this._elementRef.nativeElement, {
        box: "border-box"
      }).subscribe(() => this._handleResize());
    });
  }
};
_MatFormFieldFloatingLabel.\u0275fac = function MatFormFieldFloatingLabel_Factory(t) {
  return new (t || _MatFormFieldFloatingLabel)(\u0275\u0275directiveInject(ElementRef));
};
_MatFormFieldFloatingLabel.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatFormFieldFloatingLabel,
  selectors: [["label", "matFormFieldFloatingLabel", ""]],
  hostAttrs: [1, "mdc-floating-label", "mat-mdc-floating-label"],
  hostVars: 2,
  hostBindings: function MatFormFieldFloatingLabel_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("mdc-floating-label--float-above", ctx.floating);
    }
  },
  inputs: {
    floating: "floating",
    monitorResize: "monitorResize"
  }
});
var MatFormFieldFloatingLabel = _MatFormFieldFloatingLabel;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldFloatingLabel, [{
    type: Directive,
    args: [{
      selector: "label[matFormFieldFloatingLabel]",
      host: {
        "class": "mdc-floating-label mat-mdc-floating-label",
        "[class.mdc-floating-label--float-above]": "floating"
      }
    }]
  }], () => [{
    type: ElementRef
  }], {
    floating: [{
      type: Input
    }],
    monitorResize: [{
      type: Input
    }]
  });
})();
function estimateScrollWidth(element) {
  const htmlEl = element;
  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }
  const clone = htmlEl.cloneNode(true);
  clone.style.setProperty("position", "absolute");
  clone.style.setProperty("transform", "translate(-9999px, -9999px)");
  document.documentElement.appendChild(clone);
  const scrollWidth = clone.scrollWidth;
  clone.remove();
  return scrollWidth;
}
var ACTIVATE_CLASS = "mdc-line-ripple--active";
var DEACTIVATING_CLASS = "mdc-line-ripple--deactivating";
var _MatFormFieldLineRipple = class _MatFormFieldLineRipple {
  constructor(_elementRef, ngZone) {
    this._elementRef = _elementRef;
    this._handleTransitionEnd = (event) => {
      const classList = this._elementRef.nativeElement.classList;
      const isDeactivating = classList.contains(DEACTIVATING_CLASS);
      if (event.propertyName === "opacity" && isDeactivating) {
        classList.remove(ACTIVATE_CLASS, DEACTIVATING_CLASS);
      }
    };
    ngZone.runOutsideAngular(() => {
      _elementRef.nativeElement.addEventListener("transitionend", this._handleTransitionEnd);
    });
  }
  activate() {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(DEACTIVATING_CLASS);
    classList.add(ACTIVATE_CLASS);
  }
  deactivate() {
    this._elementRef.nativeElement.classList.add(DEACTIVATING_CLASS);
  }
  ngOnDestroy() {
    this._elementRef.nativeElement.removeEventListener("transitionend", this._handleTransitionEnd);
  }
};
_MatFormFieldLineRipple.\u0275fac = function MatFormFieldLineRipple_Factory(t) {
  return new (t || _MatFormFieldLineRipple)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
};
_MatFormFieldLineRipple.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatFormFieldLineRipple,
  selectors: [["div", "matFormFieldLineRipple", ""]],
  hostAttrs: [1, "mdc-line-ripple"]
});
var MatFormFieldLineRipple = _MatFormFieldLineRipple;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldLineRipple, [{
    type: Directive,
    args: [{
      selector: "div[matFormFieldLineRipple]",
      host: {
        "class": "mdc-line-ripple"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }], null);
})();
var _MatFormFieldNotchedOutline = class _MatFormFieldNotchedOutline {
  constructor(_elementRef, _ngZone) {
    this._elementRef = _elementRef;
    this._ngZone = _ngZone;
    this.open = false;
  }
  ngAfterViewInit() {
    const label = this._elementRef.nativeElement.querySelector(".mdc-floating-label");
    if (label) {
      this._elementRef.nativeElement.classList.add("mdc-notched-outline--upgraded");
      if (typeof requestAnimationFrame === "function") {
        label.style.transitionDuration = "0s";
        this._ngZone.runOutsideAngular(() => {
          requestAnimationFrame(() => label.style.transitionDuration = "");
        });
      }
    } else {
      this._elementRef.nativeElement.classList.add("mdc-notched-outline--no-label");
    }
  }
  _setNotchWidth(labelWidth) {
    if (!this.open || !labelWidth) {
      this._notch.nativeElement.style.width = "";
    } else {
      const NOTCH_ELEMENT_PADDING = 8;
      const NOTCH_ELEMENT_BORDER = 1;
      this._notch.nativeElement.style.width = `calc(${labelWidth}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${NOTCH_ELEMENT_PADDING + NOTCH_ELEMENT_BORDER}px)`;
    }
  }
};
_MatFormFieldNotchedOutline.\u0275fac = function MatFormFieldNotchedOutline_Factory(t) {
  return new (t || _MatFormFieldNotchedOutline)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone));
};
_MatFormFieldNotchedOutline.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatFormFieldNotchedOutline,
  selectors: [["div", "matFormFieldNotchedOutline", ""]],
  viewQuery: function MatFormFieldNotchedOutline_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._notch = _t.first);
    }
  },
  hostAttrs: [1, "mdc-notched-outline"],
  hostVars: 2,
  hostBindings: function MatFormFieldNotchedOutline_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("mdc-notched-outline--notched", ctx.open);
    }
  },
  inputs: {
    open: ["matFormFieldNotchedOutlineOpen", "open"]
  },
  attrs: _c1,
  ngContentSelectors: _c2,
  decls: 5,
  vars: 0,
  consts: [[1, "mdc-notched-outline__leading"], [1, "mdc-notched-outline__notch"], ["notch", ""], [1, "mdc-notched-outline__trailing"]],
  template: function MatFormFieldNotchedOutline_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275element(0, "div", 0);
      \u0275\u0275elementStart(1, "div", 1, 2);
      \u0275\u0275projection(3);
      \u0275\u0275elementEnd();
      \u0275\u0275element(4, "div", 3);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var MatFormFieldNotchedOutline = _MatFormFieldNotchedOutline;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldNotchedOutline, [{
    type: Component,
    args: [{
      selector: "div[matFormFieldNotchedOutline]",
      host: {
        "class": "mdc-notched-outline",
        // Besides updating the notch state through the MDC component, we toggle this class through
        // a host binding in order to ensure that the notched-outline renders correctly on the server.
        "[class.mdc-notched-outline--notched]": "open"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      template: '<div class="mdc-notched-outline__leading"></div>\n<div class="mdc-notched-outline__notch" #notch>\n  <ng-content></ng-content>\n</div>\n<div class="mdc-notched-outline__trailing"></div>\n'
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }], {
    open: [{
      type: Input,
      args: ["matFormFieldNotchedOutlineOpen"]
    }],
    _notch: [{
      type: ViewChild,
      args: ["notch"]
    }]
  });
})();
var matFormFieldAnimations = {
  /** Animation that transitions the form field's error and hint messages. */
  transitionMessages: trigger("transitionMessages", [
    // TODO(mmalerba): Use angular animations for label animation as well.
    state("enter", style({
      opacity: 1,
      transform: "translateY(0%)"
    })),
    transition("void => enter", [style({
      opacity: 0,
      transform: "translateY(-5px)"
    }), animate("300ms cubic-bezier(0.55, 0, 0.55, 0.2)")])
  ])
};
var _MatFormFieldControl = class _MatFormFieldControl {
};
_MatFormFieldControl.\u0275fac = function MatFormFieldControl_Factory(t) {
  return new (t || _MatFormFieldControl)();
};
_MatFormFieldControl.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatFormFieldControl
});
var MatFormFieldControl = _MatFormFieldControl;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldControl, [{
    type: Directive
  }], null, null);
})();
function getMatFormFieldDuplicatedHintError(align) {
  return Error(`A hint was already declared for 'align="${align}"'.`);
}
function getMatFormFieldMissingControlError() {
  return Error("mat-form-field must contain a MatFormFieldControl.");
}
var MAT_FORM_FIELD = new InjectionToken("MatFormField");
var MAT_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken("MAT_FORM_FIELD_DEFAULT_OPTIONS");
var nextUniqueId = 0;
var DEFAULT_APPEARANCE = "fill";
var DEFAULT_FLOAT_LABEL = "auto";
var DEFAULT_SUBSCRIPT_SIZING = "fixed";
var FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM = `translateY(-50%)`;
var _MatFormField = class _MatFormField {
  /** Whether the required marker should be hidden. */
  get hideRequiredMarker() {
    return this._hideRequiredMarker;
  }
  set hideRequiredMarker(value) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  /** Whether the label should always float or float as the user types. */
  get floatLabel() {
    return this._floatLabel || this._defaults?.floatLabel || DEFAULT_FLOAT_LABEL;
  }
  set floatLabel(value) {
    if (value !== this._floatLabel) {
      this._floatLabel = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  /** The form field appearance style. */
  get appearance() {
    return this._appearance;
  }
  set appearance(value) {
    const oldValue = this._appearance;
    const newAppearance = value || this._defaults?.appearance || DEFAULT_APPEARANCE;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (newAppearance !== "fill" && newAppearance !== "outline") {
        throw new Error(`MatFormField: Invalid appearance "${newAppearance}", valid values are "fill" or "outline".`);
      }
    }
    this._appearance = newAppearance;
    if (this._appearance === "outline" && this._appearance !== oldValue) {
      this._needsOutlineLabelOffsetUpdateOnStable = true;
    }
  }
  /**
   * Whether the form field should reserve space for one line of hint/error text (default)
   * or to have the spacing grow from 0px as needed based on the size of the hint/error content.
   * Note that when using dynamic sizing, layout shifts will occur when hint/error text changes.
   */
  get subscriptSizing() {
    return this._subscriptSizing || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
  }
  set subscriptSizing(value) {
    this._subscriptSizing = value || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
  }
  /** Text for the form field hint. */
  get hintLabel() {
    return this._hintLabel;
  }
  set hintLabel(value) {
    this._hintLabel = value;
    this._processHints();
  }
  /** Gets the current form field control */
  get _control() {
    return this._explicitFormFieldControl || this._formFieldControl;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }
  constructor(_elementRef, _changeDetectorRef, _ngZone, _dir, _platform, _defaults, _animationMode, _unusedDocument) {
    this._elementRef = _elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._ngZone = _ngZone;
    this._dir = _dir;
    this._platform = _platform;
    this._defaults = _defaults;
    this._animationMode = _animationMode;
    this._hideRequiredMarker = false;
    this.color = "primary";
    this._appearance = DEFAULT_APPEARANCE;
    this._subscriptSizing = null;
    this._hintLabel = "";
    this._hasIconPrefix = false;
    this._hasTextPrefix = false;
    this._hasIconSuffix = false;
    this._hasTextSuffix = false;
    this._labelId = `mat-mdc-form-field-label-${nextUniqueId++}`;
    this._hintLabelId = `mat-mdc-hint-${nextUniqueId++}`;
    this._subscriptAnimationState = "";
    this._destroyed = new Subject();
    this._isFocused = null;
    this._needsOutlineLabelOffsetUpdateOnStable = false;
    if (_defaults) {
      if (_defaults.appearance) {
        this.appearance = _defaults.appearance;
      }
      this._hideRequiredMarker = Boolean(_defaults?.hideRequiredMarker);
      if (_defaults.color) {
        this.color = _defaults.color;
      }
    }
  }
  ngAfterViewInit() {
    this._updateFocusState();
    this._subscriptAnimationState = "enter";
    this._changeDetectorRef.detectChanges();
  }
  ngAfterContentInit() {
    this._assertFormFieldControl();
    this._initializeControl();
    this._initializeSubscript();
    this._initializePrefixAndSuffix();
    this._initializeOutlineLabelOffsetSubscriptions();
  }
  ngAfterContentChecked() {
    this._assertFormFieldControl();
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  /**
   * Gets the id of the label element. If no label is present, returns `null`.
   */
  getLabelId() {
    return this._hasFloatingLabel() ? this._labelId : null;
  }
  /**
   * Gets an ElementRef for the element that a overlay attached to the form field
   * should be positioned relative to.
   */
  getConnectedOverlayOrigin() {
    return this._textField || this._elementRef;
  }
  /** Animates the placeholder up and locks it in position. */
  _animateAndLockLabel() {
    if (this._hasFloatingLabel()) {
      this.floatLabel = "always";
    }
  }
  /** Initializes the registered form field control. */
  _initializeControl() {
    const control = this._control;
    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(`mat-mdc-form-field-type-${control.controlType}`);
    }
    control.stateChanges.subscribe(() => {
      this._updateFocusState();
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck());
    }
  }
  _checkPrefixAndSuffixTypes() {
    this._hasIconPrefix = !!this._prefixChildren.find((p) => !p._isText);
    this._hasTextPrefix = !!this._prefixChildren.find((p) => p._isText);
    this._hasIconSuffix = !!this._suffixChildren.find((s) => !s._isText);
    this._hasTextSuffix = !!this._suffixChildren.find((s) => s._isText);
  }
  /** Initializes the prefix and suffix containers. */
  _initializePrefixAndSuffix() {
    this._checkPrefixAndSuffixTypes();
    merge(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
      this._checkPrefixAndSuffixTypes();
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * Initializes the subscript by validating hints and synchronizing "aria-describedby" ids
   * with the custom form field control. Also subscribes to hint and error changes in order
   * to be able to validate and synchronize ids on change.
   */
  _initializeSubscript() {
    this._hintChildren.changes.subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });
    this._errorChildren.changes.subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });
    this._validateHints();
    this._syncDescribedByIds();
  }
  /** Throws an error if the form field's control is missing. */
  _assertFormFieldControl() {
    if (!this._control && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatFormFieldMissingControlError();
    }
  }
  _updateFocusState() {
    if (this._control.focused && !this._isFocused) {
      this._isFocused = true;
      this._lineRipple?.activate();
    } else if (!this._control.focused && (this._isFocused || this._isFocused === null)) {
      this._isFocused = false;
      this._lineRipple?.deactivate();
    }
    this._textField?.nativeElement.classList.toggle("mdc-text-field--focused", this._control.focused);
  }
  /**
   * The floating label in the docked state needs to account for prefixes. The horizontal offset
   * is calculated whenever the appearance changes to `outline`, the prefixes change, or when the
   * form field is added to the DOM. This method sets up all subscriptions which are needed to
   * trigger the label offset update. In general, we want to avoid performing measurements often,
   * so we rely on the `NgZone` as indicator when the offset should be recalculated, instead of
   * checking every change detection cycle.
   */
  _initializeOutlineLabelOffsetSubscriptions() {
    this._prefixChildren.changes.subscribe(() => this._needsOutlineLabelOffsetUpdateOnStable = true);
    this._ngZone.runOutsideAngular(() => {
      this._ngZone.onStable.pipe(takeUntil(this._destroyed)).subscribe(() => {
        if (this._needsOutlineLabelOffsetUpdateOnStable) {
          this._needsOutlineLabelOffsetUpdateOnStable = false;
          this._updateOutlineLabelOffset();
        }
      });
    });
    this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => this._needsOutlineLabelOffsetUpdateOnStable = true);
  }
  /** Whether the floating label should always float or not. */
  _shouldAlwaysFloat() {
    return this.floatLabel === "always";
  }
  _hasOutline() {
    return this.appearance === "outline";
  }
  /**
   * Whether the label should display in the infix. Labels in the outline appearance are
   * displayed as part of the notched-outline and are horizontally offset to account for
   * form field prefix content. This won't work in server side rendering since we cannot
   * measure the width of the prefix container. To make the docked label appear as if the
   * right offset has been calculated, we forcibly render the label inside the infix. Since
   * the label is part of the infix, the label cannot overflow the prefix content.
   */
  _forceDisplayInfixLabel() {
    return !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat();
  }
  _hasFloatingLabel() {
    return !!this._labelChildNonStatic || !!this._labelChildStatic;
  }
  _shouldLabelFloat() {
    return this._control.shouldLabelFloat || this._shouldAlwaysFloat();
  }
  /**
   * Determines whether a class from the AbstractControlDirective
   * should be forwarded to the host element.
   */
  _shouldForward(prop) {
    const control = this._control ? this._control.ngControl : null;
    return control && control[prop];
  }
  /** Determines whether to display hints or errors. */
  _getDisplayedMessages() {
    return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint";
  }
  /** Handle label resize events. */
  _handleLabelResized() {
    this._refreshOutlineNotchWidth();
  }
  /** Refreshes the width of the outline-notch, if present. */
  _refreshOutlineNotchWidth() {
    if (!this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()) {
      this._notchedOutline?._setNotchWidth(0);
    } else {
      this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());
    }
  }
  /** Does any extra processing that is required when handling the hints. */
  _processHints() {
    this._validateHints();
    this._syncDescribedByIds();
  }
  /**
   * Ensure that there is a maximum of one of each "mat-hint" alignment specified. The hint
   * label specified set through the input is being considered as "start" aligned.
   *
   * This method is a noop if Angular runs in production mode.
   */
  _validateHints() {
    if (this._hintChildren && (typeof ngDevMode === "undefined" || ngDevMode)) {
      let startHint;
      let endHint;
      this._hintChildren.forEach((hint) => {
        if (hint.align === "start") {
          if (startHint || this.hintLabel) {
            throw getMatFormFieldDuplicatedHintError("start");
          }
          startHint = hint;
        } else if (hint.align === "end") {
          if (endHint) {
            throw getMatFormFieldDuplicatedHintError("end");
          }
          endHint = hint;
        }
      });
    }
  }
  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */
  _syncDescribedByIds() {
    if (this._control) {
      let ids = [];
      if (this._control.userAriaDescribedBy && typeof this._control.userAriaDescribedBy === "string") {
        ids.push(...this._control.userAriaDescribedBy.split(" "));
      }
      if (this._getDisplayedMessages() === "hint") {
        const startHint = this._hintChildren ? this._hintChildren.find((hint) => hint.align === "start") : null;
        const endHint = this._hintChildren ? this._hintChildren.find((hint) => hint.align === "end") : null;
        if (startHint) {
          ids.push(startHint.id);
        } else if (this._hintLabel) {
          ids.push(this._hintLabelId);
        }
        if (endHint) {
          ids.push(endHint.id);
        }
      } else if (this._errorChildren) {
        ids.push(...this._errorChildren.map((error) => error.id));
      }
      this._control.setDescribedByIds(ids);
    }
  }
  /**
   * Updates the horizontal offset of the label in the outline appearance. In the outline
   * appearance, the notched-outline and label are not relative to the infix container because
   * the outline intends to surround prefixes, suffixes and the infix. This means that the
   * floating label by default overlaps prefixes in the docked state. To avoid this, we need to
   * horizontally offset the label by the width of the prefix container. The MDC text-field does
   * not need to do this because they use a fixed width for prefixes. Hence, they can simply
   * incorporate the horizontal offset into their default text-field styles.
   */
  _updateOutlineLabelOffset() {
    if (!this._platform.isBrowser || !this._hasOutline() || !this._floatingLabel) {
      return;
    }
    const floatingLabel = this._floatingLabel.element;
    if (!(this._iconPrefixContainer || this._textPrefixContainer)) {
      floatingLabel.style.transform = "";
      return;
    }
    if (!this._isAttachedToDom()) {
      this._needsOutlineLabelOffsetUpdateOnStable = true;
      return;
    }
    const iconPrefixContainer = this._iconPrefixContainer?.nativeElement;
    const textPrefixContainer = this._textPrefixContainer?.nativeElement;
    const iconPrefixContainerWidth = iconPrefixContainer?.getBoundingClientRect().width ?? 0;
    const textPrefixContainerWidth = textPrefixContainer?.getBoundingClientRect().width ?? 0;
    const negate = this._dir.value === "rtl" ? "-1" : "1";
    const prefixWidth = `${iconPrefixContainerWidth + textPrefixContainerWidth}px`;
    const labelOffset = `var(--mat-mdc-form-field-label-offset-x, 0px)`;
    const labelHorizontalOffset = `calc(${negate} * (${prefixWidth} + ${labelOffset}))`;
    floatingLabel.style.transform = `var(
        --mat-mdc-form-field-label-transform,
        ${FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM} translateX(${labelHorizontalOffset})
    )`;
  }
  /** Checks whether the form field is attached to the DOM. */
  _isAttachedToDom() {
    const element = this._elementRef.nativeElement;
    if (element.getRootNode) {
      const rootNode = element.getRootNode();
      return rootNode && rootNode !== element;
    }
    return document.documentElement.contains(element);
  }
};
_MatFormField.\u0275fac = function MatFormField_Factory(t) {
  return new (t || _MatFormField)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(Directionality), \u0275\u0275directiveInject(Platform), \u0275\u0275directiveInject(MAT_FORM_FIELD_DEFAULT_OPTIONS, 8), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8), \u0275\u0275directiveInject(DOCUMENT));
};
_MatFormField.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatFormField,
  selectors: [["mat-form-field"]],
  contentQueries: function MatFormField_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, MatLabel, 5);
      \u0275\u0275contentQuery(dirIndex, MatLabel, 7);
      \u0275\u0275contentQuery(dirIndex, MatFormFieldControl, 5);
      \u0275\u0275contentQuery(dirIndex, MAT_PREFIX, 5);
      \u0275\u0275contentQuery(dirIndex, MAT_SUFFIX, 5);
      \u0275\u0275contentQuery(dirIndex, MAT_ERROR, 5);
      \u0275\u0275contentQuery(dirIndex, MatHint, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._labelChildNonStatic = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._labelChildStatic = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._formFieldControl = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._prefixChildren = _t);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._suffixChildren = _t);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._errorChildren = _t);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._hintChildren = _t);
    }
  },
  viewQuery: function MatFormField_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c3, 5);
      \u0275\u0275viewQuery(_c4, 5);
      \u0275\u0275viewQuery(_c5, 5);
      \u0275\u0275viewQuery(MatFormFieldFloatingLabel, 5);
      \u0275\u0275viewQuery(MatFormFieldNotchedOutline, 5);
      \u0275\u0275viewQuery(MatFormFieldLineRipple, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._textField = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._iconPrefixContainer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._textPrefixContainer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._floatingLabel = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._notchedOutline = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lineRipple = _t.first);
    }
  },
  hostAttrs: [1, "mat-mdc-form-field"],
  hostVars: 42,
  hostBindings: function MatFormField_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("mat-mdc-form-field-label-always-float", ctx._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix", ctx._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix", ctx._hasIconSuffix)("mat-form-field-invalid", ctx._control.errorState)("mat-form-field-disabled", ctx._control.disabled)("mat-form-field-autofilled", ctx._control.autofilled)("mat-form-field-no-animations", ctx._animationMode === "NoopAnimations")("mat-form-field-appearance-fill", ctx.appearance == "fill")("mat-form-field-appearance-outline", ctx.appearance == "outline")("mat-form-field-hide-placeholder", ctx._hasFloatingLabel() && !ctx._shouldLabelFloat())("mat-focused", ctx._control.focused)("mat-primary", ctx.color !== "accent" && ctx.color !== "warn")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("ng-untouched", ctx._shouldForward("untouched"))("ng-touched", ctx._shouldForward("touched"))("ng-pristine", ctx._shouldForward("pristine"))("ng-dirty", ctx._shouldForward("dirty"))("ng-valid", ctx._shouldForward("valid"))("ng-invalid", ctx._shouldForward("invalid"))("ng-pending", ctx._shouldForward("pending"));
    }
  },
  inputs: {
    hideRequiredMarker: "hideRequiredMarker",
    color: "color",
    floatLabel: "floatLabel",
    appearance: "appearance",
    subscriptSizing: "subscriptSizing",
    hintLabel: "hintLabel"
  },
  exportAs: ["matFormField"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: MAT_FORM_FIELD,
    useExisting: _MatFormField
  }, {
    provide: FLOATING_LABEL_PARENT,
    useExisting: _MatFormField
  }])],
  ngContentSelectors: _c7,
  decls: 18,
  vars: 21,
  consts: [["labelTemplate", ""], [1, "mat-mdc-text-field-wrapper", "mdc-text-field", 3, "click"], ["textField", ""], ["class", "mat-mdc-form-field-focus-overlay"], [1, "mat-mdc-form-field-flex"], ["matFormFieldNotchedOutline", "", 3, "matFormFieldNotchedOutlineOpen"], ["class", "mat-mdc-form-field-icon-prefix"], ["class", "mat-mdc-form-field-text-prefix"], [1, "mat-mdc-form-field-infix"], [3, "ngTemplateOutlet"], ["class", "mat-mdc-form-field-text-suffix"], ["class", "mat-mdc-form-field-icon-suffix"], ["matFormFieldLineRipple", ""], [1, "mat-mdc-form-field-subscript-wrapper", "mat-mdc-form-field-bottom-align"], ["matFormFieldFloatingLabel", "", 3, "floating", "monitorResize", "id"], ["aria-hidden", "true", "class", "mat-mdc-form-field-required-marker mdc-floating-label--required"], ["aria-hidden", "true", 1, "mat-mdc-form-field-required-marker", "mdc-floating-label--required"], [1, "mat-mdc-form-field-focus-overlay"], [1, "mat-mdc-form-field-icon-prefix"], ["iconPrefixContainer", ""], [1, "mat-mdc-form-field-text-prefix"], ["textPrefixContainer", ""], [1, "mat-mdc-form-field-text-suffix"], [1, "mat-mdc-form-field-icon-suffix"], [1, "mat-mdc-form-field-error-wrapper"], [1, "mat-mdc-form-field-hint-wrapper"], [3, "id"], [1, "mat-mdc-form-field-hint-spacer"]],
  template: function MatFormField_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c6);
      \u0275\u0275template(0, MatFormField_ng_template_0_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementStart(2, "div", 1, 2);
      \u0275\u0275listener("click", function MatFormField_Template_div_click_2_listener($event) {
        return ctx._control.onContainerClick($event);
      });
      \u0275\u0275template(4, MatFormField_Conditional_4_Template, 1, 0, "div", 3);
      \u0275\u0275elementStart(5, "div", 4);
      \u0275\u0275template(6, MatFormField_Conditional_6_Template, 2, 2, "div", 5)(7, MatFormField_Conditional_7_Template, 3, 0, "div", 6)(8, MatFormField_Conditional_8_Template, 3, 0, "div", 7);
      \u0275\u0275elementStart(9, "div", 8);
      \u0275\u0275template(10, MatFormField_Conditional_10_Template, 1, 1, null, 9);
      \u0275\u0275projection(11);
      \u0275\u0275elementEnd();
      \u0275\u0275template(12, MatFormField_Conditional_12_Template, 2, 0, "div", 10)(13, MatFormField_Conditional_13_Template, 2, 0, "div", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275template(14, MatFormField_Conditional_14_Template, 1, 0, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 13);
      \u0275\u0275template(16, MatFormField_Case_16_Template, 2, 1)(17, MatFormField_Case_17_Template, 5, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let MatFormField_contFlowTmp;
      \u0275\u0275advance(2);
      \u0275\u0275classProp("mdc-text-field--filled", !ctx._hasOutline())("mdc-text-field--outlined", ctx._hasOutline())("mdc-text-field--no-label", !ctx._hasFloatingLabel())("mdc-text-field--disabled", ctx._control.disabled)("mdc-text-field--invalid", ctx._control.errorState);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(4, !ctx._hasOutline() && !ctx._control.disabled ? 4 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(6, ctx._hasOutline() ? 6 : -1);
      \u0275\u0275advance(1);
      \u0275\u0275conditional(7, ctx._hasIconPrefix ? 7 : -1);
      \u0275\u0275advance(1);
      \u0275\u0275conditional(8, ctx._hasTextPrefix ? 8 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(10, !ctx._hasOutline() || ctx._forceDisplayInfixLabel() ? 10 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(12, ctx._hasTextSuffix ? 12 : -1);
      \u0275\u0275advance(1);
      \u0275\u0275conditional(13, ctx._hasIconSuffix ? 13 : -1);
      \u0275\u0275advance(1);
      \u0275\u0275conditional(14, !ctx._hasOutline() ? 14 : -1);
      \u0275\u0275advance(1);
      \u0275\u0275classProp("mat-mdc-form-field-subscript-dynamic-size", ctx.subscriptSizing === "dynamic");
      \u0275\u0275advance(1);
      \u0275\u0275conditional(16, (MatFormField_contFlowTmp = ctx._getDisplayedMessages()) === "error" ? 16 : MatFormField_contFlowTmp === "hint" ? 17 : -1);
    }
  },
  dependencies: [NgTemplateOutlet, MatHint, MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, MatFormFieldLineRipple],
  styles: ['.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-shape-small, 4px))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 96px/0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after,.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;pointer-events:none}.mdc-notched-outline__trailing{flex-grow:1}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-top:1px solid;border-bottom:1px solid}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{max-width:calc(100% - 12px*2)}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::after{border-bottom-width:2px}.mdc-text-field--filled{border-top-left-radius:var(--mdc-filled-text-field-container-shape);border-top-right-radius:var(--mdc-filled-text-field-container-shape);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-caret-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-label-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-focus-label-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-disabled-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-focus-label-text-color)}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font);font-size:var(--mdc-filled-text-field-label-text-size);font-weight:var(--mdc-filled-text-field-label-text-weight);letter-spacing:var(--mdc-filled-text-field-label-text-tracking)}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color)}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color)}.mdc-text-field--filled .mdc-line-ripple::before{border-bottom-width:var(--mdc-filled-text-field-active-indicator-height)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-caret-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-label-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-focus-label-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-disabled-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-focus-label-text-color)}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font);font-size:var(--mdc-outlined-text-field-label-text-size);font-weight:var(--mdc-outlined-text-field-label-text-weight);letter-spacing:var(--mdc-outlined-text-field-label-text-tracking)}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-outlined-text-field-container-shape))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-hover-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-focus-outline-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-disabled-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-hover-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-focus-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-outline-width)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-focus-outline-width)}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color)}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font);line-height:var(--mat-form-field-subscript-text-line-height);font-size:var(--mat-form-field-subscript-text-size);letter-spacing:var(--mat-form-field-subscript-text-tracking);font-weight:var(--mat-form-field-subscript-text-weight)}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color)}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity)}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color)}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color)}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}.cdk-high-contrast-active .mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font);line-height:var(--mat-form-field-container-text-line-height);font-size:var(--mat-form-field-container-text-size);letter-spacing:var(--mat-form-field-container-text-tracking);font-weight:var(--mat-form-field-container-text-weight)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:12px;box-sizing:content-box}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}'],
  encapsulation: 2,
  data: {
    animation: [matFormFieldAnimations.transitionMessages]
  },
  changeDetection: 0
});
var MatFormField = _MatFormField;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormField, [{
    type: Component,
    args: [{
      selector: "mat-form-field",
      exportAs: "matFormField",
      animations: [matFormFieldAnimations.transitionMessages],
      host: {
        "class": "mat-mdc-form-field",
        "[class.mat-mdc-form-field-label-always-float]": "_shouldAlwaysFloat()",
        "[class.mat-mdc-form-field-has-icon-prefix]": "_hasIconPrefix",
        "[class.mat-mdc-form-field-has-icon-suffix]": "_hasIconSuffix",
        // Note that these classes reuse the same names as the non-MDC version, because they can be
        // considered a public API since custom form controls may use them to style themselves.
        // See https://github.com/angular/components/pull/20502#discussion_r486124901.
        "[class.mat-form-field-invalid]": "_control.errorState",
        "[class.mat-form-field-disabled]": "_control.disabled",
        "[class.mat-form-field-autofilled]": "_control.autofilled",
        "[class.mat-form-field-no-animations]": '_animationMode === "NoopAnimations"',
        "[class.mat-form-field-appearance-fill]": 'appearance == "fill"',
        "[class.mat-form-field-appearance-outline]": 'appearance == "outline"',
        "[class.mat-form-field-hide-placeholder]": "_hasFloatingLabel() && !_shouldLabelFloat()",
        "[class.mat-focused]": "_control.focused",
        "[class.mat-primary]": 'color !== "accent" && color !== "warn"',
        "[class.mat-accent]": 'color === "accent"',
        "[class.mat-warn]": 'color === "warn"',
        "[class.ng-untouched]": '_shouldForward("untouched")',
        "[class.ng-touched]": '_shouldForward("touched")',
        "[class.ng-pristine]": '_shouldForward("pristine")',
        "[class.ng-dirty]": '_shouldForward("dirty")',
        "[class.ng-valid]": '_shouldForward("valid")',
        "[class.ng-invalid]": '_shouldForward("invalid")',
        "[class.ng-pending]": '_shouldForward("pending")'
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MAT_FORM_FIELD,
        useExisting: MatFormField
      }, {
        provide: FLOATING_LABEL_PARENT,
        useExisting: MatFormField
      }],
      template: '<ng-template #labelTemplate>\n  <!--\n    MDC recommends that the text-field is a `<label>` element. This rather complicates the\n    setup because it would require every form-field control to explicitly set `aria-labelledby`.\n    This is because the `<label>` itself contains more than the actual label (e.g. prefix, suffix\n    or other projected content), and screen readers could potentially read out undesired content.\n    Excluding elements from being printed out requires them to be marked with `aria-hidden`, or\n    the form control is set to a scoped element for the label (using `aria-labelledby`). Both of\n    these options seem to complicate the setup because we know exactly what content is rendered\n    as part of the label, and we don\'t want to spend resources on walking through projected content\n    to set `aria-hidden`. Nor do we want to set `aria-labelledby` on every form control if we could\n    simply link the label to the control using the label `for` attribute.\n  -->\n  @if (_hasFloatingLabel()) {\n    <label matFormFieldFloatingLabel\n           [floating]="_shouldLabelFloat()"\n           [monitorResize]="_hasOutline()"\n           [id]="_labelId"\n           [attr.for]="_control.id">\n      <ng-content select="mat-label"></ng-content>\n      <!--\n        We set the required marker as a separate element, in order to make it easier to target if\n        apps want to override it and to be able to set `aria-hidden` so that screen readers don\'t\n        pick it up.\n       -->\n       @if (!hideRequiredMarker && _control.required) {\n         <span\n           aria-hidden="true"\n           class="mat-mdc-form-field-required-marker mdc-floating-label--required"></span>\n       }\n    </label>\n  }\n</ng-template>\n\n<div class="mat-mdc-text-field-wrapper mdc-text-field" #textField\n     [class.mdc-text-field--filled]="!_hasOutline()"\n     [class.mdc-text-field--outlined]="_hasOutline()"\n     [class.mdc-text-field--no-label]="!_hasFloatingLabel()"\n     [class.mdc-text-field--disabled]="_control.disabled"\n     [class.mdc-text-field--invalid]="_control.errorState"\n     (click)="_control.onContainerClick($event)">\n  @if (!_hasOutline() && !_control.disabled) {\n    <div class="mat-mdc-form-field-focus-overlay"></div>\n  }\n  <div class="mat-mdc-form-field-flex">\n    @if (_hasOutline()) {\n      <div matFormFieldNotchedOutline [matFormFieldNotchedOutlineOpen]="_shouldLabelFloat()">\n        @if (!_forceDisplayInfixLabel()) {\n          <ng-template [ngTemplateOutlet]="labelTemplate"></ng-template>\n        }\n      </div>\n    }\n\n    @if (_hasIconPrefix) {\n      <div class="mat-mdc-form-field-icon-prefix" #iconPrefixContainer>\n        <ng-content select="[matPrefix], [matIconPrefix]"></ng-content>\n      </div>\n    }\n\n    @if (_hasTextPrefix) {\n      <div class="mat-mdc-form-field-text-prefix" #textPrefixContainer>\n        <ng-content select="[matTextPrefix]"></ng-content>\n      </div>\n    }\n\n    <div class="mat-mdc-form-field-infix">\n      @if (!_hasOutline() || _forceDisplayInfixLabel()) {\n        <ng-template [ngTemplateOutlet]="labelTemplate"></ng-template>\n      }\n\n      <ng-content></ng-content>\n    </div>\n\n    @if (_hasTextSuffix) {\n      <div class="mat-mdc-form-field-text-suffix">\n        <ng-content select="[matTextSuffix]"></ng-content>\n      </div>\n    }\n\n    @if (_hasIconSuffix) {\n      <div class="mat-mdc-form-field-icon-suffix">\n        <ng-content select="[matSuffix], [matIconSuffix]"></ng-content>\n      </div>\n    }\n  </div>\n\n  @if (!_hasOutline()) {\n    <div matFormFieldLineRipple></div>\n  }\n</div>\n\n<div class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align"\n     [class.mat-mdc-form-field-subscript-dynamic-size]="subscriptSizing === \'dynamic\'">\n\n  @switch (_getDisplayedMessages()) {\n    @case (\'error\') {\n      <div class="mat-mdc-form-field-error-wrapper"\n           [@transitionMessages]="_subscriptAnimationState">\n        <ng-content select="mat-error, [matError]"></ng-content>\n      </div>\n    }\n\n    @case (\'hint\') {\n      <div class="mat-mdc-form-field-hint-wrapper" [@transitionMessages]="_subscriptAnimationState">\n        @if (hintLabel) {\n          <mat-hint [id]="_hintLabelId">{{hintLabel}}</mat-hint>\n        }\n        <ng-content select="mat-hint:not([align=\'end\'])"></ng-content>\n        <div class="mat-mdc-form-field-hint-spacer"></div>\n        <ng-content select="mat-hint[align=\'end\']"></ng-content>\n      </div>\n    }\n  }\n</div>\n',
      styles: ['.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-shape-small, 4px))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 96px/0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after,.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;pointer-events:none}.mdc-notched-outline__trailing{flex-grow:1}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-top:1px solid;border-bottom:1px solid}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{max-width:calc(100% - 12px*2)}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::after{border-bottom-width:2px}.mdc-text-field--filled{border-top-left-radius:var(--mdc-filled-text-field-container-shape);border-top-right-radius:var(--mdc-filled-text-field-container-shape);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-caret-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-label-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-focus-label-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-disabled-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-focus-label-text-color)}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font);font-size:var(--mdc-filled-text-field-label-text-size);font-weight:var(--mdc-filled-text-field-label-text-weight);letter-spacing:var(--mdc-filled-text-field-label-text-tracking)}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color)}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color)}.mdc-text-field--filled .mdc-line-ripple::before{border-bottom-width:var(--mdc-filled-text-field-active-indicator-height)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-caret-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-label-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-focus-label-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-disabled-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-focus-label-text-color)}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font);font-size:var(--mdc-outlined-text-field-label-text-size);font-weight:var(--mdc-outlined-text-field-label-text-weight);letter-spacing:var(--mdc-outlined-text-field-label-text-tracking)}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-outlined-text-field-container-shape))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-hover-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-focus-outline-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-disabled-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-hover-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-focus-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-outline-width)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-focus-outline-width)}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color)}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font);line-height:var(--mat-form-field-subscript-text-line-height);font-size:var(--mat-form-field-subscript-text-size);letter-spacing:var(--mat-form-field-subscript-text-tracking);font-weight:var(--mat-form-field-subscript-text-weight)}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color)}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity)}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color)}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color)}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}.cdk-high-contrast-active .mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font);line-height:var(--mat-form-field-container-text-line-height);font-size:var(--mat-form-field-container-text-size);letter-spacing:var(--mat-form-field-container-text-tracking);font-weight:var(--mat-form-field-container-text-weight)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:12px;box-sizing:content-box}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: NgZone
  }, {
    type: Directionality
  }, {
    type: Platform
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_FORM_FIELD_DEFAULT_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    _textField: [{
      type: ViewChild,
      args: ["textField"]
    }],
    _iconPrefixContainer: [{
      type: ViewChild,
      args: ["iconPrefixContainer"]
    }],
    _textPrefixContainer: [{
      type: ViewChild,
      args: ["textPrefixContainer"]
    }],
    _floatingLabel: [{
      type: ViewChild,
      args: [MatFormFieldFloatingLabel]
    }],
    _notchedOutline: [{
      type: ViewChild,
      args: [MatFormFieldNotchedOutline]
    }],
    _lineRipple: [{
      type: ViewChild,
      args: [MatFormFieldLineRipple]
    }],
    _labelChildNonStatic: [{
      type: ContentChild,
      args: [MatLabel]
    }],
    _labelChildStatic: [{
      type: ContentChild,
      args: [MatLabel, {
        static: true
      }]
    }],
    _formFieldControl: [{
      type: ContentChild,
      args: [MatFormFieldControl]
    }],
    _prefixChildren: [{
      type: ContentChildren,
      args: [MAT_PREFIX, {
        descendants: true
      }]
    }],
    _suffixChildren: [{
      type: ContentChildren,
      args: [MAT_SUFFIX, {
        descendants: true
      }]
    }],
    _errorChildren: [{
      type: ContentChildren,
      args: [MAT_ERROR, {
        descendants: true
      }]
    }],
    _hintChildren: [{
      type: ContentChildren,
      args: [MatHint, {
        descendants: true
      }]
    }],
    hideRequiredMarker: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    floatLabel: [{
      type: Input
    }],
    appearance: [{
      type: Input
    }],
    subscriptSizing: [{
      type: Input
    }],
    hintLabel: [{
      type: Input
    }]
  });
})();
var _MatFormFieldModule = class _MatFormFieldModule {
};
_MatFormFieldModule.\u0275fac = function MatFormFieldModule_Factory(t) {
  return new (t || _MatFormFieldModule)();
};
_MatFormFieldModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _MatFormFieldModule
});
_MatFormFieldModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [MatCommonModule, CommonModule, ObserversModule, MatCommonModule]
});
var MatFormFieldModule = _MatFormFieldModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CommonModule, ObserversModule],
      exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule],
      declarations: [MatFormField, MatLabel, MatError, MatHint, MatPrefix, MatSuffix, MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, MatFormFieldLineRipple]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/card.mjs
var _c02 = ["*"];
var _c12 = [[["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], [["", "mat-card-image", ""], ["", "matCardImage", ""], ["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""], ["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""], ["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""], ["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]], "*"];
var _c22 = ["mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]", "*"];
var _c32 = [[["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]], [["mat-card-title"], ["mat-card-subtitle"], ["", "mat-card-title", ""], ["", "mat-card-subtitle", ""], ["", "matCardTitle", ""], ["", "matCardSubtitle", ""]], "*"];
var _c42 = ["[mat-card-avatar], [matCardAvatar]", "mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]", "*"];
var MAT_CARD_CONFIG = new InjectionToken("MAT_CARD_CONFIG");
var _MatCard = class _MatCard {
  constructor(config) {
    this.appearance = config?.appearance || "raised";
  }
};
_MatCard.\u0275fac = function MatCard_Factory(t) {
  return new (t || _MatCard)(\u0275\u0275directiveInject(MAT_CARD_CONFIG, 8));
};
_MatCard.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatCard,
  selectors: [["mat-card"]],
  hostAttrs: [1, "mat-mdc-card", "mdc-card"],
  hostVars: 4,
  hostBindings: function MatCard_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("mat-mdc-card-outlined", ctx.appearance === "outlined")("mdc-card--outlined", ctx.appearance === "outlined");
    }
  },
  inputs: {
    appearance: "appearance"
  },
  exportAs: ["matCard"],
  ngContentSelectors: _c02,
  decls: 1,
  vars: 0,
  template: function MatCard_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  styles: ['.mdc-card{display:flex;flex-direction:column;box-sizing:border-box}.mdc-card::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none;pointer-events:none}@media screen and (forced-colors: active){.mdc-card::after{border-color:CanvasText}}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{color:rgba(0, 0, 0, 0.6);flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mdc-card__action--icon:not(:disabled){color:rgba(0, 0, 0, 0.6)}.mat-mdc-card{border-radius:var(--mdc-elevated-card-container-shape);background-color:var(--mdc-elevated-card-container-color);border-width:0;border-style:solid;border-color:var(--mdc-elevated-card-container-color);box-shadow:var(--mdc-elevated-card-container-elevation)}.mat-mdc-card .mdc-card::after{border-radius:var(--mdc-elevated-card-container-shape)}.mat-mdc-card-outlined{border-width:var(--mdc-outlined-card-outline-width);border-style:solid;border-color:var(--mdc-outlined-card-outline-color);border-radius:var(--mdc-outlined-card-container-shape);background-color:var(--mdc-outlined-card-container-color);box-shadow:var(--mdc-outlined-card-container-elevation)}.mat-mdc-card-outlined .mdc-card::after{border-radius:var(--mdc-outlined-card-container-shape)}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font);line-height:var(--mat-card-title-text-line-height);font-size:var(--mat-card-title-text-size);letter-spacing:var(--mat-card-title-text-tracking);font-weight:var(--mat-card-title-text-weight)}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color);font-family:var(--mat-card-subtitle-text-font);line-height:var(--mat-card-subtitle-text-line-height);font-size:var(--mat-card-subtitle-text-size);letter-spacing:var(--mat-card-subtitle-text-tracking);font-weight:var(--mat-card-subtitle-text-weight)}.mat-mdc-card{position:relative}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}'],
  encapsulation: 2,
  changeDetection: 0
});
var MatCard = _MatCard;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCard, [{
    type: Component,
    args: [{
      selector: "mat-card",
      host: {
        "class": "mat-mdc-card mdc-card",
        "[class.mat-mdc-card-outlined]": 'appearance === "outlined"',
        "[class.mdc-card--outlined]": 'appearance === "outlined"'
      },
      exportAs: "matCard",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>\n",
      styles: ['.mdc-card{display:flex;flex-direction:column;box-sizing:border-box}.mdc-card::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none;pointer-events:none}@media screen and (forced-colors: active){.mdc-card::after{border-color:CanvasText}}.mdc-card--outlined::after{border:none}.mdc-card__content{border-radius:inherit;height:100%}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square::before{margin-top:100%}.mdc-card__media--16-9::before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{color:rgba(0, 0, 0, 0.6);flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons,.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl]{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}[dir=rtl] .mdc-card__action--button,.mdc-card__action--button[dir=rtl]{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child{margin-left:0;margin-right:0}[dir=rtl] .mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl]{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button,.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl]{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mdc-card__action--icon:not(:disabled){color:rgba(0, 0, 0, 0.6)}.mat-mdc-card{border-radius:var(--mdc-elevated-card-container-shape);background-color:var(--mdc-elevated-card-container-color);border-width:0;border-style:solid;border-color:var(--mdc-elevated-card-container-color);box-shadow:var(--mdc-elevated-card-container-elevation)}.mat-mdc-card .mdc-card::after{border-radius:var(--mdc-elevated-card-container-shape)}.mat-mdc-card-outlined{border-width:var(--mdc-outlined-card-outline-width);border-style:solid;border-color:var(--mdc-outlined-card-outline-color);border-radius:var(--mdc-outlined-card-container-shape);background-color:var(--mdc-outlined-card-container-color);box-shadow:var(--mdc-outlined-card-container-elevation)}.mat-mdc-card-outlined .mdc-card::after{border-radius:var(--mdc-outlined-card-container-shape)}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font);line-height:var(--mat-card-title-text-line-height);font-size:var(--mat-card-title-text-size);letter-spacing:var(--mat-card-title-text-tracking);font-weight:var(--mat-card-title-text-weight)}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color);font-family:var(--mat-card-subtitle-text-font);line-height:var(--mat-card-subtitle-text-line-height);font-size:var(--mat-card-subtitle-text-size);letter-spacing:var(--mat-card-subtitle-text-tracking);font-weight:var(--mat-card-subtitle-text-weight)}.mat-mdc-card{position:relative}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}']
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_CARD_CONFIG]
    }, {
      type: Optional
    }]
  }], {
    appearance: [{
      type: Input
    }]
  });
})();
var _MatCardTitle = class _MatCardTitle {
};
_MatCardTitle.\u0275fac = function MatCardTitle_Factory(t) {
  return new (t || _MatCardTitle)();
};
_MatCardTitle.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardTitle,
  selectors: [["mat-card-title"], ["", "mat-card-title", ""], ["", "matCardTitle", ""]],
  hostAttrs: [1, "mat-mdc-card-title"]
});
var MatCardTitle = _MatCardTitle;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardTitle, [{
    type: Directive,
    args: [{
      selector: `mat-card-title, [mat-card-title], [matCardTitle]`,
      host: {
        "class": "mat-mdc-card-title"
      }
    }]
  }], null, null);
})();
var _MatCardTitleGroup = class _MatCardTitleGroup {
};
_MatCardTitleGroup.\u0275fac = function MatCardTitleGroup_Factory(t) {
  return new (t || _MatCardTitleGroup)();
};
_MatCardTitleGroup.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatCardTitleGroup,
  selectors: [["mat-card-title-group"]],
  hostAttrs: [1, "mat-mdc-card-title-group"],
  ngContentSelectors: _c22,
  decls: 4,
  vars: 0,
  template: function MatCardTitleGroup_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c12);
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275projection(1);
      \u0275\u0275elementEnd();
      \u0275\u0275projection(2, 1);
      \u0275\u0275projection(3, 2);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var MatCardTitleGroup = _MatCardTitleGroup;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardTitleGroup, [{
    type: Component,
    args: [{
      selector: "mat-card-title-group",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-card-title-group"
      },
      template: '<div>\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content select="[mat-card-image], [matCardImage],\n                    [mat-card-sm-image], [matCardImageSmall],\n                    [mat-card-md-image], [matCardImageMedium],\n                    [mat-card-lg-image], [matCardImageLarge],\n                    [mat-card-xl-image], [matCardImageXLarge]"></ng-content>\n<ng-content></ng-content>\n'
    }]
  }], null, null);
})();
var _MatCardContent = class _MatCardContent {
};
_MatCardContent.\u0275fac = function MatCardContent_Factory(t) {
  return new (t || _MatCardContent)();
};
_MatCardContent.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardContent,
  selectors: [["mat-card-content"]],
  hostAttrs: [1, "mat-mdc-card-content"]
});
var MatCardContent = _MatCardContent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardContent, [{
    type: Directive,
    args: [{
      selector: "mat-card-content",
      host: {
        "class": "mat-mdc-card-content"
      }
    }]
  }], null, null);
})();
var _MatCardSubtitle = class _MatCardSubtitle {
};
_MatCardSubtitle.\u0275fac = function MatCardSubtitle_Factory(t) {
  return new (t || _MatCardSubtitle)();
};
_MatCardSubtitle.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardSubtitle,
  selectors: [["mat-card-subtitle"], ["", "mat-card-subtitle", ""], ["", "matCardSubtitle", ""]],
  hostAttrs: [1, "mat-mdc-card-subtitle"]
});
var MatCardSubtitle = _MatCardSubtitle;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardSubtitle, [{
    type: Directive,
    args: [{
      selector: `mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]`,
      host: {
        "class": "mat-mdc-card-subtitle"
      }
    }]
  }], null, null);
})();
var _MatCardActions = class _MatCardActions {
  constructor() {
    this.align = "start";
  }
};
_MatCardActions.\u0275fac = function MatCardActions_Factory(t) {
  return new (t || _MatCardActions)();
};
_MatCardActions.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardActions,
  selectors: [["mat-card-actions"]],
  hostAttrs: [1, "mat-mdc-card-actions", "mdc-card__actions"],
  hostVars: 2,
  hostBindings: function MatCardActions_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("mat-mdc-card-actions-align-end", ctx.align === "end");
    }
  },
  inputs: {
    align: "align"
  },
  exportAs: ["matCardActions"]
});
var MatCardActions = _MatCardActions;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardActions, [{
    type: Directive,
    args: [{
      selector: "mat-card-actions",
      exportAs: "matCardActions",
      host: {
        "class": "mat-mdc-card-actions mdc-card__actions",
        "[class.mat-mdc-card-actions-align-end]": 'align === "end"'
      }
    }]
  }], null, {
    align: [{
      type: Input
    }]
  });
})();
var _MatCardHeader = class _MatCardHeader {
};
_MatCardHeader.\u0275fac = function MatCardHeader_Factory(t) {
  return new (t || _MatCardHeader)();
};
_MatCardHeader.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatCardHeader,
  selectors: [["mat-card-header"]],
  hostAttrs: [1, "mat-mdc-card-header"],
  ngContentSelectors: _c42,
  decls: 4,
  vars: 0,
  consts: [[1, "mat-mdc-card-header-text"]],
  template: function MatCardHeader_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c32);
      \u0275\u0275projection(0);
      \u0275\u0275elementStart(1, "div", 0);
      \u0275\u0275projection(2, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275projection(3, 2);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var MatCardHeader = _MatCardHeader;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardHeader, [{
    type: Component,
    args: [{
      selector: "mat-card-header",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-mdc-card-header"
      },
      template: '<ng-content select="[mat-card-avatar], [matCardAvatar]"></ng-content>\n<div class="mat-mdc-card-header-text">\n  <ng-content\n      select="mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]"></ng-content>\n</div>\n<ng-content></ng-content>\n'
    }]
  }], null, null);
})();
var _MatCardFooter = class _MatCardFooter {
};
_MatCardFooter.\u0275fac = function MatCardFooter_Factory(t) {
  return new (t || _MatCardFooter)();
};
_MatCardFooter.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardFooter,
  selectors: [["mat-card-footer"]],
  hostAttrs: [1, "mat-mdc-card-footer"]
});
var MatCardFooter = _MatCardFooter;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardFooter, [{
    type: Directive,
    args: [{
      selector: "mat-card-footer",
      host: {
        "class": "mat-mdc-card-footer"
      }
    }]
  }], null, null);
})();
var _MatCardImage = class _MatCardImage {
};
_MatCardImage.\u0275fac = function MatCardImage_Factory(t) {
  return new (t || _MatCardImage)();
};
_MatCardImage.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardImage,
  selectors: [["", "mat-card-image", ""], ["", "matCardImage", ""]],
  hostAttrs: [1, "mat-mdc-card-image", "mdc-card__media"]
});
var MatCardImage = _MatCardImage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-image], [matCardImage]",
      host: {
        "class": "mat-mdc-card-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var _MatCardSmImage = class _MatCardSmImage {
};
_MatCardSmImage.\u0275fac = function MatCardSmImage_Factory(t) {
  return new (t || _MatCardSmImage)();
};
_MatCardSmImage.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardSmImage,
  selectors: [["", "mat-card-sm-image", ""], ["", "matCardImageSmall", ""]],
  hostAttrs: [1, "mat-mdc-card-sm-image", "mdc-card__media"]
});
var MatCardSmImage = _MatCardSmImage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardSmImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-sm-image], [matCardImageSmall]",
      host: {
        "class": "mat-mdc-card-sm-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var _MatCardMdImage = class _MatCardMdImage {
};
_MatCardMdImage.\u0275fac = function MatCardMdImage_Factory(t) {
  return new (t || _MatCardMdImage)();
};
_MatCardMdImage.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardMdImage,
  selectors: [["", "mat-card-md-image", ""], ["", "matCardImageMedium", ""]],
  hostAttrs: [1, "mat-mdc-card-md-image", "mdc-card__media"]
});
var MatCardMdImage = _MatCardMdImage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardMdImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-md-image], [matCardImageMedium]",
      host: {
        "class": "mat-mdc-card-md-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var _MatCardLgImage = class _MatCardLgImage {
};
_MatCardLgImage.\u0275fac = function MatCardLgImage_Factory(t) {
  return new (t || _MatCardLgImage)();
};
_MatCardLgImage.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardLgImage,
  selectors: [["", "mat-card-lg-image", ""], ["", "matCardImageLarge", ""]],
  hostAttrs: [1, "mat-mdc-card-lg-image", "mdc-card__media"]
});
var MatCardLgImage = _MatCardLgImage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardLgImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-lg-image], [matCardImageLarge]",
      host: {
        "class": "mat-mdc-card-lg-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var _MatCardXlImage = class _MatCardXlImage {
};
_MatCardXlImage.\u0275fac = function MatCardXlImage_Factory(t) {
  return new (t || _MatCardXlImage)();
};
_MatCardXlImage.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardXlImage,
  selectors: [["", "mat-card-xl-image", ""], ["", "matCardImageXLarge", ""]],
  hostAttrs: [1, "mat-mdc-card-xl-image", "mdc-card__media"]
});
var MatCardXlImage = _MatCardXlImage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardXlImage, [{
    type: Directive,
    args: [{
      selector: "[mat-card-xl-image], [matCardImageXLarge]",
      host: {
        "class": "mat-mdc-card-xl-image mdc-card__media"
      }
    }]
  }], null, null);
})();
var _MatCardAvatar = class _MatCardAvatar {
};
_MatCardAvatar.\u0275fac = function MatCardAvatar_Factory(t) {
  return new (t || _MatCardAvatar)();
};
_MatCardAvatar.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatCardAvatar,
  selectors: [["", "mat-card-avatar", ""], ["", "matCardAvatar", ""]],
  hostAttrs: [1, "mat-mdc-card-avatar"]
});
var MatCardAvatar = _MatCardAvatar;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardAvatar, [{
    type: Directive,
    args: [{
      selector: "[mat-card-avatar], [matCardAvatar]",
      host: {
        "class": "mat-mdc-card-avatar"
      }
    }]
  }], null, null);
})();
var CARD_DIRECTIVES = [MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardImage, MatCardLgImage, MatCardMdImage, MatCardSmImage, MatCardSubtitle, MatCardTitle, MatCardTitleGroup, MatCardXlImage];
var _MatCardModule = class _MatCardModule {
};
_MatCardModule.\u0275fac = function MatCardModule_Factory(t) {
  return new (t || _MatCardModule)();
};
_MatCardModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _MatCardModule
});
_MatCardModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [MatCommonModule, CommonModule, MatCommonModule]
});
var MatCardModule = _MatCardModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatCardModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CommonModule],
      exports: [CARD_DIRECTIVES, MatCommonModule],
      declarations: CARD_DIRECTIVES
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/toolbar.mjs
var _c03 = ["*", [["mat-toolbar-row"]]];
var _c13 = ["*", "mat-toolbar-row"];
var _MatToolbarBase = mixinColor(class {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
});
var _MatToolbarRow = class _MatToolbarRow {
};
_MatToolbarRow.\u0275fac = function MatToolbarRow_Factory(t) {
  return new (t || _MatToolbarRow)();
};
_MatToolbarRow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _MatToolbarRow,
  selectors: [["mat-toolbar-row"]],
  hostAttrs: [1, "mat-toolbar-row"],
  exportAs: ["matToolbarRow"]
});
var MatToolbarRow = _MatToolbarRow;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarRow, [{
    type: Directive,
    args: [{
      selector: "mat-toolbar-row",
      exportAs: "matToolbarRow",
      host: {
        "class": "mat-toolbar-row"
      }
    }]
  }], null, null);
})();
var _MatToolbar = class _MatToolbar extends _MatToolbarBase {
  constructor(elementRef, _platform, document2) {
    super(elementRef);
    this._platform = _platform;
    this._document = document2;
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._checkToolbarMixedModes();
      this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes());
    }
  }
  /**
   * Throws an exception when developers are attempting to combine the different toolbar row modes.
   */
  _checkToolbarMixedModes() {
    if (this._toolbarRows.length && (typeof ngDevMode === "undefined" || ngDevMode)) {
      const isCombinedUsage = Array.from(this._elementRef.nativeElement.childNodes).filter((node) => !(node.classList && node.classList.contains("mat-toolbar-row"))).filter((node) => node.nodeType !== (this._document ? this._document.COMMENT_NODE : 8)).some((node) => !!(node.textContent && node.textContent.trim()));
      if (isCombinedUsage) {
        throwToolbarMixedModesError();
      }
    }
  }
};
_MatToolbar.\u0275fac = function MatToolbar_Factory(t) {
  return new (t || _MatToolbar)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(Platform), \u0275\u0275directiveInject(DOCUMENT));
};
_MatToolbar.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatToolbar,
  selectors: [["mat-toolbar"]],
  contentQueries: function MatToolbar_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, MatToolbarRow, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._toolbarRows = _t);
    }
  },
  hostAttrs: [1, "mat-toolbar"],
  hostVars: 4,
  hostBindings: function MatToolbar_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("mat-toolbar-multiple-rows", ctx._toolbarRows.length > 0)("mat-toolbar-single-row", ctx._toolbarRows.length === 0);
    }
  },
  inputs: {
    color: "color"
  },
  exportAs: ["matToolbar"],
  features: [\u0275\u0275InheritDefinitionFeature],
  ngContentSelectors: _c13,
  decls: 2,
  vars: 0,
  template: function MatToolbar_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c03);
      \u0275\u0275projection(0);
      \u0275\u0275projection(1, 1);
    }
  },
  styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"],
  encapsulation: 2,
  changeDetection: 0
});
var MatToolbar = _MatToolbar;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbar, [{
    type: Component,
    args: [{
      selector: "mat-toolbar",
      exportAs: "matToolbar",
      inputs: ["color"],
      host: {
        "class": "mat-toolbar",
        "[class.mat-toolbar-multiple-rows]": "_toolbarRows.length > 0",
        "[class.mat-toolbar-single-row]": "_toolbarRows.length === 0"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      template: '<ng-content></ng-content>\n<ng-content select="mat-toolbar-row"></ng-content>\n',
      styles: [".mat-toolbar{background:var(--mat-toolbar-container-background-color);color:var(--mat-toolbar-container-text-color)}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font);font-size:var(--mat-toolbar-title-text-size);line-height:var(--mat-toolbar-title-text-line-height);font-weight:var(--mat-toolbar-title-text-weight);letter-spacing:var(--mat-toolbar-title-text-tracking);margin:0}.cdk-high-contrast-active .mat-toolbar{outline:solid 1px}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height)}}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Platform
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    _toolbarRows: [{
      type: ContentChildren,
      args: [MatToolbarRow, {
        descendants: true
      }]
    }]
  });
})();
function throwToolbarMixedModesError() {
  throw Error("MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.");
}
var _MatToolbarModule = class _MatToolbarModule {
};
_MatToolbarModule.\u0275fac = function MatToolbarModule_Factory(t) {
  return new (t || _MatToolbarModule)();
};
_MatToolbarModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _MatToolbarModule
});
_MatToolbarModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [MatCommonModule, MatCommonModule]
});
var MatToolbarModule = _MatToolbarModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule],
      exports: [MatToolbar, MatToolbarRow, MatCommonModule],
      declarations: [MatToolbar, MatToolbarRow]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/collections.mjs
var DataSource = class {
};
function isDataSource(value) {
  return value && typeof value.connect === "function" && !(value instanceof ConnectableObservable);
}
var ArrayDataSource = class extends DataSource {
  constructor(_data) {
    super();
    this._data = _data;
  }
  connect() {
    return isObservable(this._data) ? this._data : of(this._data);
  }
  disconnect() {
  }
};
var _RecycleViewRepeaterStrategy = class {
  constructor() {
    this.viewCacheSize = 20;
    this._viewCache = [];
  }
  /** Apply changes to the DOM. */
  applyChanges(changes, viewContainerRef, itemContextFactory, itemValueResolver, itemViewChanged) {
    changes.forEachOperation((record, adjustedPreviousIndex, currentIndex) => {
      let view;
      let operation;
      if (record.previousIndex == null) {
        const viewArgsFactory = () => itemContextFactory(record, adjustedPreviousIndex, currentIndex);
        view = this._insertView(viewArgsFactory, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = view ? 1 : 0;
      } else if (currentIndex == null) {
        this._detachAndCacheView(adjustedPreviousIndex, viewContainerRef);
        operation = 3;
      } else {
        view = this._moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, itemValueResolver(record));
        operation = 2;
      }
      if (itemViewChanged) {
        itemViewChanged({
          context: view?.context,
          operation,
          record
        });
      }
    });
  }
  detach() {
    for (const view of this._viewCache) {
      view.destroy();
    }
    this._viewCache = [];
  }
  /**
   * Inserts a view for a new item, either from the cache or by creating a new
   * one. Returns `undefined` if the item was inserted into a cached view.
   */
  _insertView(viewArgsFactory, currentIndex, viewContainerRef, value) {
    const cachedView = this._insertViewFromCache(currentIndex, viewContainerRef);
    if (cachedView) {
      cachedView.context.$implicit = value;
      return void 0;
    }
    const viewArgs = viewArgsFactory();
    return viewContainerRef.createEmbeddedView(viewArgs.templateRef, viewArgs.context, viewArgs.index);
  }
  /** Detaches the view at the given index and inserts into the view cache. */
  _detachAndCacheView(index, viewContainerRef) {
    const detachedView = viewContainerRef.detach(index);
    this._maybeCacheView(detachedView, viewContainerRef);
  }
  /** Moves view at the previous index to the current index. */
  _moveView(adjustedPreviousIndex, currentIndex, viewContainerRef, value) {
    const view = viewContainerRef.get(adjustedPreviousIndex);
    viewContainerRef.move(view, currentIndex);
    view.context.$implicit = value;
    return view;
  }
  /**
   * Cache the given detached view. If the cache is full, the view will be
   * destroyed.
   */
  _maybeCacheView(view, viewContainerRef) {
    if (this._viewCache.length < this.viewCacheSize) {
      this._viewCache.push(view);
    } else {
      const index = viewContainerRef.indexOf(view);
      if (index === -1) {
        view.destroy();
      } else {
        viewContainerRef.remove(index);
      }
    }
  }
  /** Inserts a recycled view from the cache at the given index. */
  _insertViewFromCache(index, viewContainerRef) {
    const cachedView = this._viewCache.pop();
    if (cachedView) {
      viewContainerRef.insert(cachedView, index);
    }
    return cachedView || null;
  }
};
var SelectionModel = class {
  /** Selected values. */
  get selected() {
    if (!this._selected) {
      this._selected = Array.from(this._selection.values());
    }
    return this._selected;
  }
  constructor(_multiple = false, initiallySelectedValues, _emitChanges = true, compareWith) {
    this._multiple = _multiple;
    this._emitChanges = _emitChanges;
    this.compareWith = compareWith;
    this._selection = /* @__PURE__ */ new Set();
    this._deselectedToEmit = [];
    this._selectedToEmit = [];
    this.changed = new Subject();
    if (initiallySelectedValues && initiallySelectedValues.length) {
      if (_multiple) {
        initiallySelectedValues.forEach((value) => this._markSelected(value));
      } else {
        this._markSelected(initiallySelectedValues[0]);
      }
      this._selectedToEmit.length = 0;
    }
  }
  /**
   * Selects a value or an array of values.
   * @param values The values to select
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  select(...values) {
    this._verifyValueAssignment(values);
    values.forEach((value) => this._markSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Deselects a value or an array of values.
   * @param values The values to deselect
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  deselect(...values) {
    this._verifyValueAssignment(values);
    values.forEach((value) => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Sets the selected values
   * @param values The new selected values
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  setSelection(...values) {
    this._verifyValueAssignment(values);
    const oldValues = this.selected;
    const newSelectedSet = new Set(values);
    values.forEach((value) => this._markSelected(value));
    oldValues.filter((value) => !newSelectedSet.has(value)).forEach((value) => this._unmarkSelected(value));
    const changed = this._hasQueuedChanges();
    this._emitChangeEvent();
    return changed;
  }
  /**
   * Toggles a value between selected and deselected.
   * @param value The value to toggle
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  toggle(value) {
    return this.isSelected(value) ? this.deselect(value) : this.select(value);
  }
  /**
   * Clears all of the selected values.
   * @param flushEvent Whether to flush the changes in an event.
   *   If false, the changes to the selection will be flushed along with the next event.
   * @return Whether the selection changed as a result of this call
   * @breaking-change 16.0.0 make return type boolean
   */
  clear(flushEvent = true) {
    this._unmarkAll();
    const changed = this._hasQueuedChanges();
    if (flushEvent) {
      this._emitChangeEvent();
    }
    return changed;
  }
  /**
   * Determines whether a value is selected.
   */
  isSelected(value) {
    return this._selection.has(this._getConcreteValue(value));
  }
  /**
   * Determines whether the model does not have a value.
   */
  isEmpty() {
    return this._selection.size === 0;
  }
  /**
   * Determines whether the model has a value.
   */
  hasValue() {
    return !this.isEmpty();
  }
  /**
   * Sorts the selected values based on a predicate function.
   */
  sort(predicate) {
    if (this._multiple && this.selected) {
      this._selected.sort(predicate);
    }
  }
  /**
   * Gets whether multiple values can be selected.
   */
  isMultipleSelection() {
    return this._multiple;
  }
  /** Emits a change event and clears the records of selected and deselected values. */
  _emitChangeEvent() {
    this._selected = null;
    if (this._selectedToEmit.length || this._deselectedToEmit.length) {
      this.changed.next({
        source: this,
        added: this._selectedToEmit,
        removed: this._deselectedToEmit
      });
      this._deselectedToEmit = [];
      this._selectedToEmit = [];
    }
  }
  /** Selects a value. */
  _markSelected(value) {
    value = this._getConcreteValue(value);
    if (!this.isSelected(value)) {
      if (!this._multiple) {
        this._unmarkAll();
      }
      if (!this.isSelected(value)) {
        this._selection.add(value);
      }
      if (this._emitChanges) {
        this._selectedToEmit.push(value);
      }
    }
  }
  /** Deselects a value. */
  _unmarkSelected(value) {
    value = this._getConcreteValue(value);
    if (this.isSelected(value)) {
      this._selection.delete(value);
      if (this._emitChanges) {
        this._deselectedToEmit.push(value);
      }
    }
  }
  /** Clears out the selected values. */
  _unmarkAll() {
    if (!this.isEmpty()) {
      this._selection.forEach((value) => this._unmarkSelected(value));
    }
  }
  /**
   * Verifies the value assignment and throws an error if the specified value array is
   * including multiple values while the selection model is not supporting multiple values.
   */
  _verifyValueAssignment(values) {
    if (values.length > 1 && !this._multiple && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMultipleValuesInSingleSelectionError();
    }
  }
  /** Whether there are queued up change to be emitted. */
  _hasQueuedChanges() {
    return !!(this._deselectedToEmit.length || this._selectedToEmit.length);
  }
  /** Returns a value that is comparable to inputValue by applying compareWith function, returns the same inputValue otherwise. */
  _getConcreteValue(inputValue) {
    if (!this.compareWith) {
      return inputValue;
    } else {
      for (let selectedValue of this._selection) {
        if (this.compareWith(inputValue, selectedValue)) {
          return selectedValue;
        }
      }
      return inputValue;
    }
  }
};
function getMultipleValuesInSingleSelectionError() {
  return Error("Cannot pass multiple values into SelectionModel with single-value mode.");
}
var _UniqueSelectionDispatcher = class _UniqueSelectionDispatcher {
  constructor() {
    this._listeners = [];
  }
  /**
   * Notify other items that selection for the given name has been set.
   * @param id ID of the item.
   * @param name Name of the item.
   */
  notify(id, name) {
    for (let listener of this._listeners) {
      listener(id, name);
    }
  }
  /**
   * Listen for future changes to item selection.
   * @return Function used to deregister listener
   */
  listen(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((registered) => {
        return listener !== registered;
      });
    };
  }
  ngOnDestroy() {
    this._listeners = [];
  }
};
_UniqueSelectionDispatcher.\u0275fac = function UniqueSelectionDispatcher_Factory(t) {
  return new (t || _UniqueSelectionDispatcher)();
};
_UniqueSelectionDispatcher.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _UniqueSelectionDispatcher,
  factory: _UniqueSelectionDispatcher.\u0275fac,
  providedIn: "root"
});
var UniqueSelectionDispatcher = _UniqueSelectionDispatcher;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UniqueSelectionDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _VIEW_REPEATER_STRATEGY = new InjectionToken("_ViewRepeater");

// node_modules/@angular/cdk/fesm2022/scrolling.mjs
var _c04 = ["contentWrapper"];
var _c14 = ["*"];
var VIRTUAL_SCROLL_STRATEGY = new InjectionToken("VIRTUAL_SCROLL_STRATEGY");
var FixedSizeVirtualScrollStrategy = class {
  /**
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  constructor(itemSize, minBufferPx, maxBufferPx) {
    this._scrolledIndexChange = new Subject();
    this.scrolledIndexChange = this._scrolledIndexChange.pipe(distinctUntilChanged());
    this._viewport = null;
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
  }
  /**
   * Attaches this scroll strategy to a viewport.
   * @param viewport The viewport to attach this strategy to.
   */
  attach(viewport) {
    this._viewport = viewport;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** Detaches this scroll strategy from the currently attached viewport. */
  detach() {
    this._scrolledIndexChange.complete();
    this._viewport = null;
  }
  /**
   * Update the item size and buffer size.
   * @param itemSize The size of the items in the virtually scrolling list.
   * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
   * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
   */
  updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
    if (maxBufferPx < minBufferPx && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx");
    }
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentScrolled() {
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onDataLengthChanged() {
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onContentRendered() {
  }
  /** @docs-private Implemented as part of VirtualScrollStrategy. */
  onRenderedOffsetChanged() {
  }
  /**
   * Scroll to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling.
   */
  scrollToIndex(index, behavior) {
    if (this._viewport) {
      this._viewport.scrollToOffset(index * this._itemSize, behavior);
    }
  }
  /** Update the viewport's total content size. */
  _updateTotalContentSize() {
    if (!this._viewport) {
      return;
    }
    this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
  }
  /** Update the viewport's rendered range. */
  _updateRenderedRange() {
    if (!this._viewport) {
      return;
    }
    const renderedRange = this._viewport.getRenderedRange();
    const newRange = {
      start: renderedRange.start,
      end: renderedRange.end
    };
    const viewportSize = this._viewport.getViewportSize();
    const dataLength = this._viewport.getDataLength();
    let scrollOffset = this._viewport.measureScrollOffset();
    let firstVisibleIndex = this._itemSize > 0 ? scrollOffset / this._itemSize : 0;
    if (newRange.end > dataLength) {
      const maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
      const newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
      if (firstVisibleIndex != newVisibleIndex) {
        firstVisibleIndex = newVisibleIndex;
        scrollOffset = newVisibleIndex * this._itemSize;
        newRange.start = Math.floor(firstVisibleIndex);
      }
      newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
    }
    const startBuffer = scrollOffset - newRange.start * this._itemSize;
    if (startBuffer < this._minBufferPx && newRange.start != 0) {
      const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
      newRange.start = Math.max(0, newRange.start - expandStart);
      newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
    } else {
      const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
      if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
        if (expandEnd > 0) {
          newRange.end = Math.min(dataLength, newRange.end + expandEnd);
          newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
        }
      }
    }
    this._viewport.setRenderedRange(newRange);
    this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);
    this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
  }
};
function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
  return fixedSizeDir._scrollStrategy;
}
var _CdkFixedSizeVirtualScroll = class _CdkFixedSizeVirtualScroll {
  constructor() {
    this._itemSize = 20;
    this._minBufferPx = 100;
    this._maxBufferPx = 200;
    this._scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
  }
  /** The size of the items in the list (in pixels). */
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(value) {
    this._itemSize = coerceNumberProperty(value);
  }
  /**
   * The minimum amount of buffer rendered beyond the viewport (in pixels).
   * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
   */
  get minBufferPx() {
    return this._minBufferPx;
  }
  set minBufferPx(value) {
    this._minBufferPx = coerceNumberProperty(value);
  }
  /**
   * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
   */
  get maxBufferPx() {
    return this._maxBufferPx;
  }
  set maxBufferPx(value) {
    this._maxBufferPx = coerceNumberProperty(value);
  }
  ngOnChanges() {
    this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
  }
};
_CdkFixedSizeVirtualScroll.\u0275fac = function CdkFixedSizeVirtualScroll_Factory(t) {
  return new (t || _CdkFixedSizeVirtualScroll)();
};
_CdkFixedSizeVirtualScroll.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _CdkFixedSizeVirtualScroll,
  selectors: [["cdk-virtual-scroll-viewport", "itemSize", ""]],
  inputs: {
    itemSize: "itemSize",
    minBufferPx: "minBufferPx",
    maxBufferPx: "maxBufferPx"
  },
  standalone: true,
  features: [\u0275\u0275ProvidersFeature([{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useFactory: _fixedSizeVirtualScrollStrategyFactory,
    deps: [forwardRef(() => _CdkFixedSizeVirtualScroll)]
  }]), \u0275\u0275NgOnChangesFeature]
});
var CdkFixedSizeVirtualScroll = _CdkFixedSizeVirtualScroll;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkFixedSizeVirtualScroll, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[itemSize]",
      standalone: true,
      providers: [{
        provide: VIRTUAL_SCROLL_STRATEGY,
        useFactory: _fixedSizeVirtualScrollStrategyFactory,
        deps: [forwardRef(() => CdkFixedSizeVirtualScroll)]
      }]
    }]
  }], null, {
    itemSize: [{
      type: Input
    }],
    minBufferPx: [{
      type: Input
    }],
    maxBufferPx: [{
      type: Input
    }]
  });
})();
var DEFAULT_SCROLL_TIME = 20;
var _ScrollDispatcher = class _ScrollDispatcher {
  constructor(_ngZone, _platform, document2) {
    this._ngZone = _ngZone;
    this._platform = _platform;
    this._scrolled = new Subject();
    this._globalSubscription = null;
    this._scrolledCount = 0;
    this.scrollContainers = /* @__PURE__ */ new Map();
    this._document = document2;
  }
  /**
   * Registers a scrollable instance with the service and listens for its scrolled events. When the
   * scrollable is scrolled, the service emits the event to its scrolled observable.
   * @param scrollable Scrollable instance to be registered.
   */
  register(scrollable) {
    if (!this.scrollContainers.has(scrollable)) {
      this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(() => this._scrolled.next(scrollable)));
    }
  }
  /**
   * De-registers a Scrollable reference and unsubscribes from its scroll event observable.
   * @param scrollable Scrollable instance to be deregistered.
   */
  deregister(scrollable) {
    const scrollableReference = this.scrollContainers.get(scrollable);
    if (scrollableReference) {
      scrollableReference.unsubscribe();
      this.scrollContainers.delete(scrollable);
    }
  }
  /**
   * Returns an observable that emits an event whenever any of the registered Scrollable
   * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
   * to override the default "throttle" time.
   *
   * **Note:** in order to avoid hitting change detection for every scroll event,
   * all of the events emitted from this stream will be run outside the Angular zone.
   * If you need to update any data bindings as a result of a scroll event, you have
   * to run the callback using `NgZone.run`.
   */
  scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME) {
    if (!this._platform.isBrowser) {
      return of();
    }
    return new Observable((observer) => {
      if (!this._globalSubscription) {
        this._addGlobalListener();
      }
      const subscription = auditTimeInMs > 0 ? this._scrolled.pipe(auditTime(auditTimeInMs)).subscribe(observer) : this._scrolled.subscribe(observer);
      this._scrolledCount++;
      return () => {
        subscription.unsubscribe();
        this._scrolledCount--;
        if (!this._scrolledCount) {
          this._removeGlobalListener();
        }
      };
    });
  }
  ngOnDestroy() {
    this._removeGlobalListener();
    this.scrollContainers.forEach((_, container) => this.deregister(container));
    this._scrolled.complete();
  }
  /**
   * Returns an observable that emits whenever any of the
   * scrollable ancestors of an element are scrolled.
   * @param elementOrElementRef Element whose ancestors to listen for.
   * @param auditTimeInMs Time to throttle the scroll events.
   */
  ancestorScrolled(elementOrElementRef, auditTimeInMs) {
    const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
    return this.scrolled(auditTimeInMs).pipe(filter((target) => {
      return !target || ancestors.indexOf(target) > -1;
    }));
  }
  /** Returns all registered Scrollables that contain the provided element. */
  getAncestorScrollContainers(elementOrElementRef) {
    const scrollingContainers = [];
    this.scrollContainers.forEach((_subscription, scrollable) => {
      if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
        scrollingContainers.push(scrollable);
      }
    });
    return scrollingContainers;
  }
  /** Use defaultView of injected document if available or fallback to global window reference */
  _getWindow() {
    return this._document.defaultView || window;
  }
  /** Returns true if the element is contained within the provided Scrollable. */
  _scrollableContainsElement(scrollable, elementOrElementRef) {
    let element = coerceElement(elementOrElementRef);
    let scrollableElement = scrollable.getElementRef().nativeElement;
    do {
      if (element == scrollableElement) {
        return true;
      }
    } while (element = element.parentElement);
    return false;
  }
  /** Sets up the global scroll listeners. */
  _addGlobalListener() {
    this._globalSubscription = this._ngZone.runOutsideAngular(() => {
      const window2 = this._getWindow();
      return fromEvent(window2.document, "scroll").subscribe(() => this._scrolled.next());
    });
  }
  /** Cleans up the global scroll listener. */
  _removeGlobalListener() {
    if (this._globalSubscription) {
      this._globalSubscription.unsubscribe();
      this._globalSubscription = null;
    }
  }
};
_ScrollDispatcher.\u0275fac = function ScrollDispatcher_Factory(t) {
  return new (t || _ScrollDispatcher)(\u0275\u0275inject(NgZone), \u0275\u0275inject(Platform), \u0275\u0275inject(DOCUMENT, 8));
};
_ScrollDispatcher.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _ScrollDispatcher,
  factory: _ScrollDispatcher.\u0275fac,
  providedIn: "root"
});
var ScrollDispatcher = _ScrollDispatcher;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: NgZone
  }, {
    type: Platform
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var _CdkScrollable = class _CdkScrollable {
  constructor(elementRef, scrollDispatcher, ngZone, dir) {
    this.elementRef = elementRef;
    this.scrollDispatcher = scrollDispatcher;
    this.ngZone = ngZone;
    this.dir = dir;
    this._destroyed = new Subject();
    this._elementScrolled = new Observable((observer) => this.ngZone.runOutsideAngular(() => fromEvent(this.elementRef.nativeElement, "scroll").pipe(takeUntil(this._destroyed)).subscribe(observer)));
  }
  ngOnInit() {
    this.scrollDispatcher.register(this);
  }
  ngOnDestroy() {
    this.scrollDispatcher.deregister(this);
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Returns observable that emits when a scroll event is fired on the host element. */
  elementScrolled() {
    return this._elementScrolled;
  }
  /** Gets the ElementRef for the viewport. */
  getElementRef() {
    return this.elementRef;
  }
  /**
   * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
   * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param options specified the offsets to scroll to.
   */
  scrollTo(options) {
    const el = this.elementRef.nativeElement;
    const isRtl = this.dir && this.dir.value == "rtl";
    if (options.left == null) {
      options.left = isRtl ? options.end : options.start;
    }
    if (options.right == null) {
      options.right = isRtl ? options.start : options.end;
    }
    if (options.bottom != null) {
      options.top = el.scrollHeight - el.clientHeight - options.bottom;
    }
    if (isRtl && getRtlScrollAxisType() != 0) {
      if (options.left != null) {
        options.right = el.scrollWidth - el.clientWidth - options.left;
      }
      if (getRtlScrollAxisType() == 2) {
        options.left = options.right;
      } else if (getRtlScrollAxisType() == 1) {
        options.left = options.right ? -options.right : options.right;
      }
    } else {
      if (options.right != null) {
        options.left = el.scrollWidth - el.clientWidth - options.right;
      }
    }
    this._applyScrollToOptions(options);
  }
  _applyScrollToOptions(options) {
    const el = this.elementRef.nativeElement;
    if (supportsScrollBehavior()) {
      el.scrollTo(options);
    } else {
      if (options.top != null) {
        el.scrollTop = options.top;
      }
      if (options.left != null) {
        el.scrollLeft = options.left;
      }
    }
  }
  /**
   * Measures the scroll offset relative to the specified edge of the viewport. This method can be
   * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
   * about what scrollLeft means in RTL. The values returned by this method are normalized such that
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param from The edge to measure from.
   */
  measureScrollOffset(from) {
    const LEFT = "left";
    const RIGHT = "right";
    const el = this.elementRef.nativeElement;
    if (from == "top") {
      return el.scrollTop;
    }
    if (from == "bottom") {
      return el.scrollHeight - el.clientHeight - el.scrollTop;
    }
    const isRtl = this.dir && this.dir.value == "rtl";
    if (from == "start") {
      from = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      from = isRtl ? LEFT : RIGHT;
    }
    if (isRtl && getRtlScrollAxisType() == 2) {
      if (from == LEFT) {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      } else {
        return el.scrollLeft;
      }
    } else if (isRtl && getRtlScrollAxisType() == 1) {
      if (from == LEFT) {
        return el.scrollLeft + el.scrollWidth - el.clientWidth;
      } else {
        return -el.scrollLeft;
      }
    } else {
      if (from == LEFT) {
        return el.scrollLeft;
      } else {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      }
    }
  }
};
_CdkScrollable.\u0275fac = function CdkScrollable_Factory(t) {
  return new (t || _CdkScrollable)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ScrollDispatcher), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(Directionality, 8));
};
_CdkScrollable.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _CdkScrollable,
  selectors: [["", "cdk-scrollable", ""], ["", "cdkScrollable", ""]],
  standalone: true
});
var CdkScrollable = _CdkScrollable;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollable, [{
    type: Directive,
    args: [{
      selector: "[cdk-scrollable], [cdkScrollable]",
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: NgZone
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var DEFAULT_RESIZE_TIME = 20;
var _ViewportRuler = class _ViewportRuler {
  constructor(_platform, ngZone, document2) {
    this._platform = _platform;
    this._change = new Subject();
    this._changeListener = (event) => {
      this._change.next(event);
    };
    this._document = document2;
    ngZone.runOutsideAngular(() => {
      if (_platform.isBrowser) {
        const window2 = this._getWindow();
        window2.addEventListener("resize", this._changeListener);
        window2.addEventListener("orientationchange", this._changeListener);
      }
      this.change().subscribe(() => this._viewportSize = null);
    });
  }
  ngOnDestroy() {
    if (this._platform.isBrowser) {
      const window2 = this._getWindow();
      window2.removeEventListener("resize", this._changeListener);
      window2.removeEventListener("orientationchange", this._changeListener);
    }
    this._change.complete();
  }
  /** Returns the viewport's width and height. */
  getViewportSize() {
    if (!this._viewportSize) {
      this._updateViewportSize();
    }
    const output = {
      width: this._viewportSize.width,
      height: this._viewportSize.height
    };
    if (!this._platform.isBrowser) {
      this._viewportSize = null;
    }
    return output;
  }
  /** Gets a ClientRect for the viewport's bounds. */
  getViewportRect() {
    const scrollPosition = this.getViewportScrollPosition();
    const {
      width,
      height
    } = this.getViewportSize();
    return {
      top: scrollPosition.top,
      left: scrollPosition.left,
      bottom: scrollPosition.top + height,
      right: scrollPosition.left + width,
      height,
      width
    };
  }
  /** Gets the (top, left) scroll position of the viewport. */
  getViewportScrollPosition() {
    if (!this._platform.isBrowser) {
      return {
        top: 0,
        left: 0
      };
    }
    const document2 = this._document;
    const window2 = this._getWindow();
    const documentElement = document2.documentElement;
    const documentRect = documentElement.getBoundingClientRect();
    const top = -documentRect.top || document2.body.scrollTop || window2.scrollY || documentElement.scrollTop || 0;
    const left = -documentRect.left || document2.body.scrollLeft || window2.scrollX || documentElement.scrollLeft || 0;
    return {
      top,
      left
    };
  }
  /**
   * Returns a stream that emits whenever the size of the viewport changes.
   * This stream emits outside of the Angular zone.
   * @param throttleTime Time in milliseconds to throttle the stream.
   */
  change(throttleTime = DEFAULT_RESIZE_TIME) {
    return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
  }
  /** Use defaultView of injected document if available or fallback to global window reference */
  _getWindow() {
    return this._document.defaultView || window;
  }
  /** Updates the cached viewport size. */
  _updateViewportSize() {
    const window2 = this._getWindow();
    this._viewportSize = this._platform.isBrowser ? {
      width: window2.innerWidth,
      height: window2.innerHeight
    } : {
      width: 0,
      height: 0
    };
  }
};
_ViewportRuler.\u0275fac = function ViewportRuler_Factory(t) {
  return new (t || _ViewportRuler)(\u0275\u0275inject(Platform), \u0275\u0275inject(NgZone), \u0275\u0275inject(DOCUMENT, 8));
};
_ViewportRuler.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
  token: _ViewportRuler,
  factory: _ViewportRuler.\u0275fac,
  providedIn: "root"
});
var ViewportRuler = _ViewportRuler;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewportRuler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Platform
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var VIRTUAL_SCROLLABLE = new InjectionToken("VIRTUAL_SCROLLABLE");
var _CdkVirtualScrollable = class _CdkVirtualScrollable extends CdkScrollable {
  constructor(elementRef, scrollDispatcher, ngZone, dir) {
    super(elementRef, scrollDispatcher, ngZone, dir);
  }
  /**
   * Measure the viewport size for the provided orientation.
   *
   * @param orientation The orientation to measure the size from.
   */
  measureViewportSize(orientation) {
    const viewportEl = this.elementRef.nativeElement;
    return orientation === "horizontal" ? viewportEl.clientWidth : viewportEl.clientHeight;
  }
};
_CdkVirtualScrollable.\u0275fac = function CdkVirtualScrollable_Factory(t) {
  return new (t || _CdkVirtualScrollable)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ScrollDispatcher), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(Directionality, 8));
};
_CdkVirtualScrollable.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _CdkVirtualScrollable,
  features: [\u0275\u0275InheritDefinitionFeature]
});
var CdkVirtualScrollable = _CdkVirtualScrollable;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollable, [{
    type: Directive
  }], () => [{
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: NgZone
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
function rangesEqual(r1, r2) {
  return r1.start == r2.start && r1.end == r2.end;
}
var SCROLL_SCHEDULER = typeof requestAnimationFrame !== "undefined" ? animationFrameScheduler : asapScheduler;
var _CdkVirtualScrollViewport = class _CdkVirtualScrollViewport extends CdkVirtualScrollable {
  /** The direction the viewport scrolls. */
  get orientation() {
    return this._orientation;
  }
  set orientation(orientation) {
    if (this._orientation !== orientation) {
      this._orientation = orientation;
      this._calculateSpacerSize();
    }
  }
  constructor(elementRef, _changeDetectorRef, ngZone, _scrollStrategy, dir, scrollDispatcher, viewportRuler, scrollable) {
    super(elementRef, scrollDispatcher, ngZone, dir);
    this.elementRef = elementRef;
    this._changeDetectorRef = _changeDetectorRef;
    this._scrollStrategy = _scrollStrategy;
    this.scrollable = scrollable;
    this._platform = inject(Platform);
    this._detachedSubject = new Subject();
    this._renderedRangeSubject = new Subject();
    this._orientation = "vertical";
    this.appendOnly = false;
    this.scrolledIndexChange = new Observable((observer) => this._scrollStrategy.scrolledIndexChange.subscribe((index) => Promise.resolve().then(() => this.ngZone.run(() => observer.next(index)))));
    this.renderedRangeStream = this._renderedRangeSubject;
    this._totalContentSize = 0;
    this._totalContentWidth = "";
    this._totalContentHeight = "";
    this._renderedRange = {
      start: 0,
      end: 0
    };
    this._dataLength = 0;
    this._viewportSize = 0;
    this._renderedContentOffset = 0;
    this._renderedContentOffsetNeedsRewrite = false;
    this._isChangeDetectionPending = false;
    this._runAfterChangeDetection = [];
    this._viewportChanges = Subscription.EMPTY;
    if (!_scrollStrategy && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
    }
    this._viewportChanges = viewportRuler.change().subscribe(() => {
      this.checkViewportSize();
    });
    if (!this.scrollable) {
      this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable");
      this.scrollable = this;
    }
  }
  ngOnInit() {
    if (!this._platform.isBrowser) {
      return;
    }
    if (this.scrollable === this) {
      super.ngOnInit();
    }
    this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
      this._measureViewportSize();
      this._scrollStrategy.attach(this);
      this.scrollable.elementScrolled().pipe(
        // Start off with a fake scroll event so we properly detect our initial position.
        startWith(null),
        // Collect multiple events into one until the next animation frame. This way if
        // there are multiple scroll events in the same frame we only need to recheck
        // our layout once.
        auditTime(0, SCROLL_SCHEDULER),
        // Usually `elementScrolled` is completed when the scrollable is destroyed, but
        // that may not be the case if a `CdkVirtualScrollableElement` is used so we have
        // to unsubscribe here just in case.
        takeUntil(this._destroyed)
      ).subscribe(() => this._scrollStrategy.onContentScrolled());
      this._markChangeDetectionNeeded();
    }));
  }
  ngOnDestroy() {
    this.detach();
    this._scrollStrategy.detach();
    this._renderedRangeSubject.complete();
    this._detachedSubject.complete();
    this._viewportChanges.unsubscribe();
    super.ngOnDestroy();
  }
  /** Attaches a `CdkVirtualScrollRepeater` to this viewport. */
  attach(forOf) {
    if (this._forOf && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CdkVirtualScrollViewport is already attached.");
    }
    this.ngZone.runOutsideAngular(() => {
      this._forOf = forOf;
      this._forOf.dataStream.pipe(takeUntil(this._detachedSubject)).subscribe((data) => {
        const newLength = data.length;
        if (newLength !== this._dataLength) {
          this._dataLength = newLength;
          this._scrollStrategy.onDataLengthChanged();
        }
        this._doChangeDetection();
      });
    });
  }
  /** Detaches the current `CdkVirtualForOf`. */
  detach() {
    this._forOf = null;
    this._detachedSubject.next();
  }
  /** Gets the length of the data bound to this viewport (in number of items). */
  getDataLength() {
    return this._dataLength;
  }
  /** Gets the size of the viewport (in pixels). */
  getViewportSize() {
    return this._viewportSize;
  }
  // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
  // cycle happens. I'm being careful to only call it after the render cycle is complete and before
  // setting it to something else, but its error prone and should probably be split into
  // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
  /** Get the current rendered range of items. */
  getRenderedRange() {
    return this._renderedRange;
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
  /**
   * Sets the total size of all content (in pixels), including content that is not currently
   * rendered.
   */
  setTotalContentSize(size) {
    if (this._totalContentSize !== size) {
      this._totalContentSize = size;
      this._calculateSpacerSize();
      this._markChangeDetectionNeeded();
    }
  }
  /** Sets the currently rendered range of indices. */
  setRenderedRange(range) {
    if (!rangesEqual(this._renderedRange, range)) {
      if (this.appendOnly) {
        range = {
          start: 0,
          end: Math.max(this._renderedRange.end, range.end)
        };
      }
      this._renderedRangeSubject.next(this._renderedRange = range);
      this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
    }
  }
  /**
   * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
   */
  getOffsetToRenderedContentStart() {
    return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
  }
  /**
   * Sets the offset from the start of the viewport to either the start or end of the rendered data
   * (in pixels).
   */
  setRenderedContentOffset(offset, to = "to-start") {
    offset = this.appendOnly && to === "to-start" ? 0 : offset;
    const isRtl = this.dir && this.dir.value == "rtl";
    const isHorizontal = this.orientation == "horizontal";
    const axis = isHorizontal ? "X" : "Y";
    const axisDirection = isHorizontal && isRtl ? -1 : 1;
    let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
    this._renderedContentOffset = offset;
    if (to === "to-end") {
      transform += ` translate${axis}(-100%)`;
      this._renderedContentOffsetNeedsRewrite = true;
    }
    if (this._renderedContentTransform != transform) {
      this._renderedContentTransform = transform;
      this._markChangeDetectionNeeded(() => {
        if (this._renderedContentOffsetNeedsRewrite) {
          this._renderedContentOffset -= this.measureRenderedContentSize();
          this._renderedContentOffsetNeedsRewrite = false;
          this.setRenderedContentOffset(this._renderedContentOffset);
        } else {
          this._scrollStrategy.onRenderedOffsetChanged();
        }
      });
    }
  }
  /**
   * Scrolls to the given offset from the start of the viewport. Please note that this is not always
   * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
   * direction, this would be the equivalent of setting a fictional `scrollRight` property.
   * @param offset The offset to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
   */
  scrollToOffset(offset, behavior = "auto") {
    const options = {
      behavior
    };
    if (this.orientation === "horizontal") {
      options.start = offset;
    } else {
      options.top = offset;
    }
    this.scrollable.scrollTo(options);
  }
  /**
   * Scrolls to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
   */
  scrollToIndex(index, behavior = "auto") {
    this._scrollStrategy.scrollToIndex(index, behavior);
  }
  /**
   * Gets the current scroll offset from the start of the scrollable (in pixels).
   * @param from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
   *     in horizontal mode.
   */
  measureScrollOffset(from) {
    let measureScrollOffset;
    if (this.scrollable == this) {
      measureScrollOffset = (_from) => super.measureScrollOffset(_from);
    } else {
      measureScrollOffset = (_from) => this.scrollable.measureScrollOffset(_from);
    }
    return Math.max(0, measureScrollOffset(from ?? (this.orientation === "horizontal" ? "start" : "top")) - this.measureViewportOffset());
  }
  /**
   * Measures the offset of the viewport from the scrolling container
   * @param from The edge to measure from.
   */
  measureViewportOffset(from) {
    let fromRect;
    const LEFT = "left";
    const RIGHT = "right";
    const isRtl = this.dir?.value == "rtl";
    if (from == "start") {
      fromRect = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      fromRect = isRtl ? LEFT : RIGHT;
    } else if (from) {
      fromRect = from;
    } else {
      fromRect = this.orientation === "horizontal" ? "left" : "top";
    }
    const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
    const viewportClientRect = this.elementRef.nativeElement.getBoundingClientRect()[fromRect];
    return viewportClientRect - scrollerClientRect;
  }
  /** Measure the combined size of all of the rendered items. */
  measureRenderedContentSize() {
    const contentEl = this._contentWrapper.nativeElement;
    return this.orientation === "horizontal" ? contentEl.offsetWidth : contentEl.offsetHeight;
  }
  /**
   * Measure the total combined size of the given range. Throws if the range includes items that are
   * not rendered.
   */
  measureRangeSize(range) {
    if (!this._forOf) {
      return 0;
    }
    return this._forOf.measureRangeSize(range, this.orientation);
  }
  /** Update the viewport dimensions and re-render. */
  checkViewportSize() {
    this._measureViewportSize();
    this._scrollStrategy.onDataLengthChanged();
  }
  /** Measure the viewport size. */
  _measureViewportSize() {
    this._viewportSize = this.scrollable.measureViewportSize(this.orientation);
  }
  /** Queue up change detection to run. */
  _markChangeDetectionNeeded(runAfter) {
    if (runAfter) {
      this._runAfterChangeDetection.push(runAfter);
    }
    if (!this._isChangeDetectionPending) {
      this._isChangeDetectionPending = true;
      this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
        this._doChangeDetection();
      }));
    }
  }
  /** Run change detection. */
  _doChangeDetection() {
    this._isChangeDetectionPending = false;
    this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
    this.ngZone.run(() => this._changeDetectorRef.markForCheck());
    const runAfterChangeDetection = this._runAfterChangeDetection;
    this._runAfterChangeDetection = [];
    for (const fn of runAfterChangeDetection) {
      fn();
    }
  }
  /** Calculates the `style.width` and `style.height` for the spacer element. */
  _calculateSpacerSize() {
    this._totalContentHeight = this.orientation === "horizontal" ? "" : `${this._totalContentSize}px`;
    this._totalContentWidth = this.orientation === "horizontal" ? `${this._totalContentSize}px` : "";
  }
};
_CdkVirtualScrollViewport.\u0275fac = function CdkVirtualScrollViewport_Factory(t) {
  return new (t || _CdkVirtualScrollViewport)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(VIRTUAL_SCROLL_STRATEGY, 8), \u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(ScrollDispatcher), \u0275\u0275directiveInject(ViewportRuler), \u0275\u0275directiveInject(VIRTUAL_SCROLLABLE, 8));
};
_CdkVirtualScrollViewport.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _CdkVirtualScrollViewport,
  selectors: [["cdk-virtual-scroll-viewport"]],
  viewQuery: function CdkVirtualScrollViewport_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c04, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._contentWrapper = _t.first);
    }
  },
  hostAttrs: [1, "cdk-virtual-scroll-viewport"],
  hostVars: 4,
  hostBindings: function CdkVirtualScrollViewport_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("cdk-virtual-scroll-orientation-horizontal", ctx.orientation === "horizontal")("cdk-virtual-scroll-orientation-vertical", ctx.orientation !== "horizontal");
    }
  },
  inputs: {
    orientation: "orientation",
    appendOnly: ["appendOnly", "appendOnly", booleanAttribute]
  },
  outputs: {
    scrolledIndexChange: "scrolledIndexChange"
  },
  standalone: true,
  features: [\u0275\u0275ProvidersFeature([{
    provide: CdkScrollable,
    useFactory: (virtualScrollable, viewport) => virtualScrollable || viewport,
    deps: [[new Optional(), new Inject(VIRTUAL_SCROLLABLE)], _CdkVirtualScrollViewport]
  }]), \u0275\u0275InputTransformsFeature, \u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
  ngContentSelectors: _c14,
  decls: 4,
  vars: 4,
  consts: [[1, "cdk-virtual-scroll-content-wrapper"], ["contentWrapper", ""], [1, "cdk-virtual-scroll-spacer"]],
  template: function CdkVirtualScrollViewport_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0, 1);
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "div", 2);
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("width", ctx._totalContentWidth)("height", ctx._totalContentHeight);
    }
  },
  styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}"],
  encapsulation: 2,
  changeDetection: 0
});
var CdkVirtualScrollViewport = _CdkVirtualScrollViewport;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollViewport, [{
    type: Component,
    args: [{
      selector: "cdk-virtual-scroll-viewport",
      host: {
        "class": "cdk-virtual-scroll-viewport",
        "[class.cdk-virtual-scroll-orientation-horizontal]": 'orientation === "horizontal"',
        "[class.cdk-virtual-scroll-orientation-vertical]": 'orientation !== "horizontal"'
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      providers: [{
        provide: CdkScrollable,
        useFactory: (virtualScrollable, viewport) => virtualScrollable || viewport,
        deps: [[new Optional(), new Inject(VIRTUAL_SCROLLABLE)], CdkVirtualScrollViewport]
      }],
      template: '<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper class="cdk-virtual-scroll-content-wrapper">\n  <ng-content></ng-content>\n</div>\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div class="cdk-virtual-scroll-spacer"\n     [style.width]="_totalContentWidth" [style.height]="_totalContentHeight"></div>\n',
      styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;transform:translateZ(0)}.cdk-virtual-scrollable{overflow:auto;will-change:scroll-position;contain:strict;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:none}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:none}.cdk-virtual-scroll-spacer{height:1px;transform-origin:0 0;flex:0 0 auto}[dir=rtl] .cdk-virtual-scroll-spacer{transform-origin:100% 0}"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [VIRTUAL_SCROLL_STRATEGY]
    }]
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ScrollDispatcher
  }, {
    type: ViewportRuler
  }, {
    type: CdkVirtualScrollable,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [VIRTUAL_SCROLLABLE]
    }]
  }], {
    orientation: [{
      type: Input
    }],
    appendOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scrolledIndexChange: [{
      type: Output
    }],
    _contentWrapper: [{
      type: ViewChild,
      args: ["contentWrapper", {
        static: true
      }]
    }]
  });
})();
function getOffset(orientation, direction, node) {
  const el = node;
  if (!el.getBoundingClientRect) {
    return 0;
  }
  const rect = el.getBoundingClientRect();
  if (orientation === "horizontal") {
    return direction === "start" ? rect.left : rect.right;
  }
  return direction === "start" ? rect.top : rect.bottom;
}
var _CdkVirtualForOf = class _CdkVirtualForOf {
  /** The DataSource to display. */
  get cdkVirtualForOf() {
    return this._cdkVirtualForOf;
  }
  set cdkVirtualForOf(value) {
    this._cdkVirtualForOf = value;
    if (isDataSource(value)) {
      this._dataSourceChanges.next(value);
    } else {
      this._dataSourceChanges.next(new ArrayDataSource(isObservable(value) ? value : Array.from(value || [])));
    }
  }
  /**
   * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
   * the item and produces a value to be used as the item's identity when tracking changes.
   */
  get cdkVirtualForTrackBy() {
    return this._cdkVirtualForTrackBy;
  }
  set cdkVirtualForTrackBy(fn) {
    this._needsUpdate = true;
    this._cdkVirtualForTrackBy = fn ? (index, item) => fn(index + (this._renderedRange ? this._renderedRange.start : 0), item) : void 0;
  }
  /** The template used to stamp out new elements. */
  set cdkVirtualForTemplate(value) {
    if (value) {
      this._needsUpdate = true;
      this._template = value;
    }
  }
  /**
   * The size of the cache used to store templates that are not being used for re-use later.
   * Setting the cache size to `0` will disable caching. Defaults to 20 templates.
   */
  get cdkVirtualForTemplateCacheSize() {
    return this._viewRepeater.viewCacheSize;
  }
  set cdkVirtualForTemplateCacheSize(size) {
    this._viewRepeater.viewCacheSize = coerceNumberProperty(size);
  }
  constructor(_viewContainerRef, _template, _differs, _viewRepeater, _viewport, ngZone) {
    this._viewContainerRef = _viewContainerRef;
    this._template = _template;
    this._differs = _differs;
    this._viewRepeater = _viewRepeater;
    this._viewport = _viewport;
    this.viewChange = new Subject();
    this._dataSourceChanges = new Subject();
    this.dataStream = this._dataSourceChanges.pipe(
      // Start off with null `DataSource`.
      startWith(null),
      // Bundle up the previous and current data sources so we can work with both.
      pairwise(),
      // Use `_changeDataSource` to disconnect from the previous data source and connect to the
      // new one, passing back a stream of data changes which we run through `switchMap` to give
      // us a data stream that emits the latest data from whatever the current `DataSource` is.
      switchMap(([prev, cur]) => this._changeDataSource(prev, cur)),
      // Replay the last emitted data when someone subscribes.
      shareReplay(1)
    );
    this._differ = null;
    this._needsUpdate = false;
    this._destroyed = new Subject();
    this.dataStream.subscribe((data) => {
      this._data = data;
      this._onRenderedDataChange();
    });
    this._viewport.renderedRangeStream.pipe(takeUntil(this._destroyed)).subscribe((range) => {
      this._renderedRange = range;
      if (this.viewChange.observers.length) {
        ngZone.run(() => this.viewChange.next(this._renderedRange));
      }
      this._onRenderedDataChange();
    });
    this._viewport.attach(this);
  }
  /**
   * Measures the combined size (width for horizontal orientation, height for vertical) of all items
   * in the specified range. Throws an error if the range includes items that are not currently
   * rendered.
   */
  measureRangeSize(range, orientation) {
    if (range.start >= range.end) {
      return 0;
    }
    if ((range.start < this._renderedRange.start || range.end > this._renderedRange.end) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Error: attempted to measure an item that isn't rendered.`);
    }
    const renderedStartIndex = range.start - this._renderedRange.start;
    const rangeLen = range.end - range.start;
    let firstNode;
    let lastNode;
    for (let i = 0; i < rangeLen; i++) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        firstNode = lastNode = view.rootNodes[0];
        break;
      }
    }
    for (let i = rangeLen - 1; i > -1; i--) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        lastNode = view.rootNodes[view.rootNodes.length - 1];
        break;
      }
    }
    return firstNode && lastNode ? getOffset(orientation, "end", lastNode) - getOffset(orientation, "start", firstNode) : 0;
  }
  ngDoCheck() {
    if (this._differ && this._needsUpdate) {
      const changes = this._differ.diff(this._renderedItems);
      if (!changes) {
        this._updateContext();
      } else {
        this._applyChanges(changes);
      }
      this._needsUpdate = false;
    }
  }
  ngOnDestroy() {
    this._viewport.detach();
    this._dataSourceChanges.next(void 0);
    this._dataSourceChanges.complete();
    this.viewChange.complete();
    this._destroyed.next();
    this._destroyed.complete();
    this._viewRepeater.detach();
  }
  /** React to scroll state changes in the viewport. */
  _onRenderedDataChange() {
    if (!this._renderedRange) {
      return;
    }
    this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
    if (!this._differ) {
      this._differ = this._differs.find(this._renderedItems).create((index, item) => {
        return this.cdkVirtualForTrackBy ? this.cdkVirtualForTrackBy(index, item) : item;
      });
    }
    this._needsUpdate = true;
  }
  /** Swap out one `DataSource` for another. */
  _changeDataSource(oldDs, newDs) {
    if (oldDs) {
      oldDs.disconnect(this);
    }
    this._needsUpdate = true;
    return newDs ? newDs.connect(this) : of();
  }
  /** Update the `CdkVirtualForOfContext` for all views. */
  _updateContext() {
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
      view.detectChanges();
    }
  }
  /** Apply changes to the DOM. */
  _applyChanges(changes) {
    this._viewRepeater.applyChanges(changes, this._viewContainerRef, (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record, currentIndex), (record) => record.item);
    changes.forEachIdentityChange((record) => {
      const view = this._viewContainerRef.get(record.currentIndex);
      view.context.$implicit = record.item;
    });
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
    }
  }
  /** Update the computed properties on the `CdkVirtualForOfContext`. */
  _updateComputedContextProperties(context) {
    context.first = context.index === 0;
    context.last = context.index === context.count - 1;
    context.even = context.index % 2 === 0;
    context.odd = !context.even;
  }
  _getEmbeddedViewArgs(record, index) {
    return {
      templateRef: this._template,
      context: {
        $implicit: record.item,
        // It's guaranteed that the iterable is not "undefined" or "null" because we only
        // generate views for elements if the "cdkVirtualForOf" iterable has elements.
        cdkVirtualForOf: this._cdkVirtualForOf,
        index: -1,
        count: -1,
        first: false,
        last: false,
        odd: false,
        even: false
      },
      index
    };
  }
};
_CdkVirtualForOf.\u0275fac = function CdkVirtualForOf_Factory(t) {
  return new (t || _CdkVirtualForOf)(\u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(TemplateRef), \u0275\u0275directiveInject(IterableDiffers), \u0275\u0275directiveInject(_VIEW_REPEATER_STRATEGY), \u0275\u0275directiveInject(CdkVirtualScrollViewport, 4), \u0275\u0275directiveInject(NgZone));
};
_CdkVirtualForOf.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _CdkVirtualForOf,
  selectors: [["", "cdkVirtualFor", "", "cdkVirtualForOf", ""]],
  inputs: {
    cdkVirtualForOf: "cdkVirtualForOf",
    cdkVirtualForTrackBy: "cdkVirtualForTrackBy",
    cdkVirtualForTemplate: "cdkVirtualForTemplate",
    cdkVirtualForTemplateCacheSize: "cdkVirtualForTemplateCacheSize"
  },
  standalone: true,
  features: [\u0275\u0275ProvidersFeature([{
    provide: _VIEW_REPEATER_STRATEGY,
    useClass: _RecycleViewRepeaterStrategy
  }])]
});
var CdkVirtualForOf = _CdkVirtualForOf;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualForOf, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualFor][cdkVirtualForOf]",
      providers: [{
        provide: _VIEW_REPEATER_STRATEGY,
        useClass: _RecycleViewRepeaterStrategy
      }],
      standalone: true
    }]
  }], () => [{
    type: ViewContainerRef
  }, {
    type: TemplateRef
  }, {
    type: IterableDiffers
  }, {
    type: _RecycleViewRepeaterStrategy,
    decorators: [{
      type: Inject,
      args: [_VIEW_REPEATER_STRATEGY]
    }]
  }, {
    type: CdkVirtualScrollViewport,
    decorators: [{
      type: SkipSelf
    }]
  }, {
    type: NgZone
  }], {
    cdkVirtualForOf: [{
      type: Input
    }],
    cdkVirtualForTrackBy: [{
      type: Input
    }],
    cdkVirtualForTemplate: [{
      type: Input
    }],
    cdkVirtualForTemplateCacheSize: [{
      type: Input
    }]
  });
})();
var _CdkVirtualScrollableElement = class _CdkVirtualScrollableElement extends CdkVirtualScrollable {
  constructor(elementRef, scrollDispatcher, ngZone, dir) {
    super(elementRef, scrollDispatcher, ngZone, dir);
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from] - this.measureScrollOffset(from);
  }
};
_CdkVirtualScrollableElement.\u0275fac = function CdkVirtualScrollableElement_Factory(t) {
  return new (t || _CdkVirtualScrollableElement)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ScrollDispatcher), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(Directionality, 8));
};
_CdkVirtualScrollableElement.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _CdkVirtualScrollableElement,
  selectors: [["", "cdkVirtualScrollingElement", ""]],
  hostAttrs: [1, "cdk-virtual-scrollable"],
  standalone: true,
  features: [\u0275\u0275ProvidersFeature([{
    provide: VIRTUAL_SCROLLABLE,
    useExisting: _CdkVirtualScrollableElement
  }]), \u0275\u0275InheritDefinitionFeature]
});
var CdkVirtualScrollableElement = _CdkVirtualScrollableElement;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableElement, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualScrollingElement]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableElement
      }],
      standalone: true,
      host: {
        "class": "cdk-virtual-scrollable"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: NgZone
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var _CdkVirtualScrollableWindow = class _CdkVirtualScrollableWindow extends CdkVirtualScrollable {
  constructor(scrollDispatcher, ngZone, dir) {
    super(new ElementRef(document.documentElement), scrollDispatcher, ngZone, dir);
    this._elementScrolled = new Observable((observer) => this.ngZone.runOutsideAngular(() => fromEvent(document, "scroll").pipe(takeUntil(this._destroyed)).subscribe(observer)));
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
};
_CdkVirtualScrollableWindow.\u0275fac = function CdkVirtualScrollableWindow_Factory(t) {
  return new (t || _CdkVirtualScrollableWindow)(\u0275\u0275directiveInject(ScrollDispatcher), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(Directionality, 8));
};
_CdkVirtualScrollableWindow.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
  type: _CdkVirtualScrollableWindow,
  selectors: [["cdk-virtual-scroll-viewport", "scrollWindow", ""]],
  standalone: true,
  features: [\u0275\u0275ProvidersFeature([{
    provide: VIRTUAL_SCROLLABLE,
    useExisting: _CdkVirtualScrollableWindow
  }]), \u0275\u0275InheritDefinitionFeature]
});
var CdkVirtualScrollableWindow = _CdkVirtualScrollableWindow;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableWindow, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[scrollWindow]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableWindow
      }],
      standalone: true
    }]
  }], () => [{
    type: ScrollDispatcher
  }, {
    type: NgZone
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
var _CdkScrollableModule = class _CdkScrollableModule {
};
_CdkScrollableModule.\u0275fac = function CdkScrollableModule_Factory(t) {
  return new (t || _CdkScrollableModule)();
};
_CdkScrollableModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _CdkScrollableModule
});
_CdkScrollableModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
var CdkScrollableModule = _CdkScrollableModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollableModule, [{
    type: NgModule,
    args: [{
      exports: [CdkScrollable],
      imports: [CdkScrollable]
    }]
  }], null, null);
})();
var _ScrollingModule = class _ScrollingModule {
};
_ScrollingModule.\u0275fac = function ScrollingModule_Factory(t) {
  return new (t || _ScrollingModule)();
};
_ScrollingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _ScrollingModule
});
_ScrollingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [BidiModule, CdkScrollableModule, BidiModule, CdkScrollableModule]
});
var ScrollingModule = _ScrollingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollingModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
      exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/sidenav.mjs
var _c05 = ["*"];
var _c15 = ["content"];
function MatDrawerContainer_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function MatDrawerContainer_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2._onBackdropClicked());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("mat-drawer-shown", ctx_r0._isShowingBackdrop());
  }
}
function MatDrawerContainer_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-drawer-content");
    \u0275\u0275projection(1, 2);
    \u0275\u0275elementEnd();
  }
}
var _c23 = [[["mat-drawer"]], [["mat-drawer-content"]], "*"];
var _c33 = ["mat-drawer", "mat-drawer-content", "*"];
function MatSidenavContainer_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function MatSidenavContainer_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2._onBackdropClicked());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("mat-drawer-shown", ctx_r0._isShowingBackdrop());
  }
}
function MatSidenavContainer_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-sidenav-content");
    \u0275\u0275projection(1, 2);
    \u0275\u0275elementEnd();
  }
}
var _c43 = [[["mat-sidenav"]], [["mat-sidenav-content"]], "*"];
var _c52 = ["mat-sidenav", "mat-sidenav-content", "*"];
var _c62 = '.mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color);background-color:var(--mat-sidenav-content-background-color);box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color)}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);position:relative;z-index:4;color:var(--mat-sidenav-container-text-color);background-color:var(--mat-sidenav-container-background-color);border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*="visibility: hidden"]{display:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}';
var matDrawerAnimations = {
  /** Animation that slides a drawer in and out. */
  transformDrawer: trigger("transform", [
    // We remove the `transform` here completely, rather than setting it to zero, because:
    // 1. Having a transform can cause elements with ripples or an animated
    //    transform to shift around in Chrome with an RTL layout (see #10023).
    // 2. 3d transforms causes text to appear blurry on IE and Edge.
    state("open, open-instant", style({
      "transform": "none",
      "visibility": "visible"
    })),
    state("void", style({
      // Avoids the shadow showing up when closed in SSR.
      "box-shadow": "none",
      "visibility": "hidden"
    })),
    transition("void => open-instant", animate("0ms")),
    transition("void <=> open, open-instant => void", animate("400ms cubic-bezier(0.25, 0.8, 0.25, 1)"))
  ])
};
function throwMatDuplicatedDrawerError(position) {
  throw Error(`A drawer was already declared for 'position="${position}"'`);
}
var MAT_DRAWER_DEFAULT_AUTOSIZE = new InjectionToken("MAT_DRAWER_DEFAULT_AUTOSIZE", {
  providedIn: "root",
  factory: MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY
});
var MAT_DRAWER_CONTAINER = new InjectionToken("MAT_DRAWER_CONTAINER");
function MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY() {
  return false;
}
var _MatDrawerContent = class _MatDrawerContent extends CdkScrollable {
  constructor(_changeDetectorRef, _container, elementRef, scrollDispatcher, ngZone) {
    super(elementRef, scrollDispatcher, ngZone);
    this._changeDetectorRef = _changeDetectorRef;
    this._container = _container;
  }
  ngAfterContentInit() {
    this._container._contentMarginChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }
};
_MatDrawerContent.\u0275fac = function MatDrawerContent_Factory(t) {
  return new (t || _MatDrawerContent)(\u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(forwardRef(() => MatDrawerContainer)), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ScrollDispatcher), \u0275\u0275directiveInject(NgZone));
};
_MatDrawerContent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatDrawerContent,
  selectors: [["mat-drawer-content"]],
  hostAttrs: ["ngSkipHydration", "", 1, "mat-drawer-content"],
  hostVars: 4,
  hostBindings: function MatDrawerContent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("margin-left", ctx._container._contentMargins.left, "px")("margin-right", ctx._container._contentMargins.right, "px");
    }
  },
  features: [\u0275\u0275ProvidersFeature([{
    provide: CdkScrollable,
    useExisting: _MatDrawerContent
  }]), \u0275\u0275InheritDefinitionFeature],
  ngContentSelectors: _c05,
  decls: 1,
  vars: 0,
  template: function MatDrawerContent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var MatDrawerContent = _MatDrawerContent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDrawerContent, [{
    type: Component,
    args: [{
      selector: "mat-drawer-content",
      template: "<ng-content></ng-content>",
      host: {
        "class": "mat-drawer-content",
        "[style.margin-left.px]": "_container._contentMargins.left",
        "[style.margin-right.px]": "_container._contentMargins.right",
        "ngSkipHydration": ""
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      providers: [{
        provide: CdkScrollable,
        useExisting: MatDrawerContent
      }]
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: MatDrawerContainer,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => MatDrawerContainer)]
    }]
  }, {
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: NgZone
  }], null);
})();
var _MatDrawer = class _MatDrawer {
  /** The side that the drawer is attached to. */
  get position() {
    return this._position;
  }
  set position(value) {
    value = value === "end" ? "end" : "start";
    if (value !== this._position) {
      if (this._isAttached) {
        this._updatePositionInParent(value);
      }
      this._position = value;
      this.onPositionChanged.emit();
    }
  }
  /** Mode of the drawer; one of 'over', 'push' or 'side'. */
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value;
    this._updateFocusTrapState();
    this._modeChanged.next();
  }
  /** Whether the drawer can be closed with the escape key or by clicking on the backdrop. */
  get disableClose() {
    return this._disableClose;
  }
  set disableClose(value) {
    this._disableClose = coerceBooleanProperty(value);
  }
  /**
   * Whether the drawer should focus the first focusable element automatically when opened.
   * Defaults to false in when `mode` is set to `side`, otherwise defaults to `true`. If explicitly
   * enabled, focus will be moved into the sidenav in `side` mode as well.
   * @breaking-change 14.0.0 Remove boolean option from autoFocus. Use string or AutoFocusTarget
   * instead.
   */
  get autoFocus() {
    const value = this._autoFocus;
    if (value == null) {
      if (this.mode === "side") {
        return "dialog";
      } else {
        return "first-tabbable";
      }
    }
    return value;
  }
  set autoFocus(value) {
    if (value === "true" || value === "false" || value == null) {
      value = coerceBooleanProperty(value);
    }
    this._autoFocus = value;
  }
  /**
   * Whether the drawer is opened. We overload this because we trigger an event when it
   * starts or end.
   */
  get opened() {
    return this._opened;
  }
  set opened(value) {
    this.toggle(coerceBooleanProperty(value));
  }
  constructor(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _ngZone, _interactivityChecker, _doc, _container) {
    this._elementRef = _elementRef;
    this._focusTrapFactory = _focusTrapFactory;
    this._focusMonitor = _focusMonitor;
    this._platform = _platform;
    this._ngZone = _ngZone;
    this._interactivityChecker = _interactivityChecker;
    this._doc = _doc;
    this._container = _container;
    this._elementFocusedBeforeDrawerWasOpened = null;
    this._enableAnimations = false;
    this._position = "start";
    this._mode = "over";
    this._disableClose = false;
    this._opened = false;
    this._animationStarted = new Subject();
    this._animationEnd = new Subject();
    this._animationState = "void";
    this.openedChange = // Note this has to be async in order to avoid some issues with two-bindings (see #8872).
    new EventEmitter(
      /* isAsync */
      true
    );
    this._openedStream = this.openedChange.pipe(filter((o) => o), map(() => {
    }));
    this.openedStart = this._animationStarted.pipe(filter((e) => e.fromState !== e.toState && e.toState.indexOf("open") === 0), mapTo(void 0));
    this._closedStream = this.openedChange.pipe(filter((o) => !o), map(() => {
    }));
    this.closedStart = this._animationStarted.pipe(filter((e) => e.fromState !== e.toState && e.toState === "void"), mapTo(void 0));
    this._destroyed = new Subject();
    this.onPositionChanged = new EventEmitter();
    this._modeChanged = new Subject();
    this.openedChange.subscribe((opened) => {
      if (opened) {
        if (this._doc) {
          this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement;
        }
        this._takeFocus();
      } else if (this._isFocusWithinDrawer()) {
        this._restoreFocus(this._openedVia || "program");
      }
    });
    this._ngZone.runOutsideAngular(() => {
      fromEvent(this._elementRef.nativeElement, "keydown").pipe(filter((event) => {
        return event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event);
      }), takeUntil(this._destroyed)).subscribe((event) => this._ngZone.run(() => {
        this.close();
        event.stopPropagation();
        event.preventDefault();
      }));
    });
    this._animationEnd.pipe(distinctUntilChanged((x, y) => {
      return x.fromState === y.fromState && x.toState === y.toState;
    })).subscribe((event) => {
      const {
        fromState,
        toState
      } = event;
      if (toState.indexOf("open") === 0 && fromState === "void" || toState === "void" && fromState.indexOf("open") === 0) {
        this.openedChange.emit(this._opened);
      }
    });
  }
  /**
   * Focuses the provided element. If the element is not focusable, it will add a tabIndex
   * attribute to forcefully focus it. The attribute is removed after focus is moved.
   * @param element The element to focus.
   */
  _forceFocus(element, options) {
    if (!this._interactivityChecker.isFocusable(element)) {
      element.tabIndex = -1;
      this._ngZone.runOutsideAngular(() => {
        const callback = () => {
          element.removeEventListener("blur", callback);
          element.removeEventListener("mousedown", callback);
          element.removeAttribute("tabindex");
        };
        element.addEventListener("blur", callback);
        element.addEventListener("mousedown", callback);
      });
    }
    element.focus(options);
  }
  /**
   * Focuses the first element that matches the given selector within the focus trap.
   * @param selector The CSS selector for the element to set focus to.
   */
  _focusByCssSelector(selector, options) {
    let elementToFocus = this._elementRef.nativeElement.querySelector(selector);
    if (elementToFocus) {
      this._forceFocus(elementToFocus, options);
    }
  }
  /**
   * Moves focus into the drawer. Note that this works even if
   * the focus trap is disabled in `side` mode.
   */
  _takeFocus() {
    if (!this._focusTrap) {
      return;
    }
    const element = this._elementRef.nativeElement;
    switch (this.autoFocus) {
      case false:
      case "dialog":
        return;
      case true:
      case "first-tabbable":
        this._focusTrap.focusInitialElementWhenReady().then((hasMovedFocus) => {
          if (!hasMovedFocus && typeof this._elementRef.nativeElement.focus === "function") {
            element.focus();
          }
        });
        break;
      case "first-heading":
        this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
        break;
      default:
        this._focusByCssSelector(this.autoFocus);
        break;
    }
  }
  /**
   * Restores focus to the element that was originally focused when the drawer opened.
   * If no element was focused at that time, the focus will be restored to the drawer.
   */
  _restoreFocus(focusOrigin) {
    if (this.autoFocus === "dialog") {
      return;
    }
    if (this._elementFocusedBeforeDrawerWasOpened) {
      this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, focusOrigin);
    } else {
      this._elementRef.nativeElement.blur();
    }
    this._elementFocusedBeforeDrawerWasOpened = null;
  }
  /** Whether focus is currently within the drawer. */
  _isFocusWithinDrawer() {
    const activeEl = this._doc.activeElement;
    return !!activeEl && this._elementRef.nativeElement.contains(activeEl);
  }
  ngAfterViewInit() {
    this._isAttached = true;
    this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
    this._updateFocusTrapState();
    if (this._position === "end") {
      this._updatePositionInParent("end");
    }
  }
  ngAfterContentChecked() {
    if (this._platform.isBrowser) {
      this._enableAnimations = true;
    }
  }
  ngOnDestroy() {
    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
    this._anchor?.remove();
    this._anchor = null;
    this._animationStarted.complete();
    this._animationEnd.complete();
    this._modeChanged.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /**
   * Open the drawer.
   * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
   * Used for focus management after the sidenav is closed.
   */
  open(openedVia) {
    return this.toggle(true, openedVia);
  }
  /** Close the drawer. */
  close() {
    return this.toggle(false);
  }
  /** Closes the drawer with context that the backdrop was clicked. */
  _closeViaBackdropClick() {
    return this._setOpen(
      /* isOpen */
      false,
      /* restoreFocus */
      true,
      "mouse"
    );
  }
  /**
   * Toggle this drawer.
   * @param isOpen Whether the drawer should be open.
   * @param openedVia Whether the drawer was opened by a key press, mouse click or programmatically.
   * Used for focus management after the sidenav is closed.
   */
  toggle(isOpen = !this.opened, openedVia) {
    if (isOpen && openedVia) {
      this._openedVia = openedVia;
    }
    const result = this._setOpen(
      isOpen,
      /* restoreFocus */
      !isOpen && this._isFocusWithinDrawer(),
      this._openedVia || "program"
    );
    if (!isOpen) {
      this._openedVia = null;
    }
    return result;
  }
  /**
   * Toggles the opened state of the drawer.
   * @param isOpen Whether the drawer should open or close.
   * @param restoreFocus Whether focus should be restored on close.
   * @param focusOrigin Origin to use when restoring focus.
   */
  _setOpen(isOpen, restoreFocus, focusOrigin) {
    this._opened = isOpen;
    if (isOpen) {
      this._animationState = this._enableAnimations ? "open" : "open-instant";
    } else {
      this._animationState = "void";
      if (restoreFocus) {
        this._restoreFocus(focusOrigin);
      }
    }
    this._updateFocusTrapState();
    return new Promise((resolve) => {
      this.openedChange.pipe(take(1)).subscribe((open) => resolve(open ? "open" : "close"));
    });
  }
  _getWidth() {
    return this._elementRef.nativeElement ? this._elementRef.nativeElement.offsetWidth || 0 : 0;
  }
  /** Updates the enabled state of the focus trap. */
  _updateFocusTrapState() {
    if (this._focusTrap) {
      this._focusTrap.enabled = !!this._container?.hasBackdrop;
    }
  }
  /**
   * Updates the position of the drawer in the DOM. We need to move the element around ourselves
   * when it's in the `end` position so that it comes after the content and the visual order
   * matches the tab order. We also need to be able to move it back to `start` if the sidenav
   * started off as `end` and was changed to `start`.
   */
  _updatePositionInParent(newPosition) {
    const element = this._elementRef.nativeElement;
    const parent = element.parentNode;
    if (newPosition === "end") {
      if (!this._anchor) {
        this._anchor = this._doc.createComment("mat-drawer-anchor");
        parent.insertBefore(this._anchor, element);
      }
      parent.appendChild(element);
    } else if (this._anchor) {
      this._anchor.parentNode.insertBefore(element, this._anchor);
    }
  }
};
_MatDrawer.\u0275fac = function MatDrawer_Factory(t) {
  return new (t || _MatDrawer)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(FocusTrapFactory), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(Platform), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(InteractivityChecker), \u0275\u0275directiveInject(DOCUMENT, 8), \u0275\u0275directiveInject(MAT_DRAWER_CONTAINER, 8));
};
_MatDrawer.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatDrawer,
  selectors: [["mat-drawer"]],
  viewQuery: function MatDrawer_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c15, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._content = _t.first);
    }
  },
  hostAttrs: ["tabIndex", "-1", "ngSkipHydration", "", 1, "mat-drawer"],
  hostVars: 12,
  hostBindings: function MatDrawer_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275syntheticHostListener("@transform.start", function MatDrawer_animation_transform_start_HostBindingHandler($event) {
        return ctx._animationStarted.next($event);
      })("@transform.done", function MatDrawer_animation_transform_done_HostBindingHandler($event) {
        return ctx._animationEnd.next($event);
      });
    }
    if (rf & 2) {
      \u0275\u0275attribute("align", null);
      \u0275\u0275syntheticHostProperty("@transform", ctx._animationState);
      \u0275\u0275classProp("mat-drawer-end", ctx.position === "end")("mat-drawer-over", ctx.mode === "over")("mat-drawer-push", ctx.mode === "push")("mat-drawer-side", ctx.mode === "side")("mat-drawer-opened", ctx.opened);
    }
  },
  inputs: {
    position: "position",
    mode: "mode",
    disableClose: "disableClose",
    autoFocus: "autoFocus",
    opened: "opened"
  },
  outputs: {
    openedChange: "openedChange",
    _openedStream: "opened",
    openedStart: "openedStart",
    _closedStream: "closed",
    closedStart: "closedStart",
    onPositionChanged: "positionChanged"
  },
  exportAs: ["matDrawer"],
  ngContentSelectors: _c05,
  decls: 3,
  vars: 0,
  consts: [["cdkScrollable", "", 1, "mat-drawer-inner-container"], ["content", ""]],
  template: function MatDrawer_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0, 1);
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd();
    }
  },
  dependencies: [CdkScrollable],
  encapsulation: 2,
  data: {
    animation: [matDrawerAnimations.transformDrawer]
  },
  changeDetection: 0
});
var MatDrawer = _MatDrawer;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDrawer, [{
    type: Component,
    args: [{
      selector: "mat-drawer",
      exportAs: "matDrawer",
      animations: [matDrawerAnimations.transformDrawer],
      host: {
        "class": "mat-drawer",
        // must prevent the browser from aligning text based on value
        "[attr.align]": "null",
        "[class.mat-drawer-end]": 'position === "end"',
        "[class.mat-drawer-over]": 'mode === "over"',
        "[class.mat-drawer-push]": 'mode === "push"',
        "[class.mat-drawer-side]": 'mode === "side"',
        "[class.mat-drawer-opened]": "opened",
        "tabIndex": "-1",
        "[@transform]": "_animationState",
        "(@transform.start)": "_animationStarted.next($event)",
        "(@transform.done)": "_animationEnd.next($event)",
        "ngSkipHydration": ""
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      template: '<div class="mat-drawer-inner-container" cdkScrollable #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n'
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: FocusTrapFactory
  }, {
    type: FocusMonitor
  }, {
    type: Platform
  }, {
    type: NgZone
  }, {
    type: InteractivityChecker
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: MatDrawerContainer,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_DRAWER_CONTAINER]
    }]
  }], {
    position: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    disableClose: [{
      type: Input
    }],
    autoFocus: [{
      type: Input
    }],
    opened: [{
      type: Input
    }],
    openedChange: [{
      type: Output
    }],
    _openedStream: [{
      type: Output,
      args: ["opened"]
    }],
    openedStart: [{
      type: Output
    }],
    _closedStream: [{
      type: Output,
      args: ["closed"]
    }],
    closedStart: [{
      type: Output
    }],
    onPositionChanged: [{
      type: Output,
      args: ["positionChanged"]
    }],
    _content: [{
      type: ViewChild,
      args: ["content"]
    }]
  });
})();
var _MatDrawerContainer = class _MatDrawerContainer {
  /** The drawer child with the `start` position. */
  get start() {
    return this._start;
  }
  /** The drawer child with the `end` position. */
  get end() {
    return this._end;
  }
  /**
   * Whether to automatically resize the container whenever
   * the size of any of its drawers changes.
   *
   * **Use at your own risk!** Enabling this option can cause layout thrashing by measuring
   * the drawers on every change detection cycle. Can be configured globally via the
   * `MAT_DRAWER_DEFAULT_AUTOSIZE` token.
   */
  get autosize() {
    return this._autosize;
  }
  set autosize(value) {
    this._autosize = coerceBooleanProperty(value);
  }
  /**
   * Whether the drawer container should have a backdrop while one of the sidenavs is open.
   * If explicitly set to `true`, the backdrop will be enabled for drawers in the `side`
   * mode as well.
   */
  get hasBackdrop() {
    return this._drawerHasBackdrop(this._start) || this._drawerHasBackdrop(this._end);
  }
  set hasBackdrop(value) {
    this._backdropOverride = value == null ? null : coerceBooleanProperty(value);
  }
  /** Reference to the CdkScrollable instance that wraps the scrollable content. */
  get scrollable() {
    return this._userContent || this._content;
  }
  constructor(_dir, _element, _ngZone, _changeDetectorRef, viewportRuler, defaultAutosize = false, _animationMode) {
    this._dir = _dir;
    this._element = _element;
    this._ngZone = _ngZone;
    this._changeDetectorRef = _changeDetectorRef;
    this._animationMode = _animationMode;
    this._drawers = new QueryList();
    this.backdropClick = new EventEmitter();
    this._destroyed = new Subject();
    this._doCheckSubject = new Subject();
    this._contentMargins = {
      left: null,
      right: null
    };
    this._contentMarginChanges = new Subject();
    if (_dir) {
      _dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
        this._validateDrawers();
        this.updateContentMargins();
      });
    }
    viewportRuler.change().pipe(takeUntil(this._destroyed)).subscribe(() => this.updateContentMargins());
    this._autosize = defaultAutosize;
  }
  ngAfterContentInit() {
    this._allDrawers.changes.pipe(startWith(this._allDrawers), takeUntil(this._destroyed)).subscribe((drawer) => {
      this._drawers.reset(drawer.filter((item) => !item._container || item._container === this));
      this._drawers.notifyOnChanges();
    });
    this._drawers.changes.pipe(startWith(null)).subscribe(() => {
      this._validateDrawers();
      this._drawers.forEach((drawer) => {
        this._watchDrawerToggle(drawer);
        this._watchDrawerPosition(drawer);
        this._watchDrawerMode(drawer);
      });
      if (!this._drawers.length || this._isDrawerOpen(this._start) || this._isDrawerOpen(this._end)) {
        this.updateContentMargins();
      }
      this._changeDetectorRef.markForCheck();
    });
    this._ngZone.runOutsideAngular(() => {
      this._doCheckSubject.pipe(
        debounceTime(10),
        // Arbitrary debounce time, less than a frame at 60fps
        takeUntil(this._destroyed)
      ).subscribe(() => this.updateContentMargins());
    });
  }
  ngOnDestroy() {
    this._contentMarginChanges.complete();
    this._doCheckSubject.complete();
    this._drawers.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Calls `open` of both start and end drawers */
  open() {
    this._drawers.forEach((drawer) => drawer.open());
  }
  /** Calls `close` of both start and end drawers */
  close() {
    this._drawers.forEach((drawer) => drawer.close());
  }
  /**
   * Recalculates and updates the inline styles for the content. Note that this should be used
   * sparingly, because it causes a reflow.
   */
  updateContentMargins() {
    let left = 0;
    let right = 0;
    if (this._left && this._left.opened) {
      if (this._left.mode == "side") {
        left += this._left._getWidth();
      } else if (this._left.mode == "push") {
        const width = this._left._getWidth();
        left += width;
        right -= width;
      }
    }
    if (this._right && this._right.opened) {
      if (this._right.mode == "side") {
        right += this._right._getWidth();
      } else if (this._right.mode == "push") {
        const width = this._right._getWidth();
        right += width;
        left -= width;
      }
    }
    left = left || null;
    right = right || null;
    if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
      this._contentMargins = {
        left,
        right
      };
      this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins));
    }
  }
  ngDoCheck() {
    if (this._autosize && this._isPushed()) {
      this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
    }
  }
  /**
   * Subscribes to drawer events in order to set a class on the main container element when the
   * drawer is open and the backdrop is visible. This ensures any overflow on the container element
   * is properly hidden.
   */
  _watchDrawerToggle(drawer) {
    drawer._animationStarted.pipe(filter((event) => event.fromState !== event.toState), takeUntil(this._drawers.changes)).subscribe((event) => {
      if (event.toState !== "open-instant" && this._animationMode !== "NoopAnimations") {
        this._element.nativeElement.classList.add("mat-drawer-transition");
      }
      this.updateContentMargins();
      this._changeDetectorRef.markForCheck();
    });
    if (drawer.mode !== "side") {
      drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(() => this._setContainerClass(drawer.opened));
    }
  }
  /**
   * Subscribes to drawer onPositionChanged event in order to
   * re-validate drawers when the position changes.
   */
  _watchDrawerPosition(drawer) {
    if (!drawer) {
      return;
    }
    drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(() => {
      this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
        this._validateDrawers();
      });
    });
  }
  /** Subscribes to changes in drawer mode so we can run change detection. */
  _watchDrawerMode(drawer) {
    if (drawer) {
      drawer._modeChanged.pipe(takeUntil(merge(this._drawers.changes, this._destroyed))).subscribe(() => {
        this.updateContentMargins();
        this._changeDetectorRef.markForCheck();
      });
    }
  }
  /** Toggles the 'mat-drawer-opened' class on the main 'mat-drawer-container' element. */
  _setContainerClass(isAdd) {
    const classList = this._element.nativeElement.classList;
    const className = "mat-drawer-container-has-open";
    if (isAdd) {
      classList.add(className);
    } else {
      classList.remove(className);
    }
  }
  /** Validate the state of the drawer children components. */
  _validateDrawers() {
    this._start = this._end = null;
    this._drawers.forEach((drawer) => {
      if (drawer.position == "end") {
        if (this._end != null && (typeof ngDevMode === "undefined" || ngDevMode)) {
          throwMatDuplicatedDrawerError("end");
        }
        this._end = drawer;
      } else {
        if (this._start != null && (typeof ngDevMode === "undefined" || ngDevMode)) {
          throwMatDuplicatedDrawerError("start");
        }
        this._start = drawer;
      }
    });
    this._right = this._left = null;
    if (this._dir && this._dir.value === "rtl") {
      this._left = this._end;
      this._right = this._start;
    } else {
      this._left = this._start;
      this._right = this._end;
    }
  }
  /** Whether the container is being pushed to the side by one of the drawers. */
  _isPushed() {
    return this._isDrawerOpen(this._start) && this._start.mode != "over" || this._isDrawerOpen(this._end) && this._end.mode != "over";
  }
  _onBackdropClicked() {
    this.backdropClick.emit();
    this._closeModalDrawersViaBackdrop();
  }
  _closeModalDrawersViaBackdrop() {
    [this._start, this._end].filter((drawer) => drawer && !drawer.disableClose && this._drawerHasBackdrop(drawer)).forEach((drawer) => drawer._closeViaBackdropClick());
  }
  _isShowingBackdrop() {
    return this._isDrawerOpen(this._start) && this._drawerHasBackdrop(this._start) || this._isDrawerOpen(this._end) && this._drawerHasBackdrop(this._end);
  }
  _isDrawerOpen(drawer) {
    return drawer != null && drawer.opened;
  }
  // Whether argument drawer should have a backdrop when it opens
  _drawerHasBackdrop(drawer) {
    if (this._backdropOverride == null) {
      return !!drawer && drawer.mode !== "side";
    }
    return this._backdropOverride;
  }
};
_MatDrawerContainer.\u0275fac = function MatDrawerContainer_Factory(t) {
  return new (t || _MatDrawerContainer)(\u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(NgZone), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ViewportRuler), \u0275\u0275directiveInject(MAT_DRAWER_DEFAULT_AUTOSIZE), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
};
_MatDrawerContainer.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatDrawerContainer,
  selectors: [["mat-drawer-container"]],
  contentQueries: function MatDrawerContainer_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, MatDrawerContent, 5);
      \u0275\u0275contentQuery(dirIndex, MatDrawer, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._content = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._allDrawers = _t);
    }
  },
  viewQuery: function MatDrawerContainer_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatDrawerContent, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._userContent = _t.first);
    }
  },
  hostAttrs: ["ngSkipHydration", "", 1, "mat-drawer-container"],
  hostVars: 2,
  hostBindings: function MatDrawerContainer_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("mat-drawer-container-explicit-backdrop", ctx._backdropOverride);
    }
  },
  inputs: {
    autosize: "autosize",
    hasBackdrop: "hasBackdrop"
  },
  outputs: {
    backdropClick: "backdropClick"
  },
  exportAs: ["matDrawerContainer"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: MAT_DRAWER_CONTAINER,
    useExisting: _MatDrawerContainer
  }])],
  ngContentSelectors: _c33,
  decls: 4,
  vars: 2,
  consts: [["class", "mat-drawer-backdrop", 3, "mat-drawer-shown"], [1, "mat-drawer-backdrop", 3, "click"]],
  template: function MatDrawerContainer_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c23);
      \u0275\u0275template(0, MatDrawerContainer_Conditional_0_Template, 1, 2, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275projection(2, 1);
      \u0275\u0275template(3, MatDrawerContainer_Conditional_3_Template, 2, 0, "mat-drawer-content");
    }
    if (rf & 2) {
      \u0275\u0275conditional(0, ctx.hasBackdrop ? 0 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(3, !ctx._content ? 3 : -1);
    }
  },
  dependencies: [MatDrawerContent],
  styles: ['.mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color);background-color:var(--mat-sidenav-content-background-color);box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color)}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);position:relative;z-index:4;color:var(--mat-sidenav-container-text-color);background-color:var(--mat-sidenav-container-background-color);border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*="visibility: hidden"]{display:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}'],
  encapsulation: 2,
  changeDetection: 0
});
var MatDrawerContainer = _MatDrawerContainer;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDrawerContainer, [{
    type: Component,
    args: [{
      selector: "mat-drawer-container",
      exportAs: "matDrawerContainer",
      host: {
        "class": "mat-drawer-container",
        "[class.mat-drawer-container-explicit-backdrop]": "_backdropOverride",
        "ngSkipHydration": ""
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      providers: [{
        provide: MAT_DRAWER_CONTAINER,
        useExisting: MatDrawerContainer
      }],
      template: '@if (hasBackdrop) {\n  <div class="mat-drawer-backdrop" (click)="_onBackdropClicked()"\n       [class.mat-drawer-shown]="_isShowingBackdrop()"></div>\n}\n\n<ng-content select="mat-drawer"></ng-content>\n\n<ng-content select="mat-drawer-content">\n</ng-content>\n\n@if (!_content) {\n  <mat-drawer-content>\n    <ng-content></ng-content>\n  </mat-drawer-content>\n}\n',
      styles: ['.mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color);background-color:var(--mat-sidenav-content-background-color);box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color)}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);position:relative;z-index:4;color:var(--mat-sidenav-container-text-color);background-color:var(--mat-sidenav-container-background-color);border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*="visibility: hidden"]{display:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}']
    }]
  }], () => [{
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: ChangeDetectorRef
  }, {
    type: ViewportRuler
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_DRAWER_DEFAULT_AUTOSIZE]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    _allDrawers: [{
      type: ContentChildren,
      args: [MatDrawer, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }],
    _content: [{
      type: ContentChild,
      args: [MatDrawerContent]
    }],
    _userContent: [{
      type: ViewChild,
      args: [MatDrawerContent]
    }],
    autosize: [{
      type: Input
    }],
    hasBackdrop: [{
      type: Input
    }],
    backdropClick: [{
      type: Output
    }]
  });
})();
var _MatSidenavContent = class _MatSidenavContent extends MatDrawerContent {
  constructor(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) {
    super(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone);
  }
};
_MatSidenavContent.\u0275fac = function MatSidenavContent_Factory(t) {
  return new (t || _MatSidenavContent)(\u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(forwardRef(() => MatSidenavContainer)), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ScrollDispatcher), \u0275\u0275directiveInject(NgZone));
};
_MatSidenavContent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatSidenavContent,
  selectors: [["mat-sidenav-content"]],
  hostAttrs: ["ngSkipHydration", "", 1, "mat-drawer-content", "mat-sidenav-content"],
  hostVars: 4,
  hostBindings: function MatSidenavContent_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275styleProp("margin-left", ctx._container._contentMargins.left, "px")("margin-right", ctx._container._contentMargins.right, "px");
    }
  },
  features: [\u0275\u0275ProvidersFeature([{
    provide: CdkScrollable,
    useExisting: _MatSidenavContent
  }]), \u0275\u0275InheritDefinitionFeature],
  ngContentSelectors: _c05,
  decls: 1,
  vars: 0,
  template: function MatSidenavContent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275projection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var MatSidenavContent = _MatSidenavContent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSidenavContent, [{
    type: Component,
    args: [{
      selector: "mat-sidenav-content",
      template: "<ng-content></ng-content>",
      host: {
        "class": "mat-drawer-content mat-sidenav-content",
        "[style.margin-left.px]": "_container._contentMargins.left",
        "[style.margin-right.px]": "_container._contentMargins.right",
        "ngSkipHydration": ""
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      providers: [{
        provide: CdkScrollable,
        useExisting: MatSidenavContent
      }]
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: MatSidenavContainer,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => MatSidenavContainer)]
    }]
  }, {
    type: ElementRef
  }, {
    type: ScrollDispatcher
  }, {
    type: NgZone
  }], null);
})();
var _MatSidenav = class _MatSidenav extends MatDrawer {
  constructor() {
    super(...arguments);
    this._fixedInViewport = false;
    this._fixedTopGap = 0;
    this._fixedBottomGap = 0;
  }
  /** Whether the sidenav is fixed in the viewport. */
  get fixedInViewport() {
    return this._fixedInViewport;
  }
  set fixedInViewport(value) {
    this._fixedInViewport = coerceBooleanProperty(value);
  }
  /**
   * The gap between the top of the sidenav and the top of the viewport when the sidenav is in fixed
   * mode.
   */
  get fixedTopGap() {
    return this._fixedTopGap;
  }
  set fixedTopGap(value) {
    this._fixedTopGap = coerceNumberProperty(value);
  }
  /**
   * The gap between the bottom of the sidenav and the bottom of the viewport when the sidenav is in
   * fixed mode.
   */
  get fixedBottomGap() {
    return this._fixedBottomGap;
  }
  set fixedBottomGap(value) {
    this._fixedBottomGap = coerceNumberProperty(value);
  }
};
_MatSidenav.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275MatSidenav_BaseFactory;
  return function MatSidenav_Factory(t) {
    return (\u0275MatSidenav_BaseFactory || (\u0275MatSidenav_BaseFactory = \u0275\u0275getInheritedFactory(_MatSidenav)))(t || _MatSidenav);
  };
})();
_MatSidenav.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatSidenav,
  selectors: [["mat-sidenav"]],
  hostAttrs: ["tabIndex", "-1", "ngSkipHydration", "", 1, "mat-drawer", "mat-sidenav"],
  hostVars: 17,
  hostBindings: function MatSidenav_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275attribute("align", null);
      \u0275\u0275styleProp("top", ctx.fixedInViewport ? ctx.fixedTopGap : null, "px")("bottom", ctx.fixedInViewport ? ctx.fixedBottomGap : null, "px");
      \u0275\u0275classProp("mat-drawer-end", ctx.position === "end")("mat-drawer-over", ctx.mode === "over")("mat-drawer-push", ctx.mode === "push")("mat-drawer-side", ctx.mode === "side")("mat-drawer-opened", ctx.opened)("mat-sidenav-fixed", ctx.fixedInViewport);
    }
  },
  inputs: {
    fixedInViewport: "fixedInViewport",
    fixedTopGap: "fixedTopGap",
    fixedBottomGap: "fixedBottomGap"
  },
  exportAs: ["matSidenav"],
  features: [\u0275\u0275InheritDefinitionFeature],
  ngContentSelectors: _c05,
  decls: 3,
  vars: 0,
  consts: [["cdkScrollable", "", 1, "mat-drawer-inner-container"], ["content", ""]],
  template: function MatSidenav_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef();
      \u0275\u0275elementStart(0, "div", 0, 1);
      \u0275\u0275projection(2);
      \u0275\u0275elementEnd();
    }
  },
  dependencies: [CdkScrollable],
  encapsulation: 2,
  data: {
    animation: [matDrawerAnimations.transformDrawer]
  },
  changeDetection: 0
});
var MatSidenav = _MatSidenav;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSidenav, [{
    type: Component,
    args: [{
      selector: "mat-sidenav",
      exportAs: "matSidenav",
      animations: [matDrawerAnimations.transformDrawer],
      host: {
        "class": "mat-drawer mat-sidenav",
        "tabIndex": "-1",
        // must prevent the browser from aligning text based on value
        "[attr.align]": "null",
        "[class.mat-drawer-end]": 'position === "end"',
        "[class.mat-drawer-over]": 'mode === "over"',
        "[class.mat-drawer-push]": 'mode === "push"',
        "[class.mat-drawer-side]": 'mode === "side"',
        "[class.mat-drawer-opened]": "opened",
        "[class.mat-sidenav-fixed]": "fixedInViewport",
        "[style.top.px]": "fixedInViewport ? fixedTopGap : null",
        "[style.bottom.px]": "fixedInViewport ? fixedBottomGap : null",
        "ngSkipHydration": ""
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      template: '<div class="mat-drawer-inner-container" cdkScrollable #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n'
    }]
  }], null, {
    fixedInViewport: [{
      type: Input
    }],
    fixedTopGap: [{
      type: Input
    }],
    fixedBottomGap: [{
      type: Input
    }]
  });
})();
var _MatSidenavContainer = class _MatSidenavContainer extends MatDrawerContainer {
  constructor() {
    super(...arguments);
    this._allDrawers = void 0;
    this._content = void 0;
  }
};
_MatSidenavContainer.\u0275fac = /* @__PURE__ */ (() => {
  let \u0275MatSidenavContainer_BaseFactory;
  return function MatSidenavContainer_Factory(t) {
    return (\u0275MatSidenavContainer_BaseFactory || (\u0275MatSidenavContainer_BaseFactory = \u0275\u0275getInheritedFactory(_MatSidenavContainer)))(t || _MatSidenavContainer);
  };
})();
_MatSidenavContainer.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
  type: _MatSidenavContainer,
  selectors: [["mat-sidenav-container"]],
  contentQueries: function MatSidenavContainer_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      \u0275\u0275contentQuery(dirIndex, MatSidenavContent, 5);
      \u0275\u0275contentQuery(dirIndex, MatSidenav, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._content = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._allDrawers = _t);
    }
  },
  hostAttrs: ["ngSkipHydration", "", 1, "mat-drawer-container", "mat-sidenav-container"],
  hostVars: 2,
  hostBindings: function MatSidenavContainer_HostBindings(rf, ctx) {
    if (rf & 2) {
      \u0275\u0275classProp("mat-drawer-container-explicit-backdrop", ctx._backdropOverride);
    }
  },
  exportAs: ["matSidenavContainer"],
  features: [\u0275\u0275ProvidersFeature([{
    provide: MAT_DRAWER_CONTAINER,
    useExisting: _MatSidenavContainer
  }]), \u0275\u0275InheritDefinitionFeature],
  ngContentSelectors: _c52,
  decls: 4,
  vars: 2,
  consts: [["class", "mat-drawer-backdrop", 3, "mat-drawer-shown"], [1, "mat-drawer-backdrop", 3, "click"]],
  template: function MatSidenavContainer_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275projectionDef(_c43);
      \u0275\u0275template(0, MatSidenavContainer_Conditional_0_Template, 1, 2, "div", 0);
      \u0275\u0275projection(1);
      \u0275\u0275projection(2, 1);
      \u0275\u0275template(3, MatSidenavContainer_Conditional_3_Template, 2, 0, "mat-sidenav-content");
    }
    if (rf & 2) {
      \u0275\u0275conditional(0, ctx.hasBackdrop ? 0 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(3, !ctx._content ? 3 : -1);
    }
  },
  dependencies: [MatSidenavContent],
  styles: [_c62],
  encapsulation: 2,
  changeDetection: 0
});
var MatSidenavContainer = _MatSidenavContainer;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSidenavContainer, [{
    type: Component,
    args: [{
      selector: "mat-sidenav-container",
      exportAs: "matSidenavContainer",
      host: {
        "class": "mat-drawer-container mat-sidenav-container",
        "[class.mat-drawer-container-explicit-backdrop]": "_backdropOverride",
        "ngSkipHydration": ""
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      providers: [{
        provide: MAT_DRAWER_CONTAINER,
        useExisting: MatSidenavContainer
      }],
      template: '@if (hasBackdrop) {\n  <div class="mat-drawer-backdrop" (click)="_onBackdropClicked()"\n       [class.mat-drawer-shown]="_isShowingBackdrop()"></div>\n}\n\n<ng-content select="mat-sidenav"></ng-content>\n\n<ng-content select="mat-sidenav-content">\n</ng-content>\n\n@if (!_content) {\n  <mat-sidenav-content>\n    <ng-content></ng-content>\n  </mat-sidenav-content>\n}\n',
      styles: ['.mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color);background-color:var(--mat-sidenav-content-background-color);box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color)}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{box-shadow:0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);position:relative;z-index:4;color:var(--mat-sidenav-container-text-color);background-color:var(--mat-sidenav-container-background-color);border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape);border-bottom-left-radius:var(--mat-sidenav-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape);border-bottom-right-radius:var(--mat-sidenav-container-shape);border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*="visibility: hidden"]{display:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}']
    }]
  }], null, {
    _allDrawers: [{
      type: ContentChildren,
      args: [MatSidenav, {
        // We need to use `descendants: true`, because Ivy will no longer match
        // indirect descendants if it's left as false.
        descendants: true
      }]
    }],
    _content: [{
      type: ContentChild,
      args: [MatSidenavContent]
    }]
  });
})();
var _MatSidenavModule = class _MatSidenavModule {
};
_MatSidenavModule.\u0275fac = function MatSidenavModule_Factory(t) {
  return new (t || _MatSidenavModule)();
};
_MatSidenavModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
  type: _MatSidenavModule
});
_MatSidenavModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
  imports: [MatCommonModule, CdkScrollableModule, CdkScrollableModule, MatCommonModule]
});
var MatSidenavModule = _MatSidenavModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSidenavModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CdkScrollableModule],
      exports: [CdkScrollableModule, MatCommonModule, MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent],
      declarations: [MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent]
    }]
  }], null, null);
})();

// src/app/services/deal/deal.service.ts
var _DealService = class _DealService {
  constructor() {
    this.deals = [
      {
        id: 1,
        name: "Deal 1",
        type: "Development",
        address: "2972 Westheimer Rd. Santa Ana",
        noi: 44709,
        purchasePrice: 361994,
        capRate: 0.12,
        image: "assets/images/warehousing-01.jpg"
      },
      {
        id: 2,
        name: "Deal 2",
        type: "Acquisition",
        address: "6391 Elgin St. Celina",
        noi: 911725,
        purchasePrice: 126483,
        capRate: 0.07,
        image: "assets/images/elgin-01.jpeg"
      },
      {
        id: 3,
        name: "Deal 3",
        type: "Development",
        address: "2972 Westheimer Rd. Santa Ana",
        noi: 44709,
        purchasePrice: 361994,
        capRate: 0.12,
        image: "assets/images/warehousing-01.jpg"
      },
      {
        id: 4,
        name: "Deal 4",
        type: "Acquisition",
        address: "6391 Elgin St. Celina",
        noi: 911725,
        purchasePrice: 126483,
        capRate: 0.07,
        image: "assets/images/elgin-01.jpeg"
      },
      {
        id: 5,
        name: "Deal 5",
        type: "Development",
        address: "2972 Westheimer Rd. Santa Ana",
        noi: 44709,
        purchasePrice: 361994,
        capRate: 0.12,
        image: "assets/images/warehousing-01.jpg"
      },
      {
        id: 6,
        name: "Deal 6",
        type: "Acquisition",
        address: "6391 Elgin St. Celina",
        noi: 911725,
        purchasePrice: 126483,
        capRate: 0.07,
        image: "assets/images/elgin-01.jpeg"
      },
      {
        id: 7,
        name: "Deal 7",
        type: "Development",
        address: "2972 Westheimer Rd. Santa Ana",
        noi: 44709,
        purchasePrice: 361994,
        capRate: 0.12,
        image: "assets/images/warehousing-01.jpg"
      },
      {
        id: 8,
        name: "Deal 8",
        type: "Acquisition",
        address: "6391 Elgin St. Celina",
        noi: 911725,
        purchasePrice: 126483,
        capRate: 0.07,
        image: "assets/images/elgin-01.jpeg"
      }
    ];
  }
  getDeals() {
    return this.deals;
  }
  getDealById(id) {
    return this.deals.find((deal) => deal.id === id);
  }
  addDeal(deal) {
    this.deals.push(__spreadProps(__spreadValues({}, deal), { capRate: deal.capRate / 100 }));
    return this.deals;
  }
  editDeal(deal) {
    const index = this.deals.findIndex((d) => d.id === deal.id);
    this.deals[index] = deal;
    return this.deals;
  }
  searchDealsByName(dealName) {
    return this.deals.filter((deal) => deal.name.toLowerCase().includes(dealName.toLowerCase()));
  }
  filterDeals(filter2) {
    let deals = this.filterByType(this.deals, filter2.type);
    deals = this.filterByPurchasePrice(deals, filter2.purchasePrice);
    return deals;
  }
  filterByType(deals, type) {
    if (type === "All") {
      return deals;
    }
    return deals.filter((deal) => deal.type === type);
  }
  filterByPurchasePrice(deals, purchasePrice) {
    if (purchasePrice === 0) {
      return deals;
    }
    return deals.filter((deal) => deal.purchasePrice <= purchasePrice);
  }
};
_DealService.\u0275fac = function DealService_Factory(t) {
  return new (t || _DealService)();
};
_DealService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DealService, factory: _DealService.\u0275fac, providedIn: "root" });
var DealService = _DealService;

// src/app/shared/helpers.ts
function colorByDealType(deal) {
  if (deal.type === "Development") {
    return "#178F82";
  } else if (deal.type === "Acquisition") {
    return "#8764D8";
  } else {
    return "#F94B76";
  }
}

export {
  MatLabel,
  MatPrefix,
  MatSuffix,
  MatFormFieldControl,
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldModule,
  SelectionModel,
  UniqueSelectionDispatcher,
  ScrollDispatcher,
  ViewportRuler,
  CdkScrollableModule,
  ScrollingModule,
  DealService,
  colorByDealType,
  MatCard,
  MatCardTitle,
  MatCardContent,
  MatCardSubtitle,
  MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardAvatar,
  MatCardModule,
  MatToolbar,
  MatToolbarModule,
  MatSidenavContent,
  MatSidenavContainer,
  MatSidenavModule
};
//# sourceMappingURL=chunk-KD4VXJLG.js.map
