/*
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
const ye = (l) => l === "true", E = (l, e, t = "") => (window.getComputedStyle(l).getPropertyValue(e) || t).replace(
  " ",
  ""
), _t = (l, e, t = "") => {
  let s = "";
  return l.classList.forEach((n) => {
    n.includes(e) && (s = n);
  }), s.match(/:(.*)]/) ? s.match(/:(.*)]/)[1] : t;
}, es = () => /iPad|iPhone|iPod/.test(navigator.platform) ? !0 : navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform), ts = () => navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform), ss = (l, e) => {
  const t = l.children;
  for (let s = 0; s < t.length; s++)
    if (t[s] === e)
      return !0;
  return !1;
}, lt = (l, e, t = "auto", s = 10, n = null) => {
  const i = e.getBoundingClientRect(), o = n ? n.getBoundingClientRect() : null, r = window.innerHeight, a = o ? i.top - o.top : i.top, d = (n ? o.bottom : r) - i.bottom, h = l.clientHeight + s;
  return t === "bottom" ? d >= h : t === "top" ? a >= h : a >= h || d >= h;
}, is = (l) => l instanceof HTMLInputElement || l instanceof HTMLTextAreaElement || l instanceof HTMLSelectElement, rt = (l) => l ? window.getComputedStyle(l).display === "none" ? !0 : rt(l.parentElement) : !1, Ce = (l, e = 200) => {
  let t;
  return (...s) => {
    clearTimeout(t), t = setTimeout(() => {
      l.apply(void 0, s);
    }, e);
  };
}, w = (l, e, t = null) => {
  const s = new CustomEvent(l, {
    detail: { payload: t },
    bubbles: !0,
    cancelable: !0,
    composed: !1
  });
  e.dispatchEvent(s);
}, R = (l, e) => {
  const t = () => {
    e(), l.removeEventListener("transitionend", t, !0);
  }, s = window.getComputedStyle(l), n = s.getPropertyValue(
    "transition-duration"
  );
  s.getPropertyValue(
    "transition-property"
  ) !== "none" && parseFloat(n) > 0 ? l.addEventListener("transitionend", t, !0) : e();
}, y = (l) => {
  const e = document.createElement("template");
  return l = l.trim(), e.innerHTML = l, e.content.firstChild;
}, B = (l, e, t = " ", s = "add") => {
  l.split(t).forEach(
    (i) => s === "add" ? e.classList.add(i) : e.classList.remove(i)
  );
}, ns = {
  historyIndex: -1,
  addHistory(l) {
    this.historyIndex = l;
  },
  existsInHistory(l) {
    return l > this.historyIndex;
  },
  clearHistory() {
    this.historyIndex = -1;
  }
};
/*
 * HSBasePlugin
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class I {
  constructor(e, t, s) {
    this.el = e, this.options = t, this.events = s, this.el = e, this.options = t, this.events = {};
  }
  createCollection(e, t) {
    var s;
    e.push({
      id: ((s = t == null ? void 0 : t.el) == null ? void 0 : s.id) || e.length + 1,
      element: t
    });
  }
  fireEvent(e, t = null) {
    if (this.events.hasOwnProperty(e))
      return this.events[e](t);
  }
  on(e, t) {
    this.events[e] = t;
  }
}
/*
 * HSCopyMarkup
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Te extends I {
  constructor(e, t) {
    super(e, t);
    const s = e.getAttribute("data-hs-copy-markup"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.targetSelector = (i == null ? void 0 : i.targetSelector) || null, this.wrapperSelector = (i == null ? void 0 : i.wrapperSelector) || null, this.limit = (i == null ? void 0 : i.limit) || null, this.items = [], this.targetSelector && this.init();
  }
  init() {
    this.createCollection(window.$hsCopyMarkupCollection, this), this.setTarget(), this.setWrapper(), this.addPredefinedItems(), this.el.addEventListener("click", () => this.copy());
  }
  copy() {
    if (this.limit && this.items.length >= this.limit)
      return !1;
    this.el.hasAttribute("disabled") && this.el.setAttribute("disabled", "");
    const e = this.target.cloneNode(!0);
    this.addToItems(e), this.limit && this.items.length >= this.limit && this.el.setAttribute("disabled", "disabled"), this.fireEvent("copy", e), w("copy.hs.copyMarkup", e, e);
  }
  addPredefinedItems() {
    Array.from(this.wrapper.children).filter(
      (e) => !e.classList.contains("[--ignore-for-count]")
    ).forEach((e) => {
      this.addToItems(e);
    });
  }
  setTarget() {
    const e = typeof this.targetSelector == "string" ? document.querySelector(this.targetSelector).cloneNode(!0) : this.targetSelector.cloneNode(!0);
    e.removeAttribute("id"), this.target = e;
  }
  setWrapper() {
    this.wrapper = typeof this.wrapperSelector == "string" ? document.querySelector(this.wrapperSelector) : this.wrapperSelector;
  }
  addToItems(e) {
    const t = e.querySelector(
      "[data-hs-copy-markup-delete-item]"
    );
    this.wrapper ? this.wrapper.append(e) : this.el.before(e), t && t.addEventListener("click", () => this.delete(e)), this.items.push(e);
  }
  // Public methods
  delete(e) {
    const t = this.items.indexOf(e);
    t !== -1 && this.items.splice(t, 1), e.remove(), this.fireEvent("delete", e), w("delete.hs.copyMarkup", e, e);
  }
  // Static method
  static getInstance(e, t) {
    const s = window.$hsCopyMarkupCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsCopyMarkupCollection || (window.$hsCopyMarkupCollection = []), document.querySelectorAll("[data-hs-copy-markup]:not(.--prevent-on-load-init)").forEach((e) => {
      if (!window.$hsCopyMarkupCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      )) {
        const t = e.getAttribute("data-hs-copy-markup"), s = t ? JSON.parse(t) : {};
        new Te(e, s);
      }
    });
  }
}
window.addEventListener("load", () => {
  Te.autoInit();
});
typeof window < "u" && (window.HSCopyMarkup = Te);
/*
 * HSAccordion
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class ae extends I {
  constructor(e, t, s) {
    super(e, t, s), this.toggle = this.el.querySelector(".hs-accordion-toggle") || null, this.content = this.el.querySelector(".hs-accordion-content") || null, this.update(), this.toggle && this.content && this.init();
  }
  init() {
    this.createCollection(window.$hsAccordionCollection, this), this.toggle.addEventListener("click", (e) => {
      e.stopPropagation(), this.el.classList.contains("active") ? this.hide() : this.show();
    });
  }
  // Public methods
  show() {
    var e;
    if (this.group && !this.isAlwaysOpened && this.group.querySelector(":scope > .hs-accordion.active") && this.group.querySelector(":scope > .hs-accordion.active") !== this.el && window.$hsAccordionCollection.find(
      (s) => s.element.el === this.group.querySelector(":scope > .hs-accordion.active")
    ).element.hide(), this.el.classList.contains("active"))
      return !1;
    this.el.classList.add("active"), (e = this == null ? void 0 : this.toggle) != null && e.ariaExpanded && (this.toggle.ariaExpanded = "true"), this.content.style.display = "block", this.content.style.height = "0", setTimeout(() => {
      this.content.style.height = `${this.content.scrollHeight}px`;
    }), R(this.content, () => {
      this.content.style.display = "block", this.content.style.height = "", this.fireEvent("open", this.el), w("open.hs.accordion", this.el, this.el);
    });
  }
  hide() {
    var e;
    if (!this.el.classList.contains("active"))
      return !1;
    this.el.classList.remove("active"), (e = this == null ? void 0 : this.toggle) != null && e.ariaExpanded && (this.toggle.ariaExpanded = "false"), this.content.style.height = `${this.content.scrollHeight}px`, setTimeout(() => {
      this.content.style.height = "0";
    }), R(this.content, () => {
      this.content.style.display = "", this.content.style.height = "0", this.fireEvent("close", this.el), w("close.hs.accordion", this.el, this.el);
    });
  }
  update() {
    if (this.group = this.el.closest(".hs-accordion-group") || null, !this.group)
      return !1;
    this.isAlwaysOpened = this.group.hasAttribute("data-hs-accordion-always-open") || !1, window.$hsAccordionCollection.map((e) => (e.id === this.el.id && (e.element.group = this.group, e.element.isAlwaysOpened = this.isAlwaysOpened), e));
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsAccordionCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static show(e) {
    const t = window.$hsAccordionCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && t.element.content.style.display !== "block" && t.element.show();
  }
  static hide(e) {
    const t = window.$hsAccordionCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && t.element.content.style.display === "block" && t.element.hide();
  }
  static autoInit() {
    window.$hsAccordionCollection || (window.$hsAccordionCollection = []), document.querySelectorAll(".hs-accordion:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsAccordionCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new ae(e);
    });
  }
  static treeView() {
    if (!document.querySelectorAll(".hs-accordion-treeview-root").length)
      return !1;
    this.selectable = [], document.querySelectorAll(".hs-accordion-treeview-root").forEach((e) => {
      const t = e == null ? void 0 : e.getAttribute("data-hs-accordion-options"), s = t ? JSON.parse(t) : {};
      this.selectable.push({
        el: e,
        options: { ...s }
      });
    }), this.selectable.length && this.selectable.forEach((e) => {
      const { el: t } = e;
      t.querySelectorAll(".hs-accordion-selectable").forEach(
        (s) => {
          s.addEventListener("click", (n) => {
            n.stopPropagation(), this.toggleSelected(e, s);
          });
        }
      );
    });
  }
  static toggleSelected(e, t) {
    t.classList.contains("selected") ? t.classList.remove("selected") : (e.el.querySelectorAll(".hs-accordion-selectable").forEach((s) => s.classList.remove("selected")), t.classList.add("selected"));
  }
  // Backward compatibility
  static on(e, t, s) {
    const n = window.$hsAccordionCollection.find(
      (i) => i.element.el === (typeof t == "string" ? document.querySelector(t) : t)
    );
    n && (n.element.events[e] = s);
  }
}
window.addEventListener("load", () => {
  ae.autoInit(), document.querySelectorAll(".hs-accordion-treeview-root").length && ae.treeView();
});
typeof window < "u" && (window.HSAccordion = ae);
const at = {
  auto: "auto",
  "auto-start": "auto-start",
  "auto-end": "auto-end",
  top: "top",
  "top-left": "top-start",
  "top-right": "top-end",
  bottom: "bottom",
  "bottom-left": "bottom-start",
  "bottom-right": "bottom-end",
  right: "right",
  "right-start": "right-start",
  "right-end": "right-end",
  left: "left",
  "left-start": "left-start",
  "left-end": "left-end"
}, os = [
  "Escape",
  "ArrowUp",
  "ArrowDown",
  "Home",
  "End",
  "Enter"
], ls = [
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Home",
  "End"
], rs = [
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Home",
  "End",
  "Escape",
  "Enter",
  "Tab"
], as = [
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Home",
  "End",
  "Escape",
  "Enter"
], it = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};
/*
 * HSCarousel
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Ee extends I {
  constructor(e, t) {
    var o, r, a, d, h;
    super(e, t);
    const s = e.getAttribute("data-hs-carousel"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.currentIndex = i.currentIndex || 0, this.loadingClasses = i.loadingClasses ? `${i.loadingClasses}`.split(",") : null, this.dotsItemClasses = i.dotsItemClasses ? i.dotsItemClasses : null, this.isAutoHeight = typeof i.isAutoHeight < "u" ? i.isAutoHeight : !1, this.isAutoPlay = typeof i.isAutoPlay < "u" ? i.isAutoPlay : !1, this.isCentered = typeof i.isCentered < "u" ? i.isCentered : !1, this.isDraggable = typeof i.isDraggable < "u" ? i.isDraggable : !1, this.isInfiniteLoop = typeof i.isInfiniteLoop < "u" ? i.isInfiniteLoop : !1, this.isRTL = typeof i.isRTL < "u" ? i.isRTL : !1, this.isSnap = typeof i.isSnap < "u" ? i.isSnap : !1, this.hasSnapSpacers = typeof i.hasSnapSpacers < "u" ? i.hasSnapSpacers : !0, this.speed = i.speed || 4e3, this.updateDelay = i.updateDelay || 0, this.slidesQty = i.slidesQty || 1, this.loadingClassesRemove = (o = this.loadingClasses) != null && o[0] ? this.loadingClasses[0].split(" ") : "opacity-0", this.loadingClassesAdd = (r = this.loadingClasses) != null && r[1] ? this.loadingClasses[1].split(" ") : "", this.afterLoadingClassesAdd = (a = this.loadingClasses) != null && a[2] ? this.loadingClasses[2].split(" ") : "", this.container = this.el.querySelector(".hs-carousel") || null, this.inner = this.el.querySelector(".hs-carousel-body") || null, this.slides = this.el.querySelectorAll(".hs-carousel-slide") || [], this.prev = this.el.querySelector(".hs-carousel-prev") || null, this.next = this.el.querySelector(".hs-carousel-next") || null, this.dots = this.el.querySelector(".hs-carousel-pagination") || null, this.info = this.el.querySelector(".hs-carousel-info") || null, this.infoTotal = ((d = this == null ? void 0 : this.info) == null ? void 0 : d.querySelector(".hs-carousel-info-total")) || null, this.infoCurrent = ((h = this == null ? void 0 : this.info) == null ? void 0 : h.querySelector(".hs-carousel-info-current")) || null, this.sliderWidth = this.el.getBoundingClientRect().width, this.isDragging = !1, this.dragStartX = null, this.initialTranslateX = null, this.touchX = {
      start: 0,
      end: 0
    }, this.resizeContainer = document.querySelector("body"), this.resizeContainerWidth = 0, this.init();
  }
  setIsSnap() {
    const e = this.container.getBoundingClientRect(), t = e.left + e.width / 2;
    let s = null, n = null, i = 1 / 0;
    Array.from(this.inner.children).forEach((o) => {
      const r = o.getBoundingClientRect(), a = this.inner.getBoundingClientRect(), d = r.left + r.width / 2 - a.left, h = Math.abs(
        t - (a.left + d)
      );
      h < i && (i = h, s = o);
    }), s && (n = Array.from(this.slides).findIndex(
      (o) => o === s
    )), this.setIndex(n), this.dots && this.setCurrentDot();
  }
  init() {
    this.createCollection(window.$hsCarouselCollection, this), this.inner && (this.calculateWidth(), this.isDraggable && !this.isSnap && this.initDragHandling()), this.prev && this.prev.addEventListener("click", () => {
      this.goToPrev(), this.isAutoPlay && (this.resetTimer(), this.setTimer());
    }), this.next && this.next.addEventListener("click", () => {
      this.goToNext(), this.isAutoPlay && (this.resetTimer(), this.setTimer());
    }), this.dots && this.initDots(), this.info && this.buildInfo(), this.slides.length && (this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass(), this.isAutoPlay && this.autoPlay()), setTimeout(() => {
      this.isSnap && this.setIsSnap(), this.loadingClassesRemove && (typeof this.loadingClassesRemove == "string" ? this.inner.classList.remove(this.loadingClassesRemove) : this.inner.classList.remove(...this.loadingClassesRemove)), this.loadingClassesAdd && (typeof this.loadingClassesAdd == "string" ? this.inner.classList.add(this.loadingClassesAdd) : this.inner.classList.add(...this.loadingClassesAdd)), this.inner && this.afterLoadingClassesAdd && setTimeout(() => {
        typeof this.afterLoadingClassesAdd == "string" ? this.inner.classList.add(this.afterLoadingClassesAdd) : this.inner.classList.add(...this.afterLoadingClassesAdd);
      });
    }, 400), this.isSnap && this.container.addEventListener("scroll", () => {
      clearTimeout(this.isScrolling), this.isScrolling = setTimeout(() => {
        this.setIsSnap();
      }, 100);
    }), this.el.classList.add("init"), this.isSnap || (this.el.addEventListener("touchstart", (e) => {
      this.touchX.start = e.changedTouches[0].screenX;
    }), this.el.addEventListener("touchend", (e) => {
      this.touchX.end = e.changedTouches[0].screenX, this.detectDirection();
    })), this.observeResize();
  }
  initDragHandling() {
    const e = this.inner;
    e && (e.addEventListener(
      "mousedown",
      this.handleDragStart.bind(this)
    ), e.addEventListener(
      "touchstart",
      this.handleDragStart.bind(this),
      { passive: !0 }
    ), document.addEventListener("mousemove", this.handleDragMove.bind(this)), document.addEventListener("touchmove", this.handleDragMove.bind(this), {
      passive: !1
    }), document.addEventListener("mouseup", this.handleDragEnd.bind(this)), document.addEventListener("touchend", this.handleDragEnd.bind(this)));
  }
  getTranslateXValue() {
    var t;
    const e = window.getComputedStyle(this.inner).transform;
    if (e !== "none") {
      const s = (t = e.match(/matrix.*\((.+)\)/)) == null ? void 0 : t[1].split(", ");
      if (s) {
        let n = parseFloat(
          s.length === 6 ? s[4] : s[12]
        );
        return this.isRTL && (n = -n), isNaN(n) || n === 0 ? 0 : -n;
      }
    }
    return 0;
  }
  removeClickEventWhileDragging(e) {
    e.preventDefault();
  }
  handleDragStart(e) {
    e.preventDefault(), this.isDragging = !0, this.dragStartX = this.getEventX(e), this.initialTranslateX = this.isRTL ? this.getTranslateXValue() : -this.getTranslateXValue(), this.inner.classList.add("dragging");
  }
  handleDragMove(e) {
    if (!this.isDragging)
      return;
    this.inner.querySelectorAll("a:not(.prevented-click)").forEach((o) => {
      o.classList.add("prevented-click"), o.addEventListener("click", this.removeClickEventWhileDragging);
    });
    let s = this.getEventX(e) - this.dragStartX;
    this.isRTL && (s = -s);
    const n = this.initialTranslateX + s, i = () => {
      let o = this.sliderWidth * this.slides.length / this.getCurrentSlidesQty() - this.sliderWidth;
      const r = this.sliderWidth, a = r / this.getCurrentSlidesQty(), d = (r - a) / 2, h = this.isCentered ? d : 0;
      this.isCentered && (o = o + d);
      const p = -o;
      return this.isRTL ? n < h ? h : n > o ? p : -n : n > h ? h : n < -o ? p : n;
    };
    this.setTranslate(i());
  }
  handleDragEnd() {
    if (!this.isDragging)
      return;
    this.isDragging = !1;
    const t = this.sliderWidth / this.getCurrentSlidesQty(), s = this.getTranslateXValue();
    let n = Math.round(s / t);
    this.isRTL && (n = Math.round(s / t)), this.inner.classList.remove("dragging"), setTimeout(() => {
      this.calculateTransform(n), this.dots && this.setCurrentDot(), this.dragStartX = null, this.initialTranslateX = null, this.inner.querySelectorAll("a.prevented-click").forEach((i) => {
        i.classList.remove("prevented-click"), i.removeEventListener("click", this.removeClickEventWhileDragging);
      });
    });
  }
  getEventX(e) {
    return e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
  }
  getCurrentSlidesQty() {
    if (typeof this.slidesQty == "object") {
      const e = document.body.clientWidth;
      let t = 0;
      return Object.keys(this.slidesQty).forEach((s) => {
        e >= (typeof s + 1 == "number" ? this.slidesQty[s] : it[s]) && (t = this.slidesQty[s]);
      }), t;
    } else
      return this.slidesQty;
  }
  buildSnapSpacers() {
    const e = this.inner.querySelector(".hs-snap-before"), t = this.inner.querySelector(".hs-snap-after");
    e && e.remove(), t && t.remove();
    const s = this.sliderWidth, n = s / this.getCurrentSlidesQty(), i = s / 2 - n / 2, o = y(
      `<div class="hs-snap-before" style="height: 100%; width: ${i}px"></div>`
    ), r = y(
      `<div class="hs-snap-after" style="height: 100%; width: ${i}px"></div>`
    );
    this.inner.prepend(o), this.inner.appendChild(r);
  }
  initDots() {
    this.el.querySelectorAll(".hs-carousel-pagination-item").length ? this.setDots() : this.buildDots(), this.dots && this.setCurrentDot();
  }
  buildDots() {
    this.dots.innerHTML = "";
    const e = !this.isCentered && this.slidesQty ? this.slides.length - (this.getCurrentSlidesQty() - 1) : this.slides.length;
    for (let t = 0; t < e; t++) {
      const s = this.buildSingleDot(t);
      this.dots.append(s);
    }
  }
  setDots() {
    this.dotsItems = this.dots.querySelectorAll(".hs-carousel-pagination-item"), this.dotsItems.forEach((e, t) => {
      const s = e.getAttribute(
        "data-carousel-pagination-item-target"
      );
      this.singleDotEvents(e, s ? +s : t);
    });
  }
  goToCurrentDot() {
    const e = this.dots, t = e.getBoundingClientRect(), s = e.scrollLeft, n = e.scrollTop, i = e.clientWidth, o = e.clientHeight, r = this.dotsItems[this.currentIndex], a = r.getBoundingClientRect(), d = a.left - t.left + s, h = d + r.clientWidth, p = a.top - t.top + n, c = p + r.clientHeight;
    let u = s, g = n;
    (d < s || h > s + i) && (u = h - i), (p < n || c > n + o) && (g = c - o), e.scrollTo({
      left: u,
      top: g,
      behavior: "smooth"
    });
  }
  buildInfo() {
    this.infoTotal && this.setInfoTotal(), this.infoCurrent && this.setInfoCurrent();
  }
  setInfoTotal() {
    this.infoTotal.innerText = `${this.slides.length}`;
  }
  setInfoCurrent() {
    this.infoCurrent.innerText = `${this.currentIndex + 1}`;
  }
  buildSingleDot(e) {
    const t = y("<span></span>");
    return this.dotsItemClasses && B(this.dotsItemClasses, t), this.singleDotEvents(t, e), t;
  }
  singleDotEvents(e, t) {
    e.addEventListener("click", () => {
      this.goTo(t), this.isAutoPlay && (this.resetTimer(), this.setTimer());
    });
  }
  observeResize() {
    new ResizeObserver(
      Ce((t) => {
        for (let s of t) {
          const n = s.contentRect.width;
          n !== this.resizeContainerWidth && (this.recalculateWidth(), this.dots && this.initDots(), this.addCurrentClass(), this.resizeContainerWidth = n);
        }
      }, this.updateDelay)
    ).observe(this.resizeContainer);
  }
  calculateWidth() {
    this.isSnap || (this.inner.style.width = `${this.sliderWidth * this.slides.length / this.getCurrentSlidesQty()}px`), this.slides.forEach((e) => {
      e.style.width = `${this.sliderWidth / this.getCurrentSlidesQty()}px`;
    }), this.calculateTransform();
  }
  addCurrentClass() {
    if (this.isSnap) {
      const e = Math.floor(this.getCurrentSlidesQty() / 2);
      for (let t = 0; t < this.slides.length; t++) {
        const s = this.slides[t];
        t <= this.currentIndex + e && t >= this.currentIndex - e ? s.classList.add("active") : s.classList.remove("active");
      }
    } else {
      const e = this.isCentered ? this.currentIndex + this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.currentIndex + this.getCurrentSlidesQty();
      this.slides.forEach((t, s) => {
        s >= this.currentIndex && s < e ? t.classList.add("active") : t.classList.remove("active");
      });
    }
  }
  setCurrentDot() {
    const e = (t, s) => {
      let n = !1;
      const i = Math.floor(this.getCurrentSlidesQty() / 2);
      this.isSnap && !this.hasSnapSpacers ? n = s === (this.getCurrentSlidesQty() % 2 === 0 ? this.currentIndex - i + 1 : this.currentIndex - i) : n = s === this.currentIndex, n ? t.classList.add("active") : t.classList.remove("active");
    };
    this.dotsItems ? this.dotsItems.forEach((t, s) => e(t, s)) : this.dots.querySelectorAll(":scope > *").forEach((t, s) => e(t, s));
  }
  setElementToDisabled(e) {
    e.classList.add("disabled"), (e.tagName === "BUTTON" || e.tagName === "INPUT") && e.setAttribute("disabled", "disabled");
  }
  unsetElementToDisabled(e) {
    e.classList.remove("disabled"), (e.tagName === "BUTTON" || e.tagName === "INPUT") && e.removeAttribute("disabled");
  }
  addDisabledClass() {
    if (!this.prev || !this.next)
      return !1;
    const e = getComputedStyle(this.inner).getPropertyValue("gap"), t = Math.floor(this.getCurrentSlidesQty() / 2);
    let s = 0, n = 0, i = !1, o = !1;
    this.isSnap ? (s = this.currentIndex, n = this.hasSnapSpacers ? this.slides.length - 1 : this.slides.length - t - 1, i = this.hasSnapSpacers ? s === 0 : this.getCurrentSlidesQty() % 2 === 0 ? s - t < 0 : s - t === 0, o = s >= n && this.container.scrollLeft + this.container.clientWidth + (parseFloat(e) || 0) >= this.container.scrollWidth) : (s = this.currentIndex, n = this.isCentered ? this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.slides.length - this.getCurrentSlidesQty(), i = s === 0, o = s >= n), i ? (this.unsetElementToDisabled(this.next), this.setElementToDisabled(this.prev)) : o ? (this.unsetElementToDisabled(this.prev), this.setElementToDisabled(this.next)) : (this.unsetElementToDisabled(this.prev), this.unsetElementToDisabled(this.next));
  }
  autoPlay() {
    this.setTimer();
  }
  setTimer() {
    this.timer = setInterval(() => {
      this.currentIndex === this.slides.length - 1 ? this.goTo(0) : this.goToNext();
    }, this.speed);
  }
  resetTimer() {
    clearInterval(this.timer);
  }
  detectDirection() {
    const { start: e, end: t } = this.touchX;
    t < e && this.goToNext(), t > e && this.goToPrev();
  }
  // Public methods
  recalculateWidth() {
    this.sliderWidth = this.inner.parentElement.getBoundingClientRect().width, this.calculateWidth(), this.sliderWidth !== this.inner.parentElement.getBoundingClientRect().width && this.recalculateWidth();
  }
  calculateTransform(e) {
    e !== void 0 && (this.currentIndex = e), this.currentIndex > this.slides.length - this.getCurrentSlidesQty() && !this.isCentered && (this.currentIndex = this.slides.length - this.getCurrentSlidesQty());
    const t = this.sliderWidth, s = t / this.getCurrentSlidesQty();
    let n = this.currentIndex * s;
    if (this.isSnap && !this.isCentered && this.container.scrollLeft < t && this.container.scrollLeft + s / 2 > t && (this.container.scrollLeft = this.container.scrollWidth), this.isCentered && !this.isSnap) {
      const i = (t - s) / 2;
      this.currentIndex === 0 ? n = -i : this.currentIndex >= this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) ? n = this.slides.length * s - t + i : n = this.currentIndex * s - i;
    }
    this.isSnap || (this.inner.style.transform = this.isRTL ? `translate(${n}px, 0px)` : `translate(${-n}px, 0px)`), this.isAutoHeight && (this.inner.style.height = `${this.slides[this.currentIndex].clientHeight}px`), this.dotsItems && this.goToCurrentDot(), this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass(), this.isSnap && this.hasSnapSpacers && this.buildSnapSpacers(), this.infoCurrent && this.setInfoCurrent();
  }
  setTranslate(e) {
    this.inner.style.transform = this.isRTL ? `translate(${-e}px, 0px)` : `translate(${e}px, 0px)`;
  }
  goToPrev() {
    if (this.currentIndex > 0 ? this.currentIndex-- : this.currentIndex = this.slides.length - this.getCurrentSlidesQty(), this.isSnap) {
      const e = this.sliderWidth / this.getCurrentSlidesQty();
      this.container.scrollBy({
        left: Math.max(-this.container.scrollLeft, -e),
        behavior: "smooth"
      }), this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass();
    } else
      this.calculateTransform();
    this.dots && this.setCurrentDot();
  }
  goToNext() {
    const e = this.isCentered ? this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.slides.length - this.getCurrentSlidesQty();
    if (this.currentIndex < e ? this.currentIndex++ : this.currentIndex = 0, this.isSnap) {
      const t = this.sliderWidth / this.getCurrentSlidesQty(), s = this.container.scrollWidth - this.container.clientWidth;
      this.container.scrollBy({
        left: Math.min(t, s - this.container.scrollLeft),
        behavior: "smooth"
      }), this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass();
    } else
      this.calculateTransform();
    this.dots && this.setCurrentDot();
  }
  goTo(e) {
    const t = this.currentIndex;
    if (this.currentIndex = e, this.isSnap) {
      const s = this.sliderWidth / this.getCurrentSlidesQty(), n = t > this.currentIndex ? t - this.currentIndex : this.currentIndex - t, i = t > this.currentIndex ? -(s * n) : s * n;
      this.container.scrollBy({
        left: i,
        behavior: "smooth"
      }), this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass();
    } else
      this.calculateTransform();
    this.dots && this.setCurrentDot();
  }
  setIndex(e) {
    this.currentIndex = e, this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass();
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsCarouselCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsCarouselCollection || (window.$hsCarouselCollection = []), document.querySelectorAll("[data-hs-carousel]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsCarouselCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Ee(e);
    });
  }
}
window.addEventListener("load", () => {
  Ee.autoInit();
});
typeof window < "u" && (window.HSCarousel = Ee);
/*
 * HSCollapse
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Le extends I {
  constructor(e, t, s) {
    super(e, t, s), this.contentId = this.el.dataset.hsCollapse, this.content = document.querySelector(this.contentId), this.animationInProcess = !1, this.content && this.init();
  }
  init() {
    var e;
    this.createCollection(window.$hsCollapseCollection, this), (e = this == null ? void 0 : this.el) != null && e.ariaExpanded && (this.el.classList.contains("open") ? this.el.ariaExpanded = "true" : this.el.ariaExpanded = "false"), this.el.addEventListener("click", () => {
      this.content.classList.contains("open") ? this.hide() : this.show();
    });
  }
  hideAllMegaMenuItems() {
    this.content.querySelectorAll(".hs-mega-menu-content.block").forEach((e) => {
      e.classList.remove("block"), e.classList.add("hidden");
    });
  }
  // Public methods
  show() {
    var e;
    if (this.animationInProcess || this.el.classList.contains("open"))
      return !1;
    this.animationInProcess = !0, this.el.classList.add("open"), (e = this == null ? void 0 : this.el) != null && e.ariaExpanded && (this.el.ariaExpanded = "true"), this.content.classList.add("open"), this.content.classList.remove("hidden"), this.content.style.height = "0", setTimeout(() => {
      this.content.style.height = `${this.content.scrollHeight}px`, this.fireEvent("beforeOpen", this.el), w("beforeOpen.hs.collapse", this.el, this.el);
    }), R(this.content, () => {
      this.content.style.height = "", this.fireEvent("open", this.el), w("open.hs.collapse", this.el, this.el), this.animationInProcess = !1;
    });
  }
  hide() {
    var e;
    if (this.animationInProcess || !this.el.classList.contains("open"))
      return !1;
    this.animationInProcess = !0, this.el.classList.remove("open"), (e = this == null ? void 0 : this.el) != null && e.ariaExpanded && (this.el.ariaExpanded = "false"), this.content.style.height = `${this.content.scrollHeight}px`, setTimeout(() => {
      this.content.style.height = "0";
    }), this.content.classList.remove("open"), R(this.content, () => {
      this.content.classList.add("hidden"), this.content.style.height = "", this.fireEvent("hide", this.el), w("hide.hs.collapse", this.el, this.el), this.animationInProcess = !1;
    }), this.content.querySelectorAll(".hs-mega-menu-content.block").length && this.hideAllMegaMenuItems();
  }
  // Static methods
  static getInstance(e, t = !1) {
    const s = window.$hsCollapseCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    window.$hsCollapseCollection || (window.$hsCollapseCollection = []), document.querySelectorAll(".hs-collapse-toggle:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsCollapseCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Le(e);
    });
  }
  static show(e) {
    const t = window.$hsCollapseCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && t.element.content.classList.contains("hidden") && t.element.show();
  }
  static hide(e) {
    const t = window.$hsCollapseCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && !t.element.content.classList.contains("hidden") && t.element.hide();
  }
  // Backward compatibility
  static on(e, t, s) {
    const n = window.$hsCollapseCollection.find(
      (i) => i.element.el === (typeof t == "string" ? document.querySelector(t) : t)
    );
    n && (n.element.events[e] = s);
  }
}
window.addEventListener("load", () => {
  Le.autoInit();
});
typeof window < "u" && (window.HSCollapse = Le);
/*
 * HSComboBox
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class j extends I {
  constructor(e, t, s) {
    super(e, t, s);
    const n = e.getAttribute("data-hs-combo-box"), o = {
      ...n ? JSON.parse(n) : {},
      ...t
    };
    this.gap = 5, this.viewport = (typeof (o == null ? void 0 : o.viewport) == "string" ? document.querySelector(o == null ? void 0 : o.viewport) : o == null ? void 0 : o.viewport) ?? null, this.preventVisibility = (o == null ? void 0 : o.preventVisibility) ?? !1, this.apiUrl = (o == null ? void 0 : o.apiUrl) ?? null, this.apiDataPart = (o == null ? void 0 : o.apiDataPart) ?? null, this.apiQuery = (o == null ? void 0 : o.apiQuery) ?? null, this.apiSearchQuery = (o == null ? void 0 : o.apiSearchQuery) ?? null, this.apiHeaders = (o == null ? void 0 : o.apiHeaders) ?? {}, this.apiGroupField = (o == null ? void 0 : o.apiGroupField) ?? null, this.outputItemTemplate = (o == null ? void 0 : o.outputItemTemplate) ?? `<div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" data-hs-combo-box-output-item>
				<div class="flex justify-between items-center w-full">
					<span data-hs-combo-box-search-text></span>
					<span class="hidden hs-combo-box-selected:block">
						<svg class="shrink-0 size-3.5 text-blue-600 dark:text-blue-500" xmlns="http:.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					</span>
				</div>
			</div>`, this.outputEmptyTemplate = (o == null ? void 0 : o.outputEmptyTemplate) ?? '<div class="py-2 px-4 w-full text-sm text-gray-800 rounded-lg dark:bg-neutral-900 dark:text-neutral-200">Nothing found...</div>', this.outputLoaderTemplate = (o == null ? void 0 : o.outputLoaderTemplate) ?? `<div class="flex justify-center items-center py-2 px-4 text-sm text-gray-800 rounded-lg bg-white dark:bg-neutral-900 dark:text-neutral-200">
				<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
					<span class="sr-only">Loading...</span>
				</div>
			</div>`, this.groupingType = (o == null ? void 0 : o.groupingType) ?? null, this.groupingTitleTemplate = (o == null ? void 0 : o.groupingTitleTemplate) ?? (this.groupingType === "default" ? '<div class="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500"></div>' : '<button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold whitespace-nowrap rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"></button>'), this.tabsWrapperTemplate = (o == null ? void 0 : o.tabsWrapperTemplate) ?? '<div class="overflow-x-auto p-4"></div>', this.preventSelection = (o == null ? void 0 : o.preventSelection) ?? !1, this.preventAutoPosition = (o == null ? void 0 : o.preventAutoPosition) ?? !1, this.isOpenOnFocus = (o == null ? void 0 : o.isOpenOnFocus) ?? !1, this.input = this.el.querySelector("[data-hs-combo-box-input]") ?? null, this.output = this.el.querySelector("[data-hs-combo-box-output]") ?? null, this.itemsWrapper = this.el.querySelector("[data-hs-combo-box-output-items-wrapper]") ?? null, this.items = Array.from(this.el.querySelectorAll("[data-hs-combo-box-output-item]")) ?? [], this.tabs = [], this.toggle = this.el.querySelector("[data-hs-combo-box-toggle]") ?? null, this.toggleClose = this.el.querySelector("[data-hs-combo-box-close]") ?? null, this.toggleOpen = this.el.querySelector("[data-hs-combo-box-open]") ?? null, this.outputPlaceholder = null, this.selected = this.value = this.el.querySelector("[data-hs-combo-box-input]").value ?? "", this.isOpened = !1, this.isCurrent = !1, this.animationInProcess = !1, this.selectedGroup = "all", this.init();
  }
  init() {
    this.createCollection(window.$hsComboBoxCollection, this), this.build();
  }
  build() {
    this.buildInput(), this.groupingType && this.setGroups(), this.buildItems(), this.preventVisibility && (this.preventAutoPosition || this.recalculateDirection()), this.toggle && this.buildToggle(), this.toggleClose && this.buildToggleClose(), this.toggleOpen && this.buildToggleOpen();
  }
  setResultAndRender(e = "") {
    let t = this.preventVisibility ? this.input.value : e;
    this.setResults(t), this.apiSearchQuery && this.itemsFromJson();
  }
  buildInput() {
    this.isOpenOnFocus && this.input.addEventListener("focus", () => {
      this.isOpened || (this.setResultAndRender(), this.open());
    }), this.input.addEventListener(
      "input",
      Ce((e) => {
        this.setResultAndRender(e.target.value), this.input.value !== "" ? this.el.classList.add("has-value") : this.el.classList.remove("has-value"), this.isOpened || this.open();
      })
    );
  }
  buildItems() {
    this.output.role = "listbox", this.output.tabIndex = -1, this.output.ariaOrientation = "vertical", this.apiUrl ? this.itemsFromJson() : (this.itemsWrapper ? this.itemsWrapper.innerHTML = "" : this.output.innerHTML = "", this.itemsFromHtml());
  }
  setResults(e) {
    this.value = e, this.resultItems(), this.hasVisibleItems() ? this.destroyOutputPlaceholder() : this.buildOutputPlaceholder();
  }
  isItemExists(e) {
    return this.items.some((t) => {
      var o;
      const s = t.getAttribute("data-hs-combo-box-output-item-group-field") ?? null, n = JSON.parse(t.getAttribute("data-hs-combo-box-output-item")) ?? null;
      let i = null;
      return s && ((o = n == null ? void 0 : n.group) != null && o.name) && (i = e[s]), Array.from(
        t.querySelectorAll("[data-hs-combo-box-search-text]")
      ).some((r) => {
        var d;
        return (d = n == null ? void 0 : n.group) != null && d.name && i ? i === n.group.name && r.getAttribute("data-hs-combo-box-search-text") === e[r.getAttribute("data-hs-combo-box-output-item-field")] : r.getAttribute("data-hs-combo-box-search-text") === e[r.getAttribute("data-hs-combo-box-output-item-field")];
      });
    });
  }
  isTextExists(e, t) {
    const s = t.map((n) => n.toLowerCase());
    return Array.from(
      e.querySelectorAll("[data-hs-combo-box-search-text]")
    ).some(
      (n) => s.includes(
        n.getAttribute("data-hs-combo-box-search-text").toLowerCase()
      )
    );
  }
  isTextExistsAny(e, t) {
    return Array.from(
      e.querySelectorAll("[data-hs-combo-box-search-text]")
    ).some(
      (s) => s.getAttribute("data-hs-combo-box-search-text").toLowerCase().includes(t.toLowerCase())
    );
  }
  valuesBySelector(e) {
    return Array.from(
      e.querySelectorAll("[data-hs-combo-box-search-text]")
    ).reduce(
      (t, s) => [
        ...t,
        s.getAttribute("data-hs-combo-box-search-text")
      ],
      []
    );
  }
  buildOutputLoader() {
    if (this.outputLoader)
      return !1;
    this.outputLoader = y(this.outputLoaderTemplate), this.items.length || this.outputPlaceholder ? (this.outputLoader.style.position = "absolute", this.outputLoader.style.top = "0", this.outputLoader.style.bottom = "0", this.outputLoader.style.left = "0", this.outputLoader.style.right = "0", this.outputLoader.style.zIndex = "2") : (this.outputLoader.style.position = "", this.outputLoader.style.top = "", this.outputLoader.style.bottom = "", this.outputLoader.style.left = "", this.outputLoader.style.right = "", this.outputLoader.style.zIndex = "", this.outputLoader.style.height = "30px"), this.output.append(this.outputLoader);
  }
  destroyOutputLoader() {
    this.outputLoader && this.outputLoader.remove(), this.outputLoader = null;
  }
  async itemsFromJson() {
    this.buildOutputLoader();
    try {
      const e = `${this.apiQuery}`, t = `${this.apiSearchQuery}=${this.value.toLowerCase()}`;
      let s = this.apiUrl;
      this.apiQuery && this.apiSearchQuery ? s += `?${t}&${e}` : this.apiQuery ? s += `?${e}` : this.apiSearchQuery && (s += `?${t}`);
      let i = await (await fetch(s, this.apiHeaders)).json();
      this.apiDataPart && (i = i[this.apiDataPart]), this.apiSearchQuery && (this.items = []), this.itemsWrapper ? this.itemsWrapper.innerHTML = "" : this.output.innerHTML = "", this.groupingType === "tabs" ? (this.setApiGroups(i), this.groupTabsRender(), this.jsonItemsRender(i)) : this.groupingType === "default" ? (this.setApiGroups(i), this.groups.forEach((o) => {
        const r = y(this.groupingTitleTemplate);
        r.setAttribute("data-hs-combo-box-group-title", o.name), r.classList.add("--exclude-accessibility"), r.innerText = o.title;
        const a = i.filter(
          (d) => d[this.apiGroupField] === o.name
        );
        this.itemsWrapper ? this.itemsWrapper.append(r) : this.output.append(r), this.jsonItemsRender(a);
      })) : this.jsonItemsRender(i), this.setResults(this.input.value);
    } catch (e) {
      console.error(e);
    }
    this.destroyOutputLoader();
  }
  jsonItemsRender(e) {
    e.forEach((t, s) => {
      const n = y(this.outputItemTemplate);
      n.querySelectorAll("[data-hs-combo-box-output-item-field]").forEach((i) => {
        const o = t[i.getAttribute("data-hs-combo-box-output-item-field")], r = i.hasAttribute(
          "data-hs-combo-box-output-item-hide-if-empty"
        );
        i.textContent = o ?? "", !o && r && (i.style.display = "none");
      }), n.querySelectorAll("[data-hs-combo-box-search-text]").forEach((i) => {
        i.setAttribute(
          "data-hs-combo-box-search-text",
          t[i.getAttribute("data-hs-combo-box-output-item-field")] ?? ""
        );
      }), n.querySelectorAll("[data-hs-combo-box-output-item-attr]").forEach((i) => {
        JSON.parse(
          i.getAttribute("data-hs-combo-box-output-item-attr")
        ).forEach((r) => {
          i.setAttribute(r.attr, t[r.valueFrom]);
        });
      }), n.setAttribute("tabIndex", `${s}`), (this.groupingType === "tabs" || this.groupingType === "default") && n.setAttribute(
        "data-hs-combo-box-output-item",
        `{"group": {"name": "${t[this.apiGroupField]}", "title": "${t[this.apiGroupField]}"}}`
      ), this.items = [...this.items, n], this.preventSelection || n.addEventListener("click", () => {
        this.close(
          n.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text")
        ), this.setSelectedByValue(this.valuesBySelector(n));
      }), this.appendItemsToWrapper(n);
    });
  }
  setGroups() {
    const e = [];
    this.items.forEach((t) => {
      const { group: s } = JSON.parse(
        t.getAttribute("data-hs-combo-box-output-item")
      );
      e.some((n) => (n == null ? void 0 : n.name) === s.name) || e.push(s);
    }), this.groups = e;
  }
  setCurrent() {
    window.$hsComboBoxCollection.length && (window.$hsComboBoxCollection.map((e) => e.element.isCurrent = !1), this.isCurrent = !0);
  }
  setApiGroups(e) {
    const t = [];
    e.forEach((s) => {
      const n = s[this.apiGroupField];
      t.some((i) => i.name === n) || t.push({
        name: n,
        title: n
      });
    }), this.groups = t;
  }
  sortItems() {
    const e = (t, s) => {
      const n = t.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text"), i = s.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
      return n < i ? -1 : n > i ? 1 : 0;
    };
    return this.items.sort(e);
  }
  itemRender(e) {
    const t = e.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
    this.itemsWrapper ? this.itemsWrapper.append(e) : this.output.append(e), this.preventSelection || e.addEventListener("click", () => {
      this.close(t), this.setSelectedByValue(this.valuesBySelector(e));
    });
  }
  plainRender(e) {
    e.forEach((t) => {
      this.itemRender(t);
    });
  }
  groupTabsRender() {
    const e = y(this.tabsWrapperTemplate), t = y(
      '<div class="flex flex-nowrap gap-x-2"></div>'
    );
    e.append(t), this.output.insertBefore(e, this.output.firstChild);
    const s = y(this.groupingTitleTemplate);
    s.setAttribute("data-hs-combo-box-group-title", "all"), s.classList.add("--exclude-accessibility", "active"), s.innerText = "All", this.tabs = [...this.tabs, s], t.append(s), s.addEventListener("click", () => {
      this.selectedGroup = "all";
      const n = this.tabs.find(
        (i) => i.getAttribute("data-hs-combo-box-group-title") === this.selectedGroup
      );
      this.tabs.forEach((i) => i.classList.remove("active")), n.classList.add("active"), this.setItemsVisibility();
    }), this.groups.forEach((n) => {
      const i = y(this.groupingTitleTemplate);
      i.setAttribute("data-hs-combo-box-group-title", n.name), i.classList.add("--exclude-accessibility"), i.innerText = n.title, this.tabs = [...this.tabs, i], t.append(i), i.addEventListener("click", () => {
        this.selectedGroup = n.name;
        const o = this.tabs.find(
          (r) => r.getAttribute("data-hs-combo-box-group-title") === this.selectedGroup
        );
        this.tabs.forEach((r) => r.classList.remove("active")), o.classList.add("active"), this.setItemsVisibility();
      });
    });
  }
  groupDefaultRender() {
    this.groups.forEach((e) => {
      const t = y(this.groupingTitleTemplate);
      t.setAttribute("data-hs-combo-box-group-title", e.name), t.classList.add("--exclude-accessibility"), t.innerText = e.title, this.itemsWrapper ? this.itemsWrapper.append(t) : this.output.append(t);
      const s = this.sortItems().filter((n) => {
        const { group: i } = JSON.parse(
          n.getAttribute("data-hs-combo-box-output-item")
        );
        return i.name === e.name;
      });
      this.plainRender(s);
    });
  }
  itemsFromHtml() {
    if (this.groupingType === "default")
      this.groupDefaultRender();
    else if (this.groupingType === "tabs") {
      const e = this.sortItems();
      this.groupTabsRender(), this.plainRender(e);
    } else {
      const e = this.sortItems();
      this.plainRender(e);
    }
    this.setResults(this.input.value);
  }
  buildToggle() {
    var e, t, s, n;
    this.isOpened ? ((e = this == null ? void 0 : this.toggle) != null && e.ariaExpanded && (this.toggle.ariaExpanded = "true"), (t = this == null ? void 0 : this.input) != null && t.ariaExpanded && (this.input.ariaExpanded = "true")) : ((s = this == null ? void 0 : this.toggle) != null && s.ariaExpanded && (this.toggle.ariaExpanded = "false"), (n = this == null ? void 0 : this.input) != null && n.ariaExpanded && (this.input.ariaExpanded = "false")), this.toggle.addEventListener("click", () => {
      this.isOpened ? this.close() : this.open(this.toggle.getAttribute("data-hs-combo-box-toggle"));
    });
  }
  buildToggleClose() {
    this.toggleClose.addEventListener("click", () => this.close());
  }
  buildToggleOpen() {
    this.toggleOpen.addEventListener("click", () => this.open());
  }
  setSelectedByValue(e) {
    this.items.forEach((t) => {
      this.isTextExists(t, e) ? t.classList.add("selected") : t.classList.remove("selected");
    });
  }
  setValue(e) {
    this.selected = e, this.value = e, this.input.value = e, this.fireEvent("select", this.el), w("select.hs.combobox", this.el, this.value);
  }
  setItemsVisibility() {
    this.groupingType === "tabs" && this.selectedGroup !== "all" && this.items.forEach((t) => {
      t.style.display = "none";
    });
    const e = this.groupingType === "tabs" ? this.selectedGroup === "all" ? this.items : this.items.filter((t) => {
      const { group: s } = JSON.parse(
        t.getAttribute("data-hs-combo-box-output-item")
      );
      return s.name === this.selectedGroup;
    }) : this.items;
    this.groupingType === "tabs" && this.selectedGroup !== "all" && e.forEach((t) => {
      t.style.display = "block";
    }), e.forEach((t) => {
      this.isTextExistsAny(t, this.value) ? t.style.display = "block" : t.style.display = "none";
    }), this.groupingType === "default" && this.output.querySelectorAll("[data-hs-combo-box-group-title]").forEach((t) => {
      const s = t.getAttribute("data-hs-combo-box-group-title");
      this.items.filter((i) => {
        const { group: o } = JSON.parse(
          i.getAttribute("data-hs-combo-box-output-item")
        );
        return o.name === s && i.style.display === "block";
      }).length ? t.style.display = "block" : t.style.display = "none";
    });
  }
  hasVisibleItems() {
    return this.items.length ? this.items.some((e) => e.style.display === "block") : !1;
  }
  appendItemsToWrapper(e) {
    this.itemsWrapper ? this.itemsWrapper.append(e) : this.output.append(e);
  }
  buildOutputPlaceholder() {
    this.outputPlaceholder || (this.outputPlaceholder = y(this.outputEmptyTemplate)), this.appendItemsToWrapper(this.outputPlaceholder);
  }
  destroyOutputPlaceholder() {
    this.outputPlaceholder && this.outputPlaceholder.remove(), this.outputPlaceholder = null;
  }
  resultItems() {
    if (!this.items.length)
      return !1;
    this.setItemsVisibility(), this.setSelectedByValue([this.selected]);
  }
  // Public methods
  setValueAndOpen(e) {
    this.value = e, this.items.length && this.setItemsVisibility();
  }
  open(e) {
    if (this.animationInProcess || (typeof e < "u" && this.setValueAndOpen(e), this.preventVisibility))
      return !1;
    this.animationInProcess = !0, this.output.style.display = "block", this.preventAutoPosition || this.recalculateDirection(), setTimeout(() => {
      var t, s;
      (t = this == null ? void 0 : this.input) != null && t.ariaExpanded && (this.input.ariaExpanded = "true"), (s = this == null ? void 0 : this.toggle) != null && s.ariaExpanded && (this.toggle.ariaExpanded = "true"), this.el.classList.add("active"), this.animationInProcess = !1;
    }), this.isOpened = !0;
  }
  setValueAndClear(e) {
    e ? this.setValue(e) : this.setValue(this.selected), this.outputPlaceholder && this.destroyOutputPlaceholder();
  }
  close(e) {
    var t, s;
    if (this.animationInProcess)
      return !1;
    if (this.preventVisibility)
      return this.setValueAndClear(e), this.input.value !== "" ? this.el.classList.add("has-value") : this.el.classList.remove("has-value"), !1;
    this.animationInProcess = !0, (t = this == null ? void 0 : this.input) != null && t.ariaExpanded && (this.input.ariaExpanded = "false"), (s = this == null ? void 0 : this.toggle) != null && s.ariaExpanded && (this.toggle.ariaExpanded = "false"), this.el.classList.remove("active"), this.preventAutoPosition || (this.output.classList.remove("bottom-full", "top-full"), this.output.style.marginTop = "", this.output.style.marginBottom = ""), R(this.output, () => {
      this.output.style.display = "none", this.setValueAndClear(e), this.animationInProcess = !1;
    }), this.input.value !== "" ? this.el.classList.add("has-value") : this.el.classList.remove("has-value"), this.isOpened = !1;
  }
  recalculateDirection() {
    lt(
      this.output,
      this.input,
      "bottom",
      this.gap,
      this.viewport
    ) ? (this.output.classList.remove("bottom-full"), this.output.style.marginBottom = "", this.output.classList.add("top-full"), this.output.style.marginTop = `${this.gap}px`) : (this.output.classList.remove("top-full"), this.output.style.marginTop = "", this.output.classList.add("bottom-full"), this.output.style.marginBottom = `${this.gap}px`);
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsComboBoxCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsComboBoxCollection || (window.$hsComboBoxCollection = []), document.querySelectorAll("[data-hs-combo-box]:not(.--prevent-on-load-init)").forEach((e) => {
      if (!window.$hsComboBoxCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      )) {
        const t = e.getAttribute("data-hs-combo-box"), s = t ? JSON.parse(t) : {};
        new j(e, s);
      }
    }), window.$hsComboBoxCollection && (window.addEventListener("click", (e) => {
      const t = e.target;
      j.closeCurrentlyOpened(t);
    }), document.addEventListener(
      "keydown",
      (e) => j.accessibility(e)
    ));
  }
  static close(e) {
    const t = window.$hsComboBoxCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && t.element.isOpened && t.element.close();
  }
  static closeCurrentlyOpened(e = null) {
    if (!e.closest("[data-hs-combo-box].active")) {
      const t = window.$hsComboBoxCollection.filter((s) => s.element.isOpened) || null;
      t && t.forEach((s) => {
        s.element.close();
      });
    }
  }
  // Accessibility methods
  static getPreparedItems(e = !1, t) {
    return t ? (e ? Array.from(
      t.querySelectorAll(":scope > *:not(.--exclude-accessibility)")
    ).filter((i) => i.style.display !== "none").reverse() : Array.from(
      t.querySelectorAll(":scope > *:not(.--exclude-accessibility)")
    ).filter((i) => i.style.display !== "none")).filter(
      (i) => !i.classList.contains("disabled")
    ) : null;
  }
  static setHighlighted(e, t, s) {
    t.focus(), s.value = t.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text"), e && e.classList.remove("hs-combo-box-output-item-highlighted"), t.classList.add("hs-combo-box-output-item-highlighted");
  }
  static accessibility(e) {
    if (window.$hsComboBoxCollection.find(
      (s) => s.element.preventVisibility ? s.element.isCurrent : s.element.isOpened
    ) && as.includes(e.code) && !e.metaKey)
      switch (e.code) {
        case "Escape":
          e.preventDefault(), this.onEscape();
          break;
        case "ArrowUp":
          e.preventDefault(), e.stopImmediatePropagation(), this.onArrow();
          break;
        case "ArrowDown":
          e.preventDefault(), e.stopImmediatePropagation(), this.onArrow(!1);
          break;
        case "Home":
          e.preventDefault(), e.stopImmediatePropagation(), this.onStartEnd();
          break;
        case "End":
          e.preventDefault(), e.stopImmediatePropagation(), this.onStartEnd(!1);
          break;
        case "Enter":
          e.preventDefault(), this.onEnter(e);
          break;
      }
  }
  static onEscape() {
    const e = window.$hsComboBoxCollection.find(
      (t) => !t.element.preventVisibility && t.element.isOpened
    );
    e && (e.element.close(), e.element.input.blur());
  }
  static onArrow(e = !0) {
    const t = window.$hsComboBoxCollection.find(
      (s) => s.element.preventVisibility ? s.element.isCurrent : s.element.isOpened
    );
    if (t) {
      const s = t.element.itemsWrapper ?? t.element.output;
      if (!s)
        return !1;
      const n = j.getPreparedItems(e, s), i = s.querySelector(
        ".hs-combo-box-output-item-highlighted"
      );
      let o = null;
      i || n[0].classList.add("hs-combo-box-output-item-highlighted");
      let r = n.findIndex((a) => a === i);
      r + 1 < n.length && r++, o = n[r], j.setHighlighted(i, o, t.element.input);
    }
  }
  static onStartEnd(e = !0) {
    const t = window.$hsComboBoxCollection.find(
      (s) => s.element.preventVisibility ? s.element.isCurrent : s.element.isOpened
    );
    if (t) {
      const s = t.element.itemsWrapper ?? t.element.output;
      if (!s)
        return !1;
      const n = j.getPreparedItems(e, s), i = s.querySelector(
        ".hs-combo-box-output-item-highlighted"
      );
      n.length && j.setHighlighted(
        i,
        n[0],
        t.element.input
      );
    }
  }
  static onEnter(e) {
    const t = e.target, s = window.$hsComboBoxCollection.find(
      (i) => !rt(i.element.el) && e.target.closest("[data-hs-combo-box]") === i.element.el
    ), n = s.element.el.querySelector(
      ".hs-combo-box-output-item-highlighted a"
    );
    t.hasAttribute("data-hs-combo-box-input") ? (s.element.close(), t.blur()) : (s.element.preventSelection || s.element.setSelectedByValue(
      s.element.valuesBySelector(e.target)
    ), s.element.preventSelection && n && window.location.assign(n.getAttribute("href")), s.element.close(
      s.element.preventSelection ? null : e.target.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text")
    ));
  }
}
window.addEventListener("load", () => {
  j.autoInit();
});
document.addEventListener("scroll", () => {
  if (!window.$hsComboBoxCollection)
    return !1;
  const l = window.$hsComboBoxCollection.find((e) => e.element.isOpened);
  l && !l.element.preventAutoPosition && l.element.recalculateDirection();
});
typeof window < "u" && (window.HSComboBox = j);
var D = "top", V = "bottom", F = "right", O = "left", ht = "auto", Ae = [D, V, F, O], he = "start", Ie = "end", hs = "clippingParents", Ot = "viewport", we = "popper", ds = "reference", Et = /* @__PURE__ */ Ae.reduce(function(l, e) {
  return l.concat([e + "-" + he, e + "-" + Ie]);
}, []), Nt = /* @__PURE__ */ [].concat(Ae, [ht]).reduce(function(l, e) {
  return l.concat([e, e + "-" + he, e + "-" + Ie]);
}, []), cs = "beforeRead", us = "read", ps = "afterRead", fs = "beforeMain", ms = "main", gs = "afterMain", vs = "beforeWrite", ys = "write", ws = "afterWrite", bs = [cs, us, ps, fs, ms, gs, vs, ys, ws];
function Q(l) {
  return l ? (l.nodeName || "").toLowerCase() : null;
}
function M(l) {
  if (l == null)
    return window;
  if (l.toString() !== "[object Window]") {
    var e = l.ownerDocument;
    return e && e.defaultView || window;
  }
  return l;
}
function le(l) {
  var e = M(l).Element;
  return l instanceof e || l instanceof Element;
}
function H(l) {
  var e = M(l).HTMLElement;
  return l instanceof e || l instanceof HTMLElement;
}
function dt(l) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = M(l).ShadowRoot;
  return l instanceof e || l instanceof ShadowRoot;
}
function Ss(l) {
  var e = l.state;
  Object.keys(e.elements).forEach(function(t) {
    var s = e.styles[t] || {}, n = e.attributes[t] || {}, i = e.elements[t];
    !H(i) || !Q(i) || (Object.assign(i.style, s), Object.keys(n).forEach(function(o) {
      var r = n[o];
      r === !1 ? i.removeAttribute(o) : i.setAttribute(o, r === !0 ? "" : r);
    }));
  });
}
function Cs(l) {
  var e = l.state, t = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, t.popper), e.styles = t, e.elements.arrow && Object.assign(e.elements.arrow.style, t.arrow), function() {
    Object.keys(e.elements).forEach(function(s) {
      var n = e.elements[s], i = e.attributes[s] || {}, o = Object.keys(e.styles.hasOwnProperty(s) ? e.styles[s] : t[s]), r = o.reduce(function(a, d) {
        return a[d] = "", a;
      }, {});
      !H(n) || !Q(n) || (Object.assign(n.style, r), Object.keys(i).forEach(function(a) {
        n.removeAttribute(a);
      }));
    });
  };
}
const Is = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ss,
  effect: Cs,
  requires: ["computeStyles"]
};
function z(l) {
  return l.split("-")[0];
}
var ne = Math.max, Ke = Math.min, de = Math.round;
function nt() {
  var l = navigator.userAgentData;
  return l != null && l.brands && Array.isArray(l.brands) ? l.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Mt() {
  return !/^((?!chrome|android).)*safari/i.test(nt());
}
function ce(l, e, t) {
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  var s = l.getBoundingClientRect(), n = 1, i = 1;
  e && H(l) && (n = l.offsetWidth > 0 && de(s.width) / l.offsetWidth || 1, i = l.offsetHeight > 0 && de(s.height) / l.offsetHeight || 1);
  var o = le(l) ? M(l) : window, r = o.visualViewport, a = !Mt() && t, d = (s.left + (a && r ? r.offsetLeft : 0)) / n, h = (s.top + (a && r ? r.offsetTop : 0)) / i, p = s.width / n, c = s.height / i;
  return {
    width: p,
    height: c,
    top: h,
    right: d + p,
    bottom: h + c,
    left: d,
    x: d,
    y: h
  };
}
function ct(l) {
  var e = ce(l), t = l.offsetWidth, s = l.offsetHeight;
  return Math.abs(e.width - t) <= 1 && (t = e.width), Math.abs(e.height - s) <= 1 && (s = e.height), {
    x: l.offsetLeft,
    y: l.offsetTop,
    width: t,
    height: s
  };
}
function Ht(l, e) {
  var t = e.getRootNode && e.getRootNode();
  if (l.contains(e))
    return !0;
  if (t && dt(t)) {
    var s = e;
    do {
      if (s && l.isSameNode(s))
        return !0;
      s = s.parentNode || s.host;
    } while (s);
  }
  return !1;
}
function X(l) {
  return M(l).getComputedStyle(l);
}
function xs(l) {
  return ["table", "td", "th"].indexOf(Q(l)) >= 0;
}
function K(l) {
  return ((le(l) ? l.ownerDocument : (
    // $FlowFixMe[prop-missing]
    l.document
  )) || window.document).documentElement;
}
function Ye(l) {
  return Q(l) === "html" ? l : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    l.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    l.parentNode || // DOM Element detected
    (dt(l) ? l.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    K(l)
  );
}
function Lt(l) {
  return !H(l) || // https://github.com/popperjs/popper-core/issues/837
  X(l).position === "fixed" ? null : l.offsetParent;
}
function Ts(l) {
  var e = /firefox/i.test(nt()), t = /Trident/i.test(nt());
  if (t && H(l)) {
    var s = X(l);
    if (s.position === "fixed")
      return null;
  }
  var n = Ye(l);
  for (dt(n) && (n = n.host); H(n) && ["html", "body"].indexOf(Q(n)) < 0; ) {
    var i = X(n);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function ke(l) {
  for (var e = M(l), t = Lt(l); t && xs(t) && X(t).position === "static"; )
    t = Lt(t);
  return t && (Q(t) === "html" || Q(t) === "body" && X(t).position === "static") ? e : t || Ts(l) || e;
}
function ut(l) {
  return ["top", "bottom"].indexOf(l) >= 0 ? "x" : "y";
}
function be(l, e, t) {
  return ne(l, Ke(e, t));
}
function Es(l, e, t) {
  var s = be(l, e, t);
  return s > t ? t : s;
}
function Rt() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Vt(l) {
  return Object.assign({}, Rt(), l);
}
function Ft(l, e) {
  return e.reduce(function(t, s) {
    return t[s] = l, t;
  }, {});
}
var Ls = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, {
    placement: t.placement
  })) : e, Vt(typeof e != "number" ? e : Ft(e, Ae));
};
function As(l) {
  var e, t = l.state, s = l.name, n = l.options, i = t.elements.arrow, o = t.modifiersData.popperOffsets, r = z(t.placement), a = ut(r), d = [O, F].indexOf(r) >= 0, h = d ? "height" : "width";
  if (!(!i || !o)) {
    var p = Ls(n.padding, t), c = ct(i), u = a === "y" ? D : O, g = a === "y" ? V : F, v = t.rects.reference[h] + t.rects.reference[a] - o[a] - t.rects.popper[h], m = o[a] - t.rects.reference[a], b = ke(i), x = b ? a === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, T = v / 2 - m / 2, f = p[u], S = x - c[h] - p[g], C = x / 2 - c[h] / 2 + T, L = be(f, C, S), $ = a;
    t.modifiersData[s] = (e = {}, e[$] = L, e.centerOffset = L - C, e);
  }
}
function ks(l) {
  var e = l.state, t = l.options, s = t.element, n = s === void 0 ? "[data-popper-arrow]" : s;
  n != null && (typeof n == "string" && (n = e.elements.popper.querySelector(n), !n) || Ht(e.elements.popper, n) && (e.elements.arrow = n));
}
const $s = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: As,
  effect: ks,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ue(l) {
  return l.split("-")[1];
}
var Ps = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function qs(l, e) {
  var t = l.x, s = l.y, n = e.devicePixelRatio || 1;
  return {
    x: de(t * n) / n || 0,
    y: de(s * n) / n || 0
  };
}
function At(l) {
  var e, t = l.popper, s = l.popperRect, n = l.placement, i = l.variation, o = l.offsets, r = l.position, a = l.gpuAcceleration, d = l.adaptive, h = l.roundOffsets, p = l.isFixed, c = o.x, u = c === void 0 ? 0 : c, g = o.y, v = g === void 0 ? 0 : g, m = typeof h == "function" ? h({
    x: u,
    y: v
  }) : {
    x: u,
    y: v
  };
  u = m.x, v = m.y;
  var b = o.hasOwnProperty("x"), x = o.hasOwnProperty("y"), T = O, f = D, S = window;
  if (d) {
    var C = ke(t), L = "clientHeight", $ = "clientWidth";
    if (C === M(t) && (C = K(t), X(C).position !== "static" && r === "absolute" && (L = "scrollHeight", $ = "scrollWidth")), C = C, n === D || (n === O || n === F) && i === Ie) {
      f = V;
      var k = p && C === S && S.visualViewport ? S.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[L]
      );
      v -= k - s.height, v *= a ? 1 : -1;
    }
    if (n === O || (n === D || n === V) && i === Ie) {
      T = F;
      var A = p && C === S && S.visualViewport ? S.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[$]
      );
      u -= A - s.width, u *= a ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: r
  }, d && Ps), W = h === !0 ? qs({
    x: u,
    y: v
  }, M(t)) : {
    x: u,
    y: v
  };
  if (u = W.x, v = W.y, a) {
    var q;
    return Object.assign({}, P, (q = {}, q[f] = x ? "0" : "", q[T] = b ? "0" : "", q.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + u + "px, " + v + "px)" : "translate3d(" + u + "px, " + v + "px, 0)", q));
  }
  return Object.assign({}, P, (e = {}, e[f] = x ? v + "px" : "", e[T] = b ? u + "px" : "", e.transform = "", e));
}
function Bs(l) {
  var e = l.state, t = l.options, s = t.gpuAcceleration, n = s === void 0 ? !0 : s, i = t.adaptive, o = i === void 0 ? !0 : i, r = t.roundOffsets, a = r === void 0 ? !0 : r, d = {
    placement: z(e.placement),
    variation: ue(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: n,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, At(Object.assign({}, d, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: o,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, At(Object.assign({}, d, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Ds = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Bs,
  data: {}
};
var Xe = {
  passive: !0
};
function Os(l) {
  var e = l.state, t = l.instance, s = l.options, n = s.scroll, i = n === void 0 ? !0 : n, o = s.resize, r = o === void 0 ? !0 : o, a = M(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && d.forEach(function(h) {
    h.addEventListener("scroll", t.update, Xe);
  }), r && a.addEventListener("resize", t.update, Xe), function() {
    i && d.forEach(function(h) {
      h.removeEventListener("scroll", t.update, Xe);
    }), r && a.removeEventListener("resize", t.update, Xe);
  };
}
const Ns = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Os,
  data: {}
};
var Ms = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ze(l) {
  return l.replace(/left|right|bottom|top/g, function(e) {
    return Ms[e];
  });
}
var Hs = {
  start: "end",
  end: "start"
};
function kt(l) {
  return l.replace(/start|end/g, function(e) {
    return Hs[e];
  });
}
function pt(l) {
  var e = M(l), t = e.pageXOffset, s = e.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: s
  };
}
function ft(l) {
  return ce(K(l)).left + pt(l).scrollLeft;
}
function Rs(l, e) {
  var t = M(l), s = K(l), n = t.visualViewport, i = s.clientWidth, o = s.clientHeight, r = 0, a = 0;
  if (n) {
    i = n.width, o = n.height;
    var d = Mt();
    (d || !d && e === "fixed") && (r = n.offsetLeft, a = n.offsetTop);
  }
  return {
    width: i,
    height: o,
    x: r + ft(l),
    y: a
  };
}
function Vs(l) {
  var e, t = K(l), s = pt(l), n = (e = l.ownerDocument) == null ? void 0 : e.body, i = ne(t.scrollWidth, t.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), o = ne(t.scrollHeight, t.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), r = -s.scrollLeft + ft(l), a = -s.scrollTop;
  return X(n || t).direction === "rtl" && (r += ne(t.clientWidth, n ? n.clientWidth : 0) - i), {
    width: i,
    height: o,
    x: r,
    y: a
  };
}
function mt(l) {
  var e = X(l), t = e.overflow, s = e.overflowX, n = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + n + s);
}
function Wt(l) {
  return ["html", "body", "#document"].indexOf(Q(l)) >= 0 ? l.ownerDocument.body : H(l) && mt(l) ? l : Wt(Ye(l));
}
function Se(l, e) {
  var t;
  e === void 0 && (e = []);
  var s = Wt(l), n = s === ((t = l.ownerDocument) == null ? void 0 : t.body), i = M(s), o = n ? [i].concat(i.visualViewport || [], mt(s) ? s : []) : s, r = e.concat(o);
  return n ? r : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    r.concat(Se(Ye(o)))
  );
}
function ot(l) {
  return Object.assign({}, l, {
    left: l.x,
    top: l.y,
    right: l.x + l.width,
    bottom: l.y + l.height
  });
}
function Fs(l, e) {
  var t = ce(l, !1, e === "fixed");
  return t.top = t.top + l.clientTop, t.left = t.left + l.clientLeft, t.bottom = t.top + l.clientHeight, t.right = t.left + l.clientWidth, t.width = l.clientWidth, t.height = l.clientHeight, t.x = t.left, t.y = t.top, t;
}
function $t(l, e, t) {
  return e === Ot ? ot(Rs(l, t)) : le(e) ? Fs(e, t) : ot(Vs(K(l)));
}
function Ws(l) {
  var e = Se(Ye(l)), t = ["absolute", "fixed"].indexOf(X(l).position) >= 0, s = t && H(l) ? ke(l) : l;
  return le(s) ? e.filter(function(n) {
    return le(n) && Ht(n, s) && Q(n) !== "body";
  }) : [];
}
function Us(l, e, t, s) {
  var n = e === "clippingParents" ? Ws(l) : [].concat(e), i = [].concat(n, [t]), o = i[0], r = i.reduce(function(a, d) {
    var h = $t(l, d, s);
    return a.top = ne(h.top, a.top), a.right = Ke(h.right, a.right), a.bottom = Ke(h.bottom, a.bottom), a.left = ne(h.left, a.left), a;
  }, $t(l, o, s));
  return r.width = r.right - r.left, r.height = r.bottom - r.top, r.x = r.left, r.y = r.top, r;
}
function Ut(l) {
  var e = l.reference, t = l.element, s = l.placement, n = s ? z(s) : null, i = s ? ue(s) : null, o = e.x + e.width / 2 - t.width / 2, r = e.y + e.height / 2 - t.height / 2, a;
  switch (n) {
    case D:
      a = {
        x: o,
        y: e.y - t.height
      };
      break;
    case V:
      a = {
        x: o,
        y: e.y + e.height
      };
      break;
    case F:
      a = {
        x: e.x + e.width,
        y: r
      };
      break;
    case O:
      a = {
        x: e.x - t.width,
        y: r
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var d = n ? ut(n) : null;
  if (d != null) {
    var h = d === "y" ? "height" : "width";
    switch (i) {
      case he:
        a[d] = a[d] - (e[h] / 2 - t[h] / 2);
        break;
      case Ie:
        a[d] = a[d] + (e[h] / 2 - t[h] / 2);
        break;
    }
  }
  return a;
}
function xe(l, e) {
  e === void 0 && (e = {});
  var t = e, s = t.placement, n = s === void 0 ? l.placement : s, i = t.strategy, o = i === void 0 ? l.strategy : i, r = t.boundary, a = r === void 0 ? hs : r, d = t.rootBoundary, h = d === void 0 ? Ot : d, p = t.elementContext, c = p === void 0 ? we : p, u = t.altBoundary, g = u === void 0 ? !1 : u, v = t.padding, m = v === void 0 ? 0 : v, b = Vt(typeof m != "number" ? m : Ft(m, Ae)), x = c === we ? ds : we, T = l.rects.popper, f = l.elements[g ? x : c], S = Us(le(f) ? f : f.contextElement || K(l.elements.popper), a, h, o), C = ce(l.elements.reference), L = Ut({
    reference: C,
    element: T,
    strategy: "absolute",
    placement: n
  }), $ = ot(Object.assign({}, T, L)), k = c === we ? $ : C, A = {
    top: S.top - k.top + b.top,
    bottom: k.bottom - S.bottom + b.bottom,
    left: S.left - k.left + b.left,
    right: k.right - S.right + b.right
  }, P = l.modifiersData.offset;
  if (c === we && P) {
    var W = P[n];
    Object.keys(A).forEach(function(q) {
      var Y = [F, V].indexOf(q) >= 0 ? 1 : -1, ee = [D, V].indexOf(q) >= 0 ? "y" : "x";
      A[q] += W[ee] * Y;
    });
  }
  return A;
}
function js(l, e) {
  e === void 0 && (e = {});
  var t = e, s = t.placement, n = t.boundary, i = t.rootBoundary, o = t.padding, r = t.flipVariations, a = t.allowedAutoPlacements, d = a === void 0 ? Nt : a, h = ue(s), p = h ? r ? Et : Et.filter(function(g) {
    return ue(g) === h;
  }) : Ae, c = p.filter(function(g) {
    return d.indexOf(g) >= 0;
  });
  c.length === 0 && (c = p);
  var u = c.reduce(function(g, v) {
    return g[v] = xe(l, {
      placement: v,
      boundary: n,
      rootBoundary: i,
      padding: o
    })[z(v)], g;
  }, {});
  return Object.keys(u).sort(function(g, v) {
    return u[g] - u[v];
  });
}
function zs(l) {
  if (z(l) === ht)
    return [];
  var e = Ze(l);
  return [kt(l), e, kt(e)];
}
function Qs(l) {
  var e = l.state, t = l.options, s = l.name;
  if (!e.modifiersData[s]._skip) {
    for (var n = t.mainAxis, i = n === void 0 ? !0 : n, o = t.altAxis, r = o === void 0 ? !0 : o, a = t.fallbackPlacements, d = t.padding, h = t.boundary, p = t.rootBoundary, c = t.altBoundary, u = t.flipVariations, g = u === void 0 ? !0 : u, v = t.allowedAutoPlacements, m = e.options.placement, b = z(m), x = b === m, T = a || (x || !g ? [Ze(m)] : zs(m)), f = [m].concat(T).reduce(function(re, J) {
      return re.concat(z(J) === ht ? js(e, {
        placement: J,
        boundary: h,
        rootBoundary: p,
        padding: d,
        flipVariations: g,
        allowedAutoPlacements: v
      }) : J);
    }, []), S = e.rects.reference, C = e.rects.popper, L = /* @__PURE__ */ new Map(), $ = !0, k = f[0], A = 0; A < f.length; A++) {
      var P = f[A], W = z(P), q = ue(P) === he, Y = [D, V].indexOf(W) >= 0, ee = Y ? "width" : "height", N = xe(e, {
        placement: P,
        boundary: h,
        rootBoundary: p,
        altBoundary: c,
        padding: d
      }), U = Y ? q ? F : O : q ? V : D;
      S[ee] > C[ee] && (U = Ze(U));
      var We = Ze(U), te = [];
      if (i && te.push(N[W] <= 0), r && te.push(N[U] <= 0, N[We] <= 0), te.every(function(re) {
        return re;
      })) {
        k = P, $ = !1;
        break;
      }
      L.set(P, te);
    }
    if ($)
      for (var Ue = g ? 3 : 1, _e = function(J) {
        var ve = f.find(function(ze) {
          var se = L.get(ze);
          if (se)
            return se.slice(0, J).every(function(et) {
              return et;
            });
        });
        if (ve)
          return k = ve, "break";
      }, ge = Ue; ge > 0; ge--) {
        var je = _e(ge);
        if (je === "break")
          break;
      }
    e.placement !== k && (e.modifiersData[s]._skip = !0, e.placement = k, e.reset = !0);
  }
}
const Xs = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Qs,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Pt(l, e, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: l.top - e.height - t.y,
    right: l.right - e.width + t.x,
    bottom: l.bottom - e.height + t.y,
    left: l.left - e.width - t.x
  };
}
function qt(l) {
  return [D, F, V, O].some(function(e) {
    return l[e] >= 0;
  });
}
function Js(l) {
  var e = l.state, t = l.name, s = e.rects.reference, n = e.rects.popper, i = e.modifiersData.preventOverflow, o = xe(e, {
    elementContext: "reference"
  }), r = xe(e, {
    altBoundary: !0
  }), a = Pt(o, s), d = Pt(r, n, i), h = qt(a), p = qt(d);
  e.modifiersData[t] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: d,
    isReferenceHidden: h,
    hasPopperEscaped: p
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": h,
    "data-popper-escaped": p
  });
}
const Zs = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Js
};
function Gs(l, e, t) {
  var s = z(l), n = [O, D].indexOf(s) >= 0 ? -1 : 1, i = typeof t == "function" ? t(Object.assign({}, e, {
    placement: l
  })) : t, o = i[0], r = i[1];
  return o = o || 0, r = (r || 0) * n, [O, F].indexOf(s) >= 0 ? {
    x: r,
    y: o
  } : {
    x: o,
    y: r
  };
}
function Ks(l) {
  var e = l.state, t = l.options, s = l.name, n = t.offset, i = n === void 0 ? [0, 0] : n, o = Nt.reduce(function(h, p) {
    return h[p] = Gs(p, e.rects, i), h;
  }, {}), r = o[e.placement], a = r.x, d = r.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += d), e.modifiersData[s] = o;
}
const Ys = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ks
};
function _s(l) {
  var e = l.state, t = l.name;
  e.modifiersData[t] = Ut({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const ei = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: _s,
  data: {}
};
function ti(l) {
  return l === "x" ? "y" : "x";
}
function si(l) {
  var e = l.state, t = l.options, s = l.name, n = t.mainAxis, i = n === void 0 ? !0 : n, o = t.altAxis, r = o === void 0 ? !1 : o, a = t.boundary, d = t.rootBoundary, h = t.altBoundary, p = t.padding, c = t.tether, u = c === void 0 ? !0 : c, g = t.tetherOffset, v = g === void 0 ? 0 : g, m = xe(e, {
    boundary: a,
    rootBoundary: d,
    padding: p,
    altBoundary: h
  }), b = z(e.placement), x = ue(e.placement), T = !x, f = ut(b), S = ti(f), C = e.modifiersData.popperOffsets, L = e.rects.reference, $ = e.rects.popper, k = typeof v == "function" ? v(Object.assign({}, e.rects, {
    placement: e.placement
  })) : v, A = typeof k == "number" ? {
    mainAxis: k,
    altAxis: k
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, k), P = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, W = {
    x: 0,
    y: 0
  };
  if (C) {
    if (i) {
      var q, Y = f === "y" ? D : O, ee = f === "y" ? V : F, N = f === "y" ? "height" : "width", U = C[f], We = U + m[Y], te = U - m[ee], Ue = u ? -$[N] / 2 : 0, _e = x === he ? L[N] : $[N], ge = x === he ? -$[N] : -L[N], je = e.elements.arrow, re = u && je ? ct(je) : {
        width: 0,
        height: 0
      }, J = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Rt(), ve = J[Y], ze = J[ee], se = be(0, L[N], re[N]), et = T ? L[N] / 2 - Ue - se - ve - A.mainAxis : _e - se - ve - A.mainAxis, Xt = T ? -L[N] / 2 + Ue + se + ze + A.mainAxis : ge + se + ze + A.mainAxis, tt = e.elements.arrow && ke(e.elements.arrow), Jt = tt ? f === "y" ? tt.clientTop || 0 : tt.clientLeft || 0 : 0, vt = (q = P == null ? void 0 : P[f]) != null ? q : 0, Zt = U + et - vt - Jt, Gt = U + Xt - vt, yt = be(u ? Ke(We, Zt) : We, U, u ? ne(te, Gt) : te);
      C[f] = yt, W[f] = yt - U;
    }
    if (r) {
      var wt, Kt = f === "x" ? D : O, Yt = f === "x" ? V : F, ie = C[S], Qe = S === "y" ? "height" : "width", bt = ie + m[Kt], St = ie - m[Yt], st = [D, O].indexOf(b) !== -1, Ct = (wt = P == null ? void 0 : P[S]) != null ? wt : 0, It = st ? bt : ie - L[Qe] - $[Qe] - Ct + A.altAxis, xt = st ? ie + L[Qe] + $[Qe] - Ct - A.altAxis : St, Tt = u && st ? Es(It, ie, xt) : be(u ? It : bt, ie, u ? xt : St);
      C[S] = Tt, W[S] = Tt - ie;
    }
    e.modifiersData[s] = W;
  }
}
const ii = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: si,
  requiresIfExists: ["offset"]
};
function ni(l) {
  return {
    scrollLeft: l.scrollLeft,
    scrollTop: l.scrollTop
  };
}
function oi(l) {
  return l === M(l) || !H(l) ? pt(l) : ni(l);
}
function li(l) {
  var e = l.getBoundingClientRect(), t = de(e.width) / l.offsetWidth || 1, s = de(e.height) / l.offsetHeight || 1;
  return t !== 1 || s !== 1;
}
function ri(l, e, t) {
  t === void 0 && (t = !1);
  var s = H(e), n = H(e) && li(e), i = K(e), o = ce(l, n, t), r = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (s || !s && !t) && ((Q(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  mt(i)) && (r = oi(e)), H(e) ? (a = ce(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : i && (a.x = ft(i))), {
    x: o.left + r.scrollLeft - a.x,
    y: o.top + r.scrollTop - a.y,
    width: o.width,
    height: o.height
  };
}
function ai(l) {
  var e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), s = [];
  l.forEach(function(i) {
    e.set(i.name, i);
  });
  function n(i) {
    t.add(i.name);
    var o = [].concat(i.requires || [], i.requiresIfExists || []);
    o.forEach(function(r) {
      if (!t.has(r)) {
        var a = e.get(r);
        a && n(a);
      }
    }), s.push(i);
  }
  return l.forEach(function(i) {
    t.has(i.name) || n(i);
  }), s;
}
function hi(l) {
  var e = ai(l);
  return bs.reduce(function(t, s) {
    return t.concat(e.filter(function(n) {
      return n.phase === s;
    }));
  }, []);
}
function di(l) {
  var e;
  return function() {
    return e || (e = new Promise(function(t) {
      Promise.resolve().then(function() {
        e = void 0, t(l());
      });
    })), e;
  };
}
function ci(l) {
  var e = l.reduce(function(t, s) {
    var n = t[s.name];
    return t[s.name] = n ? Object.assign({}, n, s, {
      options: Object.assign({}, n.options, s.options),
      data: Object.assign({}, n.data, s.data)
    }) : s, t;
  }, {});
  return Object.keys(e).map(function(t) {
    return e[t];
  });
}
var Bt = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Dt() {
  for (var l = arguments.length, e = new Array(l), t = 0; t < l; t++)
    e[t] = arguments[t];
  return !e.some(function(s) {
    return !(s && typeof s.getBoundingClientRect == "function");
  });
}
function ui(l) {
  l === void 0 && (l = {});
  var e = l, t = e.defaultModifiers, s = t === void 0 ? [] : t, n = e.defaultOptions, i = n === void 0 ? Bt : n;
  return function(r, a, d) {
    d === void 0 && (d = i);
    var h = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Bt, i),
      modifiersData: {},
      elements: {
        reference: r,
        popper: a
      },
      attributes: {},
      styles: {}
    }, p = [], c = !1, u = {
      state: h,
      setOptions: function(b) {
        var x = typeof b == "function" ? b(h.options) : b;
        v(), h.options = Object.assign({}, i, h.options, x), h.scrollParents = {
          reference: le(r) ? Se(r) : r.contextElement ? Se(r.contextElement) : [],
          popper: Se(a)
        };
        var T = hi(ci([].concat(s, h.options.modifiers)));
        return h.orderedModifiers = T.filter(function(f) {
          return f.enabled;
        }), g(), u.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!c) {
          var b = h.elements, x = b.reference, T = b.popper;
          if (Dt(x, T)) {
            h.rects = {
              reference: ri(x, ke(T), h.options.strategy === "fixed"),
              popper: ct(T)
            }, h.reset = !1, h.placement = h.options.placement, h.orderedModifiers.forEach(function(A) {
              return h.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var f = 0; f < h.orderedModifiers.length; f++) {
              if (h.reset === !0) {
                h.reset = !1, f = -1;
                continue;
              }
              var S = h.orderedModifiers[f], C = S.fn, L = S.options, $ = L === void 0 ? {} : L, k = S.name;
              typeof C == "function" && (h = C({
                state: h,
                options: $,
                name: k,
                instance: u
              }) || h);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: di(function() {
        return new Promise(function(m) {
          u.forceUpdate(), m(h);
        });
      }),
      destroy: function() {
        v(), c = !0;
      }
    };
    if (!Dt(r, a))
      return u;
    u.setOptions(d).then(function(m) {
      !c && d.onFirstUpdate && d.onFirstUpdate(m);
    });
    function g() {
      h.orderedModifiers.forEach(function(m) {
        var b = m.name, x = m.options, T = x === void 0 ? {} : x, f = m.effect;
        if (typeof f == "function") {
          var S = f({
            state: h,
            name: b,
            instance: u,
            options: T
          }), C = function() {
          };
          p.push(S || C);
        }
      });
    }
    function v() {
      p.forEach(function(m) {
        return m();
      }), p = [];
    }
    return u;
  };
}
var pi = [Ns, ei, Ds, Is, Ys, Xs, ii, $s, Zs], jt = /* @__PURE__ */ ui({
  defaultModifiers: pi
});
/*
 * HSDropdown
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Z extends I {
  constructor(e, t, s) {
    super(e, t, s), this.toggle = this.el.querySelector(":scope > .hs-dropdown-toggle") || this.el.querySelector(
      ":scope > .hs-dropdown-toggle-wrapper > .hs-dropdown-toggle"
    ) || this.el.children[0], this.closers = Array.from(this.el.querySelectorAll(":scope .hs-dropdown-close")) || null, this.menu = this.el.querySelector(":scope > .hs-dropdown-menu"), this.eventMode = E(this.el, "--trigger", "click"), this.closeMode = E(this.el, "--auto-close", "true"), this.animationInProcess = !1, this.toggle && this.menu && this.init();
  }
  init() {
    if (this.createCollection(window.$hsDropdownCollection, this), this.toggle.disabled)
      return !1;
    this.toggle && this.buildToggle(), this.menu && this.buildMenu(), this.closers && this.buildClosers(), !es() && !ts() && (this.el.addEventListener("mouseenter", () => this.onMouseEnterHandler()), this.el.addEventListener("mouseleave", () => this.onMouseLeaveHandler()));
  }
  resizeHandler() {
    this.eventMode = E(this.el, "--trigger", "click"), this.closeMode = E(this.el, "--auto-close", "true");
  }
  buildToggle() {
    var e;
    (e = this == null ? void 0 : this.toggle) != null && e.ariaExpanded && (this.el.classList.contains("open") ? this.toggle.ariaExpanded = "true" : this.toggle.ariaExpanded = "false"), this.toggle.addEventListener("click", (t) => this.onClickHandler(t));
  }
  buildMenu() {
    this.menu.role = "menu";
  }
  buildClosers() {
    this.closers.forEach((e) => {
      e.addEventListener("click", () => this.close());
    });
  }
  onClickHandler(e) {
    this.el.classList.contains("open") && !this.menu.classList.contains("hidden") ? this.close() : this.open();
  }
  onMouseEnterHandler() {
    if (this.eventMode !== "hover")
      return !1;
    this.el._popper && this.forceClearState(), !this.el.classList.contains("open") && this.menu.classList.contains("hidden") && this.open();
  }
  onMouseLeaveHandler() {
    if (this.eventMode !== "hover")
      return !1;
    this.el.classList.contains("open") && !this.menu.classList.contains("hidden") && this.close();
  }
  destroyPopper() {
    this.menu.classList.remove("block"), this.menu.classList.add("hidden"), this.menu.style.inset = null, this.menu.style.position = null, this.el && this.el._popper && this.el._popper.destroy(), this.animationInProcess = !1;
  }
  absoluteStrategyModifiers() {
    return [
      {
        name: "applyStyles",
        fn: (e) => {
          const t = (window.getComputedStyle(this.el).getPropertyValue("--strategy") || "absolute").replace(" ", ""), s = (window.getComputedStyle(this.el).getPropertyValue("--adaptive") || "adaptive").replace(" ", "");
          e.state.elements.popper.style.position = t, e.state.elements.popper.style.transform = s === "adaptive" ? e.state.styles.popper.transform : null, e.state.elements.popper.style.top = null, e.state.elements.popper.style.bottom = null, e.state.elements.popper.style.left = null, e.state.elements.popper.style.right = null, e.state.elements.popper.style.margin = 0;
        }
      }
    ];
  }
  // Public methods
  open() {
    if (this.el.classList.contains("open") || this.animationInProcess)
      return !1;
    this.animationInProcess = !0;
    const e = (window.getComputedStyle(this.el).getPropertyValue("--placement") || "").replace(" ", ""), t = (window.getComputedStyle(this.el).getPropertyValue("--flip") || "true").replace(" ", ""), s = (window.getComputedStyle(this.el).getPropertyValue("--strategy") || "fixed").replace(" ", ""), n = parseInt(
      (window.getComputedStyle(this.el).getPropertyValue("--offset") || "10").replace(" ", "")
    ), i = (window.getComputedStyle(this.el).getPropertyValue("--gpu-acceleration") || "true").replace(" ", "");
    s !== "static" && (this.el._popper = jt(this.el, this.menu, {
      placement: at[e] || "bottom-start",
      strategy: s,
      modifiers: [
        ...s !== "fixed" ? this.absoluteStrategyModifiers() : [],
        {
          name: "flip",
          enabled: t === "true"
        },
        {
          name: "offset",
          options: {
            offset: [0, n]
          }
        },
        {
          name: "computeStyles",
          options: {
            adaptive: s === "fixed",
            gpuAcceleration: i === "true"
          }
        }
      ]
    })), this.menu.style.margin = null, this.menu.classList.remove("hidden"), this.menu.classList.add("block"), setTimeout(() => {
      var o;
      (o = this == null ? void 0 : this.toggle) != null && o.ariaExpanded && (this.toggle.ariaExpanded = "true"), this.el.classList.add("open"), this.animationInProcess = !1;
    }), this.fireEvent("open", this.el), w("open.hs.dropdown", this.el, this.el);
  }
  close(e = !0) {
    if (this.animationInProcess || !this.el.classList.contains("open"))
      return !1;
    const t = () => {
      var s;
      this.menu.style.margin = null, (s = this == null ? void 0 : this.toggle) != null && s.ariaExpanded && (this.toggle.ariaExpanded = "false"), this.el.classList.remove("open"), this.fireEvent("close", this.el), w("close.hs.dropdown", this.el, this.el);
    };
    if (this.animationInProcess = !0, e) {
      const s = this.el.querySelector("[data-hs-dropdown-transition]") || this.menu;
      R(s, () => this.destroyPopper());
    } else
      this.destroyPopper();
    t();
  }
  forceClearState() {
    this.destroyPopper(), this.menu.style.margin = null, this.el.classList.remove("open");
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsDropdownCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    if (window.$hsDropdownCollection || (window.$hsDropdownCollection = []), document.querySelectorAll(".hs-dropdown:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsDropdownCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Z(e);
    }), window.$hsDropdownCollection) {
      document.addEventListener(
        "keydown",
        (t) => Z.accessibility(t)
      ), window.addEventListener("click", (t) => {
        const s = t.target;
        Z.closeCurrentlyOpened(s);
      });
      let e = window.innerWidth;
      window.addEventListener("resize", () => {
        window.innerWidth !== e && (e = innerWidth, Z.closeCurrentlyOpened(null, !1));
      });
    }
  }
  static open(e) {
    const t = window.$hsDropdownCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && t.element.menu.classList.contains("hidden") && t.element.open();
  }
  static close(e) {
    const t = window.$hsDropdownCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && !t.element.menu.classList.contains("hidden") && t.element.close();
  }
  // Accessibility methods
  static accessibility(e) {
    this.history = ns;
    const t = window.$hsDropdownCollection.find(
      (s) => s.element.el.classList.contains("open")
    );
    if (t && (os.includes(e.code) || e.code.length === 4 && e.code[e.code.length - 1].match(/^[A-Z]*$/)) && !e.metaKey && !t.element.menu.querySelector("input:focus") && !t.element.menu.querySelector("textarea:focus"))
      switch (e.code) {
        case "Escape":
          t.element.menu.querySelector(".hs-select.active") || (e.preventDefault(), this.onEscape(e));
          break;
        case "Enter":
          !t.element.menu.querySelector(".hs-select button:focus") && !t.element.menu.querySelector(".hs-collapse-toggle:focus") && this.onEnter(e);
          break;
        case "ArrowUp":
          e.preventDefault(), e.stopImmediatePropagation(), this.onArrow();
          break;
        case "ArrowDown":
          e.preventDefault(), e.stopImmediatePropagation(), this.onArrow(!1);
          break;
        case "Home":
          e.preventDefault(), e.stopImmediatePropagation(), this.onStartEnd();
          break;
        case "End":
          e.preventDefault(), e.stopImmediatePropagation(), this.onStartEnd(!1);
          break;
        default:
          e.preventDefault(), this.onFirstLetter(e.key);
          break;
      }
  }
  static onEscape(e) {
    const t = e.target.closest(".hs-dropdown.open");
    if (window.$hsDropdownCollection.find((s) => s.element.el === t)) {
      const s = window.$hsDropdownCollection.find(
        (n) => n.element.el === t
      );
      s && (s.element.close(), s.element.toggle.focus());
    } else
      this.closeCurrentlyOpened();
  }
  static onEnter(e) {
    const t = e.target.parentElement;
    if (window.$hsDropdownCollection.find((s) => s.element.el === t)) {
      e.preventDefault();
      const s = window.$hsDropdownCollection.find(
        (n) => n.element.el === t
      );
      s && s.element.open();
    }
  }
  static onArrow(e = !0) {
    const t = window.$hsDropdownCollection.find(
      (s) => s.element.el.classList.contains("open")
    );
    if (t) {
      const s = t.element.menu;
      if (!s)
        return !1;
      const i = (e ? Array.from(
        s.querySelectorAll(
          "a:not([hidden]), .hs-dropdown > button:not([hidden])"
        )
      ).reverse() : Array.from(
        s.querySelectorAll(
          "a:not([hidden]), .hs-dropdown > button:not([hidden])"
        )
      )).filter(
        (a) => !a.classList.contains("disabled")
      ), o = s.querySelector("a:focus, button:focus");
      let r = i.findIndex((a) => a === o);
      r + 1 < i.length && r++, i[r].focus();
    }
  }
  static onStartEnd(e = !0) {
    const t = window.$hsDropdownCollection.find(
      (s) => s.element.el.classList.contains("open")
    );
    if (t) {
      const s = t.element.menu;
      if (!s)
        return !1;
      const i = (e ? Array.from(s.querySelectorAll("a")) : Array.from(s.querySelectorAll("a")).reverse()).filter(
        (o) => !o.classList.contains("disabled")
      );
      i.length && i[0].focus();
    }
  }
  static onFirstLetter(e) {
    const t = window.$hsDropdownCollection.find(
      (s) => s.element.el.classList.contains("open")
    );
    if (t) {
      const s = t.element.menu;
      if (!s)
        return !1;
      const n = Array.from(s.querySelectorAll("a")), i = () => n.findIndex(
        (r, a) => r.innerText.toLowerCase().charAt(0) === e.toLowerCase() && this.history.existsInHistory(a)
      );
      let o = i();
      o === -1 && (this.history.clearHistory(), o = i()), o !== -1 && (n[o].focus(), this.history.addHistory(o));
    }
  }
  static closeCurrentlyOpened(e = null, t = !0) {
    const s = e && e.closest(".hs-dropdown") && e.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") ? e.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") : null;
    let n = s ? window.$hsDropdownCollection.filter(
      (i) => i.element.el.classList.contains("open") && i.element.menu.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") === s
    ) : window.$hsDropdownCollection.filter(
      (i) => i.element.el.classList.contains("open")
    );
    e && e.closest(".hs-dropdown") && _t(e.closest(".hs-dropdown"), "--auto-close") === "inside" && (n = n.filter(
      (i) => i.element.el !== e.closest(".hs-dropdown")
    )), n && n.forEach((i) => {
      if (i.element.closeMode === "false" || i.element.closeMode === "outside")
        return !1;
      i.element.close(t);
    });
  }
  // Backward compatibility
  static on(e, t, s) {
    const n = window.$hsDropdownCollection.find(
      (i) => i.element.el === (typeof t == "string" ? document.querySelector(t) : t)
    );
    n && (n.element.events[e] = s);
  }
}
window.addEventListener("load", () => {
  Z.autoInit();
});
window.addEventListener("resize", () => {
  window.$hsDropdownCollection || (window.$hsDropdownCollection = []), window.$hsDropdownCollection.forEach((l) => l.element.resizeHandler());
});
typeof window < "u" && (window.HSDropdown = Z);
/*
 * HSInputNumber
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class $e extends I {
  constructor(e, t) {
    super(e, t), this.input = this.el.querySelector("[data-hs-input-number-input]") || null, this.increment = this.el.querySelector("[data-hs-input-number-increment]") || null, this.decrement = this.el.querySelector("[data-hs-input-number-decrement]") || null, this.input && this.checkIsNumberAndConvert();
    const s = this.el.dataset.hsInputNumber, i = {
      ...s ? JSON.parse(s) : { step: 1 },
      ...t
    };
    this.minInputValue = "min" in i ? i.min : 0, this.maxInputValue = "max" in i ? i.max : null, this.step = "step" in i && i.step > 0 ? i.step : 1, this.init();
  }
  init() {
    this.createCollection(window.$hsInputNumberCollection, this), this.input && this.increment && this.build();
  }
  checkIsNumberAndConvert() {
    const e = this.input.value.trim(), t = this.cleanAndExtractNumber(e);
    t !== null ? (this.inputValue = t, this.input.value = t.toString()) : (this.inputValue = 0, this.input.value = "0");
  }
  cleanAndExtractNumber(e) {
    const t = [];
    let s = !1;
    e.split("").forEach((o) => {
      o >= "0" && o <= "9" ? t.push(o) : o === "." && !s && (t.push(o), s = !0);
    });
    const n = t.join(""), i = parseFloat(n);
    return isNaN(i) ? null : i;
  }
  build() {
    this.input && this.buildInput(), this.increment && this.buildIncrement(), this.decrement && this.buildDecrement(), this.inputValue <= 0 && this.minInputValue === 0 && (this.inputValue = 0, this.input.value = "0"), (this.inputValue <= 0 || this.minInputValue < 0) && this.changeValue(), this.input.hasAttribute("disabled") && this.disableButtons();
  }
  buildInput() {
    this.input.addEventListener("input", () => this.changeValue());
  }
  buildIncrement() {
    this.increment.addEventListener("click", () => {
      this.changeValue("increment");
    });
  }
  buildDecrement() {
    this.decrement.addEventListener("click", () => {
      this.changeValue("decrement");
    });
  }
  changeValue(e = "none") {
    const t = { inputValue: this.inputValue }, s = this.minInputValue ?? Number.MIN_SAFE_INTEGER, n = this.maxInputValue ?? Number.MAX_SAFE_INTEGER;
    switch (this.inputValue = isNaN(this.inputValue) ? 0 : this.inputValue, e) {
      case "increment":
        const i = this.inputValue + this.step;
        this.inputValue = i >= s && i <= n ? i : n, this.input.value = this.inputValue.toString();
        break;
      case "decrement":
        const o = this.inputValue - this.step;
        this.inputValue = o >= s && o <= n ? o : s, this.input.value = this.inputValue.toString();
        break;
      default:
        const r = isNaN(parseInt(this.input.value)) ? 0 : parseInt(this.input.value);
        this.inputValue = r >= n ? n : r <= s ? s : r, this.inputValue <= s && (this.input.value = this.inputValue.toString());
        break;
    }
    t.inputValue = this.inputValue, this.inputValue === s ? (this.el.classList.add("disabled"), this.decrement && this.disableButtons("decrement")) : (this.el.classList.remove("disabled"), this.decrement && this.enableButtons("decrement")), this.inputValue === n ? (this.el.classList.add("disabled"), this.increment && this.disableButtons("increment")) : (this.el.classList.remove("disabled"), this.increment && this.enableButtons("increment")), this.fireEvent("change", t), w("change.hs.inputNumber", this.el, t);
  }
  disableButtons(e = "all") {
    e === "all" ? ((this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT") && this.increment.setAttribute("disabled", "disabled"), (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT") && this.decrement.setAttribute("disabled", "disabled")) : e === "increment" ? (this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT") && this.increment.setAttribute("disabled", "disabled") : e === "decrement" && (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT") && this.decrement.setAttribute("disabled", "disabled");
  }
  enableButtons(e = "all") {
    e === "all" ? ((this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT") && this.increment.removeAttribute("disabled"), (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT") && this.decrement.removeAttribute("disabled")) : e === "increment" ? (this.increment.tagName === "BUTTON" || this.increment.tagName === "INPUT") && this.increment.removeAttribute("disabled") : e === "decrement" && (this.decrement.tagName === "BUTTON" || this.decrement.tagName === "INPUT") && this.decrement.removeAttribute("disabled");
  }
  // Global method
  static getInstance(e, t) {
    const s = window.$hsInputNumberCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsInputNumberCollection || (window.$hsInputNumberCollection = []), document.querySelectorAll("[data-hs-input-number]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsInputNumberCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new $e(e);
    });
  }
}
window.addEventListener("load", () => {
  $e.autoInit();
});
typeof window < "u" && (window.HSInputNumber = $e);
/*
 * HSOverlay
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class G extends I {
  constructor(e, t, s) {
    var r, a;
    super(e, t, s);
    const n = e.getAttribute("data-hs-overlay-options"), o = {
      ...n ? JSON.parse(n) : {},
      ...t
    };
    if (this.hiddenClass = (o == null ? void 0 : o.hiddenClass) || "hidden", this.emulateScrollbarSpace = (o == null ? void 0 : o.emulateScrollbarSpace) || !1, this.isClosePrev = (o == null ? void 0 : o.isClosePrev) ?? !0, this.backdropClasses = (o == null ? void 0 : o.backdropClasses) ?? "hs-overlay-backdrop transition duration fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 dark:bg-neutral-900", this.backdropExtraClasses = (o == null ? void 0 : o.backdropExtraClasses) ?? "", this.moveOverlayToBody = (o == null ? void 0 : o.moveOverlayToBody) || null, this.openNextOverlay = !1, this.autoHide = null, this.overlayId = this.el.getAttribute("data-hs-overlay"), this.overlay = document.querySelector(this.overlayId), this.initContainer = ((r = this.overlay) == null ? void 0 : r.parentElement) || null, this.overlay) {
      this.isCloseWhenClickInside = ye(
        E(this.overlay, "--close-when-click-inside", "false") || "false"
      ), this.isTabAccessibilityLimited = ye(
        E(this.overlay, "--tab-accessibility-limited", "true") || "true"
      ), this.isLayoutAffect = ye(
        E(this.overlay, "--is-layout-affect", "false") || "false"
      ), this.hasAutofocus = ye(
        E(this.overlay, "--has-autofocus", "true") || "true"
      ), this.hasAbilityToCloseOnBackdropClick = ye(
        this.overlay.getAttribute("data-hs-overlay-keyboard") || "true"
      );
      const d = E(
        this.overlay,
        "--auto-close"
      );
      this.autoClose = !isNaN(+d) && isFinite(+d) ? +d : it[d] || null;
      const h = E(this.overlay, "--opened");
      this.openedBreakpoint = (!isNaN(+h) && isFinite(+h) ? +h : it[h]) || null;
    }
    this.animationTarget = ((a = this == null ? void 0 : this.overlay) == null ? void 0 : a.querySelector(".hs-overlay-animation-target")) || this.overlay, this.overlay && this.init();
  }
  init() {
    var e;
    if (this.createCollection(window.$hsOverlayCollection, this), this.isLayoutAffect && this.openedBreakpoint) {
      const t = G.getInstance(this.el, !0);
      G.setOpened(
        this.openedBreakpoint,
        t
      );
    }
    (e = this == null ? void 0 : this.el) != null && e.ariaExpanded && (this.overlay.classList.contains("opened") ? this.el.ariaExpanded = "true" : this.el.ariaExpanded = "false"), this.el.addEventListener("click", () => {
      this.overlay.classList.contains("opened") ? this.close() : this.open();
    }), this.overlay.addEventListener("click", (t) => {
      t.target.id && `#${t.target.id}` === this.overlayId && this.isCloseWhenClickInside && this.hasAbilityToCloseOnBackdropClick && this.close();
    });
  }
  hideAuto() {
    const e = parseInt(E(this.overlay, "--auto-hide", "0"));
    e && (this.autoHide = setTimeout(() => {
      this.close();
    }, e));
  }
  checkTimer() {
    this.autoHide && (clearTimeout(this.autoHide), this.autoHide = null);
  }
  buildBackdrop() {
    const e = this.overlay.classList.value.split(" "), t = parseInt(
      window.getComputedStyle(this.overlay).getPropertyValue("z-index")
    ), s = this.overlay.getAttribute("data-hs-overlay-backdrop-container") || !1;
    let n = document.createElement("div"), i = `${this.backdropClasses} ${this.backdropExtraClasses}`;
    const o = E(this.overlay, "--overlay-backdrop", "true") !== "static", r = E(this.overlay, "--overlay-backdrop", "true") === "false";
    n.id = `${this.overlay.id}-backdrop`, "style" in n && (n.style.zIndex = `${t - 1}`);
    for (const a of e)
      (a.startsWith("hs-overlay-backdrop-open:") || a.includes(":hs-overlay-backdrop-open:")) && (i += ` ${a}`);
    r || (s && (n = document.querySelector(s).cloneNode(!0), n.classList.remove("hidden"), i = `${n.classList.toString()}`, n.classList.value = ""), o && n.addEventListener(
      "click",
      () => this.close(),
      !0
    ), n.setAttribute(
      "data-hs-overlay-backdrop-template",
      ""
    ), document.body.appendChild(n), setTimeout(() => {
      n.classList.value = i;
    }));
  }
  destroyBackdrop() {
    const e = document.querySelector(
      `#${this.overlay.id}-backdrop`
    );
    e && (this.openNextOverlay && (e.style.transitionDuration = `${parseFloat(
      window.getComputedStyle(e).transitionDuration.replace(/[^\d.-]/g, "")
    ) * 1.8}s`), e.classList.add("opacity-0"), R(e, () => {
      e.remove();
    }));
  }
  focusElement() {
    const e = this.overlay.querySelector("[autofocus]");
    if (e)
      e.focus();
    else
      return !1;
  }
  getScrollbarSize() {
    let e = document.createElement("div");
    e.style.overflow = "scroll", e.style.width = "100px", e.style.height = "100px", document.body.appendChild(e);
    let t = e.offsetWidth - e.clientWidth;
    return document.body.removeChild(e), t;
  }
  // Public methods
  open() {
    if (!this.overlay)
      return !1;
    const e = document.querySelectorAll(".hs-overlay.open"), t = window.$hsOverlayCollection.find(
      (i) => Array.from(e).includes(i.element.overlay) && !i.element.isLayoutAffect
    ), s = document.querySelectorAll(
      `[data-hs-overlay="#${this.overlay.id}"]`
    ), n = E(this.overlay, "--body-scroll", "false") !== "true";
    if (this.isClosePrev && t)
      return this.openNextOverlay = !0, t.element.close().then(() => {
        this.open(), this.openNextOverlay = !1;
      });
    n && (document.body.style.overflow = "hidden", this.emulateScrollbarSpace && (document.body.style.paddingRight = `${this.getScrollbarSize()}px`)), this.buildBackdrop(), this.checkTimer(), this.hideAuto(), s.forEach((i) => {
      i.ariaExpanded && (i.ariaExpanded = "true");
    }), this.overlay.classList.remove(this.hiddenClass), this.overlay.setAttribute("aria-overlay", "true"), this.overlay.setAttribute("tabindex", "-1"), setTimeout(() => {
      if (this.overlay.classList.contains("opened"))
        return !1;
      this.overlay.classList.add("open", "opened"), this.isLayoutAffect && document.body.classList.add("hs-overlay-body-open"), this.fireEvent("open", this.el), w("open.hs.overlay", this.el, this.el), this.hasAutofocus && this.focusElement();
    }, 50);
  }
  close(e = !1) {
    this.isLayoutAffect && document.body.classList.remove("hs-overlay-body-open");
    const t = (s) => {
      if (this.overlay.classList.contains("open"))
        return !1;
      document.querySelectorAll(
        `[data-hs-overlay="#${this.overlay.id}"]`
      ).forEach((i) => {
        i.ariaExpanded && (i.ariaExpanded = "false");
      }), this.overlay.classList.add(this.hiddenClass), this.destroyBackdrop(), this.fireEvent("close", this.el), w("close.hs.overlay", this.el, this.el), document.querySelector(".hs-overlay.opened") || (document.body.style.overflow = "", this.emulateScrollbarSpace && (document.body.style.paddingRight = "")), s(this.overlay);
    };
    return new Promise((s) => {
      if (!this.overlay)
        return !1;
      this.overlay.classList.remove("open", "opened"), this.overlay.removeAttribute("aria-overlay"), this.overlay.removeAttribute("tabindex"), e ? t(s) : R(this.animationTarget, () => t(s));
    });
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsOverlayCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e) || n.element.overlay === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    window.$hsOverlayCollection || (window.$hsOverlayCollection = []), document.querySelectorAll("[data-hs-overlay]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsOverlayCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new G(e);
    }), window.$hsOverlayCollection && document.addEventListener(
      "keydown",
      (e) => G.accessibility(e)
    );
  }
  static open(e) {
    const t = window.$hsOverlayCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e) || s.element.overlay === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && t.element.overlay.classList.contains(
      t.element.hiddenClass
    ) && t.element.open();
  }
  static close(e) {
    const t = window.$hsOverlayCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e) || s.element.overlay === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && !t.element.overlay.classList.contains(
      t.element.hiddenClass
    ) && t.element.close();
  }
  static setOpened(e, t) {
    document.body.clientWidth >= e ? (document.body.classList.add("hs-overlay-body-open"), t.element.overlay.classList.add("opened")) : t.element.close(!0);
  }
  // Accessibility methods
  static accessibility(e) {
    var r, a;
    const t = window.$hsOverlayCollection.filter(
      (d) => d.element.overlay.classList.contains("open")
    ), s = t[t.length - 1], n = (a = (r = s == null ? void 0 : s.element) == null ? void 0 : r.overlay) == null ? void 0 : a.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ), i = [];
    n != null && n.length && n.forEach((d) => {
      rt(d) || i.push(d);
    });
    const o = s && !e.metaKey;
    if (o && !s.element.isTabAccessibilityLimited && e.code === "Tab")
      return !1;
    o && i.length && e.code === "Tab" && (e.preventDefault(), this.onTab(s, i)), o && e.code === "Escape" && (e.preventDefault(), this.onEscape(s));
  }
  static onEscape(e) {
    e && e.element.hasAbilityToCloseOnBackdropClick && e.element.close();
  }
  static onTab(e, t) {
    if (!t.length)
      return !1;
    const s = e.element.overlay.querySelector(":focus"), n = Array.from(t).indexOf(
      s
    );
    if (n > -1) {
      const i = (n + 1) % t.length;
      t[i].focus();
    } else
      t[0].focus();
  }
  // Backward compatibility
  static on(e, t, s) {
    const n = window.$hsOverlayCollection.find(
      (i) => i.element.el === (typeof t == "string" ? document.querySelector(t) : t) || i.element.overlay === (typeof t == "string" ? document.querySelector(t) : t)
    );
    n && (n.element.events[e] = s);
  }
}
const fi = () => {
  if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find((e) => e.element.autoClose))
    return !1;
  window.$hsOverlayCollection.filter(
    (e) => e.element.autoClose
  ).forEach((e) => {
    document.body.clientWidth >= e.element.autoClose && e.element.close(!0);
  });
}, zt = () => {
  if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find((e) => e.element.moveOverlayToBody))
    return !1;
  window.$hsOverlayCollection.filter(
    (e) => e.element.moveOverlayToBody
  ).forEach((e) => {
    const t = e.element.moveOverlayToBody, s = e.element.initContainer, n = document.querySelector("body"), i = e.element.overlay;
    if (!s && i)
      return !1;
    document.body.clientWidth <= t && !ss(n, i) ? n.appendChild(i) : document.body.clientWidth > t && !s.contains(i) && s.appendChild(i);
  });
}, mi = () => {
  if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find((e) => e.element.autoClose))
    return !1;
  window.$hsOverlayCollection.filter(
    (e) => e.element.autoClose
  ).forEach((e) => {
    document.body.clientWidth >= e.element.autoClose && e.element.close(!0);
  });
}, gi = () => {
  if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find(
    (e) => e.element.overlay.classList.contains("opened")
  ))
    return !1;
  window.$hsOverlayCollection.filter(
    (e) => e.element.overlay.classList.contains("opened")
  ).forEach((e) => {
    const t = parseInt(
      window.getComputedStyle(e.element.overlay).getPropertyValue("z-index")
    ), s = document.querySelector(
      `#${e.element.overlay.id}-backdrop`
    ), n = parseInt(
      window.getComputedStyle(s).getPropertyValue("z-index")
    );
    if (t === n + 1)
      return !1;
    "style" in s && (s.style.zIndex = `${t - 1}`), document.body.classList.add("hs-overlay-body-open");
  });
};
window.addEventListener("load", () => {
  G.autoInit(), zt();
});
window.addEventListener("resize", () => {
  fi(), zt(), mi(), gi();
});
typeof window < "u" && (window.HSOverlay = G);
/*
 * HSPinInput
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Pe extends I {
  constructor(e, t) {
    super(e, t);
    const s = e.getAttribute("data-hs-pin-input"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.items = this.el.querySelectorAll("[data-hs-pin-input-item]"), this.currentItem = null, this.currentValue = new Array(this.items.length).fill(""), this.placeholders = [], this.availableCharsRE = new RegExp(
      (i == null ? void 0 : i.availableCharsRE) || "^[a-zA-Z0-9]+$"
    ), this.init();
  }
  init() {
    this.createCollection(window.$hsPinInputCollection, this), this.items.length && this.build();
  }
  build() {
    this.buildInputItems();
  }
  buildInputItems() {
    this.items.forEach((e, t) => {
      this.placeholders.push(e.getAttribute("placeholder") || ""), e.hasAttribute("autofocus") && this.onFocusIn(t), e.addEventListener("input", (s) => this.onInput(s, t)), e.addEventListener("paste", (s) => this.onPaste(s)), e.addEventListener("keydown", (s) => this.onKeydown(s, t)), e.addEventListener("focusin", () => this.onFocusIn(t)), e.addEventListener("focusout", () => this.onFocusOut(t));
    });
  }
  checkIfNumber(e) {
    return e.match(this.availableCharsRE);
  }
  autoFillAll(e) {
    Array.from(e).forEach((t, s) => {
      if (!(this != null && this.items[s]))
        return !1;
      this.items[s].value = t, this.items[s].dispatchEvent(new Event("input", { bubbles: !0 }));
    });
  }
  setCurrentValue() {
    this.currentValue = Array.from(this.items).map(
      (e) => e.value
    );
  }
  toggleCompleted() {
    this.currentValue.includes("") ? this.el.classList.remove("active") : this.el.classList.add("active");
  }
  onInput(e, t) {
    const s = e.target.value;
    if (this.currentItem = e.target, this.currentItem.value = "", this.currentItem.value = s[s.length - 1], !this.checkIfNumber(this.currentItem.value))
      return this.currentItem.value = this.currentValue[t] || "", !1;
    if (this.setCurrentValue(), this.currentItem.value) {
      if (t < this.items.length - 1 && this.items[t + 1].focus(), !this.currentValue.includes("")) {
        const n = { currentValue: this.currentValue };
        this.fireEvent("completed", n), w("completed.hs.pinInput", this.el, n);
      }
      this.toggleCompleted();
    } else
      t > 0 && this.items[t - 1].focus();
  }
  onKeydown(e, t) {
    e.key === "Backspace" && t > 0 && (this.items[t].value === "" ? (this.items[t - 1].value = "", this.items[t - 1].focus()) : this.items[t].value = ""), this.setCurrentValue(), this.toggleCompleted();
  }
  onFocusIn(e) {
    this.items[e].setAttribute("placeholder", "");
  }
  onFocusOut(e) {
    this.items[e].setAttribute("placeholder", this.placeholders[e]);
  }
  onPaste(e) {
    e.preventDefault(), this.items.forEach((t) => {
      document.activeElement === t && this.autoFillAll(e.clipboardData.getData("text"));
    });
  }
  // Static method
  static getInstance(e, t) {
    const s = window.$hsPinInputCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsPinInputCollection || (window.$hsPinInputCollection = []), document.querySelectorAll("[data-hs-pin-input]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsPinInputCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Pe(e);
    });
  }
}
window.addEventListener("load", () => {
  Pe.autoInit();
});
typeof window < "u" && (window.HSPinInput = Pe);
/*
 * HSRemoveElement
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class qe extends I {
  constructor(e, t) {
    super(e, t);
    const s = e.getAttribute("data-hs-remove-element-options"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.removeTargetId = this.el.getAttribute("data-hs-remove-element"), this.removeTarget = document.querySelector(this.removeTargetId), this.removeTargetAnimationClass = (i == null ? void 0 : i.removeTargetAnimationClass) || "hs-removing", this.removeTarget && this.init();
  }
  init() {
    this.createCollection(window.$hsRemoveElementCollection, this), this.el.addEventListener("click", () => this.remove());
  }
  remove() {
    if (!this.removeTarget)
      return !1;
    this.removeTarget.classList.add(this.removeTargetAnimationClass), R(
      this.removeTarget,
      () => setTimeout(() => this.removeTarget.remove())
    );
  }
  // Static method
  static autoInit() {
    window.$hsRemoveElementCollection || (window.$hsRemoveElementCollection = []), document.querySelectorAll("[data-hs-remove-element]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsRemoveElementCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new qe(e);
    });
  }
}
window.addEventListener("load", () => {
  qe.autoInit();
});
typeof window < "u" && (window.HSRemoveElement = qe);
/*
 * HSScrollspy
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Be extends I {
  constructor(e, t = {}) {
    super(e, t), this.activeSection = null, this.contentId = this.el.getAttribute("data-hs-scrollspy"), this.content = document.querySelector(this.contentId), this.links = this.el.querySelectorAll("[href]"), this.sections = [], this.scrollableId = this.el.getAttribute(
      "data-hs-scrollspy-scrollable-parent"
    ), this.scrollable = this.scrollableId ? document.querySelector(this.scrollableId) : document, this.init();
  }
  init() {
    this.createCollection(window.$hsScrollspyCollection, this), this.links.forEach((e) => {
      this.sections.push(
        this.scrollable.querySelector(e.getAttribute("href"))
      );
    }), Array.from(this.sections).forEach((e) => {
      if (!e.getAttribute("id"))
        return !1;
      this.scrollable.addEventListener(
        "scroll",
        (t) => this.update(t, e)
      );
    }), this.links.forEach((e) => {
      e.addEventListener("click", (t) => {
        if (t.preventDefault(), e.getAttribute("href") === "javascript:;")
          return !1;
        this.scrollTo(e);
      });
    });
  }
  update(e, t) {
    const s = parseInt(
      E(this.el, "--scrollspy-offset", "0")
    ), n = parseInt(E(t, "--scrollspy-offset")) || s, i = e.target === document ? 0 : parseInt(
      String(e.target.getBoundingClientRect().top)
    ), o = parseInt(String(t.getBoundingClientRect().top)) - n - i, r = t.offsetHeight;
    if (o <= 0 && o + r > 0) {
      if (this.activeSection === t)
        return !1;
      this.links.forEach((d) => {
        d.classList.remove("active");
      });
      const a = this.el.querySelector(
        `[href="#${t.getAttribute("id")}"]`
      );
      if (a) {
        a.classList.add("active");
        const d = a.closest("[data-hs-scrollspy-group]");
        if (d) {
          const h = d.querySelector("[href]");
          h && h.classList.add("active");
        }
      }
      this.activeSection = t;
    }
  }
  scrollTo(e) {
    const t = e.getAttribute("href"), s = document.querySelector(t), n = parseInt(
      E(this.el, "--scrollspy-offset", "0")
    ), i = parseInt(E(s, "--scrollspy-offset")) || n, o = this.scrollable === document ? 0 : this.scrollable.offsetTop, r = s.offsetTop - i - o, a = this.scrollable === document ? window : this.scrollable, d = () => {
      window.history.replaceState(null, null, e.getAttribute("href")), "scrollTo" in a && a.scrollTo({
        top: r,
        left: 0,
        behavior: "smooth"
      });
    }, h = this.fireEvent("beforeScroll", this.el);
    w("beforeScroll.hs.scrollspy", this.el, this.el), h instanceof Promise ? h.then(() => d()) : d();
  }
  // Static methods
  static getInstance(e, t = !1) {
    const s = window.$hsScrollspyCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    window.$hsScrollspyCollection || (window.$hsScrollspyCollection = []), document.querySelectorAll("[data-hs-scrollspy]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsScrollspyCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Be(e);
    });
  }
}
window.addEventListener("load", () => {
  Be.autoInit();
});
typeof window < "u" && (window.HSScrollspy = Be);
/*
 * HSSelect
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class oe extends I {
  constructor(e, t) {
    super(e, t), this.optionId = 0;
    const s = e.getAttribute("data-hs-select"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    }, o = {
      items: ", ",
      betweenItemsAndCounter: "and"
    };
    this.value = (i == null ? void 0 : i.value) || this.el.value || null, this.placeholder = (i == null ? void 0 : i.placeholder) || "Select...", this.hasSearch = (i == null ? void 0 : i.hasSearch) || !1, this.preventSearchFocus = (i == null ? void 0 : i.preventSearchFocus) || !1, this.mode = (i == null ? void 0 : i.mode) || "default", this.viewport = typeof (i == null ? void 0 : i.viewport) < "u" ? document.querySelector(i == null ? void 0 : i.viewport) : null, this.isOpened = !!(i != null && i.isOpened) || !1, this.isMultiple = this.el.hasAttribute("multiple") || !1, this.isDisabled = this.el.hasAttribute("disabled") || !1, this.selectedItems = [], this.apiUrl = (i == null ? void 0 : i.apiUrl) || null, this.apiQuery = (i == null ? void 0 : i.apiQuery) || null, this.apiOptions = (i == null ? void 0 : i.apiOptions) || null, this.apiSearchQueryKey = (i == null ? void 0 : i.apiSearchQueryKey) || null, this.apiDataPart = (i == null ? void 0 : i.apiDataPart) || null, this.apiFieldsMap = (i == null ? void 0 : i.apiFieldsMap) || null, this.apiIconTag = (i == null ? void 0 : i.apiIconTag) || null, this.wrapperClasses = (i == null ? void 0 : i.wrapperClasses) || null, this.toggleTag = (i == null ? void 0 : i.toggleTag) || null, this.toggleClasses = (i == null ? void 0 : i.toggleClasses) || null, this.toggleSeparators = o, this.toggleCountText = (i == null ? void 0 : i.toggleCountText) || null, this.toggleCountTextMinItems = (i == null ? void 0 : i.toggleCountTextMinItems) || 1, this.toggleCountTextMode = (i == null ? void 0 : i.toggleCountTextMode) || "countAfterLimit", this.tagsItemTemplate = (i == null ? void 0 : i.tagsItemTemplate) || null, this.tagsItemClasses = (i == null ? void 0 : i.tagsItemClasses) || null, this.tagsInputId = (i == null ? void 0 : i.tagsInputId) || null, this.tagsInputClasses = (i == null ? void 0 : i.tagsInputClasses) || null, this.dropdownTag = (i == null ? void 0 : i.dropdownTag) || null, this.dropdownClasses = (i == null ? void 0 : i.dropdownClasses) || null, this.dropdownDirectionClasses = (i == null ? void 0 : i.dropdownDirectionClasses) || null, this.dropdownSpace = (i == null ? void 0 : i.dropdownSpace) || 10, this.dropdownPlacement = (i == null ? void 0 : i.dropdownPlacement) || null, this.dropdownScope = (i == null ? void 0 : i.dropdownScope) || "parent", this.searchTemplate = (i == null ? void 0 : i.searchTemplate) || null, this.searchWrapperTemplate = (i == null ? void 0 : i.searchWrapperTemplate) || null, this.searchWrapperClasses = (i == null ? void 0 : i.searchWrapperClasses) || "bg-white p-2 sticky top-0", this.searchId = (i == null ? void 0 : i.searchId) || null, this.searchLimit = (i == null ? void 0 : i.searchLimit) || 1 / 0, this.isSearchDirectMatch = typeof (i == null ? void 0 : i.isSearchDirectMatch) < "u" ? i == null ? void 0 : i.isSearchDirectMatch : !0, this.searchClasses = (i == null ? void 0 : i.searchClasses) || "block w-[calc(100%-2rem)] text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 py-2 px-3 my-2 mx-4", this.searchPlaceholder = (i == null ? void 0 : i.searchPlaceholder) || "Search...", this.searchNoResultTemplate = (i == null ? void 0 : i.searchNoResultTemplate) || "<span></span>", this.searchNoResultText = (i == null ? void 0 : i.searchNoResultText) || "No results found", this.searchNoResultClasses = (i == null ? void 0 : i.searchNoResultClasses) || "px-4 text-sm text-gray-800 dark:text-neutral-200", this.optionTemplate = (i == null ? void 0 : i.optionTemplate) || null, this.optionTag = (i == null ? void 0 : i.optionTag) || null, this.optionClasses = (i == null ? void 0 : i.optionClasses) || null, this.extraMarkup = (i == null ? void 0 : i.extraMarkup) || null, this.descriptionClasses = (i == null ? void 0 : i.descriptionClasses) || null, this.iconClasses = (i == null ? void 0 : i.iconClasses) || null, this.isAddTagOnEnter = (i == null ? void 0 : i.isAddTagOnEnter) ?? !0, this.animationInProcess = !1, this.selectOptions = [], this.remoteOptions = [], this.tagsInputHelper = null, this.init();
  }
  setValue(e) {
    this.value = e, this.clearSelections(), Array.isArray(e) ? (this.toggleTextWrapper.innerHTML = this.value.length ? this.stringFromValue() : this.placeholder, this.unselectMultipleItems(), this.selectMultipleItems()) : (this.setToggleTitle(), this.toggle.querySelector("[data-icon]") && this.setToggleIcon(), this.toggle.querySelector("[data-title]") && this.setToggleTitle(), this.selectSingleItem());
  }
  init() {
    this.createCollection(window.$hsSelectCollection, this), this.build();
  }
  build() {
    if (this.el.style.display = "none", this.el.children && Array.from(this.el.children).filter((e) => e.value && e.value !== "").forEach((e) => {
      const t = e.getAttribute("data-hs-select-option");
      this.selectOptions = [
        ...this.selectOptions,
        {
          title: e.textContent,
          val: e.value,
          disabled: e.disabled,
          options: t !== "undefined" ? JSON.parse(t) : null
        }
      ];
    }), this.isMultiple) {
      const e = Array.from(this.el.children).filter(
        (t) => t.selected
      );
      if (e) {
        const t = [];
        e.forEach((s) => {
          t.push(s.value);
        }), this.value = t;
      }
    }
    this.buildWrapper(), this.mode === "tags" ? this.buildTags() : this.buildToggle(), this.buildDropdown(), this.extraMarkup && this.buildExtraMarkup();
  }
  buildWrapper() {
    this.wrapper = document.createElement("div"), this.wrapper.classList.add("hs-select", "relative"), this.mode === "tags" && this.wrapper.addEventListener("click", (e) => {
      !e.target.closest("[data-hs-select-dropdown]") && !e.target.closest("[data-tag-value]") && this.tagsInput.focus();
    }), this.wrapperClasses && B(this.wrapperClasses, this.wrapper), this.el.before(this.wrapper), this.wrapper.append(this.el);
  }
  buildExtraMarkup() {
    const e = (s) => {
      const n = y(s);
      return this.wrapper.append(n), n;
    }, t = (s) => {
      s.classList.contains("--prevent-click") || s.addEventListener("click", (n) => {
        n.stopPropagation(), this.toggleFn();
      });
    };
    if (Array.isArray(this.extraMarkup))
      this.extraMarkup.forEach((s) => {
        const n = e(s);
        t(n);
      });
    else {
      const s = e(this.extraMarkup);
      t(s);
    }
  }
  buildToggle() {
    var s, n;
    let e, t;
    this.toggleTextWrapper = document.createElement("span"), this.toggleTextWrapper.classList.add("truncate"), this.toggle = y(this.toggleTag || "<div></div>"), e = this.toggle.querySelector("[data-icon]"), t = this.toggle.querySelector("[data-title]"), !this.isMultiple && e && this.setToggleIcon(), !this.isMultiple && t && this.setToggleTitle(), this.isMultiple ? this.toggleTextWrapper.innerHTML = this.value.length ? this.stringFromValue() : this.placeholder : this.toggleTextWrapper.innerHTML = ((s = this.getItemByValue(this.value)) == null ? void 0 : s.title) || this.placeholder, t || this.toggle.append(this.toggleTextWrapper), this.toggleClasses && B(this.toggleClasses, this.toggle), this.isDisabled && this.toggle.classList.add("disabled"), this.wrapper && this.wrapper.append(this.toggle), (n = this.toggle) != null && n.ariaExpanded && (this.isOpened ? this.toggle.ariaExpanded = "true" : this.toggle.ariaExpanded = "false"), this.toggle.addEventListener("click", () => {
      if (this.isDisabled)
        return !1;
      this.toggleFn();
    });
  }
  setToggleIcon() {
    var s;
    const e = this.getItemByValue(this.value), t = this.toggle.querySelector("[data-icon]");
    if (t.innerHTML = "", t) {
      const n = y(
        this.apiUrl && this.apiIconTag ? this.apiIconTag || "" : ((s = e == null ? void 0 : e.options) == null ? void 0 : s.icon) || ""
      );
      this.value && this.apiUrl && this.apiIconTag && e[this.apiFieldsMap.icon] && (n.src = e[this.apiFieldsMap.icon] || ""), t.append(n), !n || !(n != null && n.src) ? t.classList.add("hidden") : t.classList.remove("hidden");
    }
  }
  setToggleTitle() {
    var t;
    const e = this.toggle.querySelector("[data-title]");
    if (e.classList.add("truncate"), e.innerHTML = "", e) {
      const s = ((t = this.getItemByValue(this.value)) == null ? void 0 : t.title) || this.placeholder;
      e.innerHTML = s, this.toggle.append(e);
    }
  }
  buildTags() {
    this.isDisabled && this.wrapper.classList.add("disabled"), this.buildTagsInput(), this.setTagsItems();
  }
  reassignTagsInputPlaceholder(e) {
    this.tagsInput.placeholder = e, this.tagsInputHelper.innerHTML = e, this.calculateInputWidth();
  }
  buildTagsItem(e) {
    var a, d, h, p;
    const t = this.getItemByValue(e);
    let s, n, i, o;
    const r = document.createElement("div");
    if (r.setAttribute("data-tag-value", e), this.tagsItemClasses && B(this.tagsItemClasses, r), this.tagsItemTemplate && (s = y(this.tagsItemTemplate), r.append(s)), (a = t == null ? void 0 : t.options) != null && a.icon || this.apiIconTag) {
      const c = y(
        this.apiUrl && this.apiIconTag ? this.apiIconTag : (d = t == null ? void 0 : t.options) == null ? void 0 : d.icon
      );
      this.apiUrl && this.apiIconTag && t[this.apiFieldsMap.icon] && (c.src = t[this.apiFieldsMap.icon] || ""), o = s ? s.querySelector("[data-icon]") : document.createElement("span"), o.append(c), s || r.append(o);
    }
    s && s.querySelector("[data-icon]") && !((h = t == null ? void 0 : t.options) != null && h.icon) && !this.apiUrl && !this.apiIconTag && !t[(p = this.apiFieldsMap) == null ? void 0 : p.icon] && s.querySelector("[data-icon]").classList.add("hidden"), n = s ? s.querySelector("[data-title]") : document.createElement("span"), n.textContent = t.title || "", s || r.append(n), s ? i = s.querySelector("[data-remove]") : (i = document.createElement("span"), i.textContent = "X", r.append(i)), i.addEventListener("click", () => {
      this.value = this.value.filter((c) => c !== e), this.selectedItems = this.selectedItems.filter((c) => c !== e), this.value.length || this.reassignTagsInputPlaceholder(this.placeholder), this.unselectMultipleItems(), this.selectMultipleItems(), r.remove(), this.fireEvent("change", this.value), w("change.hs.select", this.el, this.value);
    }), this.wrapper.append(r);
  }
  getItemByValue(e) {
    return this.apiUrl ? this.remoteOptions.find(
      (s) => s[this.apiFieldsMap.title] === e
    ) : this.selectOptions.find((s) => s.val === e);
  }
  setTagsItems() {
    this.value && this.value.forEach((e) => {
      this.selectedItems.includes(e) || this.buildTagsItem(e), this.selectedItems = this.selectedItems.includes(e) ? this.selectedItems : [...this.selectedItems, e];
    });
  }
  buildTagsInput() {
    this.tagsInput = document.createElement("input"), this.tagsInputId && (this.tagsInput.id = this.tagsInputId), this.tagsInputClasses && B(this.tagsInputClasses, this.tagsInput), this.tagsInput.addEventListener("focus", () => {
      this.isOpened || this.open();
    }), this.tagsInput.addEventListener("input", () => this.calculateInputWidth()), this.tagsInput.addEventListener(
      "input",
      Ce(
        (e) => this.searchOptions(e.target.value)
      )
    ), this.tagsInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && this.isAddTagOnEnter) {
        const t = e.target.value;
        if (this.selectOptions.find((s) => s.val === t))
          return !1;
        this.addSelectOption(t, t), this.buildOption(t, t), this.dropdown.querySelector(`[data-value="${t}"]`).click(), this.resetTagsInputField();
      }
    }), this.wrapper.append(this.tagsInput), setTimeout(() => {
      this.adjustInputWidth(), this.reassignTagsInputPlaceholder(
        this.value.length ? "" : this.placeholder
      );
    });
  }
  buildDropdown() {
    this.dropdown = y(this.dropdownTag || "<div></div>"), this.dropdown.setAttribute("data-hs-select-dropdown", ""), this.dropdownScope === "parent" && this.dropdown.classList.add("absolute", "top-full"), this.dropdown.role = "listbox", this.dropdown.tabIndex = -1, this.dropdown.ariaOrientation = "vertical", this.isOpened || this.dropdown.classList.add("hidden"), this.dropdownClasses && B(this.dropdownClasses, this.dropdown), this.wrapper && this.wrapper.append(this.dropdown), this.dropdown && this.hasSearch && this.buildSearch(), this.selectOptions && this.selectOptions.forEach(
      (e, t) => this.buildOption(
        e.title,
        e.val,
        e.disabled,
        e.selected,
        e.options,
        `${t}`
      )
    ), this.apiUrl && this.optionsFromRemoteData(), this.dropdownScope === "window" && this.buildPopper();
  }
  buildPopper() {
    typeof Popper < "u" && Popper.createPopper && (document.body.appendChild(this.dropdown), this.popperInstance = Popper.createPopper(
      this.mode === "tags" ? this.wrapper : this.toggle,
      this.dropdown,
      {
        placement: at[this.dropdownPlacement] || "bottom",
        strategy: "fixed",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 5]
            }
          }
        ]
      }
    ));
  }
  updateDropdownWidth() {
    const e = this.mode === "tags" ? this.wrapper : this.toggle;
    this.dropdown.style.width = `${e.clientWidth}px`;
  }
  buildSearch() {
    let e;
    this.searchWrapper = y(
      this.searchWrapperTemplate || "<div></div>"
    ), this.searchWrapperClasses && B(this.searchWrapperClasses, this.searchWrapper), e = this.searchWrapper.querySelector("[data-input]");
    const t = y(
      this.searchTemplate || '<input type="text" />'
    );
    this.search = t.tagName === "INPUT" ? t : t.querySelector(":scope input"), this.search.placeholder = this.searchPlaceholder, this.searchClasses && B(this.searchClasses, this.search), this.searchId && (this.search.id = this.searchId), this.search.addEventListener(
      "input",
      Ce((s) => {
        this.apiUrl ? this.remoteSearch(s.target.value) : this.searchOptions(s.target.value);
      })
    ), e ? e.append(t) : this.searchWrapper.append(t), this.dropdown.append(this.searchWrapper);
  }
  buildOption(e, t, s = !1, n = !1, i, o = "1", r) {
    let a = null, d = null, h = null, p = null;
    const c = y(this.optionTag || "<div></div>");
    if (c.setAttribute("data-value", t), c.setAttribute("data-title-value", e), c.setAttribute("tabIndex", o), c.classList.add("cursor-pointer"), c.setAttribute("data-id", r || `${this.optionId}`), r || this.optionId++, s && c.classList.add("disabled"), n && (this.isMultiple ? this.value = [...this.value, t] : this.value = t), this.optionTemplate && (a = y(this.optionTemplate), c.append(a)), a ? (d = a.querySelector("[data-title]"), d.textContent = e || "") : c.textContent = e || "", i) {
      if (i.icon) {
        const u = y(this.apiIconTag ?? i.icon);
        if (u.classList.add("max-w-full"), this.apiUrl && (u.setAttribute("alt", e), u.setAttribute("src", i.icon)), a)
          h = a.querySelector("[data-icon]"), h.append(u);
        else {
          const g = y("<div></div>");
          this.iconClasses && B(this.iconClasses, g), g.append(u), c.append(g);
        }
      }
      if (i.description)
        if (a)
          p = a.querySelector("[data-description]"), p && p.append(i.description);
        else {
          const u = y("<div></div>");
          u.textContent = i.description, this.descriptionClasses && B(this.descriptionClasses, u), c.append(u);
        }
    }
    a && a.querySelector("[data-icon]") && !i && !(i != null && i.icon) && a.querySelector("[data-icon]").classList.add("hidden"), this.value && (this.isMultiple ? this.value.includes(t) : this.value === t) && c.classList.add("selected"), s || c.addEventListener("click", () => this.onSelectOption(t)), this.optionClasses && B(this.optionClasses, c), this.dropdown && this.dropdown.append(c), n && this.setNewValue();
  }
  buildOptionFromRemoteData(e, t, s = !1, n = !1, i = "1", o, r) {
    i ? this.buildOption(e, t, s, n, r, i, o) : alert(
      "ID parameter is required for generating remote options! Please check your API endpoint have it."
    );
  }
  buildOptionsFromRemoteData(e) {
    e.forEach((t, s) => {
      let n = null, i = "";
      const o = {
        id: "",
        title: "",
        icon: null,
        description: null,
        rest: {}
      };
      Object.keys(t).forEach((r) => {
        var a;
        t[this.apiFieldsMap.id] && (n = t[this.apiFieldsMap.id]), t[this.apiFieldsMap.title] && (i = t[this.apiFieldsMap.title]), t[this.apiFieldsMap.icon] && (o.icon = t[this.apiFieldsMap.icon]), t[(a = this.apiFieldsMap) == null ? void 0 : a.description] && (o.description = t[this.apiFieldsMap.description]), o.rest[r] = t[r];
      }), this.buildOriginalOption(
        i,
        i,
        n,
        !1,
        !1,
        o
      ), this.buildOptionFromRemoteData(
        i,
        i,
        !1,
        !1,
        `${s}`,
        n,
        o
      );
    }), this.sortElements(this.el, "option"), this.sortElements(this.dropdown, "[data-value]");
  }
  async optionsFromRemoteData(e = "") {
    const t = await this.apiRequest(e);
    this.remoteOptions = t, t.length ? this.buildOptionsFromRemoteData(this.remoteOptions) : console.log("There is no data were responded!");
  }
  async apiRequest(e = "") {
    try {
      let t = this.apiUrl;
      const s = this.apiSearchQueryKey ? `${this.apiSearchQueryKey}=${e.toLowerCase()}` : null, n = `${this.apiQuery}`, i = this.apiOptions || {};
      s && (t += `?${s}`), this.apiQuery && (t += `${s ? "&" : "?"}${n}`);
      const r = await (await fetch(t, i)).json();
      return this.apiDataPart ? r[this.apiDataPart] : r;
    } catch (t) {
      console.error(t);
    }
  }
  sortElements(e, t) {
    const s = Array.from(e.querySelectorAll(t));
    s.sort((n, i) => {
      const o = n.classList.contains("selected") || n.hasAttribute("selected"), r = i.classList.contains("selected") || i.hasAttribute("selected");
      return o && !r ? -1 : !o && r ? 1 : 0;
    }), s.forEach((n) => e.appendChild(n));
  }
  async remoteSearch(e) {
    const t = await this.apiRequest(e);
    this.remoteOptions = t;
    let s = t.map((r) => `${r.id}`), n = null;
    const i = this.dropdown.querySelectorAll("[data-value]");
    this.el.querySelectorAll("[data-hs-select-option]").forEach((r) => {
      var d;
      const a = r.getAttribute("data-id");
      !s.includes(a) && !((d = this.value) != null && d.includes(r.value)) && this.destroyOriginalOption(r.value);
    }), i.forEach((r) => {
      var d;
      const a = r.getAttribute("data-id");
      !s.includes(a) && !((d = this.value) != null && d.includes(r.getAttribute("data-value"))) ? this.destroyOption(r.getAttribute("data-value")) : s = s.filter((h) => h !== a);
    }), n = t.filter(
      (r) => s.includes(`${r.id}`)
    ), n.length ? this.buildOptionsFromRemoteData(n) : console.log("There is no data were responded!");
  }
  destroyOption(e) {
    const t = this.dropdown.querySelector(`[data-value="${e}"]`);
    if (!t)
      return !1;
    t.remove();
  }
  buildOriginalOption(e, t, s, n, i, o) {
    const r = y("<option></option>");
    r.setAttribute("value", t), n && r.setAttribute("disabled", "disabled"), i && r.setAttribute("selected", "selected"), s && r.setAttribute("data-id", s), r.setAttribute("data-hs-select-option", JSON.stringify(o)), r.innerText = e, this.el.append(r);
  }
  destroyOriginalOption(e) {
    const t = this.el.querySelector(`[value="${e}"]`);
    if (!t)
      return !1;
    t.remove();
  }
  buildTagsInputHelper() {
    this.tagsInputHelper = document.createElement("span"), this.tagsInputHelper.style.fontSize = window.getComputedStyle(
      this.tagsInput
    ).fontSize, this.tagsInputHelper.style.fontFamily = window.getComputedStyle(
      this.tagsInput
    ).fontFamily, this.tagsInputHelper.style.fontWeight = window.getComputedStyle(
      this.tagsInput
    ).fontWeight, this.tagsInputHelper.style.letterSpacing = window.getComputedStyle(
      this.tagsInput
    ).letterSpacing, this.tagsInputHelper.style.visibility = "hidden", this.tagsInputHelper.style.whiteSpace = "pre", this.tagsInputHelper.style.position = "absolute", this.wrapper.appendChild(this.tagsInputHelper);
  }
  calculateInputWidth() {
    this.tagsInputHelper.textContent = this.tagsInput.value || this.tagsInput.placeholder;
    const e = parseInt(window.getComputedStyle(this.tagsInput).paddingLeft) + parseInt(window.getComputedStyle(this.tagsInput).paddingRight), t = parseInt(window.getComputedStyle(this.tagsInput).borderLeftWidth) + parseInt(window.getComputedStyle(this.tagsInput).borderRightWidth), s = this.tagsInputHelper.offsetWidth + e + t, n = this.wrapper.offsetWidth - (parseInt(window.getComputedStyle(this.wrapper).paddingLeft) + parseInt(window.getComputedStyle(this.wrapper).paddingRight));
    this.tagsInput.style.width = `${Math.min(s, n) + 2}px`;
  }
  adjustInputWidth() {
    this.buildTagsInputHelper(), this.calculateInputWidth();
  }
  onSelectOption(e) {
    if (this.clearSelections(), this.isMultiple ? (this.value = this.value.includes(e) ? Array.from(this.value).filter((t) => t !== e) : [...Array.from(this.value), e], this.selectMultipleItems(), this.setNewValue()) : (this.value = e, this.selectSingleItem(), this.setNewValue()), this.fireEvent("change", this.value), w("change.hs.select", this.el, this.value), this.mode === "tags") {
      const t = this.selectedItems.filter(
        (s) => !this.value.includes(s)
      );
      t.length && t.forEach((s) => {
        this.selectedItems = this.selectedItems.filter((n) => n !== s), this.wrapper.querySelector(`[data-tag-value="${s}"]`).remove();
      }), this.resetTagsInputField();
    }
    this.isMultiple || (this.toggle.querySelector("[data-icon]") && this.setToggleIcon(), this.toggle.querySelector("[data-title]") && this.setToggleTitle(), this.close()), !this.value.length && this.mode === "tags" && this.reassignTagsInputPlaceholder(this.placeholder), this.isOpened && this.mode === "tags" && this.tagsInput && this.tagsInput.focus(), this.triggerChangeEventForNativeSelect();
  }
  triggerChangeEventForNativeSelect() {
    const e = new Event("change", { bubbles: !0 });
    this.el.dispatchEvent(e);
  }
  addSelectOption(e, t, s, n, i) {
    this.selectOptions = [
      ...this.selectOptions,
      {
        title: e,
        val: t,
        disabled: s,
        selected: n,
        options: i
      }
    ];
  }
  removeSelectOption(e, t = !1) {
    if (!!!this.selectOptions.some(
      (n) => n.val === e
    ))
      return !1;
    this.selectOptions = this.selectOptions.filter(
      (n) => n.val !== e
    ), this.value = t ? this.value.filter((n) => n !== e) : e;
  }
  resetTagsInputField() {
    this.tagsInput.value = "", this.reassignTagsInputPlaceholder(""), this.searchOptions("");
  }
  clearSelections() {
    Array.from(this.dropdown.children).forEach((e) => {
      e.classList.contains("selected") && e.classList.remove("selected");
    }), Array.from(this.el.children).forEach((e) => {
      e.selected && (e.selected = !1);
    });
  }
  setNewValue() {
    var e;
    this.mode === "tags" ? this.setTagsItems() : (e = this.value) != null && e.length ? this.toggleTextWrapper.innerHTML = this.stringFromValue() : this.toggleTextWrapper.innerHTML = this.placeholder;
  }
  stringFromValueBasic(e) {
    const t = [];
    let s = "";
    if (e.forEach((n) => {
      this.isMultiple ? this.value.includes(n.val) && t.push(n.title) : this.value === n.val && t.push(n.title);
    }), this.toggleCountText && this.toggleCountText !== "" && t.length >= this.toggleCountTextMinItems)
      if (this.toggleCountTextMode === "nItemsAndCount") {
        const n = t.slice(0, this.toggleCountTextMinItems - 1);
        s = `${n.join(this.toggleSeparators.items)} ${this.toggleSeparators.betweenItemsAndCounter} ${t.length - n.length} ${this.toggleCountText}`;
      } else
        s = `${t.length} ${this.toggleCountText}`;
    else
      s = t.join(this.toggleSeparators.items);
    return s;
  }
  stringFromValueRemoteData() {
    const e = this.dropdown.querySelectorAll("[data-title-value]"), t = [];
    let s = "";
    if (e.forEach((n) => {
      const i = n.getAttribute("data-value");
      this.isMultiple ? this.value.includes(i) && t.push(i) : this.value === i && t.push(i);
    }), this.toggleCountText && this.toggleCountText !== "" && t.length >= this.toggleCountTextMinItems)
      if (this.toggleCountTextMode === "nItemsAndCount") {
        const n = t.slice(0, this.toggleCountTextMinItems - 1);
        s = `${n.join(this.toggleSeparators.items)} ${this.toggleSeparators.betweenItemsAndCounter} ${t.length - n.length} ${this.toggleCountText}`;
      } else
        s = `${t.length} ${this.toggleCountText}`;
    else
      s = t.join(this.toggleSeparators.items);
    return s;
  }
  stringFromValue() {
    return this.apiUrl ? this.stringFromValueRemoteData() : this.stringFromValueBasic(this.selectOptions);
  }
  selectSingleItem() {
    const e = Array.from(this.el.children).find(
      (s) => this.value === s.value
    );
    e.selected = !0;
    const t = Array.from(this.dropdown.children).find(
      (s) => this.value === s.getAttribute("data-value")
    );
    t && t.classList.add("selected");
  }
  selectMultipleItems() {
    Array.from(this.dropdown.children).filter((e) => this.value.includes(e.getAttribute("data-value"))).forEach((e) => e.classList.add("selected")), Array.from(this.el.children).filter((e) => this.value.includes(e.value)).forEach((e) => e.selected = !0);
  }
  unselectMultipleItems() {
    Array.from(this.dropdown.children).forEach(
      (e) => e.classList.remove("selected")
    ), Array.from(this.el.children).forEach(
      (e) => e.selected = !1
    );
  }
  searchOptions(e) {
    this.searchNoResult && (this.searchNoResult.remove(), this.searchNoResult = null), this.searchNoResult = y(this.searchNoResultTemplate), this.searchNoResult.innerText = this.searchNoResultText, B(this.searchNoResultClasses, this.searchNoResult);
    const t = this.dropdown.querySelectorAll("[data-value]");
    let s = !1, n;
    this.searchLimit && (n = 0), t.forEach((i) => {
      const o = i.getAttribute("data-title-value").toLocaleLowerCase(), r = e ? e.split("").map((c) => c.match(/\w/) ? `${c}[\\W_]*` : "\\W*").join("") : "", a = new RegExp(r, "i"), d = this.isSearchDirectMatch, h = o.trim();
      (e ? d ? !h.toLowerCase().includes(e.toLowerCase()) || n >= this.searchLimit : !a.test(h) || n >= this.searchLimit : !a.test(h)) ? i.classList.add("hidden") : (i.classList.remove("hidden"), s = !0, this.searchLimit && n++);
    }), s || this.dropdown.append(this.searchNoResult);
  }
  eraseToggleIcon() {
    const e = this.toggle.querySelector("[data-icon]");
    e && (e.innerHTML = null, e.classList.add("hidden"));
  }
  eraseToggleTitle() {
    const e = this.toggle.querySelector("[data-title]");
    e ? e.innerHTML = this.placeholder : this.toggleTextWrapper.innerHTML = this.placeholder;
  }
  toggleFn() {
    this.isOpened ? this.close() : this.open();
  }
  // Public methods
  destroy() {
    const e = this.el.parentElement.parentElement;
    this.el.classList.remove("hidden"), this.el.style.display = "", e.prepend(this.el), e.querySelector(".hs-select").remove(), this.wrapper = null;
  }
  open() {
    var t;
    const e = ((t = window == null ? void 0 : window.$hsSelectCollection) == null ? void 0 : t.find((s) => s.element.isOpened)) || null;
    if (e && e.element.close(), this.animationInProcess)
      return !1;
    this.animationInProcess = !0, this.dropdownScope === "window" && this.dropdown.classList.add("invisible"), this.dropdown.classList.remove("hidden"), this.recalculateDirection(), setTimeout(() => {
      var s;
      (s = this == null ? void 0 : this.toggle) != null && s.ariaExpanded && (this.toggle.ariaExpanded = "true"), this.wrapper.classList.add("active"), this.dropdown.classList.add("opened"), this.dropdown.classList.contains("w-full") && this.dropdownScope === "window" && this.updateDropdownWidth(), this.popperInstance && this.dropdownScope === "window" && (this.popperInstance.update(), this.dropdown.classList.remove("invisible")), this.hasSearch && !this.preventSearchFocus && this.search.focus(), this.animationInProcess = !1;
    }), this.isOpened = !0;
  }
  close() {
    var e, t, s, n;
    if (this.animationInProcess)
      return !1;
    this.animationInProcess = !0, (e = this == null ? void 0 : this.toggle) != null && e.ariaExpanded && (this.toggle.ariaExpanded = "false"), this.wrapper.classList.remove("active"), this.dropdown.classList.remove("opened", "bottom-full", "top-full"), (t = this.dropdownDirectionClasses) != null && t.bottom && this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom), (s = this.dropdownDirectionClasses) != null && s.top && this.dropdown.classList.remove(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = "", this.dropdown.style.marginBottom = "", R(this.dropdown, () => {
      this.dropdown.classList.add("hidden"), this.hasSearch && (this.search.value = "", this.search.dispatchEvent(new Event("input", { bubbles: !0 })), this.search.blur()), this.animationInProcess = !1;
    }), (n = this.dropdown.querySelector(".hs-select-option-highlighted")) == null || n.classList.remove("hs-select-option-highlighted"), this.isOpened = !1;
  }
  addOption(e) {
    let t = `${this.selectOptions.length}`;
    const s = (n) => {
      const { title: i, val: o, disabled: r, selected: a, options: d } = n;
      !!this.selectOptions.some(
        (p) => p.val === o
      ) || (this.addSelectOption(i, o, r, a, d), this.buildOption(i, o, r, a, d, t), this.buildOriginalOption(i, o, null, r, a, d), a && !this.isMultiple && this.onSelectOption(o));
    };
    Array.isArray(e) ? e.forEach((n) => {
      s(n);
    }) : s(e);
  }
  removeOption(e) {
    const t = (s, n = !1) => {
      !!this.selectOptions.some(
        (o) => o.val === s
      ) && (this.removeSelectOption(s, n), this.destroyOption(s), this.destroyOriginalOption(s), this.value === s && (this.value = null, this.eraseToggleTitle(), this.eraseToggleIcon()));
    };
    Array.isArray(e) ? e.forEach((s) => {
      t(s, this.isMultiple);
    }) : t(e, this.isMultiple), this.setNewValue();
  }
  recalculateDirection() {
    var e, t, s, n;
    lt(
      this.dropdown,
      this.toggle || this.tagsInput,
      "bottom",
      this.dropdownSpace,
      this.viewport
    ) ? (this.dropdown.classList.remove("bottom-full"), (e = this.dropdownDirectionClasses) != null && e.bottom && this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom), this.dropdown.style.marginBottom = "", this.dropdown.classList.add("top-full"), (t = this.dropdownDirectionClasses) != null && t.top && this.dropdown.classList.add(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = `${this.dropdownSpace}px`) : (this.dropdown.classList.remove("top-full"), (s = this.dropdownDirectionClasses) != null && s.top && this.dropdown.classList.remove(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = "", this.dropdown.classList.add("bottom-full"), (n = this.dropdownDirectionClasses) != null && n.bottom && this.dropdown.classList.add(this.dropdownDirectionClasses.bottom), this.dropdown.style.marginBottom = `${this.dropdownSpace}px`);
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsSelectCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsSelectCollection || (window.$hsSelectCollection = []), document.querySelectorAll("[data-hs-select]:not(.--prevent-on-load-init)").forEach((e) => {
      if (!window.$hsSelectCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      )) {
        const t = e.getAttribute("data-hs-select"), s = t ? JSON.parse(t) : {};
        new oe(e, s);
      }
    }), window.$hsSelectCollection && (window.addEventListener("click", (e) => {
      const t = e.target;
      oe.closeCurrentlyOpened(t);
    }), document.addEventListener(
      "keydown",
      (e) => oe.accessibility(e)
    ));
  }
  static open(e) {
    const t = window.$hsSelectCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && !t.element.isOpened && t.element.open();
  }
  static close(e) {
    const t = window.$hsSelectCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && t.element.isOpened && t.element.close();
  }
  static closeCurrentlyOpened(e = null) {
    if (!e.closest(".hs-select.active") && !e.closest("[data-hs-select-dropdown].opened")) {
      const t = window.$hsSelectCollection.filter((s) => s.element.isOpened) || null;
      t && t.forEach((s) => {
        s.element.close();
      });
    }
  }
  // Accessibility methods
  static accessibility(e) {
    if (window.$hsSelectCollection.find((s) => s.element.isOpened) && rs.includes(e.code) && !e.metaKey)
      switch (e.code) {
        case "Escape":
          e.preventDefault(), this.onEscape();
          break;
        case "ArrowUp":
          e.preventDefault(), e.stopImmediatePropagation(), this.onArrow();
          break;
        case "ArrowDown":
          e.preventDefault(), e.stopImmediatePropagation(), this.onArrow(!1);
          break;
        case "Tab":
          e.preventDefault(), e.stopImmediatePropagation(), this.onTab(e.shiftKey);
          break;
        case "Home":
          e.preventDefault(), e.stopImmediatePropagation(), this.onStartEnd();
          break;
        case "End":
          e.preventDefault(), e.stopImmediatePropagation(), this.onStartEnd(!1);
          break;
        case "Enter":
          e.preventDefault(), this.onEnter(e);
          break;
      }
  }
  static onEscape() {
    const e = window.$hsSelectCollection.find((t) => t.element.isOpened);
    e && e.element.close();
  }
  static onArrow(e = !0) {
    const t = window.$hsSelectCollection.find((s) => s.element.isOpened);
    if (t) {
      const s = t.element.dropdown;
      if (!s)
        return !1;
      const i = (e ? Array.from(
        s.querySelectorAll(":scope > *:not(.hidden)")
      ).reverse() : Array.from(s.querySelectorAll(":scope > *:not(.hidden)"))).filter(
        (a) => !a.classList.contains("disabled")
      ), o = s.querySelector(".hs-select-option-highlighted") || s.querySelector(".selected");
      o || i[0].classList.add("hs-select-option-highlighted");
      let r = i.findIndex((a) => a === o);
      r + 1 < i.length && r++, i[r].focus(), o && o.classList.remove("hs-select-option-highlighted"), i[r].classList.add("hs-select-option-highlighted");
    }
  }
  static onTab(e = !0) {
    const t = window.$hsSelectCollection.find((s) => s.element.isOpened);
    if (t) {
      const s = t.element.dropdown;
      if (!s)
        return !1;
      const i = (e ? Array.from(
        s.querySelectorAll(":scope >  *:not(.hidden)")
      ).reverse() : Array.from(s.querySelectorAll(":scope >  *:not(.hidden)"))).filter(
        (a) => !a.classList.contains("disabled")
      ), o = s.querySelector(".hs-select-option-highlighted") || s.querySelector(".selected");
      o || i[0].classList.add("hs-select-option-highlighted");
      let r = i.findIndex((a) => a === o);
      if (r + 1 < i.length)
        r++;
      else
        return o && o.classList.remove("hs-select-option-highlighted"), t.element.close(), t.element.toggle.focus(), !1;
      i[r].focus(), o && o.classList.remove("hs-select-option-highlighted"), i[r].classList.add("hs-select-option-highlighted");
    }
  }
  static onStartEnd(e = !0) {
    const t = window.$hsSelectCollection.find((s) => s.element.isOpened);
    if (t) {
      const s = t.element.dropdown;
      if (!s)
        return !1;
      const i = (e ? Array.from(s.querySelectorAll(":scope >  *:not(.hidden)")) : Array.from(
        s.querySelectorAll(":scope >  *:not(.hidden)")
      ).reverse()).filter(
        (r) => !r.classList.contains("disabled")
      ), o = s.querySelector(".hs-select-option-highlighted");
      i.length && (i[0].focus(), o && o.classList.remove("hs-select-option-highlighted"), i[0].classList.add("hs-select-option-highlighted"));
    }
  }
  static onEnter(e) {
    const t = e.target.previousSibling;
    if (window.$hsSelectCollection.find((s) => s.element.el === t)) {
      const s = window.$hsSelectCollection.find(
        (i) => i.element.isOpened
      ), n = window.$hsSelectCollection.find(
        (i) => i.element.el === t
      );
      s.element.close(), n.element.open();
    } else {
      const s = window.$hsSelectCollection.find(
        (n) => n.element.isOpened
      );
      s && s.element.onSelectOption(
        e.target.dataset.value || ""
      );
    }
  }
}
window.addEventListener("load", () => {
  oe.autoInit();
});
document.addEventListener("scroll", () => {
  if (!window.$hsSelectCollection)
    return !1;
  const l = window.$hsSelectCollection.find((e) => e.element.isOpened);
  l && l.element.recalculateDirection();
});
typeof window < "u" && (window.HSSelect = oe);
/*
 * HSStepper
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class De extends I {
  constructor(e, t) {
    super(e, t);
    const s = e.getAttribute("data-hs-stepper"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.currentIndex = (i == null ? void 0 : i.currentIndex) || 1, this.mode = (i == null ? void 0 : i.mode) || "linear", this.isCompleted = typeof (i == null ? void 0 : i.isCompleted) < "u" ? i == null ? void 0 : i.isCompleted : !1, this.totalSteps = 1, this.navItems = [], this.contentItems = [], this.init();
  }
  init() {
    this.createCollection(window.$hsStepperCollection, this), this.buildNav(), this.buildContent(), this.buildButtons(), this.setTotalSteps();
  }
  getUncompletedSteps(e = !1) {
    return this.navItems.filter(
      ({ isCompleted: t, isSkip: s }) => e ? !t || s : !t && !s
    );
  }
  setTotalSteps() {
    this.navItems.forEach((e) => {
      const { index: t } = e;
      t > this.totalSteps && (this.totalSteps = t);
    });
  }
  // Nav
  buildNav() {
    this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach((e) => this.addNavItem(e)), this.navItems.forEach((e) => this.buildNavItem(e));
  }
  buildNavItem(e) {
    const { index: t, isDisabled: s, el: n } = e;
    t === this.currentIndex && this.setCurrentNavItem(), (this.mode !== "linear" || s) && n.addEventListener("click", () => this.handleNavItemClick(e));
  }
  addNavItem(e) {
    const {
      index: t,
      isFinal: s = !1,
      isCompleted: n = !1,
      isSkip: i = !1,
      isOptional: o = !1,
      isDisabled: r = !1,
      isProcessed: a = !1,
      hasError: d = !1
    } = JSON.parse(e.getAttribute("data-hs-stepper-nav-item"));
    n && e.classList.add("success"), i && e.classList.add("skipped"), r && ((e.tagName === "BUTTON" || e.tagName === "INPUT") && e.setAttribute("disabled", "disabled"), e.classList.add("disabled")), d && e.classList.add("error"), this.navItems.push({
      index: t,
      isFinal: s,
      isCompleted: n,
      isSkip: i,
      isOptional: o,
      isDisabled: r,
      isProcessed: a,
      hasError: d,
      el: e
    });
  }
  setCurrentNavItem() {
    this.navItems.forEach((e) => {
      const { index: t, el: s } = e;
      t === this.currentIndex ? this.setCurrentNavItemActions(s) : this.unsetCurrentNavItemActions(s);
    });
  }
  setCurrentNavItemActions(e) {
    e.classList.add("active"), this.fireEvent("active", this.currentIndex), w("active.hs.stepper", this.el, this.currentIndex);
  }
  getNavItem(e = this.currentIndex) {
    return this.navItems.find(({ index: t }) => t === e);
  }
  setProcessedNavItemActions(e) {
    e.isProcessed = !0, e.el.classList.add("processed");
  }
  setErrorNavItemActions(e) {
    e.hasError = !0, e.el.classList.add("error");
  }
  unsetCurrentNavItemActions(e) {
    e.classList.remove("active");
  }
  handleNavItemClick(e) {
    const { index: t } = e;
    this.currentIndex = t, this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep();
  }
  // Content
  buildContent() {
    this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach((e) => this.addContentItem(e)), this.navItems.forEach((e) => this.buildContentItem(e));
  }
  buildContentItem(e) {
    const { index: t } = e;
    t === this.currentIndex && this.setCurrentContentItem();
  }
  addContentItem(e) {
    const {
      index: t,
      isFinal: s = !1,
      isCompleted: n = !1,
      isSkip: i = !1
    } = JSON.parse(e.getAttribute("data-hs-stepper-content-item"));
    n && e.classList.add("success"), i && e.classList.add("skipped"), this.contentItems.push({
      index: t,
      isFinal: s,
      isCompleted: n,
      isSkip: i,
      el: e
    });
  }
  setCurrentContentItem() {
    if (this.isCompleted) {
      const e = this.contentItems.find(({ isFinal: s }) => s), t = this.contentItems.filter(
        ({ isFinal: s }) => !s
      );
      return e.el.style.display = "", t.forEach(({ el: s }) => s.style.display = "none"), !1;
    }
    this.contentItems.forEach((e) => {
      const { index: t, el: s } = e;
      t === this.currentIndex ? this.setCurrentContentItemActions(s) : this.unsetCurrentContentItemActions(s);
    });
  }
  hideAllContentItems() {
    this.contentItems.forEach(({ el: e }) => e.style.display = "none");
  }
  setCurrentContentItemActions(e) {
    e.style.display = "";
  }
  unsetCurrentContentItemActions(e) {
    e.style.display = "none";
  }
  disableAll() {
    const e = this.getNavItem(this.currentIndex);
    e.hasError = !1, e.isCompleted = !1, e.isDisabled = !1, e.el.classList.remove("error", "success"), this.disableButtons();
  }
  disableNavItemActions(e) {
    e.isDisabled = !0, e.el.classList.add("disabled");
  }
  enableNavItemActions(e) {
    e.isDisabled = !1, e.el.classList.remove("disabled");
  }
  // Buttons
  buildButtons() {
    this.backBtn = this.el.querySelector("[data-hs-stepper-back-btn]"), this.nextBtn = this.el.querySelector("[data-hs-stepper-next-btn]"), this.skipBtn = this.el.querySelector("[data-hs-stepper-skip-btn]"), this.completeStepBtn = this.el.querySelector(
      "[data-hs-stepper-complete-step-btn]"
    ), this.finishBtn = this.el.querySelector("[data-hs-stepper-finish-btn]"), this.resetBtn = this.el.querySelector("[data-hs-stepper-reset-btn]"), this.buildBackButton(), this.buildNextButton(), this.buildSkipButton(), this.buildCompleteStepButton(), this.buildFinishButton(), this.buildResetButton();
  }
  // back
  buildBackButton() {
    this.backBtn && (this.checkForTheFirstStep(), this.backBtn.addEventListener("click", () => {
      if (this.handleBackButtonClick(), this.mode === "linear") {
        const e = this.navItems.find(
          ({ index: s }) => s === this.currentIndex
        ), t = this.contentItems.find(
          ({ index: s }) => s === this.currentIndex
        );
        if (!e || !t)
          return;
        e.isCompleted && (e.isCompleted = !1, e.isSkip = !1, e.el.classList.remove("success", "skipped")), t.isCompleted && (t.isCompleted = !1, t.isSkip = !1, t.el.classList.remove("success", "skipped")), this.mode === "linear" && this.currentIndex !== this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = ""), this.completeStepBtn && (this.completeStepBtn.style.display = "")), this.showSkipButton(), this.showFinishButton(), this.showCompleteStepButton();
      }
    }));
  }
  handleBackButtonClick() {
    this.currentIndex !== 1 && (this.mode === "linear" && this.removeOptionalClasses(), this.currentIndex--, this.mode === "linear" && this.removeOptionalClasses(), this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.fireEvent("back", this.currentIndex), w("back.hs.stepper", this.el, this.currentIndex));
  }
  checkForTheFirstStep() {
    this.currentIndex === 1 ? this.setToDisabled(this.backBtn) : this.setToNonDisabled(this.backBtn);
  }
  setToDisabled(e) {
    (e.tagName === "BUTTON" || e.tagName === "INPUT") && e.setAttribute("disabled", "disabled"), e.classList.add("disabled");
  }
  setToNonDisabled(e) {
    (e.tagName === "BUTTON" || e.tagName === "INPUT") && e.removeAttribute("disabled"), e.classList.remove("disabled");
  }
  // next
  buildNextButton() {
    this.nextBtn && this.nextBtn.addEventListener("click", () => {
      var e;
      if (this.fireEvent("beforeNext", this.currentIndex), w("beforeNext.hs.stepper", this.el, this.currentIndex), (e = this.getNavItem(this.currentIndex)) != null && e.isProcessed)
        return this.disableAll(), !1;
      this.goToNext();
    });
  }
  unsetProcessedNavItemActions(e) {
    e.isProcessed = !1, e.el.classList.remove("processed");
  }
  handleNextButtonClick(e = !0) {
    if (e)
      this.currentIndex === this.totalSteps ? this.currentIndex = 1 : this.currentIndex++;
    else {
      const t = this.getUncompletedSteps();
      if (t.length === 1) {
        const { index: s } = t[0];
        this.currentIndex = s;
      } else {
        if (this.currentIndex === this.totalSteps)
          return;
        this.currentIndex++;
      }
    }
    this.mode === "linear" && this.removeOptionalClasses(), this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.showSkipButton(), this.showFinishButton(), this.showCompleteStepButton(), this.fireEvent("next", this.currentIndex), w("next.hs.stepper", this.el, this.currentIndex);
  }
  removeOptionalClasses() {
    const e = this.navItems.find(
      ({ index: s }) => s === this.currentIndex
    ), t = this.contentItems.find(
      ({ index: s }) => s === this.currentIndex
    );
    e.isSkip = !1, e.hasError = !1, e.isDisabled = !1, t.isSkip = !1, e.el.classList.remove("skipped", "success", "error"), t.el.classList.remove("skipped", "success", "error");
  }
  // skip
  buildSkipButton() {
    this.skipBtn && (this.showSkipButton(), this.skipBtn.addEventListener("click", () => {
      this.handleSkipButtonClick(), this.mode === "linear" && this.currentIndex === this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"), this.finishBtn && (this.finishBtn.style.display = ""));
    }));
  }
  setSkipItem(e) {
    const t = this.navItems.find(
      ({ index: n }) => n === (e || this.currentIndex)
    ), s = this.contentItems.find(
      ({ index: n }) => n === (e || this.currentIndex)
    );
    !t || !s || (this.setSkipItemActions(t), this.setSkipItemActions(s));
  }
  setSkipItemActions(e) {
    e.isSkip = !0, e.el.classList.add("skipped");
  }
  showSkipButton() {
    if (!this.skipBtn)
      return;
    const { isOptional: e } = this.navItems.find(
      ({ index: t }) => t === this.currentIndex
    );
    e ? this.skipBtn.style.display = "" : this.skipBtn.style.display = "none";
  }
  handleSkipButtonClick() {
    this.setSkipItem(), this.handleNextButtonClick(), this.fireEvent("skip", this.currentIndex), w("skip.hs.stepper", this.el, this.currentIndex);
  }
  // complete
  buildCompleteStepButton() {
    this.completeStepBtn && (this.completeStepBtnDefaultText = this.completeStepBtn.innerText, this.completeStepBtn.addEventListener(
      "click",
      () => this.handleCompleteStepButtonClick()
    ));
  }
  changeTextAndDisableCompleteButtonIfStepCompleted() {
    const e = this.navItems.find(
      ({ index: s }) => s === this.currentIndex
    ), { completedText: t } = JSON.parse(
      this.completeStepBtn.getAttribute("data-hs-stepper-complete-step-btn")
    );
    e && (e.isCompleted ? (this.completeStepBtn.innerText = t || this.completeStepBtnDefaultText, this.completeStepBtn.setAttribute("disabled", "disabled"), this.completeStepBtn.classList.add("disabled")) : (this.completeStepBtn.innerText = this.completeStepBtnDefaultText, this.completeStepBtn.removeAttribute("disabled"), this.completeStepBtn.classList.remove("disabled")));
  }
  setCompleteItem(e) {
    const t = this.navItems.find(
      ({ index: n }) => n === (e || this.currentIndex)
    ), s = this.contentItems.find(
      ({ index: n }) => n === (e || this.currentIndex)
    );
    !t || !s || (this.setCompleteItemActions(t), this.setCompleteItemActions(s));
  }
  setCompleteItemActions(e) {
    e.isCompleted = !0, e.el.classList.add("success");
  }
  showCompleteStepButton() {
    if (!this.completeStepBtn)
      return;
    this.getUncompletedSteps().length === 1 ? this.completeStepBtn.style.display = "none" : this.completeStepBtn.style.display = "";
  }
  handleCompleteStepButtonClick() {
    this.setCompleteItem(), this.fireEvent("complete", this.currentIndex), w("complete.hs.stepper", this.el, this.currentIndex), this.handleNextButtonClick(!1), this.showFinishButton(), this.showCompleteStepButton(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.showSkipButton();
  }
  // finish
  buildFinishButton() {
    this.finishBtn && (this.isCompleted && this.setCompleted(), this.finishBtn.addEventListener(
      "click",
      () => this.handleFinishButtonClick()
    ));
  }
  setCompleted() {
    this.el.classList.add("completed");
  }
  unsetCompleted() {
    this.el.classList.remove("completed");
  }
  showFinishButton() {
    if (!this.finishBtn)
      return;
    this.getUncompletedSteps().length === 1 ? this.finishBtn.style.display = "" : this.finishBtn.style.display = "none";
  }
  handleFinishButtonClick() {
    const e = this.getUncompletedSteps(), t = this.getUncompletedSteps(!0), { el: s } = this.contentItems.find(({ isFinal: o }) => o);
    e.length && e.forEach(({ index: o }) => this.setCompleteItem(o)), this.currentIndex = this.totalSteps, this.setCurrentNavItem(), this.hideAllContentItems();
    const n = this.navItems.find(
      ({ index: o }) => o === this.currentIndex
    );
    (n ? n.el : null).classList.remove("active"), s.style.display = "block", this.backBtn && (this.backBtn.style.display = "none"), this.nextBtn && (this.nextBtn.style.display = "none"), this.skipBtn && (this.skipBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"), this.finishBtn && (this.finishBtn.style.display = "none"), this.resetBtn && (this.resetBtn.style.display = ""), t.length <= 1 && (this.isCompleted = !0, this.setCompleted()), this.fireEvent("finish", this.currentIndex), w("finish.hs.stepper", this.el, this.currentIndex);
  }
  // reset
  buildResetButton() {
    this.resetBtn && this.resetBtn.addEventListener(
      "click",
      () => this.handleResetButtonClick()
    );
  }
  handleResetButtonClick() {
    this.backBtn && (this.backBtn.style.display = ""), this.nextBtn && (this.nextBtn.style.display = ""), this.completeStepBtn && (this.completeStepBtn.style.display = "", this.completeStepBtn.innerText = this.completeStepBtnDefaultText, this.completeStepBtn.removeAttribute("disabled"), this.completeStepBtn.classList.remove("disabled")), this.resetBtn && (this.resetBtn.style.display = "none"), this.navItems.forEach((e) => {
      const { el: t } = e;
      e.isSkip = !1, e.isCompleted = !1, this.unsetCurrentNavItemActions(t), t.classList.remove("success", "skipped");
    }), this.contentItems.forEach((e) => {
      const { el: t } = e;
      e.isSkip = !1, e.isCompleted = !1, this.unsetCurrentContentItemActions(t), t.classList.remove("success", "skipped");
    }), this.currentIndex = 1, this.unsetCompleted(), this.isCompleted = !1, this.setCurrentNavItem(), this.setCurrentContentItem(), this.showFinishButton(), this.showCompleteStepButton(), this.checkForTheFirstStep(), this.fireEvent("reset", this.currentIndex), w("reset.hs.stepper", this.el, this.currentIndex);
  }
  // Public methods
  setProcessedNavItem(e) {
    const t = this.getNavItem(e);
    t && this.setProcessedNavItemActions(t);
  }
  unsetProcessedNavItem(e) {
    const t = this.getNavItem(e);
    t && this.unsetProcessedNavItemActions(t);
  }
  goToNext() {
    this.mode === "linear" && this.setCompleteItem(), this.handleNextButtonClick(this.mode !== "linear"), this.mode === "linear" && this.currentIndex === this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"));
  }
  disableButtons() {
    this.backBtn && this.setToDisabled(this.backBtn), this.nextBtn && this.setToDisabled(this.nextBtn);
  }
  enableButtons() {
    this.backBtn && this.setToNonDisabled(this.backBtn), this.nextBtn && this.setToNonDisabled(this.nextBtn);
  }
  setErrorNavItem(e) {
    const t = this.getNavItem(e);
    t && this.setErrorNavItemActions(t);
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsStepperCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsStepperCollection || (window.$hsStepperCollection = []), document.querySelectorAll("[data-hs-stepper]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsStepperCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new De(e);
    });
  }
}
window.addEventListener("load", () => {
  De.autoInit();
});
typeof window < "u" && (window.HSStepper = De);
/*
 * HSStrongPassword
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Oe extends I {
  constructor(e, t) {
    super(e, t), this.isOpened = !1, this.strength = 0, this.passedRules = /* @__PURE__ */ new Set();
    const s = e.getAttribute("data-hs-strong-password"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.target = i != null && i.target ? typeof (i == null ? void 0 : i.target) == "string" ? document.querySelector(i.target) : i.target : null, this.hints = i != null && i.hints ? typeof (i == null ? void 0 : i.hints) == "string" ? document.querySelector(i.hints) : i.hints : null, this.stripClasses = (i == null ? void 0 : i.stripClasses) || null, this.minLength = (i == null ? void 0 : i.minLength) || 6, this.mode = (i == null ? void 0 : i.mode) || "default", this.popoverSpace = (i == null ? void 0 : i.popoverSpace) || 10, this.checksExclude = (i == null ? void 0 : i.checksExclude) || [], this.availableChecks = [
      "lowercase",
      "uppercase",
      "numbers",
      "special-characters",
      "min-length"
    ].filter((o) => !this.checksExclude.includes(o)), this.specialCharactersSet = (i == null ? void 0 : i.specialCharactersSet) || "!\"#$%&'()*+,-./:;<=>?@[\\\\\\]^_`{|}~", this.target && this.init();
  }
  init() {
    this.createCollection(window.$hsStrongPasswordCollection, this), this.availableChecks.length && this.build();
  }
  build() {
    this.buildStrips(), this.hints && this.buildHints(), this.setStrength(this.target.value), this.target.addEventListener(
      "input",
      (e) => {
        this.setStrength(e.target.value);
      }
    );
  }
  buildStrips() {
    if (this.el.innerHTML = "", this.stripClasses)
      for (let e = 0; e < this.availableChecks.length; e++) {
        const t = y("<div></div>");
        B(this.stripClasses, t), this.el.append(t);
      }
  }
  buildHints() {
    this.weakness = this.hints.querySelector(
      "[data-hs-strong-password-hints-weakness-text]"
    ) || null, this.rules = Array.from(
      this.hints.querySelectorAll(
        "[data-hs-strong-password-hints-rule-text]"
      )
    ) || null, this.rules.forEach((e) => {
      var s;
      const t = e.getAttribute(
        "data-hs-strong-password-hints-rule-text"
      );
      (s = this.checksExclude) != null && s.includes(t) && e.remove();
    }), this.weakness && this.buildWeakness(), this.rules && this.buildRules(), this.mode === "popover" && (this.target.addEventListener("focus", () => {
      this.isOpened = !0, this.hints.classList.remove("hidden"), this.hints.classList.add("block"), this.recalculateDirection();
    }), this.target.addEventListener("blur", () => {
      this.isOpened = !1, this.hints.classList.remove(
        "block",
        "bottom-full",
        "top-full"
      ), this.hints.classList.add("hidden"), this.hints.style.marginTop = "", this.hints.style.marginBottom = "";
    }));
  }
  buildWeakness() {
    this.checkStrength(this.target.value), this.setWeaknessText(), this.target.addEventListener(
      "input",
      () => setTimeout(() => this.setWeaknessText())
    );
  }
  buildRules() {
    this.setRulesText(), this.target.addEventListener(
      "input",
      () => setTimeout(() => this.setRulesText())
    );
  }
  setWeaknessText() {
    const e = this.weakness.getAttribute(
      "data-hs-strong-password-hints-weakness-text"
    ), t = JSON.parse(e);
    this.weakness.textContent = t[this.strength];
  }
  setRulesText() {
    this.rules.forEach((e) => {
      const t = e.getAttribute(
        "data-hs-strong-password-hints-rule-text"
      );
      this.checkIfPassed(e, this.passedRules.has(t));
    });
  }
  togglePopover() {
    const e = this.el.querySelector(".popover");
    e && e.classList.toggle("show");
  }
  checkStrength(e) {
    const t = /* @__PURE__ */ new Set(), s = {
      lowercase: /[a-z]+/,
      uppercase: /[A-Z]+/,
      numbers: /[0-9]+/,
      "special-characters": new RegExp(`[${this.specialCharactersSet}]`)
    };
    let n = 0;
    return this.availableChecks.includes("lowercase") && e.match(s.lowercase) && (n += 1, t.add("lowercase")), this.availableChecks.includes("uppercase") && e.match(s.uppercase) && (n += 1, t.add("uppercase")), this.availableChecks.includes("numbers") && e.match(s.numbers) && (n += 1, t.add("numbers")), this.availableChecks.includes("special-characters") && e.match(s["special-characters"]) && (n += 1, t.add("special-characters")), this.availableChecks.includes("min-length") && e.length >= this.minLength && (n += 1, t.add("min-length")), e.length || (n = 0), n === this.availableChecks.length ? this.el.classList.add("accepted") : this.el.classList.remove("accepted"), this.strength = n, this.passedRules = t, {
      strength: this.strength,
      rules: this.passedRules
    };
  }
  checkIfPassed(e, t = !1) {
    const s = e.querySelector("[data-check]"), n = e.querySelector("[data-uncheck]");
    t ? (e.classList.add("active"), s.classList.remove("hidden"), n.classList.add("hidden")) : (e.classList.remove("active"), s.classList.add("hidden"), n.classList.remove("hidden"));
  }
  setStrength(e) {
    const { strength: t, rules: s } = this.checkStrength(e), n = {
      strength: t,
      rules: s
    };
    this.hideStrips(t), this.fireEvent("change", n), w("change.hs.strongPassword", this.el, n);
  }
  hideStrips(e) {
    Array.from(this.el.children).forEach((t, s) => {
      s < e ? t.classList.add("passed") : t.classList.remove("passed");
    });
  }
  // Public methods
  recalculateDirection() {
    lt(
      this.hints,
      this.target,
      "bottom",
      this.popoverSpace
    ) ? (this.hints.classList.remove("bottom-full"), this.hints.classList.add("top-full"), this.hints.style.marginBottom = "", this.hints.style.marginTop = `${this.popoverSpace}px`) : (this.hints.classList.remove("top-full"), this.hints.classList.add("bottom-full"), this.hints.style.marginTop = "", this.hints.style.marginBottom = `${this.popoverSpace}px`);
  }
  // Static methods
  static getInstance(e) {
    const t = window.$hsStrongPasswordCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return t ? t.element : null;
  }
  static autoInit() {
    window.$hsStrongPasswordCollection || (window.$hsStrongPasswordCollection = []), document.querySelectorAll(
      "[data-hs-strong-password]:not(.--prevent-on-load-init)"
    ).forEach((e) => {
      if (!window.$hsStrongPasswordCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      )) {
        const t = e.getAttribute("data-hs-strong-password"), s = t ? JSON.parse(t) : {};
        new Oe(e, s);
      }
    });
  }
}
window.addEventListener("load", () => {
  Oe.autoInit();
});
document.addEventListener("scroll", () => {
  if (!window.$hsStrongPasswordCollection)
    return !1;
  const l = window.$hsStrongPasswordCollection.find(
    (e) => e.element.isOpened
  );
  l && l.element.recalculateDirection();
});
typeof window < "u" && (window.HSStrongPassword = Oe);
/*
 * HSTabs
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class pe extends I {
  constructor(e, t, s) {
    super(e, t, s), this.toggles = this.el.querySelectorAll("[data-hs-tab]"), this.extraToggleId = this.el.getAttribute("data-hs-tab-select"), this.extraToggle = document.querySelector(this.extraToggleId), this.current = Array.from(this.toggles).find(
      (n) => n.classList.contains("active")
    ), this.currentContentId = this.current.getAttribute("data-hs-tab"), this.currentContent = document.querySelector(this.currentContentId), this.prev = null, this.prevContentId = null, this.prevContent = null, this.init();
  }
  init() {
    this.createCollection(window.$hsTabsCollection, this), this.toggles.forEach((e) => {
      e.addEventListener("click", () => this.open(e));
    }), this.extraToggle && this.extraToggle.addEventListener("change", (e) => this.change(e));
  }
  open(e) {
    var t, s;
    this.prev = this.current, this.prevContentId = this.currentContentId, this.prevContent = this.currentContent, this.current = e, this.currentContentId = this.current.getAttribute("data-hs-tab"), this.currentContent = document.querySelector(this.currentContentId), (t = this == null ? void 0 : this.prev) != null && t.ariaSelected && (this.prev.ariaSelected = "false"), this.prev.classList.remove("active"), this.prevContent.classList.add("hidden"), (s = this == null ? void 0 : this.current) != null && s.ariaSelected && (this.current.ariaSelected = "true"), this.current.classList.add("active"), this.currentContent.classList.remove("hidden"), this.fireEvent("change", {
      el: e,
      prev: this.prevContentId,
      current: this.currentContentId
    }), w("change.hs.tab", e, {
      el: e,
      prev: this.prevContentId,
      current: this.currentContentId
    });
  }
  change(e) {
    const t = document.querySelector(
      `[data-hs-tab="${e.target.value}"]`
    );
    t && t.click();
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsTabsCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsTabsCollection || (window.$hsTabsCollection = []), document.querySelectorAll(
      '[role="tablist"]:not(select):not(.--prevent-on-load-init)'
    ).forEach((e) => {
      window.$hsTabsCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new pe(e);
    }), window.$hsTabsCollection && document.addEventListener("keydown", (e) => pe.accessibility(e));
  }
  static open(e) {
    const t = window.$hsTabsCollection.find(
      (n) => Array.from(n.element.toggles).includes(
        typeof e == "string" ? document.querySelector(e) : e
      )
    ), s = Array.from(t.element.toggles).find(
      (n) => n === (typeof e == "string" ? document.querySelector(e) : e)
    );
    s && !s.classList.contains("active") && t.element.open(s);
  }
  // Accessibility methods
  static accessibility(e) {
    const t = document.querySelector("[data-hs-tab]:focus");
    if (t && ls.includes(e.code) && !e.metaKey) {
      const s = t.closest('[role="tablist"]').getAttribute("data-hs-tabs-vertical");
      switch (e.preventDefault(), e.code) {
        case (s === "true" ? "ArrowUp" : "ArrowLeft"):
          this.onArrow();
          break;
        case (s === "true" ? "ArrowDown" : "ArrowRight"):
          this.onArrow(!1);
          break;
        case "Home":
          this.onStartEnd();
          break;
        case "End":
          this.onStartEnd(!1);
          break;
      }
    }
  }
  static onArrow(e = !0) {
    const t = document.querySelector("[data-hs-tab]:focus").closest('[role="tablist"]'), s = window.$hsTabsCollection.find(
      (n) => n.element.el === t
    );
    if (s) {
      const n = e ? Array.from(s.element.toggles).reverse() : Array.from(s.element.toggles), i = n.find((r) => document.activeElement === r);
      let o = n.findIndex((r) => r === i);
      o = o + 1 < n.length ? o + 1 : 0, n[o].focus(), n[o].click();
    }
  }
  static onStartEnd(e = !0) {
    const t = document.querySelector("[data-hs-tab]:focus").closest('[role="tablist"]'), s = window.$hsTabsCollection.find(
      (n) => n.element.el === t
    );
    if (s) {
      const n = e ? Array.from(s.element.toggles) : Array.from(s.element.toggles).reverse();
      n.length && (n[0].focus(), n[0].click());
    }
  }
  // Backward compatibility
  static on(e, t, s) {
    const n = window.$hsTabsCollection.find(
      (i) => Array.from(i.element.toggles).includes(
        typeof t == "string" ? document.querySelector(t) : t
      )
    );
    n && (n.element.events[e] = s);
  }
}
window.addEventListener("load", () => {
  pe.autoInit();
});
typeof window < "u" && (window.HSTabs = pe);
/*
 * HSTextareaAutoHeight
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Ne extends I {
  constructor(e, t) {
    super(e, t);
    const s = e.getAttribute("data-hs-copy-markup"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.defaultHeight = (i == null ? void 0 : i.defaultHeight) || 0, this.init();
  }
  init() {
    this.createCollection(window.$hsTextareaAutoHeightCollection, this), this.setAutoHeight();
  }
  setAutoHeight() {
    this.isParentHidden() ? this.callbackAccordingToType() : this.textareaSetHeight(3), this.el.addEventListener("input", () => this.textareaSetHeight(3));
  }
  textareaSetHeight(e = 0) {
    this.el.style.height = "auto", this.el.style.height = this.checkIfOneLine() && this.defaultHeight ? `${this.defaultHeight}px` : `${this.el.scrollHeight + e}px`;
  }
  checkIfOneLine() {
    const e = this.el.clientHeight;
    return !(this.el.scrollHeight > e);
  }
  isParentHidden() {
    return this.el.closest(".hs-collapse") || this.el.closest(".hs-overlay");
  }
  parentType() {
    return this.el.closest(".hs-collapse") ? "collapse" : this.el.closest(".hs-overlay") ? "overlay" : !1;
  }
  callbackAccordingToType() {
    if (this.parentType() === "collapse") {
      const e = this.el.closest(".hs-collapse").id, { element: t } = window.HSCollapse.getInstance(
        `[data-hs-collapse="#${e}"]`,
        !0
      );
      t.on("beforeOpen", () => {
        if (!this.el)
          return !1;
        this.textareaSetHeight(3);
      });
    } else if (this.parentType() === "overlay") {
      const { element: e } = window.HSOverlay.getInstance(
        this.el.closest(".hs-overlay"),
        !0
      );
      e.on("open", () => {
        if (!this.el)
          return !1;
        this.textareaSetHeight(3);
      });
    } else
      return !1;
  }
  // Static method
  static getInstance(e, t) {
    const s = window.$hsTextareaAutoHeightCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsTextareaAutoHeightCollection || (window.$hsTextareaAutoHeightCollection = []), document.querySelectorAll(
      "[data-hs-textarea-auto-height]:not(.--prevent-on-load-init)"
    ).forEach((e) => {
      if (!window.$hsTextareaAutoHeightCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      )) {
        const t = e.getAttribute("data-hs-textarea-auto-height"), s = t ? JSON.parse(t) : {};
        new Ne(e, s);
      }
    });
  }
}
window.addEventListener("load", () => {
  Ne.autoInit();
});
typeof window < "u" && (window.HSTextareaAutoHeight = Ne);
/*
 * HSThemeSwitch
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class fe extends I {
  constructor(e, t) {
    super(e, t);
    const s = e.getAttribute("data-hs-theme-switch"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.theme = (i == null ? void 0 : i.theme) || localStorage.getItem("hs_theme") || "default", this.themeSet = ["light", "dark", "default"], this.init();
  }
  init() {
    this.createCollection(window.$hsThemeSwitchCollection, this), this.theme !== "default" && this.setAppearance();
  }
  setResetStyles() {
    const e = document.createElement("style");
    return e.innerText = "*{transition: unset !important;}", e.setAttribute("data-hs-appearance-onload-styles", ""), document.head.appendChild(e), e;
  }
  addSystemThemeObserver() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches: e }) => {
      e ? this.setAppearance("dark", !1) : this.setAppearance("default", !1);
    });
  }
  removeSystemThemeObserver() {
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener;
  }
  // Public methods
  setAppearance(e = this.theme, t = !0, s = !0) {
    const n = document.querySelector("html"), i = this.setResetStyles();
    t && localStorage.setItem("hs_theme", e), e === "auto" && (e = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default"), n.classList.remove("light", "dark", "default", "auto"), n.classList.add(e), setTimeout(() => i.remove()), s && window.dispatchEvent(
      new CustomEvent("on-hs-appearance-change", { detail: e })
    );
  }
  // Static methods
  static getInstance(e) {
    const t = window.$hsThemeSwitchCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return t ? t.element : null;
  }
  static autoInit() {
    window.$hsThemeSwitchCollection || (window.$hsThemeSwitchCollection = []);
    const e = (t) => {
      localStorage.getItem("hs_theme") === "auto" ? t.addSystemThemeObserver() : t.removeSystemThemeObserver();
    };
    document.querySelectorAll("[data-hs-theme-switch]:not(.--prevent-on-load-init)").forEach((t) => {
      if (!window.$hsThemeSwitchCollection.find(
        (s) => {
          var n;
          return ((n = s == null ? void 0 : s.element) == null ? void 0 : n.el) === t;
        }
      )) {
        const s = new fe(t);
        s.el.checked = s.theme === "dark", e(s), s.el.addEventListener("change", (n) => {
          const i = n.target.checked ? "dark" : "default";
          s.setAppearance(i), e(s);
        });
      }
    }), document.querySelectorAll(
      "[data-hs-theme-click-value]:not(.--prevent-on-load-init)"
    ).forEach((t) => {
      const s = t.getAttribute("data-hs-theme-click-value"), n = new fe(t);
      e(n), n.el.addEventListener("click", () => {
        n.setAppearance(s), e(n);
      });
    });
  }
}
window.addEventListener("load", () => {
  fe.autoInit();
});
window.$hsThemeSwitchCollection && window.addEventListener(
  "on-hs-appearance-change",
  (l) => {
    window.$hsThemeSwitchCollection.forEach((e) => {
      e.element.el.checked = l.detail === "dark";
    });
  }
);
typeof window < "u" && (window.HSThemeSwitch = fe);
/*
 * HSToggleCount
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Me extends I {
  constructor(e, t) {
    super(e, t);
    const s = e.getAttribute("data-hs-toggle-count"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    };
    this.target = i != null && i.target ? typeof (i == null ? void 0 : i.target) == "string" ? document.querySelector(i.target) : i.target : null, this.min = (i == null ? void 0 : i.min) || 0, this.max = (i == null ? void 0 : i.max) || 0, this.duration = (i == null ? void 0 : i.duration) || 700, this.isChecked = this.target.checked || !1, this.target && this.init();
  }
  init() {
    this.createCollection(window.$hsToggleCountCollection, this), this.isChecked && (this.el.innerText = String(this.max)), this.target.addEventListener("change", () => {
      this.isChecked = !this.isChecked, this.toggle();
    });
  }
  toggle() {
    this.isChecked ? this.countUp() : this.countDown();
  }
  animate(e, t) {
    let s = 0;
    const n = (i) => {
      s || (s = i);
      const o = Math.min(
        (i - s) / this.duration,
        1
      );
      this.el.innerText = String(Math.floor(o * (t - e) + e)), o < 1 && window.requestAnimationFrame(n);
    };
    window.requestAnimationFrame(n);
  }
  // Public methods
  countUp() {
    this.animate(this.min, this.max);
  }
  countDown() {
    this.animate(this.max, this.min);
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsToggleCountCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsToggleCountCollection || (window.$hsToggleCountCollection = []), document.querySelectorAll("[data-hs-toggle-count]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsToggleCountCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Me(e);
    });
  }
}
window.addEventListener("load", () => {
  Me.autoInit();
});
typeof window < "u" && (window.HSToggleCount = Me);
/*
 * HSTogglePassword
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class me extends I {
  constructor(e, t) {
    super(e, t);
    const s = e.getAttribute("data-hs-toggle-password"), i = {
      ...s ? JSON.parse(s) : {},
      ...t
    }, o = [];
    i != null && i.target && typeof (i == null ? void 0 : i.target) == "string" ? (i == null ? void 0 : i.target.split(",")).forEach((a) => {
      o.push(document.querySelector(a));
    }) : i != null && i.target && typeof (i == null ? void 0 : i.target) == "object" ? i.target.forEach(
      (r) => o.push(document.querySelector(r))
    ) : i.target.forEach(
      (r) => o.push(r)
    ), this.target = o, this.isShown = this.el.hasAttribute("type") ? this.el.checked : !1, this.eventType = is(this.el) ? "change" : "click", this.isMultiple = this.target.length > 1 && !!this.el.closest("[data-hs-toggle-password-group]"), this.target && this.init();
  }
  init() {
    this.createCollection(window.$hsTogglePasswordCollection, this), this.isShown ? this.show() : this.hide(), this.el.addEventListener(this.eventType, () => {
      this.isShown ? this.hide() : this.show(), this.fireEvent("toggle", this.target), w("toggle.hs.toggle-select", this.el, this.target);
    });
  }
  getMultipleToggles() {
    const t = this.el.closest("[data-hs-toggle-password-group]").querySelectorAll("[data-hs-toggle-password]"), s = [];
    return t.forEach((n) => {
      s.push(
        me.getInstance(n)
      );
    }), s;
  }
  // Public methods
  show() {
    this.isMultiple ? (this.getMultipleToggles().forEach(
      (t) => t ? t.isShown = !0 : !1
    ), this.el.closest("[data-hs-toggle-password-group]").classList.add("active")) : (this.isShown = !0, this.el.classList.add("active")), this.target.forEach((e) => {
      e.type = "text";
    });
  }
  hide() {
    this.isMultiple ? (this.getMultipleToggles().forEach(
      (t) => t ? t.isShown = !1 : !1
    ), this.el.closest("[data-hs-toggle-password-group]").classList.remove("active")) : (this.isShown = !1, this.el.classList.remove("active")), this.target.forEach((e) => {
      e.type = "password";
    });
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsTogglePasswordCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element : null;
  }
  static autoInit() {
    window.$hsTogglePasswordCollection || (window.$hsTogglePasswordCollection = []), document.querySelectorAll(
      "[data-hs-toggle-password]:not(.--prevent-on-load-init)"
    ).forEach((e) => {
      window.$hsTogglePasswordCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new me(e);
    });
  }
}
window.addEventListener("load", () => {
  me.autoInit();
});
typeof window < "u" && (window.HSTogglePassword = me);
/*
 * HSTooltip
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class He extends I {
  constructor(e, t, s) {
    super(e, t, s), this.el && (this.toggle = this.el.querySelector(".hs-tooltip-toggle") || this.el, this.content = this.el.querySelector(".hs-tooltip-content"), this.eventMode = E(this.el, "--trigger") || "hover", this.preventPopper = E(
      this.el,
      "--prevent-popper",
      "false"
    ), this.placement = E(this.el, "--placement"), this.strategy = E(
      this.el,
      "--strategy"
    )), this.el && this.toggle && this.content && this.init();
  }
  init() {
    this.createCollection(window.$hsTooltipCollection, this), this.eventMode === "click" ? this.toggle.addEventListener("click", () => this.click()) : this.eventMode === "focus" ? this.toggle.addEventListener("click", () => this.focus()) : this.eventMode === "hover" && (this.toggle.addEventListener("mouseenter", () => this.enter()), this.toggle.addEventListener("mouseleave", () => this.leave())), this.preventPopper === "false" && this.buildPopper();
  }
  enter() {
    this.show();
  }
  leave() {
    this.hide();
  }
  click() {
    if (this.el.classList.contains("show"))
      return !1;
    this.show();
    const e = () => {
      setTimeout(() => {
        this.hide(), this.toggle.removeEventListener("click", e, !0), this.toggle.removeEventListener("blur", e, !0);
      });
    };
    this.toggle.addEventListener("click", e, !0), this.toggle.addEventListener("blur", e, !0);
  }
  focus() {
    this.show();
    const e = () => {
      this.hide(), this.toggle.removeEventListener("blur", e, !0);
    };
    this.toggle.addEventListener("blur", e, !0);
  }
  buildPopper() {
    this.popperInstance = jt(this.toggle, this.content, {
      placement: at[this.placement] || "top",
      strategy: this.strategy || "fixed",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 5]
          }
        }
      ]
    });
  }
  // Public methods
  show() {
    this.content.classList.remove("hidden"), this.preventPopper === "false" && (this.popperInstance.setOptions((e) => ({
      ...e,
      modifiers: [
        ...e.modifiers,
        {
          name: "eventListeners",
          enabled: !0
        }
      ]
    })), this.popperInstance.update()), setTimeout(() => {
      this.el.classList.add("show"), this.fireEvent("show", this.el), w("show.hs.tooltip", this.el, this.el);
    });
  }
  hide() {
    this.el.classList.remove("show"), this.preventPopper === "false" && this.popperInstance.setOptions((e) => ({
      ...e,
      modifiers: [
        ...e.modifiers,
        {
          name: "eventListeners",
          enabled: !1
        }
      ]
    })), this.fireEvent("hide", this.el), w("hide.hs.tooltip", this.el, this.el), R(this.content, () => {
      if (this.el.classList.contains("show"))
        return !1;
      this.content.classList.add("hidden");
    });
  }
  // Static methods
  static getInstance(e, t = !1) {
    const s = window.$hsTooltipCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    window.$hsTooltipCollection || (window.$hsTooltipCollection = []), document.querySelectorAll(".hs-tooltip").forEach((e) => {
      window.$hsTooltipCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new He(e);
    });
  }
  static show(e) {
    const t = window.$hsTooltipCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    if (t)
      switch (t.element.eventMode) {
        case "click":
          t.element.click();
          break;
        case "focus":
          t.element.focus();
          break;
        default:
          t.element.enter();
          break;
      }
  }
  static hide(e) {
    const t = window.$hsTooltipCollection.find(
      (s) => s.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    t && t.element.hide();
  }
  // Backward compatibility
  static on(e, t, s) {
    const n = window.$hsTooltipCollection.find(
      (i) => i.element.el === (typeof t == "string" ? document.querySelector(t) : t)
    );
    n && (n.element.events[e] = s);
  }
}
window.addEventListener("load", () => {
  He.autoInit();
});
typeof window < "u" && (window.HSTooltip = He);
/*
 * HSTreeView
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
const Qt = class Ge extends I {
  constructor(e, t, s) {
    super(e, t, s), this.items = [];
    const n = e.getAttribute("data-hs-tree-view"), o = {
      ...n ? JSON.parse(n) : {},
      ...t
    };
    this.controlBy = (o == null ? void 0 : o.controlBy) || "button", this.autoSelectChildren = (o == null ? void 0 : o.autoSelectChildren) || !1, this.isIndeterminate = (o == null ? void 0 : o.isIndeterminate) || !0, this.init();
  }
  init() {
    this.createCollection(window.$hsTreeViewCollection, this), Ge.group += 1, this.initItems();
  }
  initItems() {
    this.el.querySelectorAll("[data-hs-tree-view-item]").forEach((e, t) => {
      const s = JSON.parse(e.getAttribute("data-hs-tree-view-item"));
      e.id || (e.id = `tree-view-item-${Ge.group}-${t}`);
      const n = {
        ...s,
        id: s.id ?? e.id,
        path: this.getPath(e),
        isSelected: s.isSelected ?? !1
      };
      this.items.push(n), this.controlBy === "checkbox" ? this.controlByCheckbox(e, n) : this.controlByButton(e, n);
    });
  }
  controlByButton(e, t) {
    e.addEventListener("click", (s) => {
      if (s.stopPropagation(), e.classList.contains("disabled"))
        return !1;
      !s.metaKey && !s.shiftKey && this.unselectItem(t), this.selectItem(e, t), this.fireEvent("click", {
        el: e,
        data: t
      }), w("click.hs.treeView", this.el, {
        el: e,
        data: t
      });
    });
  }
  controlByCheckbox(e, t) {
    const s = e.querySelector(`input[value="${t.value}"]`);
    s && s.addEventListener("change", () => {
      this.autoSelectChildren ? (this.selectItem(e, t), t.isDir && this.selectChildren(e, t), this.toggleParent(e)) : this.selectItem(e, t);
    });
  }
  getItem(e) {
    return this.items.find((t) => t.id === e);
  }
  getPath(e) {
    var n;
    const t = [];
    let s = e.closest("[data-hs-tree-view-item]");
    for (; s; ) {
      const i = JSON.parse(s.getAttribute("data-hs-tree-view-item"));
      t.push(i.value), s = (n = s.parentElement) == null ? void 0 : n.closest("[data-hs-tree-view-item]");
    }
    return t.reverse().join("/");
  }
  unselectItem(e = null) {
    let t = this.getSelectedItems();
    e && (t = t.filter((s) => s.id !== e.id)), t.length && t.forEach((s) => {
      document.querySelector(`#${s.id}`).classList.remove("selected"), this.changeItemProp(s.id, "isSelected", !1);
    });
  }
  selectItem(e, t) {
    t.isSelected ? (e.classList.remove("selected"), this.changeItemProp(t.id, "isSelected", !1)) : (e.classList.add("selected"), this.changeItemProp(t.id, "isSelected", !0));
  }
  selectChildren(e, t) {
    const s = e.querySelectorAll("[data-hs-tree-view-item]");
    Array.from(s).filter((n) => !n.classList.contains("disabled")).forEach((n) => {
      const i = n.id ? this.getItem(n.id) : null;
      if (!i)
        return !1;
      t.isSelected ? (n.classList.add("selected"), this.changeItemProp(i.id, "isSelected", !0)) : (n.classList.remove("selected"), this.changeItemProp(i.id, "isSelected", !1));
      const o = this.getItem(n.id), r = n.querySelector(
        `input[value="${o.value}"]`
      );
      this.isIndeterminate && (r.indeterminate = !1), o.isSelected ? r.checked = !0 : r.checked = !1;
    });
  }
  toggleParent(e) {
    var s, n;
    let t = (s = e.parentElement) == null ? void 0 : s.closest("[data-hs-tree-view-item]");
    for (; t; ) {
      const i = t.querySelectorAll(
        "[data-hs-tree-view-item]:not(.disabled)"
      ), o = JSON.parse(t.getAttribute("data-hs-tree-view-item")), r = t.querySelector(
        `input[value="${o.value}"]`
      );
      let a = !1, d = 0;
      i.forEach((h) => {
        const p = this.getItem(h.id);
        p.isSelected && (d += 1), p.isSelected || (a = !0);
      }), a ? (t.classList.remove("selected"), this.changeItemProp(t.id, "isSelected", !1), r.checked = !1) : (t.classList.add("selected"), this.changeItemProp(t.id, "isSelected", !0), r.checked = !0), this.isIndeterminate && (d > 0 && d < i.length ? r.indeterminate = !0 : r.indeterminate = !1), t = (n = t.parentElement) == null ? void 0 : n.closest("[data-hs-tree-view-item]");
    }
  }
  // Public methods
  update() {
    this.items.map((e) => {
      const t = document.querySelector(`#${e.id}`);
      return e.path !== this.getPath(t) && (e.path = this.getPath(t)), e;
    });
  }
  getSelectedItems() {
    return this.items.filter((e) => e.isSelected);
  }
  changeItemProp(e, t, s) {
    this.items.map((n) => (n.id === e && (n[t] = s), n));
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsTreeViewCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    window.$hsTreeViewCollection || (window.$hsTreeViewCollection = []), document.querySelectorAll("[data-hs-tree-view]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsTreeViewCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Ge(e);
    });
  }
  // Backward compatibility
  static on(e, t, s) {
    const n = window.$hsTreeViewCollection.find(
      (i) => i.element.el === (typeof t == "string" ? document.querySelector(t) : t)
    );
    n && (n.element.events[e] = s);
  }
};
Qt.group = 0;
let gt = Qt;
window.addEventListener("load", () => {
  gt.autoInit();
});
typeof window < "u" && (window.HSTreeView = gt);
/*
 * HSDataTable
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Re extends I {
  constructor(e, t, s) {
    var r, a, d, h, p, c, u, g, v, m, b;
    super(e, t, s), this.el = typeof e == "string" ? document.querySelector(e) : e;
    const n = [];
    Array.from(this.el.querySelectorAll("thead th, thead td")).forEach(
      (x, T) => {
        x.classList.contains("--exclude-from-ordering") && n.push({
          targets: T,
          orderable: !1
        });
      }
    );
    const i = this.el.getAttribute("data-hs-datatable"), o = i ? JSON.parse(i) : {};
    this.concatOptions = {
      searching: !0,
      lengthChange: !1,
      order: [],
      columnDefs: [...n],
      ...o,
      ...t
    }, this.table = this.el.querySelector("table"), this.search = this.el.querySelector("[data-hs-datatable-search]") ?? null, this.pageEntities = this.el.querySelector("[data-hs-datatable-page-entities]") ?? null, this.paging = this.el.querySelector("[data-hs-datatable-paging]") ?? null, this.pagingPrev = this.el.querySelector("[data-hs-datatable-paging-prev]") ?? null, this.pagingNext = this.el.querySelector("[data-hs-datatable-paging-next]") ?? null, this.pagingPages = this.el.querySelector("[data-hs-datatable-paging-pages]") ?? null, this.info = this.el.querySelector("[data-hs-datatable-info]") ?? null, this.infoFrom = this.el.querySelector("[data-hs-datatable-info-from]") ?? null, this.infoTo = this.el.querySelector("[data-hs-datatable-info-to]") ?? null, this.infoLength = this.el.querySelector("[data-hs-datatable-info-length]") ?? null, (r = this.concatOptions) != null && r.rowSelectingOptions && (this.rowSelectingAll = ((d = (a = this.concatOptions) == null ? void 0 : a.rowSelectingOptions) != null && d.selectAllSelector ? document.querySelector(
      (p = (h = this.concatOptions) == null ? void 0 : h.rowSelectingOptions) == null ? void 0 : p.selectAllSelector
    ) : document.querySelector("[data-hs-datatable-row-selecting-all]")) ?? null), (c = this.concatOptions) != null && c.rowSelectingOptions && (this.rowSelectingIndividual = ((g = (u = this.concatOptions) == null ? void 0 : u.rowSelectingOptions) == null ? void 0 : g.individualSelector) ?? "[data-hs-datatable-row-selecting-individual]" ?? null), this.pageEntities && (this.concatOptions.pageLength = parseInt(this.pageEntities.value)), this.maxPagesToShow = 3, this.isRowSelecting = !!((v = this.concatOptions) != null && v.rowSelectingOptions), this.pageBtnClasses = ((b = (m = this.concatOptions) == null ? void 0 : m.pagingOptions) == null ? void 0 : b.pageBtnClasses) ?? null, this.init();
  }
  init() {
    this.createCollection(window.$hsDataTableCollection, this), this.initTable(), this.search && this.initSearch(), this.pageEntities && this.initPageEntities(), this.paging && this.initPaging(), this.pagingPrev && this.initPagingPrev(), this.pagingNext && this.initPagingNext(), this.pagingPages && this.buildPagingPages(), this.info && this.initInfo(), this.isRowSelecting && this.initRowSelecting();
  }
  initTable() {
    this.dataTable = new DataTable(this.table, this.concatOptions), this.isRowSelecting && this.triggerChangeEventToRow(), this.dataTable.on("draw", () => {
      this.isRowSelecting && this.updateSelectAllCheckbox(), this.isRowSelecting && this.triggerChangeEventToRow(), this.updateInfo(), this.updatePaging();
    });
  }
  // Search
  initSearch() {
    this.search.addEventListener(
      "input",
      Ce(
        (e) => this.onSearchInput(e.target.value)
      )
    );
  }
  onSearchInput(e) {
    this.dataTable.search(e).draw();
  }
  // Page entities
  initPageEntities() {
    this.pageEntities.addEventListener(
      "change",
      (e) => this.onEntitiesChange(parseInt(e.target.value))
    );
  }
  onEntitiesChange(e) {
    this.dataTable.page.len(e).draw();
  }
  // Info
  initInfo() {
    this.infoFrom && this.initInfoFrom(), this.infoTo && this.initInfoTo(), this.infoLength && this.initInfoLength();
  }
  initInfoFrom() {
    const { start: e } = this.dataTable.page.info();
    this.infoFrom.innerText = `${e + 1}`;
  }
  initInfoTo() {
    const { end: e } = this.dataTable.page.info();
    this.infoTo.innerText = `${e}`;
  }
  initInfoLength() {
    const { recordsTotal: e } = this.dataTable.page.info();
    this.infoLength.innerText = `${e}`;
  }
  updateInfo() {
    this.initInfo();
  }
  // Paging
  initPaging() {
    this.hidePagingIfSinglePage();
  }
  hidePagingIfSinglePage() {
    const { pages: e } = this.dataTable.page.info();
    e < 2 ? (this.paging.classList.add("hidden"), this.paging.style.display = "none") : (this.paging.classList.remove("hidden"), this.paging.style.display = "");
  }
  initPagingPrev() {
    this.pagingPrev.addEventListener("click", () => {
      this.onPrevClick();
    });
  }
  onPrevClick() {
    this.dataTable.page("previous").draw("page");
  }
  disablePagingArrow(e, t) {
    t ? (e.classList.add("disabled"), e.setAttribute("disabled", "disabled")) : (e.classList.remove("disabled"), e.removeAttribute("disabled"));
  }
  initPagingNext() {
    this.pagingNext.addEventListener("click", () => {
      this.onNextClick();
    });
  }
  onNextClick() {
    this.dataTable.page("next").draw("page");
  }
  buildPagingPages() {
    this.updatePaging();
  }
  updatePaging() {
    const { page: e, pages: t, length: s } = this.dataTable.page.info(), n = this.dataTable.rows({ search: "applied" }).count(), i = Math.ceil(n / s), o = e + 1;
    let r = Math.max(
      1,
      o - Math.floor(this.maxPagesToShow / 2)
    ), a = Math.min(i, r + (this.maxPagesToShow - 1));
    a - r + 1 < this.maxPagesToShow && (r = Math.max(1, a - this.maxPagesToShow + 1)), this.pagingPages.innerHTML = "", r > 1 && (this.buildPagingPage(1), r > 2 && this.pagingPages.appendChild(
      y('<span class="ellipsis">...</span>')
    ));
    for (let d = r; d <= a; d++)
      this.buildPagingPage(d);
    a < i && (a < i - 1 && this.pagingPages.appendChild(
      y('<span class="ellipsis">...</span>')
    ), this.buildPagingPage(i)), this.disablePagingArrow(this.pagingPrev, e === 0), this.disablePagingArrow(this.pagingNext, e === t - 1), this.hidePagingIfSinglePage();
  }
  buildPagingPage(e) {
    const { page: t } = this.dataTable.page.info(), s = y('<button type="button"></button>');
    s.innerText = `${e}`, s.setAttribute("data-page", `${e}`), this.pageBtnClasses && B(this.pageBtnClasses, s), t === e - 1 && s.classList.add("active"), s.addEventListener("click", () => this.onPageClick(e)), this.pagingPages.append(s);
  }
  onPageClick(e) {
    this.dataTable.page(e - 1).draw("page");
  }
  // Select row
  initRowSelecting() {
    this.rowSelectingAll.addEventListener(
      "change",
      () => this.onSelectAllChange()
    );
  }
  triggerChangeEventToRow() {
    this.table.querySelectorAll(`tbody ${this.rowSelectingIndividual}`).forEach((e) => {
      e.addEventListener("change", () => {
        this.updateSelectAllCheckbox();
      });
    });
  }
  onSelectAllChange() {
    let e = this.rowSelectingAll.checked;
    Array.from(
      this.dataTable.rows({ page: "current", search: "applied" }).nodes()
    ).forEach((s) => {
      const n = s.querySelector(this.rowSelectingIndividual);
      n && (n.checked = e);
    }), this.updateSelectAllCheckbox();
  }
  updateSelectAllCheckbox() {
    if (!this.dataTable.rows({ search: "applied" }).count())
      return this.rowSelectingAll.checked = !1, !1;
    let t = !0;
    Array.from(
      this.dataTable.rows({
        page: "current",
        search: "applied"
      }).nodes()
    ).forEach((n) => {
      const i = n.querySelector(this.rowSelectingIndividual);
      if (i && !i.checked)
        return t = !1, !1;
    }), this.rowSelectingAll.checked = t;
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsDataTableCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    window.$hsDataTableCollection || (window.$hsDataTableCollection = []), document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsDataTableCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Re(e);
    });
  }
}
window.addEventListener("load", () => {
  document.querySelectorAll(
    "[data-hs-datatable]:not(.--prevent-on-load-init)"
  ).length && (typeof jQuery > "u" && console.error(
    "HSDataTable: jQuery is not available, please add it to the page."
  ), typeof DataTable > "u" && console.error(
    "HSDataTable: DataTable is not available, please add it to the page."
  )), typeof DataTable < "u" && typeof jQuery < "u" && Re.autoInit();
});
typeof window < "u" && (window.HSDataTable = Re);
/*
 * HSFileUpload
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
typeof Dropzone < "u" && (Dropzone.autoDiscover = !1);
class Ve extends I {
  constructor(e, t, s) {
    var o;
    super(e, t, s), this.extensions = {}, this.el = typeof e == "string" ? document.querySelector(e) : e;
    const n = this.el.getAttribute("data-hs-file-upload"), i = n ? JSON.parse(n) : {};
    this.previewTemplate = ((o = this.el.querySelector("[data-hs-file-upload-preview]")) == null ? void 0 : o.innerHTML) || `<div class="p-3 bg-white border border-solid border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">
			<div class="mb-2 flex justify-between items-center">
				<div class="flex items-center gap-x-3">
					<span class="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500" data-hs-file-upload-file-icon></span>
					<div>
						<p class="text-sm font-medium text-gray-800 dark:text-white">
							<span class="truncate inline-block max-w-[300px] align-bottom" data-hs-file-upload-file-name></span>.<span data-hs-file-upload-file-ext></span>
						</p>
						<p class="text-xs text-gray-500 dark:text-neutral-500" data-hs-file-upload-file-size></p>
					</div>
				</div>
				<div class="inline-flex items-center gap-x-2">
					<button type="button" class="text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200" data-hs-file-upload-remove>
						<svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
					</button>
				</div>
			</div>
			<div class="flex items-center gap-x-3 whitespace-nowrap">
				<div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-hs-file-upload-progress-bar>
					<div class="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 hs-file-upload-complete:bg-green-600 dark:bg-blue-500" style="width: 0" data-hs-file-upload-progress-bar-pane></div>
				</div>
				<div class="w-10 text-end">
					<span class="text-sm text-gray-800 dark:text-white">
						<span data-hs-file-upload-progress-bar-value>0</span>%
					</span>
				</div>
			</div>
		</div>`, this.extensions = _.merge(
      {
        default: {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
          class: "size-5"
        },
        xls: {
          icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0243 1.43996H7.08805C6.82501 1.43996 6.57277 1.54445 6.38677 1.73043C6.20077 1.91642 6.09631 2.16868 6.09631 2.43171V6.64796L15.0243 11.856L19.4883 13.7398L23.9523 11.856V6.64796L15.0243 1.43996Z" fill="#21A366"></path><path d="M6.09631 6.64796H15.0243V11.856H6.09631V6.64796Z" fill="#107C41"></path><path d="M22.9605 1.43996H15.0243V6.64796H23.9523V2.43171C23.9523 2.16868 23.8478 1.91642 23.6618 1.73043C23.4758 1.54445 23.2235 1.43996 22.9605 1.43996Z" fill="#33C481"></path><path d="M15.0243 11.856H6.09631V21.2802C6.09631 21.5433 6.20077 21.7955 6.38677 21.9815C6.57277 22.1675 6.82501 22.272 7.08805 22.272H22.9606C23.2236 22.272 23.4759 22.1675 23.6618 21.9815C23.8478 21.7955 23.9523 21.5433 23.9523 21.2802V17.064L15.0243 11.856Z" fill="#185C37"></path><path d="M15.0243 11.856H23.9523V17.064H15.0243V11.856Z" fill="#107C41"></path><path opacity="0.1" d="M12.5446 5.15996H6.09631V19.296H12.5446C12.8073 19.2952 13.0591 19.1904 13.245 19.0046C13.4308 18.8188 13.5355 18.567 13.5363 18.3042V6.1517C13.5355 5.88892 13.4308 5.63712 13.245 5.4513C13.0591 5.26548 12.8073 5.16074 12.5446 5.15996Z" fill="black"></path><path opacity="0.2" d="M11.8006 5.90396H6.09631V20.04H11.8006C12.0633 20.0392 12.3151 19.9344 12.501 19.7486C12.6868 19.5628 12.7915 19.311 12.7923 19.0482V6.8957C12.7915 6.6329 12.6868 6.38114 12.501 6.19532C12.3151 6.0095 12.0633 5.90475 11.8006 5.90396Z" fill="black"></path><path opacity="0.2" d="M11.8006 5.90396H6.09631V18.552H11.8006C12.0633 18.5512 12.3151 18.4464 12.501 18.2606C12.6868 18.0748 12.7915 17.823 12.7923 17.5602V6.8957C12.7915 6.6329 12.6868 6.38114 12.501 6.19532C12.3151 6.0095 12.0633 5.90475 11.8006 5.90396Z" fill="black"></path><path opacity="0.2" d="M11.0566 5.90396H6.09631V18.552H11.0566C11.3193 18.5512 11.5711 18.4464 11.757 18.2606C11.9428 18.0748 12.0475 17.823 12.0483 17.5602V6.8957C12.0475 6.6329 11.9428 6.38114 11.757 6.19532C11.5711 6.0095 11.3193 5.90475 11.0566 5.90396Z" fill="black"></path><path d="M1.13604 5.90396H11.0566C11.3195 5.90396 11.5718 6.00842 11.7578 6.19442C11.9438 6.38042 12.0483 6.63266 12.0483 6.8957V16.8162C12.0483 17.0793 11.9438 17.3315 11.7578 17.5175C11.5718 17.7035 11.3195 17.808 11.0566 17.808H1.13604C0.873012 17.808 0.620754 17.7035 0.434765 17.5175C0.248775 17.3315 0.144287 17.0793 0.144287 16.8162V6.8957C0.144287 6.63266 0.248775 6.38042 0.434765 6.19442C0.620754 6.00842 0.873012 5.90396 1.13604 5.90396Z" fill="#107C41"></path><path d="M2.77283 15.576L5.18041 11.8455L2.9752 8.13596H4.74964L5.95343 10.5071C6.06401 10.7318 6.14015 10.8994 6.18185 11.01H6.19745C6.27683 10.8305 6.35987 10.6559 6.44669 10.4863L7.73309 8.13596H9.36167L7.09991 11.8247L9.41897 15.576H7.68545L6.29489 12.972C6.22943 12.861 6.17387 12.7445 6.12899 12.6238H6.10817C6.06761 12.7419 6.01367 12.855 5.94748 12.9608L4.51676 15.576H2.77283Z" fill="white"></path></svg>',
          class: "size-5"
        },
        doc: {
          icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z" fill="#41A5EE"></path><path d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z" fill="#2B7CD3"></path><path d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z" fill="#185ABD"></path><path d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z" fill="#103F91"></path><path opacity="0.1" d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z" fill="#185ABD"></path><path d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z" fill="white"></path></svg>',
          class: "size-5"
        },
        zip: {
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="20" r="2"/><path d="M10 7V6"/><path d="M10 12v-1"/><path d="M10 18v-2"/></svg>',
          class: "size-5"
        }
      },
      i.extensions
    ), this.singleton = i.singleton, this.concatOptions = {
      clickable: this.el.querySelector(
        "[data-hs-file-upload-trigger]"
      ),
      previewsContainer: this.el.querySelector(
        "[data-hs-file-upload-previews]"
      ),
      addRemoveLinks: !1,
      previewTemplate: this.previewTemplate,
      autoHideTrigger: !1,
      ...i,
      ...t
    }, this.init();
  }
  init() {
    this.createCollection(window.$hsFileUploadCollection, this), this.initDropzone();
  }
  initDropzone() {
    const e = this.el.querySelector(
      "[data-hs-file-upload-clear]"
    ), t = Array.from(
      this.el.querySelectorAll("[data-hs-file-upload-pseudo-trigger]")
    );
    this.dropzone = new Dropzone(this.el, this.concatOptions), this.dropzone.on("addedfile", (s) => this.onAddFile(s)), this.dropzone.on("removedfile", () => this.onRemoveFile()), this.dropzone.on(
      "uploadprogress",
      (s, n) => this.onUploadProgress(s, n)
    ), this.dropzone.on("complete", (s) => this.onComplete(s)), e && (e.onclick = () => {
      this.dropzone.files.length && this.dropzone.removeAllFiles(!0);
    }), t.length && t.forEach((s) => {
      s.onclick = () => {
        var n, i;
        (n = this.concatOptions) != null && n.clickable && ((i = this.concatOptions) == null ? void 0 : i.clickable).click();
      };
    });
  }
  onAddFile(e) {
    const { previewElement: t } = e, s = e.previewElement.querySelector(
      "[data-hs-file-upload-reload]"
    );
    if (!t)
      return !1;
    this.singleton && this.dropzone.files.length > 1 && this.dropzone.removeFile(this.dropzone.files[0]), s && s.addEventListener("click", (n) => {
      n.preventDefault(), n.stopPropagation();
      const i = document.createElement("input");
      i.type = "file", i.click(), i.addEventListener("change", (o) => {
        var d;
        const a = (d = o.target.files) == null ? void 0 : d[0];
        if (a) {
          const h = a;
          h.status = Dropzone.ADDED, h.accepted = !0, h.previewElement = e.previewElement, h.previewTemplate = e.previewTemplate, h.previewsContainer = e.previewsContainer, this.dropzone.removeFile(e), this.dropzone.addFile(h);
        }
      });
    }), this.previewAccepted(e);
  }
  previewAccepted(e) {
    const { previewElement: t } = e, s = this.splitFileName(e.name), n = t.querySelector(
      "[data-hs-file-upload-file-name]"
    ), i = t.querySelector(
      "[data-hs-file-upload-file-ext]"
    ), o = t.querySelector(
      "[data-hs-file-upload-file-size]"
    ), r = t.querySelector(
      "[data-hs-file-upload-file-icon]"
    ), a = this.el.querySelector(
      "[data-hs-file-upload-trigger]"
    ), d = t.querySelector(
      "[data-dz-thumbnail]"
    ), h = t.querySelector(
      "[data-hs-file-upload-remove]"
    );
    n && (n.textContent = s.name), i && (i.textContent = s.extension), o && (o.textContent = this.formatFileSize(e.size)), d && (e.type.includes("image/") ? d.classList.remove("hidden") : this.setIcon(s.extension, r)), this.dropzone.files.length > 0 && this.concatOptions.autoHideTrigger && (a.style.display = "none"), h && (h.onclick = () => this.dropzone.removeFile(e));
  }
  onRemoveFile() {
    const e = this.el.querySelector(
      "[data-hs-file-upload-trigger]"
    );
    this.dropzone.files.length === 0 && this.concatOptions.autoHideTrigger && (e.style.display = "");
  }
  onUploadProgress(e, t) {
    const { previewElement: s } = e;
    if (!s)
      return !1;
    const n = s.querySelector(
      "[data-hs-file-upload-progress-bar]"
    ), i = s.querySelector(
      "[data-hs-file-upload-progress-bar-pane]"
    ), o = s.querySelector(
      "[data-hs-file-upload-progress-bar-value]"
    ), r = Math.floor(t);
    n && n.setAttribute("aria-valuenow", `${r}`), i && (i.style.width = `${r}%`), o && (o.innerText = `${r}`);
  }
  onComplete(e) {
    const { previewElement: t } = e;
    if (!t)
      return !1;
    t.classList.add("complete");
  }
  setIcon(e, t) {
    const s = this.createIcon(e);
    t.append(s);
  }
  createIcon(e) {
    var s, n;
    const t = (s = this.extensions[e]) != null && s.icon ? y(this.extensions[e].icon) : y(this.extensions.default.icon);
    return B(
      (n = this.extensions[e]) != null && n.class ? this.extensions[e].class : this.extensions.default.class,
      t
    ), t;
  }
  formatFileSize(e) {
    return e < 1024 ? e.toFixed(2) + " B" : e < 1024 * 1024 ? (e / 1024).toFixed(2) + " KB" : e < 1024 * 1024 * 1024 ? (e / (1024 * 1024)).toFixed(2) + " MB" : e < 1024 * 1024 * 1024 * 1024 ? (e / (1024 * 1024 * 1024)).toFixed(2) + " GB" : (e / (1024 * 1024 * 1024 * 1024)).toFixed(2) + " TB";
  }
  splitFileName(e) {
    let t = e.lastIndexOf(".");
    return t == -1 ? { name: e, extension: "" } : {
      name: e.substring(0, t),
      extension: e.substring(t + 1)
    };
  }
  // Static methods
  static getInstance(e, t) {
    const s = window.$hsFileUploadCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    window.$hsFileUploadCollection || (window.$hsFileUploadCollection = []), document.querySelectorAll("[data-hs-file-upload]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsFileUploadCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Ve(e);
    });
  }
}
window.addEventListener("load", () => {
  document.querySelectorAll(
    "[data-hs-file-upload]:not(.--prevent-on-load-init)"
  ).length && (typeof _ > "u" && console.error(
    "HSFileUpload: Lodash is not available, please add it to the page."
  ), typeof Dropzone > "u" && console.error(
    "HSFileUpload: Dropzone is not available, please add it to the page."
  )), typeof _ < "u" && typeof Dropzone < "u" && Ve.autoInit();
});
typeof window < "u" && (window.HSFileUpload = Ve);
/*
 * HSRangeSlider
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
class Fe extends I {
  constructor(e, t, s) {
    super(e, t, s);
    const n = e.getAttribute("data-hs-range-slider"), i = n ? JSON.parse(n) : {};
    this.concatOptions = {
      ...i,
      ...t,
      cssClasses: {
        ...noUiSlider.cssClasses,
        ...this.processClasses(i.cssClasses)
      }
    }, this.init();
  }
  get formattedValue() {
    const e = this.el.noUiSlider.get();
    if (Array.isArray(e) && this.format) {
      const t = [];
      return e.forEach((s) => {
        t.push(this.format.to(s));
      }), t;
    } else
      return this.format ? this.format.to(e) : e;
  }
  processClasses(e) {
    const t = {};
    return Object.keys(e).forEach((s) => {
      s && (t[s] = `${noUiSlider.cssClasses[s]} ${e[s]}`);
    }), t;
  }
  init() {
    var e, t, s, n, i, o, r, a, d, h, p, c, u;
    this.createCollection(window.$hsRangeSliderCollection, this), (typeof ((e = this.concatOptions) == null ? void 0 : e.formatter) == "object" ? ((s = (t = this.concatOptions) == null ? void 0 : t.formatter) == null ? void 0 : s.type) === "thousandsSeparatorAndDecimalPoints" : ((n = this.concatOptions) == null ? void 0 : n.formatter) === "thousandsSeparatorAndDecimalPoints") ? this.thousandsSeparatorAndDecimalPointsFormatter() : (typeof ((i = this.concatOptions) == null ? void 0 : i.formatter) == "object" ? ((r = (o = this.concatOptions) == null ? void 0 : o.formatter) == null ? void 0 : r.type) === "integer" : ((a = this.concatOptions) == null ? void 0 : a.formatter) === "integer") ? this.integerFormatter() : typeof ((d = this.concatOptions) == null ? void 0 : d.formatter) == "object" && ((p = (h = this.concatOptions) == null ? void 0 : h.formatter) != null && p.prefix || (u = (c = this.concatOptions) == null ? void 0 : c.formatter) != null && u.postfix) && this.prefixOrPostfixFormatter(), noUiSlider.create(this.el, this.concatOptions), this.concatOptions.disabled && this.setDisabled();
  }
  formatValue(e) {
    var s, n, i, o, r, a, d, h, p;
    let t = "";
    return typeof ((s = this.concatOptions) == null ? void 0 : s.formatter) == "object" ? ((i = (n = this.concatOptions) == null ? void 0 : n.formatter) != null && i.prefix && (t += (r = (o = this.concatOptions) == null ? void 0 : o.formatter) == null ? void 0 : r.prefix), t += e, (d = (a = this.concatOptions) == null ? void 0 : a.formatter) != null && d.postfix && (t += (p = (h = this.concatOptions) == null ? void 0 : h.formatter) == null ? void 0 : p.postfix)) : t += e, t;
  }
  integerFormatter() {
    var e;
    this.format = {
      to: (t) => this.formatValue(Math.round(t)),
      from: (t) => Math.round(+t)
    }, (e = this.concatOptions) != null && e.tooltips && (this.concatOptions.tooltips = this.format);
  }
  prefixOrPostfixFormatter() {
    var e;
    this.format = {
      to: (t) => this.formatValue(t),
      from: (t) => +t
    }, (e = this.concatOptions) != null && e.tooltips && (this.concatOptions.tooltips = this.format);
  }
  thousandsSeparatorAndDecimalPointsFormatter() {
    var e;
    this.format = {
      to: (t) => this.formatValue(
        new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(t)
      ),
      from: (t) => parseFloat(t.replace(/,/g, ""))
    }, (e = this.concatOptions) != null && e.tooltips && (this.concatOptions.tooltips = this.format);
  }
  setDisabled() {
    this.el.setAttribute("disabled", "disabled"), this.el.classList.add("disabled");
  }
  // Static methods
  static getInstance(e, t = !1) {
    const s = window.$hsRangeSliderCollection.find(
      (n) => n.element.el === (typeof e == "string" ? document.querySelector(e) : e)
    );
    return s ? t ? s : s.element.el : null;
  }
  static autoInit() {
    window.$hsRangeSliderCollection || (window.$hsRangeSliderCollection = []), document.querySelectorAll("[data-hs-range-slider]:not(.--prevent-on-load-init)").forEach((e) => {
      window.$hsRangeSliderCollection.find(
        (t) => {
          var s;
          return ((s = t == null ? void 0 : t.element) == null ? void 0 : s.el) === e;
        }
      ) || new Fe(e);
    });
  }
  // Backward compatibility
  static on(e, t, s) {
    const n = window.$hsRangeSliderCollection.find(
      (i) => i.element.el === (typeof t == "string" ? document.querySelector(t) : t)
    );
    n && (n.element.events[e] = s);
  }
}
window.addEventListener("load", () => {
  Fe.autoInit();
});
typeof window < "u" && (window.HSRangeSlider = Fe);
/*
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
const Je = [
  {
    key: "copy-markup",
    fn: Te,
    collection: "$hsCopyMarkupCollection"
  },
  { key: "accordion", fn: ae, collection: "$hsAccordionCollection" },
  { key: "carousel", fn: Ee, collection: "$hsCarouselCollection" },
  { key: "collapse", fn: Le, collection: "$hsCollapseCollection" },
  { key: "combobox", fn: j, collection: "$hsComboBoxCollection" },
  { key: "datatable", fn: Re, collection: "$hsDataTableCollection" },
  { key: "dropdown", fn: Z, collection: "$hsDropdownCollection" },
  {
    key: "file-upload",
    fn: Ve,
    collection: "$hsFileUploadCollection"
  },
  {
    key: "input-number",
    fn: $e,
    collection: "$hsInputNumberCollection"
  },
  { key: "overlay", fn: G, collection: "$hsOverlayCollection" },
  { key: "pin-input", fn: Pe, collection: "$hsPinInputCollection" },
  {
    key: "range-slider",
    fn: Fe,
    collection: "$hsRangeSliderCollection"
  },
  {
    key: "remove-element",
    fn: qe,
    collection: "$hsRemoveElementCollection"
  },
  { key: "scrollspy", fn: Be, collection: "$hsScrollspyCollection" },
  { key: "select", fn: oe, collection: "$hsSelectCollection" },
  { key: "stepper", fn: De, collection: "$hsStepperCollection" },
  {
    key: "strong-password",
    fn: Oe,
    collection: "$hsStrongPasswordCollection"
  },
  { key: "tabs", fn: pe, collection: "$hsTabsCollection" },
  {
    key: "textarea-auto-height",
    fn: Ne,
    collection: "$hsTextareaAutoHeightCollection"
  },
  {
    key: "theme-switch",
    fn: fe,
    collection: "$hsThemeSwitchCollection"
  },
  {
    key: "toggle-count",
    fn: Me,
    collection: "$hsToggleCountCollection"
  },
  {
    key: "toggle-password",
    fn: me,
    collection: "$hsTogglePasswordCollection"
  },
  { key: "tooltip", fn: He, collection: "$hsTooltipCollection" },
  { key: "tree-view", fn: gt, collection: "$hsTreeViewCollection" }
];
/*
 * HSStaticMethods
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
const vi = {
  getClassProperty: E,
  afterTransition: R,
  autoInit(l = "all") {
    l === "all" ? Je.forEach(({ fn: e }) => {
      e == null || e.autoInit();
    }) : Je.forEach(({ key: e, fn: t }) => {
      l.includes(e) && (t == null || t.autoInit());
    });
  },
  cleanCollection(l = "all") {
    l === "all" ? Je.forEach(({ collection: e }) => {
      window[e] instanceof Array && (window[e] = []);
    }) : Je.forEach(({ key: e, collection: t }) => {
      l.includes(e) && window[t] instanceof Array && (window[t] = []);
    });
  }
};
typeof window < "u" && (window.HSStaticMethods = vi);
/*
 * @version: 2.5.1
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
typeof DataTable < "u" && typeof jQuery < "u" && require("./plugins/datatable").default;
typeof _ < "u" && typeof Dropzone < "u" && require("./plugins/file-upload").default;
typeof noUiSlider < "u" && require("./plugins/range-slider").default;
const yi = {
  name: "Tsotne",
  surname: "Chavchavadze"
};
console.log(yi);
