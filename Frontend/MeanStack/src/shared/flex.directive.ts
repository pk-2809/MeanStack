import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[flexLayout],[flexAlign],[flexGap],[flexWrap]'
})
export class FlexDirective implements OnInit {
  @Input('flexLayout') layout: string | undefined;
  @Input('flexAlign') align: string | undefined;
  @Input('flexGap') gap: string | undefined;
  @Input('flexWrap') wrap: string | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.layout) {
      this.applyLayoutStyles(this.layout);
    }

    if (this.align) {
      this.applyAlignmentStyles(this.align);
    }

    if (this.gap) {
      this.applyGapStyles(this.gap);
    }

    if (this.wrap) {
      this.applyWrapStyles(this.wrap);
    }
  }

  private applyLayoutStyles(layout: string) {
    const styles = layout.split(' ');

    if (styles.includes('row')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'flex-direction', 'row');
    }

    if (styles.includes('column')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'flex-direction', 'column');
    }
  }

  private applyAlignmentStyles(align: string) {
    const styles = align.split(' ');

    if (styles.includes('center')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'center');
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'center');
    }

    if (styles.includes('start')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'flex-start');
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'flex-start');
    }

    if (styles.includes('end')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'flex-end');
      this.renderer.setStyle(this.elementRef.nativeElement, 'align-items', 'flex-end');
    }

    if (styles.includes('space-between')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'space-between');
    }

    if (styles.includes('space-around')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'space-around');
    }

    if (styles.includes('space-evenly')) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'justify-content', 'space-evenly');
    }
  }

  private applyGapStyles(gap: string) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'gap', gap);
  }

  private applyWrapStyles(wrap: string) {
    if (wrap === 'wrap') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'flex-wrap', 'wrap');
    } else if (wrap === 'nowrap') {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      this.renderer.setStyle(this.elementRef.nativeElement, 'flex-wrap', 'nowrap');
    }
  }
}

