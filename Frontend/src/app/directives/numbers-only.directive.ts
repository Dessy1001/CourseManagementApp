import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
selector: '[appNumbersOnly]'
})

export class NumbersOnlyDirective {
constructor(private element: ElementRef) { }

@HostListener('input', ['$event']) onInputChange(event: Event) {
    const initialValue = this.element.nativeElement.value;
    this.element.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');

    if (initialValue !== this.element.nativeElement.value) {
        event.stopPropagation();
    }
  }
}